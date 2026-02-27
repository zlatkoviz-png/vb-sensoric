# VB Sensoric

Industrial sensors and vision systems distributor website.

## Architecture

| Service | Container | Port | Tech |
|---------|-----------|------|------|
| Frontend | vb-frontend | 8200 | Next.js 14 + Tailwind CSS |
| CMS | vb-cms | 8201 | Strapi (headless) |
| Database | vb-db | 5432 (internal) | PostgreSQL 16 |
| Search | vb-search | 8202 | Meilisearch |

## Quick Start

```bash
cd ~/CRM/VB
docker compose up -d --build
```

- Frontend: http://192.168.3.90:8200
- Strapi Admin: http://192.168.3.90:8201/admin
- Meilisearch: http://192.168.3.90:8202

## Project Structure

```
VB/
├── docker-compose.yml
├── .env
├── frontend/           # Next.js app
│   ├── src/
│   │   ├── app/        # Pages (App Router)
│   │   ├── components/ # React components
│   │   ├── lib/        # Utilities (Strapi client, search, etc.)
│   │   └── styles/     # Global CSS
│   └── Dockerfile
├── cms/                # Strapi CMS
│   ├── src/
│   ├── config/
│   └── Dockerfile
└── README.md
```

## Design

SCADA/HMI-inspired dark theme with:
- Dark background (#0A0E1A)
- Electric blue (#00B4D8) accents
- Neon green (#00E676) status indicators
- JetBrains Mono for technical data
- Grid/dot-matrix background patterns
- Glow effects on interactive elements
