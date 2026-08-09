<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Sustaind clone agent guide

## Mission and current baseline

This repository is a fidelity-first local reconstruction of the captured `sustaind.in` Wix site. The current migration implements all **38 source-sitemap routes** in `data/migration/url-inventory.json`:

- 13 page routes, including the homepage, blog archive, service, company, contact, and legal pages.
- 18 article routes under `/post/[slug]`.
- 7 category routes under `/blog/categories/[slug]`.

The blog migration is complete: all 18 captured articles, local media, category routes, full post structure, a source-style homepage carousel, the complete archive, and responsive layouts are implemented. Wix-only comments, likes, view counters, and cookie widgets are intentionally excluded.

The most recently verified state passed TypeScript, ESLint, a Next.js production build, and the focused eight-test blog/post Playwright suite. Responsive review captures at 390, 768, and 1440 px had no incomplete or broken images and no mobile overflow.

## Source-of-truth hierarchy

Use evidence in this order:

1. **Captured source evidence:**
   - `data/migration/url-inventory.json`
   - `artifacts/capture/metadata/*.json`
   - `artifacts/capture/screenshots/{mobile,tablet,desktop}/*.png`
   - `data/migration/post-bodies.json`
   - `data/migration/asset-manifest.json`
2. **Current runtime content and implementation:** `content/`, `app/`, `components/`, and `public/assets/`.
3. **The live source site:** consult or recapture it only when the user explicitly requests a refresh. The live site may have drifted from the accepted captured baseline.

Do not invent missing copy, taxonomy, assets, interactions, or visual details. Preserve captured spelling, duplication, dates, and route oddities unless the user explicitly approves a correction.

## Technology and architecture

- Next.js 16.3.0 App Router and React 19.2.8.
- TypeScript with strict checking and the `@/*` root alias.
- Local MDX through `@next/mdx`; `mdx-components.tsx` is required by Next.js.
- Local images served from `public/assets/` through `/assets/...` paths.
- Shared global styling in `app/globals.css`.
- Playwright for source capture, route smoke tests, accessibility checks, and responsive validation.
- Production mode is `next build` plus `next start`; `output: "export"` is not configured.

Important locations:

| Concern | Location |
| --- | --- |
| Global shell and metadata | `app/layout.tsx` |
| Homepage | `app/page.tsx` |
| Blog archive | `app/blog/page.tsx` |
| Category template | `app/blog/categories/[slug]/page.tsx` |
| Post template | `app/post/[slug]/page.tsx` |
| Shared blog cards/carousel/nav | `components/blog-ui.tsx` |
| Shared standalone page templates | `components/standalone-pages.tsx` |
| Header/footer/form | `components/site-header.tsx`, `components/site-footer.tsx`, `components/contact-form.tsx` |
| Post registry/order/helpers | `content/posts.ts` |
| Category registry | `content/categories.ts` |
| Post bodies | `content/<slug>.mdx` |
| Standalone page data | `content/standalone.ts`, `content/standalone-company.ts`, `content/standalone-legal.ts` |
| Local media | `public/assets/` |
| Migration data and manifest | `data/migration/` |
| Source and local review artifacts | `artifacts/` |
| Capture/generation utilities | `scripts/` and `lib/migration/` |

## Non-negotiable implementation rules

### Next.js

- Before changing Next.js code, read the relevant installed guide in `node_modules/next/dist/docs/`; do not rely on remembered APIs.
- Keep components as Server Components unless browser state, effects, events, or browser APIs require `"use client"`.
- Follow the installed MDX guidance for dynamic routes: Promise-based `params`, `generateStaticParams`, and `dynamicParams = false` where the route catalogue is closed.
- Preserve canonical metadata and unknown-route 404 behavior.
- The root layout already owns the site shell and a `<main id="main-content">`; avoid introducing additional main landmarks in new templates.
- Do not enable static export without addressing Next image-loader requirements documented by the installed Next.js version.

### Fidelity and content

- Treat screenshots and metadata together: screenshots establish layout; metadata and captured body data establish text, hierarchy, links, image dimensions, and SEO values.
- Reuse existing templates and data schemas. A new thin `app/<route>/page.tsx` plus content data is preferred over another large hard-coded page component.
- Preserve the source route `/irfs-service-consultant` even though “IFRS” is the standard spelling.
- Preserve the intentionally empty duplicate category `/blog/categories/ifrs-service-1`.
- Captured article prose includes source duplication and imperfections. Do not silently rewrite it.
- The contact form is currently a static preview with a local success state; do not imply backend delivery or persistence.
- Header search, some share controls, and home hero arrows are visual placeholders unless a separate task implements them.

### Images and assets

- Runtime code must use local assets. Do not add remote Wix image URLs.
- Reuse `data/migration/asset-manifest.json` before downloading or duplicating an asset.
- Preserve intrinsic dimensions and meaningful captured alt text. Use `alt=""` only for genuinely decorative images.
- Two 256×256 author derivatives are intentionally used: `blog-author-dolly-soni.webp` and `blog-author-harsh-ballyan.webp`.
- Seven restored transparent article diagrams intentionally use `unoptimized` because the Next image optimizer rendered them as blank beige blocks. Do not remove that prop without visual proof that optimized output works.
- Do not globally disable image optimization to solve a single-asset issue.

