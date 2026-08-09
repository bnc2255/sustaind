# Sustaind website reconstruction

A fidelity-first Next.js reconstruction of the captured `sustaind.in` website. The project converts a Wix source site into a local, maintainable App Router application using captured page evidence, local assets, data-driven page templates, MDX articles, and Playwright validation.

## Current project state

The current implementation covers all **38 routes** found in the captured source sitemap:

| Route group | Count | Implementation |
| --- | ---: | --- |
| Static/page routes | 13 | Homepage, blog archive, service, company, team, contact, privacy, and accessibility pages |
| Blog posts | 18 | Static `/post/[slug]` routes backed by local MDX |
| Blog categories | 7 | Static `/blog/categories/[slug]` routes, including the captured empty duplicate IFRS category |

The completed blog migration includes:

- A source-style homepage carousel containing all 18 captured posts exactly once.
- A full `/blog` archive with all 18 articles and source category navigation.
- Responsive archive grids: one column on mobile, two on tablet, and three on desktop.
- Full article presentation with metadata, author details, hero and inline images, article body, category navigation, and related posts.
- All captured post imagery stored locally, including seven restored transparent diagrams.
- Optimized 256×256 WebP author thumbnails instead of repeatedly processing the original 33.3 MB portrait.
- Intentional omission of Wix-only comments, likes, view counters, and cookie widgets.

The broader site also uses reusable templates for service, company, team, contact, privacy, and accessibility pages rather than duplicating page markup.

## Technology

- Next.js 16.3.0 App Router
- React and React DOM 19.2.8
- TypeScript
- Local MDX through `@next/mdx`
- `next/image` with local assets
- Global CSS in `app/globals.css`
- Playwright and Axe for route, responsive, browser, and accessibility checks

This project does not load Geist despite the original create-next-app README claim. The current visual system is implemented in the project CSS.

## How the reconstruction was produced

The migration uses evidence captured from the source rather than rebuilding pages from memory:

1. **Sitemap inventory** — the source sitemap is normalized into `data/migration/url-inventory.json`.
2. **Source capture** — each route is captured at mobile, tablet, and desktop sizes with extracted metadata, headings, links, image information, JSON-LD, and full-page screenshots.
3. **Asset acquisition** — Wix media URLs are downloaded, MIME-checked, content-hashed, deduplicated, dimensioned, and recorded in `data/migration/asset-manifest.json`.
4. **Content extraction** — significant blog body blocks are recorded in `data/migration/post-bodies.json`.
5. **Data-driven rendering** — standalone page content lives in TypeScript data files, while blog bodies live in local MDX and use a shared post template.
6. **Responsive comparison** — local pages are captured and manually compared against the accepted source reference at representative widths.
7. **Regression validation** — Playwright verifies route coverage, catalogue completeness, image loading, mobile overflow, navigation, accessibility, and unknown-route behavior.

The existing captured artifacts are the reproducible baseline. The live site may change, so it should not replace these captures unless a refresh is explicitly requested.

## Repository map

```text
app/
  layout.tsx                         Global metadata and site shell
  page.tsx                           Homepage
  blog/page.tsx                      Complete 18-post archive
  blog/categories/[slug]/page.tsx    Static category template
  post/[slug]/page.tsx               Static MDX post template
  <standalone-route>/page.tsx        Thin wrappers for service/company/legal pages
  globals.css                        Shared responsive visual system
components/
  blog-ui.tsx                        BlogCard, BlogCarousel, BlogNavigation
  standalone-pages.tsx               Reusable standalone page templates
  site-header.tsx                    Desktop/mobile navigation
  site-footer.tsx                    Shared footer
  contact-form.tsx                   Local preview form behavior
content/
  posts.ts                           Canonical post catalogue, sorting, homepage order
  categories.ts                      Canonical category catalogue
  <post-slug>.mdx                    Article bodies and inline images
  standalone*.ts                     Standalone page schemas and captured content
data/migration/
  url-inventory.json                 Captured canonical route inventory
  asset-manifest.json                Source URL → local asset mapping
  post-bodies.json                   Extracted article body data
  blog-category-map.json             Captured/generated post-category mapping
public/assets/                       Runtime-local media
scripts/                             Inventory, capture, acquisition, and generation tools
lib/migration/                       Shared migration and capture utilities
artifacts/                           Source captures, local reviews, and test output
tests/                               Playwright migration and runtime regressions
```

## Getting started

Requirements:

- A current Node.js release compatible with Next.js 16
- npm
- Playwright browsers when running browser tests

Install dependencies and start development:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Create and run a production build:

```bash
npm run build
npm run start
```

The application currently expects a normal Next.js server. Static `output: "export"` is not enabled, and enabling it requires revisiting image-loader behavior.

## Common commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create the production build and prerender static routes |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Run `tsc --noEmit` |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run local Chromium Playwright coverage |
| `npm run test:smoke` | Run source and local smoke tests |
| `npm run test:browser-smoke` | Run Firefox and WebKit local smoke tests |
| `npm run test:capture` | Run source-capture project tests |
| `npm run test:report` | Open the Playwright HTML report |
| `npm run inventory` | Refresh the sitemap-derived route inventory |
| `npm run capture:source` | Capture all inventoried source routes |
| `npm run assets:acquire` | Acquire and manifest captured Wix assets |

`npm run test:visual` exists, but the suite currently has no screenshot assertions. Visual review is still a manual capture-and-compare process.

## Capture and content-generation workflow

### 1. Build the route inventory

```bash
npm run inventory
```

