import { expect, test } from "@playwright/test";
import { extensionForContentType, originalWixMediaUrl, safeAssetStem, sha256 } from "../lib/migration/assets";

test("normalizes only Wix media URLs into safe local asset identities", () => {
  const transformed = "https://static.wixstatic.com/media/abc_123~mv2.png/v1/fill/w_100,h_100,enc_avif/example.png";
  expect(originalWixMediaUrl(transformed)).toBe("https://static.wixstatic.com/media/abc_123~mv2.png");
  expect(originalWixMediaUrl("https://example.com/image.png")).toBeNull();
  expect(safeAssetStem("https://static.wixstatic.com/media/abc_123~mv2.png")).toBe("abc-123-mv2-png");
  expect(extensionForContentType("image/avif", transformed)).toBe("avif");
  expect(sha256(Buffer.from("asset"))).toHaveLength(64);
});