### Blog-specific safety

- `content/posts.ts` is the runtime catalogue and contains current helpers such as `getSortedPosts()` and `getHomepagePosts()` plus the curated homepage lead order.
- The archive must expose all 18 posts. The homepage carousel must expose all 18 exactly once; it renders one card on mobile and two cards above the mobile breakpoint.
- Unmapped posts may remain in “All Posts”; do not invent category membership.
- Related posts are derived from category overlap in the shared post template.
- Do **not** blindly rerun `scripts/generate-blog-content.ts`. Its `content/posts.ts` output template is older than the current registry API and can overwrite homepage ordering and helper functions. First update the generator or manually merge and review every generated diff.
- The representative `content/carbon-credits-for-net-zero-targets-india.mdx` is intentionally protected by the generator.

## Repeatable workflow for cloning another page

1. **Establish scope.** Confirm the exact path in `data/migration/url-inventory.json`. Preserve the canonical path even when spelling looks unusual.
2. **Read framework guidance.** Open the relevant Next.js 16.3 guide from `node_modules/next/dist/docs/` before implementing the route.
3. **Inspect source evidence.** Review metadata and full-page screenshots at 390, 768, and 1440 px. For standalone page comparisons, also inspect the 980 px source-reference capture.
4. **Inventory assets.** Match source URLs through `data/migration/asset-manifest.json`; acquire only genuinely missing files and keep runtime media local.
5. **Choose an existing pattern.** Prefer `ServicePage`, company/legal templates, `BlogCard`, the category template, or the post template. Add a shared abstraction only when the visual structure is genuinely new.
6. **Implement data first.** Put reusable copy and media references in the appropriate `content/*.ts` or MDX file, then add the smallest route wrapper and correct metadata.
7. **Match responsive behavior.** Validate full-page layout at 390, 768, 980 when relevant, and 1440 px. Check image completion, overflow, heading hierarchy, focus behavior, and mobile navigation.
8. **Add targeted regression coverage.** Test the new canonical route, unknown dynamic routes where applicable, core content, image loading, and mobile width.
9. **Run validation.** Use the commands below and inspect server stderr and captured screenshots, not only exit codes.
10. **Review the diff.** Confirm no generated registry, captured baseline, local asset, canonical URL, or unrelated migration work was lost. Do not commit or push unless explicitly requested.

## Capture and generation commands

```text
npm run inventory
npm run capture:source
npm run assets:acquire
npx tsx scripts/capture-post-bodies.ts
npx tsx scripts/generate-blog-content.ts
node scripts/generate-blog-author-thumbnails.cjs
npx tsx scripts/capture-local-standalone.ts
```

Pipeline summary:

- `inventory` reads the source sitemap and writes `data/migration/url-inventory.json`.
- `capture:source` captures every inventoried route at 390×844, 768×1024, and 1440×900 and writes metadata/screenshots under `artifacts/capture/`.
- `assets:acquire` downloads, MIME-checks, hashes, deduplicates, dimensions, and manifests captured Wix assets into `public/assets/`.
- `capture-post-bodies.ts` extracts significant article body blocks.
- `generate-blog-content.ts` generates post MDX and registry data, subject to the safety warning above.
- `capture-local-standalone.ts` captures implemented standalone pages at 390, 768, 980, and 1440 px for manual comparison.

Source capture is network-sensitive and can be slow. Existing captures are the accepted reproducible baseline; do not refresh them merely because the live source changed.

## Validation and definition of done

Minimum validation for a page change:

```text
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Useful focused or broader checks:

```text
npx playwright test tests/blog-migration.local.spec.ts tests/post.local.spec.ts --project=local-chromium --workers=1
npm run test:smoke
npm run test:browser-smoke
npm run test:capture
```

`npm run test:visual` currently has no real screenshot assertions; visual comparison remains manual. A clone task is not complete until:

- The canonical route and metadata match captured evidence.
- Local assets load with no broken or incomplete images.
- The 390 px layout has no horizontal overflow.
- Desktop, tablet, and mobile captures have been visually compared.
- Type checking, linting, relevant tests, and production build pass.
- Existing source oddities and unrelated working-tree changes remain intact.

## Artifact and handoff caveats

- `artifacts/capture/`, Playwright reports, and test results may be gitignored. A new checkout may not contain the accepted source baseline unless it is transferred or regenerated deliberately.
- Capture screenshots are viewport-specific, but capture metadata filenames are not; later viewport runs can overwrite earlier metadata for the same route.
- `artifacts/blog-review/` contains the final homepage-carousel, archive, and image-heavy-post responsive reviews.
- `artifacts/local-standalone-capture/` contains local standalone comparisons.
- The project has no API routes, form backend, search backend, or real Wix comment/like/view integration.
- Do not delete `AGENTS.md` or its generated Next.js block; `next dev` will recreate that block.
