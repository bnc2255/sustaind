import { expect, test } from "@playwright/test";

test("@smoke source homepage is reachable", async ({ page }) => {
  const response = await page.goto("/", { waitUntil: "domcontentloaded" });

  expect(response, "The configured source URL did not return a response.").not.toBeNull();
  expect(response?.ok(), "The configured source URL did not return a successful response.").toBeTruthy();
  await expect(page.locator("body")).toBeVisible();
});
