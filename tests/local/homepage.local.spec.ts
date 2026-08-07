import { expect, test } from "@playwright/test";

test("@smoke local homepage is reachable", async ({ page }) => {
  const response = await page.goto("/", { waitUntil: "domcontentloaded" });

  expect(response, "The local production server did not return a response.").not.toBeNull();
  expect(response?.ok(), "The local production server did not return a successful response.").toBeTruthy();
  await expect(page.locator("body")).toBeVisible();
});
