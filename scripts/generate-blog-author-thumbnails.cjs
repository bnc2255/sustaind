/* eslint-disable @typescript-eslint/no-require-imports -- This standalone CommonJS utility runs directly with Node. */
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const authors = [
  {
    source: "0446e3-aa65c2c7ac844b87b4830267f0ccbd61-mv2-png-a56d11681495.png",
    output: "blog-author-dolly-soni.webp",
  },
  {
    source: "0446e3-ceb7fd633c2a4f26992c4fdb5567f08b-mv2-png-3571c19eeef0.png",
    output: "blog-author-harsh-ballyan.webp",
  },
];

async function main() {
  for (const author of authors) {
    await sharp(path.join(root, "public", "assets", author.source))
      .resize(256, 256, { fit: "cover", position: "top" })
      .webp({ quality: 82 })
      .toFile(path.join(root, "public", "assets", author.output));
    console.log(`Generated ${author.output}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
