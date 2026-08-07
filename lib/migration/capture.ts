import type { InventoryEntry } from "./sitemap";

export const CAPTURE_VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, isMobile: true },
  { name: "tablet", width: 768, height: 1024, isMobile: true },
  { name: "desktop", width: 1440, height: 900, isMobile: false },
] as const;

export type CaptureViewport = (typeof CAPTURE_VIEWPORTS)[number];

export interface CaptureResult {
  pathname: string;
  viewport: CaptureViewport["name"];
  screenshot: string;
  metadata: string;
  error?: string;
}

export function captureName(pathname: string): string {
  if (pathname === "/") return "home";
  return pathname.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

export function capturePaths(entry: InventoryEntry, viewport: CaptureViewport): { screenshot: string; metadata: string } {
  const name = captureName(entry.pathname);
  return {
    screenshot: `screenshots/${viewport.name}/${name}.png`,
    metadata: `metadata/${name}.json`,
  };
}

export function captureReport(results: CaptureResult[]): string {
  const failures = results.filter((result) => result.error);
  const routeNames = [...new Set(results.map((result) => result.pathname))];
  const completed = results.length - failures.length;
  return [
    "# Source capture report",
    "",
    `- Routes: ${routeNames.length}`,
    `- Viewport captures: ${results.length}`,
    `- Successful: ${completed}`,
    `- Failed: ${failures.length}`,
    "",
    "## Failures",
    failures.length ? failures.map(({ pathname, viewport, error }) => `- ${pathname} (${viewport}): ${error}`).join("\n") : "None.",
    "",
  ].join("\n");
}
