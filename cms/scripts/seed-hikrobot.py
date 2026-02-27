#!/usr/bin/env python3
"""
Hikrobot Full Catalog Seed Script
==================================
Seeds 1521 Hikrobot products into Strapi from organized exports.
Creates subcategories under Machine Vision, parses markdown specs,
stores local image/datasheet paths in product specs.

Usage:
  python3 cms/scripts/seed-hikrobot.py [--dry-run] [--limit N]

Requires: STRAPI_API_TOKEN env var or reads from .env
"""

import os
import re
import sys
import json
import time
import argparse
import urllib.request
import urllib.error

# --- Config ---
STRAPI_URL = os.environ.get("STRAPI_URL", "http://localhost:8211")
API_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
EXPORTS_DIR = "/home/zlatko/innosmart-ai/exports/organized"
MARKDOWN_DIR = "/home/zlatko/rag-innosmart/docs_md_v4"

HIKROBOT_MFG_DOCUMENT_ID = "oifputqm061sg18sh38kstas"
MACHINE_VISION_DOCUMENT_ID = "baspoio922gtohvbw4ba27cr"

# Throttling: batch size and pause between batches
BATCH_SIZE = 5
BATCH_PAUSE = 1.0  # seconds

# --- Subcategory mapping ---
# Maps source directory prefixes to subcategory definitions
SUBCATEGORIES = {
    "area-scan-cameras": {
        "name": "Area Scan камери",
        "slug": "area-scan-cameras",
        "icon": "📸",
        "description": "Индустриални камери за плоска инспекция — GigE, USB3, CoaXPress",
        "dirs": [
            "CA Area Scan Camera", "CB Board Level Camera", "CE Area Scan Camera",
            "CH Area Scan Camera", "CS Area Scan Camera", "CT Area Scan Camera",
            "CU Area Scan Camera",
        ],
    },
    "line-scan-cameras": {
        "name": "Line Scan камери",
        "slug": "line-scan-cameras",
        "icon": "📏",
        "description": "Камери за непрекъсната инспекция на движещи се обекти",
        "dirs": ["Line Scan Camera"],
    },
    "code-readers": {
        "name": "Четци за кодове",
        "slug": "code-readers",
        "icon": "📱",
        "description": "Индустриални баркод и QR четци — стационарни и вградени",
        "dirs": [
            "Code Reader ID2000", "Code Reader ID3000", "Code Reader ID5000",
            "Code Reader ID6000", "Code Reader ID7000", "Code Reader IDS",
        ],
    },
    "smart-cameras": {
        "name": "Smart камери",
        "slug": "smart-cameras",
        "icon": "🧠",
        "description": "Камери с вградена обработка и AI за автономна инспекция",
        "dirs": [
            "Smart Camera SC1000", "Smart Camera SC2000", "Smart Camera SC2000A",
            "Smart Camera SC3000", "Smart Camera SC5000X", "Smart Camera SC6000",
        ],
    },
    "handheld-scanners": {
        "name": "Ръчни скенери",
        "slug": "handheld-scanners",
        "icon": "🔫",
        "description": "Ръчни баркод скенери за логистика и склад",
        "dirs": [
            "Handheld IDH2000", "Handheld IDH3000",
            "Handheld IDH7000", "Handheld IDH9000",
        ],
    },
    "3d-cameras": {
        "name": "3D камери",
        "slug": "3d-cameras",
        "icon": "🔬",
        "description": "Стерео, лазерни профилни и линейни 3D камери",
        "dirs": ["3D Binocular", "3D Laser Profile", "3D Line Laser"],
    },
    "infrared-cameras": {
        "name": "Инфрачервени камери",
        "slug": "infrared-cameras",
        "icon": "🌡️",
        "description": "Термовизионни камери за мониторинг на температура",
        "dirs": ["CI Infrared Camera"],
    },
    "lenses": {
        "name": "Обективи",
        "slug": "lenses",
        "icon": "🔭",
        "description": "FA и M12 обективи за индустриални камери",
        "dirs": ["FA Lens", "M12 Lens"],
    },
    "lighting": {
        "name": "Осветление",
        "slug": "lighting",
        "icon": "💡",
        "description": "LED осветители, контролери и аксесоари за машинно зрение",
        "dirs": ["Light Source", "Light Controller", "Light Source Accessories"],
    },
    "vision-controllers": {
        "name": "Визуални контролери",
        "slug": "vision-controllers",
        "icon": "🖥️",
        "description": "Индустриални компютри и контролери за визуални системи",
        "dirs": ["Controller VC3000", "Controller VC5000", "Controller VT2000"],
    },
    "vision-accessories": {
        "name": "Аксесоари",
        "slug": "vision-accessories",
        "icon": "🔌",
        "description": "Кабели, frame grabber карти, фотоелектрични модули",
        "dirs": [
            "Vision Components Cable", "Vision Components Frame Grabber",
            "Vision Components Photoelectric", "Lens Accessories",
        ],
    },
    "microscope-cameras": {
        "name": "Микроскопски камери",
        "slug": "microscope-cameras",
        "icon": "🔍",
        "description": "HDMI камери за микроскопия и лабораторни приложения",
        "dirs": ["HDMI Microscope Camera"],
    },
}


