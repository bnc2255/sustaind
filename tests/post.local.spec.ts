import { expect, test } from "@playwright/test";

test("@smoke renders the representative local MDX post", async ({ page }) => {
  await page.goto("/post/carbon-credits-for-net-zero-targets-india");
  await expect(page).toHaveTitle(/Carbon Credits for Net Zero Targets India/);
  await expect(page.getByRole("heading", { name: "How Do Carbon Credits Help Companies Meet Their Net Zero Targets?", level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What Are Carbon Credits and Why Do They Matter for India?", level: 2 })).toBeVisible();
  await expect(page.getByAltText("How Do Carbon Credits Help Companies Meet Their Net Zero Targets?").first()).toBeVisible();
  await expect(page.getByAltText("Writer: Dolly Soni")).toBeVisible();
  await expect(page.getByAltText("Writer: Dolly Soni")).toHaveAttribute("src", /0446e3-aa65c2c7/);
  await expect(page.getByText("By Dolly Soni")).toBeVisible();
});

test("unknown MDX post paths return not found", async ({ page }) => {
  const response = await page.goto("/post/not-a-real-post");
  expect(response?.status()).toBe(404);
});
