import { createHash } from "node:crypto";

export const WIX_MEDIA_HOST = "static.wixstatic.com";

export function originalWixMediaUrl(value: string): string | null {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== WIX_MEDIA_HOST) return null;
  const match = url.pathname.match(/^\/media\/([^/]+)/);
  return match ? `https://${WIX_MEDIA_HOST}/media/${match[1]}` : null;
}

export function safeAssetStem(url: string): string {
  const filename = new URL(url).pathname.split("/").at(-1) ?? "asset";
  return filename.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "asset";
}

export function extensionForContentType(contentType: string, sourceUrl: string): string {
  const types: Record<string, string> = { "image/avif": "avif", "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif", "image/svg+xml": "svg" };
  return types[contentType.split(";")[0].toLowerCase()] ?? (new URL(sourceUrl).pathname.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() ?? "bin");
}

export function sha256(buffer: Uint8Array): string {
  return createHash("sha256").update(buffer).digest("hex");
}
