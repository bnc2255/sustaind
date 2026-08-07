import { posts, type PostMetadata } from "./posts";

export interface CategoryMetadata { slug: string; name: string; postSlugs: string[]; }

export const categories = {
  "carbon-credits": { slug: "carbon-credits", name: "Carbon Credits", postSlugs: ["verra-or-gold-standard-choosing-the-right-registry-for-your-carbon-project", "what-is-esg-scoreand-how-it-is-calculated"] },
  "climate-risk-assessment": { slug: "climate-risk-assessment", name: "Climate Risk Assessment", postSlugs: ["climate-risk-assessment-for-businesses-in-india", "climate-risk-assessment-service-consulting-in-gurugram"] },
  "esg-advisory": { slug: "esg-advisory", name: "ESG Advisory", postSlugs: ["the-future-of-agri-esg-scaling-carbon-credits-in-saudi-arabias-agriculture-sector", "esg-advisory-services-for-indian-companies"] },
  "ifrs-service": { slug: "ifrs-service", name: "IFRS Service", postSlugs: ["ifrs-sustainability-standards-compliance-in-india", "ifrs-s1-s2-sustainability-disclosure-india"] },
  "ifrs-service-1": { slug: "ifrs-service-1", name: "IFRS Service", postSlugs: [] },
  "sustainability-service": { slug: "sustainability-service", name: "Sustainability Service", postSlugs: ["how-to-buy-carbon-credits-in-india", "carbon-credits-for-net-zero-targets-india"] },
  "sustaind-consulting": { slug: "sustaind-consulting", name: "Sustaind Consulting", postSlugs: ["sustainability-reporting-frameworks-india-2026", "sustainability-consulting-for-smes-in-india"] },
} satisfies Record<string, CategoryMetadata>;

export type CategorySlug = keyof typeof categories;
export function getCategory(slug: string): CategoryMetadata | undefined { return categories[slug as CategorySlug]; }
export function getCategoryPosts(category: CategoryMetadata): PostMetadata[] { return category.postSlugs.map((slug) => posts[slug as keyof typeof posts]).filter((post): post is PostMetadata => Boolean(post)); }
