import { expect, test } from "@playwright/test";
import { CAPTURE_VIEWPORTS, captureName, capturePaths, captureReport } from "../lib/migration/capture";
import type { InventoryEntry } from "../lib/migration/sitemap";

const entry: InventoryEntry = { url: "https://www.sustaind.in/post/example", pathname: "/post/example", type: "post", sourceSitemap: "https://www.sustaind.in/blog-posts-sitemap.xml", localRoute: "/post/example" };

test("creates stable safe artifact paths and a partial-capture report", () => {
  expect(captureName("/")).toBe("home");
  expect(captureName("/blog/categories/Carbon Credits/")).toBe("blog-categories-carbon-credits");
  expect(capturePaths(entry, CAPTURE_VIEWPORTS[0])).toEqual({ screenshot: "screenshots/mobile/post-example.png", metadata: "metadata/post-example.json" });
  expect(captureReport([{ pathname: "/", viewport: "mobile", screenshot: "home.png", metadata: "home.json" }, { pathname: "/post/example", viewport: "desktop", screenshot: "post.png", metadata: "post.json", error: "HTTP 404" }])).toContain("Failed: 1");
});
