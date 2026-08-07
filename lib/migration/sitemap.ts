export const CANONICAL_ORIGIN = "https://www.sustaind.in";

export type SitemapKind = "index" | "urlset";
export type InventoryEntryType = "page" | "post" | "category";

export interface SitemapUrl {
  url: string;
  lastModified?: string;
}

export interface InventoryEntry extends SitemapUrl {
  pathname: string;
  type: InventoryEntryType;
  sourceSitemap: string;
  localRoute: string;
}

export interface UrlInventory {
  generatedAt: string;
  source: string;
  entries: InventoryEntry[];
  counts: Record<InventoryEntryType, number>;
}

function decodeXml(value: string): string {
  return value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function textIn(element: string, tag: "loc" | "lastmod"): string | undefined {
  const match = element.match(new RegExp(`<${tag}\\b[^>]*>\\s*([^<]+?)\\s*</${tag}>`, "i"));
  return match ? decodeXml(match[1].trim()) : undefined;
}

export function parseSitemap(xml: string): { kind: SitemapKind; entries: SitemapUrl[] } {
  const root = xml.match(/<\s*(sitemapindex|urlset)\b/i)?.[1]?.toLowerCase();
  if (root !== "sitemapindex" && root !== "urlset") {
    throw new Error("Sitemap must have a sitemapindex or urlset root element.");
  }

  const elementName = root === "sitemapindex" ? "sitemap" : "url";
  const elements = [...xml.matchAll(new RegExp(`<${elementName}\\b[^>]*>([\\s\\S]*?)</${elementName}>`, "gi"))];
  const entries = elements.map((match) => {
    const url = textIn(match[1], "loc");
    if (!url) throw new Error(`A <${elementName}> entry is missing <loc>.`);
    return { url, lastModified: textIn(match[1], "lastmod") };
  });

  return { kind: root === "sitemapindex" ? "index" : "urlset", entries };
}

export function normalizeSourceUrl(value: string): URL {
  const url = new URL(value, CANONICAL_ORIGIN);
  if (url.protocol !== "https:" || url.hostname !== new URL(CANONICAL_ORIGIN).hostname) {
    throw new Error(`URL is outside the canonical source host: ${value}`);
  }
  url.hash = "";
  url.search = "";
  url.pathname = url.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
  return url;
}

export function classifyPathname(pathname: string): InventoryEntryType {
  if (pathname.startsWith("/post/")) return "post";
  if (pathname.startsWith("/blog/categories/")) return "category";
  return "page";
}

export function toLocalRoute(pathname: string): string {
  if (!pathname.startsWith("/") || pathname.includes("\\") || pathname.split("/").some((segment) => segment === "..")) {
    throw new Error(`Unsafe local route: ${pathname}`);
  }
  return pathname;
}

export function createInventoryEntry(sourceSitemap: string, entry: SitemapUrl): InventoryEntry {
  const url = normalizeSourceUrl(entry.url);
  const pathname = url.pathname;
  return {
    url: url.href,
    pathname,
    type: classifyPathname(pathname),
    sourceSitemap: normalizeSourceUrl(sourceSitemap).href,
    localRoute: toLocalRoute(pathname),
    ...(entry.lastModified ? { lastModified: entry.lastModified } : {}),
  };
}

export function createInventory(source: string, sitemapEntries: Array<{ sourceSitemap: string; entry: SitemapUrl }>): UrlInventory {
  const byPathname = new Map<string, InventoryEntry>();
  for (const item of sitemapEntries) {
    const entry = createInventoryEntry(item.sourceSitemap, item.entry);
    const existing = byPathname.get(entry.pathname);
    if (!existing || entry.sourceSitemap < existing.sourceSitemap) byPathname.set(entry.pathname, entry);
  }
  const entries = [...byPathname.values()].sort((a, b) => a.pathname.localeCompare(b.pathname));
  const counts: Record<InventoryEntryType, number> = { page: 0, post: 0, category: 0 };
  for (const entry of entries) counts[entry.type] += 1;
  return { generatedAt: new Date().toISOString(), source: normalizeSourceUrl(source).href, entries, counts };
}
