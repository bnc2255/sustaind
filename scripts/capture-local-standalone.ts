import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "@playwright/test";

const root = process.cwd();
const outputRoot = path.join(root, "artifacts", "local-standalone-capture");
const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";

const routes = [
  "/about-us",
  "/accessibility-statement",
  "/carbon-credit-service-consulting",
  "/climate-risk-assessment-consultants",
  "/contact-us",
  "/esg-advisory-service-consultants",
  "/esg-carbon-credit-and-sustainability-consulting-services",
  "/irfs-service-consultant",
  "/meet-the-team",
  "/privacy-policy",
  "/sustainability-service-consultants",
] as const;

const viewports = [
  { name: "mobile", width: 390, height: 844, isMobile: true },
  { name: "tablet", width: 768, height: 1024, isMobile: true },
  { name: "source-reference", width: 980, height: 1024, isMobile: false },
  { name: "desktop", width: 1440, height: 900, isMobile: false },
] as const;

async function settle(page: Page): Promise<void> {
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important;caret-color:transparent!important}" });
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight, 600);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, 0);

    const fonts = document.fonts?.ready ?? Promise.resolve();
    const images = Promise.all([...document.images].map((image) => image.complete
      ? undefined
      : new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        })));
    await Promise.race([Promise.all([fonts, images]), new Promise((resolve) => setTimeout(resolve, 5_000))]);
  });
  await page.waitForTimeout(250);
}

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const results: Array<{ route: string; viewport: string; screenshot: string; width: number; height: number }> = [];

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.isMobile,
        deviceScaleFactor: 1,
      });

      for (const route of routes) {
        const page = await context.newPage();
        const response = await page.goto(new URL(route, baseUrl).href, { waitUntil: "domcontentloaded" });
        if (!response?.ok()) throw new Error(`${route} returned HTTP ${response?.status() ?? "no response"}`);
        await settle(page);

        const name = route.slice(1);
        const relativePath = path.join("screenshots", viewport.name, `${name}.png`);
        const screenshotPath = path.join(outputRoot, relativePath);
        await mkdir(path.dirname(screenshotPath), { recursive: true });
        await page.screenshot({ path: screenshotPath, fullPage: true });
        const size = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }));
        results.push({ route, viewport: viewport.name, screenshot: relativePath.replaceAll("\\", "/"), ...size });
        console.log(`Captured ${route} (${viewport.name}) ${size.width}x${size.height}`);
        await page.close();
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  await mkdir(outputRoot, { recursive: true });
  await writeFile(path.join(outputRoot, "capture-results.json"), `${JSON.stringify(results, null, 2)}\n`);
}

void main();