This reads the source sitemap and overwrites `data/migration/url-inventory.json`. Use `SITEMAP_URL` to override the default source.

### 2. Capture source evidence

```bash
npm run capture:source
```

The capture tool records every inventoried route at:

- 390×844 mobile
- 768×1024 tablet
- 1440×900 desktop

Output is written under `artifacts/capture/`. `SOURCE_SITE_URL` and `CAPTURE_TIMEOUT_MS` are available as overrides.

### 3. Acquire local assets

```bash
npm run assets:acquire
```

The asset pipeline writes content-hashed files under `public/assets/` and the mapping under `data/migration/asset-manifest.json`. Runtime code should reference `/assets/...`, never a remote Wix URL.

### 4. Extract and generate blog content

```bash
npx tsx scripts/capture-post-bodies.ts
npx tsx scripts/generate-blog-content.ts
node scripts/generate-blog-author-thumbnails.cjs
```

**Important:** do not blindly rerun `scripts/generate-blog-content.ts` on the current tree. Its generated `content/posts.ts` template predates the current `getSortedPosts()`, `getHomepagePosts()`, curated homepage order, and related types. Update the generator first or manually merge its output. It intentionally preserves the representative `carbon-credits-for-net-zero-targets-india.mdx` article.

### 5. Capture local standalone pages

```bash
npx tsx scripts/capture-local-standalone.ts
```

This captures implemented standalone routes at 390, 768, 980, and 1440 px. The 980 px capture is retained as an additional source-reference width.

## Adding or cloning another page

Use this order so new work remains traceable and reviewable:

1. Confirm the exact canonical route in `data/migration/url-inventory.json`.
2. Read the relevant installed Next.js guide under `node_modules/next/dist/docs/`; this repository uses Next.js 16.3 APIs and conventions.
3. Inspect the route’s metadata and screenshots under `artifacts/capture/` at 390, 768, and 1440 px. Include 980 px for standalone comparison when available.
4. Match images through `data/migration/asset-manifest.json`; acquire only missing assets and keep them local.
5. Reuse a template from `components/standalone-pages.tsx` or the existing blog/category/post UI before creating a new page structure.
6. Put captured copy and media references into `content/`; keep the route file thin and add accurate metadata.
7. Add targeted Playwright coverage for the route, important content, image loading, and mobile overflow.
8. Capture the local page at the reference widths and compare it visually against the source evidence.
9. Run type checking, linting, the relevant tests, and a production build.
10. Review the final diff for overwritten registries, removed assets, changed canonical paths, or lost captured evidence.

Detailed agent-specific constraints and caveats are in `AGENTS.md`.

## Blog implementation details

`content/posts.ts` is the canonical runtime catalogue. It controls metadata, display categories, sorting, and the homepage lead order. `content/categories.ts` defines the seven accepted category routes. Both dynamic route templates use static parameter generation and reject unknown slugs.

The homepage lead order begins with:

1. Verra or Gold Standard?
2. The Future of Agri-ESG
3. Sustainability Reporting Frameworks India 2026

The remaining posts follow deterministic date sorting. The carousel shows one card on mobile and two cards at larger widths, with all 18 posts reachable through pagination. The archive displays all 18 at once.

Seven transparent mind-map PNGs use the `unoptimized` prop selectively. The original files contain visible diagrams, but the Next.js optimizer produced blank beige output for those specific images. All other eligible images remain optimized.

Source quirks preserved intentionally include:

- The canonical `/irfs-service-consultant` spelling.
- The empty duplicate `/blog/categories/ifrs-service-1` category.
- Captured duplicate or incomplete prose in some articles.
- Posts that remain visible in “All Posts” without invented category mappings.

## Validation snapshot

The final 18-post migration was verified with:

```bash
npm run typecheck
npm run lint
npm run build
npx playwright test tests/blog-migration.local.spec.ts tests/post.local.spec.ts --project=local-chromium --workers=1
```

Results at handoff:

- TypeScript passed.
- ESLint passed.
- Next.js 16.3 production build passed and generated all 41 build routes.
- Focused blog/post Playwright suite passed: 8/8 tests.
- All 18 posts and all 7 category paths resolved as expected.
- The archive contained exactly 18 posts.
- The homepage carousel exposed exactly 18 unique post links.
- All post images completed at 390 px with no broken images or horizontal overflow.
- Nine homepage, archive, and image-heavy-post review captures passed at 390, 768, and 1440 px with `incomplete=0` and `broken=0`.
- The seven restored transparent diagrams rendered visibly through their direct local PNG paths.

Review captures are retained under `artifacts/blog-review/` and standalone comparisons under `artifacts/local-standalone-capture/`.

## Known limitations and deliberate exclusions

- The contact form prevents submission and displays a local success state; there is no API, email delivery, database, or persistence.
- Header search, some share controls, and homepage hero arrows are visual placeholders.
- Wix comments, likes, views, cookie tooling, and other Wix runtime widgets are not reproduced.
- There are no real visual snapshot assertions yet; reference screenshots are manually reviewed.
- Some captured article prose contains source duplication. It is preserved for migration fidelity rather than editorially rewritten.
- Capture metadata filenames are shared across viewports, so the final metadata file for a route may reflect the last capture pass even though screenshots remain viewport-specific.
- Some capture/test artifact folders are gitignored. Transfer accepted reference artifacts explicitly when moving work to another checkout.

## Deployment

Run the production build before deployment:

```bash
npm run build
```

Deploy as a standard Next.js application on a compatible Node.js host or platform. No deployment, commit, or push is performed automatically by the migration tooling.
