import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard, BlogNavigation } from "@/components/blog-ui";
import { getCategory, getCategoryPosts, categories } from "@/content/categories";

interface CategoryPageProps { params: Promise<{ slug: string }> }
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(categories).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> { const { slug } = await params; const category = getCategory(slug); if (!category) return {}; return { title: category.name, description: `Sustaind ${category.name} insights and practical guidance.`, alternates: { canonical: `/blog/categories/${slug}` } }; }
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const categoryPosts = getCategoryPosts(category);
  return <main className="blog-page">
    <BlogNavigation activeSlug={slug} />
    <header className="blog-heading site-container"><p className="section-kicker">Blog category</p><h1>{category.name}</h1><p>Explore Sustaind insights and practical guidance in {category.name.toLowerCase()}.</p></header>
    <div className="site-container blog-grid">{categoryPosts.length ? categoryPosts.map((post) => <BlogCard key={post.slug} post={post} />) : <p className="blog-empty">No posts are currently published in this category.</p>}</div>
  </main>;
}
