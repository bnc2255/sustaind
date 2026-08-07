import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CANONICAL_ORIGIN, createInventory, parseSitemap } from "../lib/migration/sitemap";

const sitemapIndexUrl = process.env.SITEMAP_URL ?? `${CANONICAL_ORIGIN}/sitemap.xml`;
const outputPath = path.resolve(process.cwd(), "data/migration/url-inventory.json");

async function fetchXml(url: string): Promise<string> {
  const response = await fetch(url, { headers: { "User-Agent": "sustaind-migration-inventory/1.0" } });
  if (!response.ok) throw new Error(`Unable to fetch ${url}: ${response.status} ${response.statusText}`);
  return response.text();
}

async function main(): Promise<void> {
  const index = parseSitemap(await fetchXml(sitemapIndexUrl));
  if (index.kind !== "index") throw new Error("Expected the configured sitemap URL to be a sitemap index.");
  const childMaps = await Promise.all(index.entries.map(async ({ url }) => ({ url, parsed: parseSitemap(await fetchXml(url)) })));
  const inventory = createInventory(sitemapIndexUrl, childMaps.flatMap(({ url, parsed }) => {
    if (parsed.kind !== "urlset") throw new Error(`Expected ${url} to be a URL sitemap.`);
    return parsed.entries.map((entry) => ({ sourceSitemap: url, entry }));
  }));
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(inventory, null, 2)}\n`);
  console.log(`Wrote ${inventory.entries.length} URLs to ${path.relative(process.cwd(), outputPath)}.`);
  console.table(inventory.counts);
}

void main();
