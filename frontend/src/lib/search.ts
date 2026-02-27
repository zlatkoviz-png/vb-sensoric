import { MeiliSearch } from "meilisearch";

const MEILISEARCH_URL =
  process.env.NEXT_PUBLIC_MEILISEARCH_URL || "http://localhost:7700";
const MEILISEARCH_KEY =
  process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY || "";

export const searchClient = new MeiliSearch({
  host: MEILISEARCH_URL,
  apiKey: MEILISEARCH_KEY,
});

export async function searchProducts(query: string, options?: {
  limit?: number;
  offset?: number;
  filter?: string[];
}) {
  const index = searchClient.index("products");
  return index.search(query, {
    limit: options?.limit || 20,
    offset: options?.offset || 0,
    filter: options?.filter,
    attributesToHighlight: ["name", "sku", "description"],
  });
}
