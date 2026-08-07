import { defineConfig, devices } from "@playwright/test";

const localBaseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
const sourceBaseUrl = process.env.SOURCE_SITE_URL ?? "https://www.sustaind.in";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "artifacts/playwright-report" }],
  ],
  outputDir: "artifacts/test-results",
  use: {
    baseURL: localBaseUrl,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "source-capture",
      testMatch: /.*\.source\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: sourceBaseUrl,
      },
    },
    {
      name: "local-chromium",
      testMatch: /.*\.local\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox-smoke",
      testMatch: /.*\.local\.spec\.ts/,
      grep: /@smoke/,
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit-smoke",
      testMatch: /.*\.local\.spec\.ts/,
      grep: /@smoke/,
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- --port 3100",
    url: localBaseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
