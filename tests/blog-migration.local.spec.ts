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