def load_env_token():
    """Load STRAPI_API_TOKEN from .env file if not set."""
    global API_TOKEN
    if API_TOKEN:
        return
    env_path = os.path.join(os.path.dirname(__file__), "../../.env")
    env_path = os.path.abspath(env_path)
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("STRAPI_API_TOKEN="):
                    API_TOKEN = line.strip().split("=", 1)[1]
                    return


def strapi_request(method, endpoint, data=None):
    """Make an HTTP request to Strapi REST API."""
    url = f"{STRAPI_URL}/api{endpoint}"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_TOKEN}",
    }
    body = json.dumps({"data": data}).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        err_body = e.read().decode()
        # Return None for duplicate slug errors (already exists)
        if e.code == 400 and "unique" in err_body.lower():
            return None
        print(f"  ERROR {e.code} {method} {endpoint}: {err_body[:200]}")
        return None


def strapi_get(endpoint, params=None):
    """GET request to Strapi."""
    url = f"{STRAPI_URL}/api{endpoint}"
    if params:
        qs = "&".join(f"{k}={v}" for k, v in params.items())
        url += f"?{qs}"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_TOKEN}",
    }
    req = urllib.request.Request(url, headers=headers, method="GET")
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"  ERROR {e.code} GET {endpoint}: {e.read().decode()[:200]}")
        return None


def dir_to_category_key(dirname):
    """Map a source directory name to a subcategory key."""
    for key, subcat in SUBCATEGORIES.items():
        if dirname in subcat["dirs"]:
            return key
    return None


def parse_markdown_specs(model_name):
    """Parse specs from a markdown datasheet file. Returns (short_desc, specs_dict)."""
    md_file = os.path.join(MARKDOWN_DIR, f"{model_name}_datasheet_datasheet.md")
    if not os.path.exists(md_file):
        return None, None, {}

    with open(md_file, encoding="utf-8") as f:
        content = f.read()

    # Extract short description (first line after ## heading that isn't empty or <!-- image -->)
    short_desc = None
    lines = content.split("\n")
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("## ") and i == 0:
            continue
        if stripped and not stripped.startswith("##") and not stripped.startswith("<!--"):
            short_desc = stripped[:250]
            break

    # Extract introduction text if available
    intro = None
    in_intro = False
    intro_lines = []
    for line in lines:
        if line.strip() == "## Introduction":
            in_intro = True
            continue
        if in_intro:
            if line.strip().startswith("## "):
                break
            if line.strip() and not line.strip().startswith("<!--"):
                intro_lines.append(line.strip())
    if intro_lines:
        intro = " ".join(intro_lines)[:500]

    # Parse specification table
    specs = {}
    in_spec_table = False
    for line in lines:
        if "## Specification" in line or "## Technical Parameter" in line:
            in_spec_table = True
            continue
        if in_spec_table and line.strip().startswith("## "):
            break
        if in_spec_table and line.strip().startswith("|"):
            cols = [c.strip() for c in line.split("|")]
            cols = [c for c in cols if c]  # remove empty
            if len(cols) >= 2:
                key = cols[0].strip()
                val = cols[1].strip()
                # Skip header/separator rows and section headers
                if key.startswith("-") or not val or val.startswith("-"):
                    continue
                if key in ("Model", "Camera", "Electrical feature", "Mechanical",
                           "General", "Optical", "Communication", "Function"):
                    continue
                # Clean up spec value — take first column value only
                if val and len(val) > 2:
                    specs[key] = val[:200]

    # Limit specs to 20 most important
    if len(specs) > 20:
        important_keys = [
            "Sensor type", "Sensor model", "Resolution", "Max. frame rate",
            "Pixel size", "Sensor size", "Pixel format", "Lens mount",
            "Data interface", "Power supply", "Power consumption",
            "Working temperature", "Weight", "Dimension", "Dynamic range",
            "SNR", "Gain", "Exposure time", "Image buffer", "Digital I/O",
        ]
        trimmed = {}
        for k in important_keys:
            if k in specs:
                trimmed[k] = specs[k]
        # Fill remaining from other specs
        for k, v in specs.items():
            if k not in trimmed and len(trimmed) < 20:
                trimmed[k] = v
        specs = trimmed

    return short_desc, intro, specs


