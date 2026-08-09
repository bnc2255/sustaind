import { expect, test } from "@playwright/test";
import inventory from "../data/migration/url-inventory.json";

test("@smoke all migrated post and category routes resolve", async ({ request }) => {
  const routes = inventory.entries.filter((entry) => entry.type === "post" || entry.type === "category");
  expect(routes).toHaveLength(25);
  for (const route of routes) {
    const response = await request.get(`http://127.0.0.1:3100${route.localRoute}`);
    expect(response.ok(), route.localRoute).toBeTruthy();
  }
});

test("all migrated post routes return successful responses", async ({ request }) => {
  const posts = inventory.entries.filter((entry) => entry.type === "post");
  expect(posts).toHaveLength(18);
  for (const route of posts) {
    const response = await request.get(`http://127.0.0.1:3100${route.localRoute}`);
    expect(response.ok(), route.localRoute).toBeTruthy();
  }
});
test("empty duplicate IFRS category is intentional", async ({ page }) => {
  await page.goto("/blog/categories/ifrs-service-1");
  await expect(page.getByRole("heading", { name: "IFRS Service" })).toBeVisible();
  await expect(page.getByText("No posts are currently published in this category.")).toBeVisible();
});



test("blog archive renders the complete 18-post catalogue", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.locator(".blog-grid")).toHaveAttribute("data-post-count", "18");
  await expect(page.locator(".blog-grid .blog-card")).toHaveCount(18);
  await expect(page.getByRole("navigation", { name: "Blog categories" })).toBeVisible();
});

test("homepage carousel exposes every captured post exactly once", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const carousel = page.locator(".blog-carousel");
  const seen = new Set<string>();
  for (let index = 0; index < 9; index += 1) {
    for (const href of await carousel.locator(".blog-card__link").evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""))) seen.add(href);
    if (index < 8) await carousel.getByRole("button", { name: "Next blog page" }).click();
  }
  expect(seen.size).toBe(18);
  expect([...seen].every((href) => href.startsWith("/post/"))).toBeTruthy();
  await expect(carousel.getByRole("button", { name: "Next blog page" })).toBeDisabled();
});

test("all post pages load their images without horizontal overflow", async ({ page }) => {
  test.setTimeout(120_000);
  const posts = inventory.entries.filter((entry) => entry.type === "post");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of posts) {
    await page.goto(route.localRoute);
    await page.evaluate(async () => {
      const pause = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
      const step = Math.max(Math.floor(window.innerHeight * 0.75), 200);
      for (let iteration = 0; iteration < 100; iteration += 1) {
        const before = window.scrollY;
        window.scrollBy(0, step);
        await pause(25);
        if (window.scrollY === before && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) break;
      }
    });
    const state = await page.evaluate(async () => {
      const images = Array.from(document.images);
      for (const image of images) image.loading = "eager";
      for (const image of images) {
        image.scrollIntoView({ block: "center" });
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      await Promise.race([
        Promise.allSettled(images.map((image) => image.decode())),
        new Promise((resolve) => setTimeout(resolve, 5_000)),
      ]);
      return {
        width: document.documentElement.scrollWidth,
        incomplete: images.filter((image) => !image.complete).map((image) => image.currentSrc || image.src),
        broken: images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
      };
    });
    expect(state.width, route.localRoute).toBeLessThanOrEqual(390);
    expect(state.incomplete, `${route.localRoute} incomplete images`).toEqual([]);
    expect(state.broken, `${route.localRoute} broken images`).toEqual([]);
  }
});
