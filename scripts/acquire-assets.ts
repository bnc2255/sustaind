import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { imageSize } from "image-size";
import { extensionForContentType, originalWixMediaUrl, safeAssetStem, sha256 } from "../lib/migration/assets";

type Captured = { sourceUrl: string; images: { src: string; alt: string }[] };
type Candidate = { sourceUrl: string; usages: string[]; altTexts: string[] };
const root = process.cwd(); const metadataDir = path.join(root, "artifacts", "capture", "metadata"); const assetsDir = path.join(root, "public", "assets");

async function main() {
  const candidates = new Map<string, Candidate>();
  for (const file of await readdir(metadataDir)) {
    const record = JSON.parse(await readFile(path.join(metadataDir, file), "utf8")) as Captured;
    for (const image of record.images) {
      const sourceUrl = originalWixMediaUrl(image.src); if (!sourceUrl) continue;
      const candidate = candidates.get(sourceUrl) ?? { sourceUrl, usages: [], altTexts: [] };
      candidate.usages.push(record.sourceUrl); if (image.alt) candidate.altTexts.push(image.alt); candidates.set(sourceUrl, candidate);
    }
  }
  await mkdir(assetsDir, { recursive: true }); const hashes = new Map<string, string>(); const assets: unknown[] = []; const failures: unknown[] = [];
  for (const candidate of candidates.values()) {
    try {
      const response = await fetch(candidate.sourceUrl); const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok) throw new Error(`HTTP ${response.status}`); if (!contentType.startsWith("image/")) throw new Error(`Invalid MIME type ${contentType}`);
      const buffer = Buffer.from(await response.arrayBuffer()); const hash = sha256(buffer); const existing = hashes.get(hash);
      const extension = extensionForContentType(contentType, candidate.sourceUrl); const localPath = existing ?? `/assets/${safeAssetStem(candidate.sourceUrl)}-${hash.slice(0, 12)}.${extension}`;
      if (!existing) await writeFile(path.join(root, "public", localPath), buffer); hashes.set(hash, localPath);
      const dimensions = imageSize(buffer); assets.push({ ...candidate, usages: [...new Set(candidate.usages)].sort(), altTexts: [...new Set(candidate.altTexts)].sort(), localPath, contentType: contentType.split(";")[0], hash, width: dimensions.width, height: dimensions.height, duplicateOf: existing ?? null });
    } catch (error) { failures.push({ sourceUrl: candidate.sourceUrl, error: error instanceof Error ? error.message : String(error) }); }
  }
  const manifest = { generatedAt: new Date().toISOString(), sourceCount: candidates.size, assets, failures };
  await mkdir(path.join(root, "data", "migration"), { recursive: true }); await writeFile(path.join(root, "data", "migration", "asset-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Saved ${assets.length} source mappings to ${hashes.size} local files; ${failures.length} failures.`); if (failures.length) process.exitCode = 1;
}
void main();
