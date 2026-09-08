import { expect, test } from "@playwright/test";

test.describe("Contact Form & Serverless Email Route", () => {
  test("contact page exposes form fields and handles successful submission", async ({ page }) => {
    await page.route("/api/contact", async (route) => {
      const postData = route.request().postDataJSON();
      expect(postData.firstName).toBe("TestFirst");
      expect(postData.lastName).toBe("TestLast");
      expect(postData.email).toBe("test@example.com");
      expect(postData.message).toBe("This is a test message.");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Enquiry sent successfully." }),
      });
    });

    await page.goto("/contact-us");

    await page.fill('input[name="firstName"]', "TestFirst");
    await page.fill('input[name="lastName"]', "TestLast");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "+919876543210");
    await page.fill('input[name="organisation"]', "Test Org");
    await page.fill('textarea[name="message"]', "This is a test message.");

    await page.click('button[type="submit"]');

    const successMessage = page.locator(".contact-form__success");
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText("Thank you for getting in touch! Your enquiry has been sent successfully.");
  });

  test("contact page displays error message when API fails", async ({ page }) => {
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ success: false, error: "Custom test error message" }),
      });
    });

    await page.goto("/contact-us");

    await page.fill('input[name="firstName"]', "Jane");
    await page.fill('input[name="lastName"]', "Doe");
    await page.fill('input[name="email"]', "jane@example.com");
    await page.fill('textarea[name="message"]', "Need help with ESG");

    await page.click('button[type="submit"]');

    const errorMessage = page.locator(".contact-form__error");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Custom test error message");
  });

  test("api/contact rejects incomplete submissions with 400", async ({ request }) => {
    const response = await request.post("/api/contact", {
      data: {
        firstName: "Incomplete",
      },
    });

    expect(response.status()).toBe(400);
    const json = await response.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain("Please fill in all required fields");
  });
});
