import { expect, test } from "@playwright/test";

test("@smoke homepage exposes the benchmark sections and local imagery", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Sustainability, ESG Advisory/ })).toBeVisible();
  await expect(page.getByRole("region", { name: "Frameworks and standards" })).toBeVisible();
  await expect(page.getByText("Our Approach", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Frequently asked questions" })).toBeVisible();
  expect(await page.locator("main img").count()).toBeGreaterThanOrEqual(7);
});

test("homepage FAQ filters and article controls work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Carbon Credits" }).click();
  await expect(page.getByText("When should a business use carbon credits?")).toBeVisible();
  await page.getByRole("tab", { name: "All" }).click();
  await page.getByRole("textbox", { name: "Search questions" }).fill("reporting");
  await expect(page.getByText("Which reporting frameworks do you support?")).toBeVisible();
  await page.getByRole("button", { name: "Next articles" }).click();
  await expect(page.getByText("How Do Carbon Credits Help Companies Meet Their Net Zero Targets?")).toBeVisible();
});
