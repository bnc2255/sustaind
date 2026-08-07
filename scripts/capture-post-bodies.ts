import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

type Inventory = { entries: { pathname: string; type: string }[] };
type Block = { tag: string; text: string };
const root = process.cwd();
const sourceOrigin = process.env.SOURCE_SITE_URL ?? "https://www.sustaind.in";

async function main() {
  const inventory = JSON.parse(await readFile(path.join(root, "data/migration/url-inventory.json"), "utf8")) as Inventory;
  const slugs = inventory.entries.filter((entry) => entry.type === "post").map((entry) => entry.pathname.replace("/post/", ""));
  const browser = await chromium.launch();
  const records: Record<string, { blocks: Block[]; bodyText: string; error?: string }> = {};
  try {
    for (const slug of slugs) {
      const page = await browser.newPage();
      try {
        const response = await page.goto(`${sourceOrigin}/post/${slug}`, { waitUntil: "domcontentloaded", timeout: 30_000 });
        if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? "no response"}`);
        await page.waitForTimeout(1000);
        const extracted = await page.evaluate(() => {
          const root = document.querySelector("main") ?? document.body;
          const blocks = [...root.querySelectorAll("h1,h2,h3,h4,h5,h6,p,li")].map((element) => ({ tag: element.tagName.toLowerCase(), text: (element.textContent ?? "").replace(/\\s+/g, " ").trim() })).filter(({ text }) => text.length > 20);
          return { blocks, bodyText: (root.textContent ?? "").replace(/\\s+/g, " ").trim() };
        });
        records[slug] = extracted;
        console.log(`Captured ${slug}: ${extracted.blocks.length} blocks`);
      } catch (error) {
        records[slug] = { blocks: [], bodyText: "", error: error instanceof Error ? error.message : String(error) };
        console.log(`Failed ${slug}: ${records[slug].error}`);
      } finally { await page.close(); }
    }
  } finally { await browser.close(); }
  await mkdir(path.join(root, "data/migration"), { recursive: true });
  await writeFile(path.join(root, "data/migration/post-bodies.json"), `${JSON.stringify(records, null, 2)}\n`);
}
void main();
