import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "@playwright/test";
import { CAPTURE_VIEWPORTS, capturePaths, captureReport, type CaptureResult } from "../lib/migration/capture";
import type { InventoryEntry, UrlInventory } from "../lib/migration/sitemap";

const root = process.cwd();
const outputRoot = path.join(root, "artifacts", "capture");
const sourceOrigin = process.env.SOURCE_SITE_URL ?? "https://www.sustaind.in";
const timeout = Number(process.env.CAPTURE_TIMEOUT_MS ?? 30_000);

async function settle(page: Page): Promise<void> {
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important;caret-color:transparent!important}" });
  await page.evaluate(async () => {
    const fontSettlement = document.fonts?.ready ?? Promise.resolve();
    const imageSettlement = Promise.all([...document.images].map((image) => image.complete ? undefined : new Promise<void>((resolve) => { image.addEventListener("load", () => resolve(), { once: true }); image.addEventListener("error", () => resolve(), { once: true }); })));
    await Promise.race([Promise.all([fontSettlement, imageSettlement]), new Promise((resolve) => setTimeout(resolve, 5_000))]);
  });
  await page.waitForTimeout(250);
}

async function extractMetadata(page: Page, entry: InventoryEntry) {
  return page.evaluate(({ entry, sourceOrigin }) => ({
    sourceUrl: new URL(entry.pathname, sourceOrigin).href,
    capturedAt: new Date().toISOString(),
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? null,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((heading) => ({ level: heading.tagName.toLowerCase(), text: (heading.textContent ?? "").replace(/\s+/g, " ").trim() })).filter(({ text }) => text),
    links: [...new Set([...document.links].map((link) => link.href))],
    images: [...document.images].map((image) => ({ src: image.currentSrc || image.src, alt: image.alt, width: image.naturalWidth, height: image.naturalHeight })).filter(({ src }) => src),
    structuredData: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => script.textContent).filter(Boolean),
    interactiveCandidates: [...document.querySelectorAll("button, summary, input, select, textarea, [role=button], [role=tab], [role=slider]")].map((element) => ({ tag: element.tagName.toLowerCase(), role: element.getAttribute("role"), text: (element.textContent ?? "").replace(/\s+/g, " ").trim(), ariaLabel: element.getAttribute("aria-label") })).filter((candidate) => candidate.text || candidate.ariaLabel),
  }), { entry, sourceOrigin });
}

async function captureEntry(entry: InventoryEntry, viewport: (typeof CAPTURE_VIEWPORTS)[number]): Promise<CaptureResult> {
  const paths = capturePaths(entry, viewport);
  const screenshotPath = path.join(outputRoot, paths.screenshot);
  const metadataPath = path.join(outputRoot, paths.metadata);
  await mkdir(path.dirname(screenshotPath), { recursive: true });
  await mkdir(path.dirname(metadataPath), { recursive: true });
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.isMobile, deviceScaleFactor: 1 });
    const page = await context.newPage();
    page.setDefaultTimeout(timeout);
    const target = new URL(entry.pathname, sourceOrigin).href;
    let failure: Error | undefined;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await page.goto(target, { waitUntil: "domcontentloaded", timeout });
        if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? "no response"}`);
        await settle(page);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await writeFile(metadataPath, `${JSON.stringify(await extractMetadata(page, entry), null, 2)}\n`);
        await context.close();
        return { pathname: entry.pathname, viewport: viewport.name, screenshot: paths.screenshot, metadata: paths.metadata };
      } catch (error) {
        failure = error instanceof Error ? error : new Error(String(error));
        if (attempt === 0) await page.waitForTimeout(500);
      }
    }
    await context.close();
    return { pathname: entry.pathname, viewport: viewport.name, screenshot: paths.screenshot, metadata: paths.metadata, error: failure?.message ?? "Unknown failure" };
  } finally {
    await browser.close();
  }
}

async function main(): Promise<void> {
  const inventory: UrlInventory = JSON.parse(await readFile(path.join(root, "data", "migration", "url-inventory.json"), "utf8"));
  const results: CaptureResult[] = [];
  for (const entry of inventory.entries) {
    for (const viewport of CAPTURE_VIEWPORTS) {
      const result = await captureEntry(entry, viewport);
      results.push(result);
      console.log(`${result.error ? "FAILED" : "Captured"} ${entry.pathname} (${viewport.name})${result.error ? `: ${result.error}` : ""}`);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  await mkdir(outputRoot, { recursive: true });
  await writeFile(path.join(outputRoot, "capture-results.json"), `${JSON.stringify(results, null, 2)}\n`);
  await writeFile(path.join(outputRoot, "report.md"), captureReport(results));
  if (results.some((result) => result.error)) process.exitCode = 1;
}

void main();
