import { readFile } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { CANONICAL_ORIGIN, createInventory, normalizeSourceUrl, parseSitemap, toLocalRoute } from "../lib/migration/sitemap";

const fixture = (name: string) => readFile(path.join(process.cwd(), "tests", "fixtures", name), "utf8");

test("parses sitemap fixtures and classifies canonical local routes", async () => {
  const index = parseSitemap(await fixture("sitemap-index.xml"));
  const urls = parseSitemap(await fixture("sitemap-urlset.xml"));
  expect(index.kind).toBe("index");
  expect(index.entries).toHaveLength(2);
  expect(urls.kind).toBe("urlset");

  const inventory = createInventory(`${CANONICAL_ORIGIN}/sitemap.xml`, urls.entries.map((entry) => ({ sourceSitemap: index.entries[0].url, entry })));
  expect(inventory.counts).toEqual({ page: 2, post: 1, category: 1 });
  expect(inventory.entries.map(({ localRoute }) => localRoute)).toEqual(["/", "/blog", "/blog/categories/example", "/post/example"]);
});

test("normalizes duplicates and rejects malformed or unsafe source paths", () => {
  expect(normalizeSourceUrl("https://www.sustaind.in/blog/?source=sitemap#section").pathname).toBe("/blog");
  expect(() => parseSitemap("<not-a-sitemap />")).toThrow("sitemapindex or urlset");
  expect(() => parseSitemap("<urlset><url></url></urlset>")).toThrow("missing <loc>");
  expect(() => normalizeSourceUrl("https://example.com/post/not-ours")).toThrow("outside the canonical source host");
  expect(() => toLocalRoute("/post/../escape")).toThrow("Unsafe local route");
});