def build_slug(model_name):
    """Create a URL-safe slug from a model name."""
    slug = model_name.lower().replace(" ", "-").replace("_", "-")
    slug = re.sub(r"[^a-z0-9-]", "", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug


def build_image_path(category_dir, model_name):
    """Build the local image path relative to public/."""
    cat_slug = category_dir.lower().replace(" ", "-")
    png_path = f"/hikrobot/{cat_slug}/{model_name}.png"
    abs_path = f"/home/zlatko/CRM/VB/frontend/public{png_path}"
    if os.path.exists(abs_path):
        return png_path
    return None


def build_datasheet_path(category_dir, model_name):
    """Build the local datasheet path relative to public/."""
    cat_slug = category_dir.lower().replace(" ", "-")
    pdf_path = f"/hikrobot-datasheets/{cat_slug}/{model_name}.pdf"
    abs_path = f"/home/zlatko/CRM/VB/frontend/public{pdf_path}"
    if os.path.exists(abs_path):
        return pdf_path
    return None


def create_subcategories(dry_run=False):
    """Create Hikrobot subcategories under Machine Vision. Returns {slug: documentId}."""
    print("\n=== Creating subcategories under Machine Vision ===\n")
    cat_ids = {}

    for key, subcat in SUBCATEGORIES.items():
        if dry_run:
            print(f"  [DRY] Would create: {subcat['name']} ({subcat['slug']})")
            cat_ids[key] = f"dry-{key}"
            continue

        # Check if already exists
        existing = strapi_get("/categories", {
            "filters[slug][$eq]": subcat["slug"],
        })
        if existing and existing.get("data") and len(existing["data"]) > 0:
            doc_id = existing["data"][0]["documentId"]
            print(f"  EXISTS: {subcat['name']} (documentId={doc_id})")
            cat_ids[key] = doc_id
            continue

        result = strapi_request("POST", "/categories", {
            "name": subcat["name"],
            "slug": subcat["slug"],
            "icon": subcat["icon"],
            "description": subcat["description"],
            "parent": MACHINE_VISION_DOCUMENT_ID,
        })
        if result and result.get("data"):
            doc_id = result["data"]["documentId"]
            print(f"  CREATED: {subcat['name']} (documentId={doc_id})")
            cat_ids[key] = doc_id
        else:
            print(f"  FAILED: {subcat['name']}")

    return cat_ids


def seed_products(cat_ids, dry_run=False, limit=None):
    """Seed all Hikrobot products from organized exports."""
    print("\n=== Seeding Hikrobot products ===\n")

    # Build list of all products to seed
    products = []
    for dirname in sorted(os.listdir(EXPORTS_DIR)):
        dirpath = os.path.join(EXPORTS_DIR, dirname)
        if not os.path.isdir(dirpath):
            continue

        cat_key = dir_to_category_key(dirname)
        if cat_key is None:
            print(f"  WARNING: No subcategory mapping for '{dirname}', skipping")
            continue

        for model_name in sorted(os.listdir(dirpath)):
            model_path = os.path.join(dirpath, model_name)
            if not os.path.isdir(model_path):
                continue
            products.append((dirname, cat_key, model_name))

    print(f"Found {len(products)} products to seed")
    if limit:
        products = products[:limit]
        print(f"Limited to {limit} products")

    created = 0
    skipped = 0
    failed = 0

    for i, (dirname, cat_key, model_name) in enumerate(products):
        # Parse markdown specs
        short_desc_line, intro, specs = parse_markdown_specs(model_name)

        # Build image and datasheet paths
        image_path = build_image_path(dirname, model_name)
        datasheet_path = build_datasheet_path(dirname, model_name)

        # Add image/datasheet URLs to specs
        if image_path:
            specs["imageUrl"] = image_path
        if datasheet_path:
            specs["datasheetUrl"] = datasheet_path

        # Build product data
        slug = build_slug(model_name)
        short_desc = short_desc_line or intro or f"Hikrobot {model_name}"
        if len(short_desc) > 250:
            short_desc = short_desc[:247] + "..."

        product_data = {
            "name": model_name,
            "slug": slug,
            "sku": model_name,
            "shortDescription": short_desc,
            "specs": specs,
            "priceRange": "По запитване",
            "manufacturer": HIKROBOT_MFG_DOCUMENT_ID,
        }

        # Add description from intro if we have it
        if intro and intro != short_desc:
            product_data["description"] = intro

        # Add categories: subcategory + parent Machine Vision
        category_ids = []
        if cat_key in cat_ids:
            category_ids.append(cat_ids[cat_key])
        category_ids.append(MACHINE_VISION_DOCUMENT_ID)
        product_data["categories"] = category_ids

        if dry_run:
            if i < 3:  # Show first 3 as examples
                print(f"  [DRY] #{i+1}: {model_name} -> {cat_key}")
                print(f"         slug={slug}, specs={len(specs)} keys")
                print(f"         image={image_path is not None}, datasheet={datasheet_path is not None}")
            elif i == 3:
                print(f"  ... (showing first 3 of {len(products)})")
            created += 1
            continue

        # Create product via Strapi API
        result = strapi_request("POST", "/products", product_data)
        if result and result.get("data"):
            created += 1
            if created % 50 == 0:
                print(f"  Progress: {created} created, {skipped} skipped, {failed} failed")
        elif result is None:
            # Likely duplicate slug
            skipped += 1
        else:
            failed += 1

        # Throttle: pause after each batch
        if (i + 1) % BATCH_SIZE == 0:
            time.sleep(BATCH_PAUSE)

    print(f"\n=== Results ===")
    print(f"  Created: {created}")
    print(f"  Skipped (existing): {skipped}")
    print(f"  Failed: {failed}")
    print(f"  Total processed: {created + skipped + failed}")

    return created


def main():
    parser = argparse.ArgumentParser(description="Seed Hikrobot catalog into Strapi")
    parser.add_argument("--dry-run", action="store_true", help="Don't actually create anything")
    parser.add_argument("--limit", type=int, help="Limit number of products to seed")
    parser.add_argument("--categories-only", action="store_true", help="Only create subcategories")
    args = parser.parse_args()

    load_env_token()
    if not API_TOKEN:
        print("ERROR: STRAPI_API_TOKEN not found in env or .env file")
        sys.exit(1)

    print(f"Strapi URL: {STRAPI_URL}")
    print(f"Exports dir: {EXPORTS_DIR}")
    print(f"Markdown dir: {MARKDOWN_DIR}")
    if args.dry_run:
        print("*** DRY RUN MODE ***")

    # Step 1: Create subcategories
    cat_ids = create_subcategories(dry_run=args.dry_run)
    print(f"\nSubcategories: {len(cat_ids)} ready")

    if args.categories_only:
        print("\nDone (categories only).")
        return

    # Step 2: Seed products
    created = seed_products(cat_ids, dry_run=args.dry_run, limit=args.limit)

    print(f"\nDone! {created} products {'would be' if args.dry_run else ''} created.")


if __name__ == "__main__":
    main()
