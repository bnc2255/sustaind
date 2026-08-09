import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogCard, BlogNavigation } from "@/components/blog-ui";
import { getPost, getSortedPosts, posts } from "@/content/posts";

interface PostPageProps { params: Promise<{ slug: string }> }
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(posts).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description, authors: [{ name: post.author }], alternates: { canonical: post.canonicalPath }, openGraph: { title: post.title, description: post.description, url: post.canonicalPath, type: "article", publishedTime: post.publishedAt, modifiedTime: post.modifiedAt, authors: [post.author], images: [{ url: post.heroImage, width: 1200, height: 628, alt: post.heroAlt }] } };
}
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const Post = (await import(`@/content/${slug}.mdx`)).default;
  const related = getSortedPosts().filter((candidate) => candidate.slug !== post.slug && (candidate.category === post.category || candidate.categorySlugs.some((category) => post.categorySlugs.includes(category)))).slice(0, 3);
  return <article className="post-page">
    <BlogNavigation activeSlug={post.categorySlugs[0] ?? "all"} />
    <header className="post-header site-container"><p className="section-kicker">{post.category}</p><h1>{post.heading}</h1><p className="post-description">{post.description}</p><div className="post-byline"><Image className="post-author-image" src={post.authorImage} alt={post.authorAlt} width={48} height={48} /><div><span>By {post.author}</span><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long" }).format(new Date(post.publishedAt))}</time><span>{post.readTime ?? "5 min read"}</span></div></div><Image className="post-hero" src={post.heroImage} alt={post.heroAlt} width={1200} height={628} priority sizes="(max-width: 1200px) 100vw, 1120px" /></header>
    <div className="post-content"><Post /></div>
    {related.length > 0 && <section className="post-related site-container"><p className="section-kicker">Keep reading</p><h2>Related Posts</h2><div className="post-related__grid">{related.map((candidate) => <BlogCard key={candidate.slug} post={candidate} compact />)}</div></section>}
  </article>;
}
