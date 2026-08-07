import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("@smoke shell exposes accessible responsive navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Sustaind home" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.getByRole("button", { name: "Open navigation" });
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
});

test("shell has no critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).disableRules(["landmark-one-main"]).analyze();
  expect(results.violations).toEqual([]);
});
