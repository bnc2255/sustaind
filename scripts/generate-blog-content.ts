import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type Meta = { sourceUrl: string; title: string; description: string; canonical: string; headings: { level: string; text: string }[]; images: { src: string; alt: string }[]; structuredData: string[] };
type Asset = { sourceUrl: string; localPath: string; width: number; height: number; altTexts: string[]; usages: string[] };
type Body = { blocks: { tag: string; text: string }[]; bodyText: string; error?: string };
type Inventory = { entries: { pathname: string; type: string; lastModified?: string }[] };
const root = process.cwd();
const categoryMap: Record<string, string[]> = {
  "carbon-credits": ["verra-or-gold-standard-choosing-the-right-registry-for-your-carbon-project", "what-is-esg-scoreand-how-it-is-calculated"],
  "climate-risk-assessment": ["climate-risk-assessment-for-businesses-in-india", "climate-risk-assessment-service-consulting-in-gurugram"],
  "esg-advisory": ["the-future-of-agri-esg-scaling-carbon-credits-in-saudi-arabias-agriculture-sector", "esg-advisory-services-for-indian-companies"],
  "ifrs-service": ["ifrs-sustainability-standards-compliance-in-india", "ifrs-s1-s2-sustainability-disclosure-india"],
  "ifrs-service-1": [],
  "sustainability-service": ["how-to-buy-carbon-credits-in-india", "carbon-credits-for-net-zero-targets-india"],
  "sustaind-consulting": ["sustainability-reporting-frameworks-india-2026", "sustainability-consulting-for-smes-in-india"],
};
const categoryNames: Record<string, string> = { "carbon-credits": "Carbon Credits", "climate-risk-assessment": "Climate Risk Assessment", "esg-advisory": "ESG Advisory", "ifrs-service": "IFRS Service", "ifrs-service-1": "IFRS Service", "sustainability-service": "Sustainability Service", "sustaind-consulting": "Sustaind Consulting" };
function original(value: string) { const match = value.match(/^https:\/\/static\.wixstatic\.com\/media\/([^/]+)/); return match ? `https://static.wixstatic.com/media/${match[1]}` : value; }
function jsonLd(meta: Meta, type: string) { for (const raw of meta.structuredData) { try { const value = JSON.parse(raw.replace(/&#010;/g, "\\n")); if (value["@type"] === type) return value as Record<string, unknown>; } catch { /* captured source can contain non-JSON entities */ } } return undefined; }
function clean(value: string) { return value.replace(/\\s+/g, " ").replace(/\u0000/g, "").trim(); }
function authorThumbnail(author: string, fallback: string) {
  if (author === "Dolly Soni") return "/assets/blog-author-dolly-soni.webp";
  if (author === "Harsh Ballyan") return "/assets/blog-author-harsh-ballyan.webp";
  return fallback;
}
function escapeMdx(value: string) { return value.replace(/\{/g, "\\{").replace(/\}/g, "\\}"); }
async function main() {
  const inventory = JSON.parse(await readFile(path.join(root, "data/migration/url-inventory.json"), "utf8")) as Inventory;
  const bodies = JSON.parse(await readFile(path.join(root, "data/migration/post-bodies.json"), "utf8")) as Record<string, Body>;
  const assets = (JSON.parse(await readFile(path.join(root, "data/migration/asset-manifest.json"), "utf8")) as { assets: Asset[] }).assets;
  const records: Record<string, unknown> = {};
  const posts = inventory.entries.filter((entry) => entry.type === "post");
  for (const entry of posts) {
    const slug = entry.pathname.replace("/post/", "");
    const meta = JSON.parse(await readFile(path.join(root, "artifacts/capture/metadata", `post-${slug}.json`), "utf8")) as Meta;
    const blogPosting = jsonLd(meta, "BlogPosting") ?? {};
    const heroSource = meta.images.map((image) => original(image.src)).find((source) => assets.some((asset) => asset.sourceUrl === source && asset.usages.includes(meta.sourceUrl) && asset.width >= 900 && asset.height >= 400 && asset.height <= 800));
    const hero = assets.find((asset) => asset.sourceUrl === heroSource) ?? assets.find((asset) => asset.usages.includes(meta.sourceUrl) && asset.width >= 900 && asset.height >= 400 && asset.height <= 800);
    if (!hero) throw new Error(`No local hero asset found for ${slug}`);
    const author = typeof blogPosting.author === "object" && blogPosting.author && "name" in blogPosting.author ? String(blogPosting.author.name) : "Sustaind";
    const authorAsset = meta.images.map((image) => original(image.src)).map((source) => assets.find((asset) => asset.sourceUrl === source && asset.usages.includes(meta.sourceUrl) && asset.altTexts.some((alt) => alt.trim().toLowerCase() === `writer: ${author}`.toLowerCase()))).find((asset): asset is Asset => Boolean(asset));
    if (!authorAsset) throw new Error(`No author portrait found for ${slug} (${author})`);
    const publishedAt = typeof blogPosting.datePublished === "string" ? blogPosting.datePublished : `${entry.lastModified ?? "2026-01-01"}T00:00:00.000Z`;
    const modifiedAt = typeof blogPosting.dateModified === "string" ? blogPosting.dateModified : publishedAt;
    const categorySlugs = Object.entries(categoryMap).filter(([, slugs]) => slugs.includes(slug)).map(([category]) => category);
    const heading = meta.headings.find((item) => item.level === "h1")?.text || meta.title;
    records[slug] = { slug, title: clean(meta.title), heading: clean(heading), description: clean(meta.description), author, authorImage: authorThumbnail(author, authorAsset.localPath), authorAlt: clean(authorAsset.altTexts.find((alt) => alt.toLowerCase().startsWith("writer:")) || `Writer: ${author}`), category: categorySlugs[0] ? categoryNames[categorySlugs[0]] : "Sustaind Consulting", categorySlugs, publishedAt, modifiedAt, canonicalPath: `/post/${slug}`, heroImage: hero.localPath, heroAlt: clean(hero.altTexts[0] || heading) };
    if (slug === "carbon-credits-for-net-zero-targets-india") continue;
    const body = bodies[slug];
    if (!body || body.error) throw new Error(`Missing captured body for ${slug}`);
    const inline = meta.images.map((item) => original(item.src)).map((source) => assets.find((asset) => asset.sourceUrl === source && asset.usages.includes(meta.sourceUrl))).filter((asset): asset is Asset => Boolean(asset)).filter((asset) => asset.localPath !== hero.localPath && asset.localPath !== authorAsset.localPath && asset.width > 300 && !asset.altTexts.some((alt) => /^(writer:|sccc)/i.test(alt.trim())));
    const lines = [`import Image from "next/image"`, ""];
    let inlineIndex = 0;
    const addInlineImage = () => {
      const asset = inline[inlineIndex++];
      if (!asset) return;
      lines.push(`<Image src="${asset.localPath}" alt="${clean(asset.altTexts[0] || heading)}" width={${asset.width}} height={${asset.height}} />`, "");
    };
    for (const block of body.blocks) {
      const text = escapeMdx(clean(block.text));
      if (!text || text === heading || text === clean(meta.title)) continue;
      if (/^h[2-6]$/.test(block.tag)) {
        lines.push(`${"#".repeat(Number(block.tag.slice(1)))} ${text}`, "");
        addInlineImage();
      } else if (block.tag === "li") lines.push(`- ${text}`);
      else lines.push(text, "");
    }
    while (inlineIndex < inline.length) addInlineImage();
    await writeFile(path.join(root, "content", `${slug}.mdx`), `${lines.join("\n")}\n`);
  }
  const registry = `export interface PostMetadata {\n  slug: string; title: string; heading: string; description: string; author: string; authorImage: string; authorAlt: string; category: string; categorySlugs: string[]; publishedAt: string; modifiedAt: string; canonicalPath: string; heroImage: string; heroAlt: string;\n}\n\nexport const posts = ${JSON.stringify(records, null, 2)} satisfies Record<string, PostMetadata>;\n\nexport type PostSlug = keyof typeof posts;\nexport function getPost(slug: string): PostMetadata | undefined { return posts[slug as PostSlug]; }\nexport function validatePosts(): void { const seen = new Set<string>(); for (const post of Object.values(posts)) { if (seen.has(post.slug)) throw new Error(\`Duplicate post slug: \${post.slug}\`); if (post.canonicalPath !== \`/post/\${post.slug}\`) throw new Error(\`Invalid canonical path for \${post.slug}\`); if (!post.title || !post.heading || !post.description || !post.author || !post.authorImage || !post.authorAlt || !post.heroImage) throw new Error(\`Missing required metadata for \${post.slug}\`); seen.add(post.slug); } }\nvalidatePosts();\n`;
  await writeFile(path.join(root, "content/posts.ts"), registry);
  await writeFile(path.join(root, "data/migration/blog-category-map.json"), `${JSON.stringify({ categories: Object.fromEntries(Object.entries(categoryMap).map(([slug, postSlugs]) => [slug, { slug, name: categoryNames[slug], postSlugs }])) }, null, 2)}\n`);
  console.log(`Generated ${posts.length} post records and ${posts.length - 1} MDX files; preserved the representative hand-authored MDX.`);
}
void main();
