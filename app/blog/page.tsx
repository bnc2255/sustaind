import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/content/posts";

export const metadata: Metadata = { title: "Blog", description: "Sustaind insights on ESG, carbon credits, climate risk, and sustainability consulting.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  const postList = Object.values(posts).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return <main className="blog-page"><header className="blog-heading site-container"><p className="section-kicker">Sustaind insights</p><h1>Ideas for a more sustainable future</h1><p>Practical perspectives on ESG advisory, carbon markets, climate risk, and reporting for future-ready organisations.</p></header><div className="site-container blog-grid">{postList.map((post) => <PostCard key={post.slug} post={post}/>)}</div></main>;
}

export function PostCard({ post }: { post: (typeof posts)[keyof typeof posts] }) { return <article className="blog-card"><Link href={post.canonicalPath}><Image src={post.heroImage} alt={post.heroAlt} width={1200} height={628}/><div><p className="section-kicker">{post.category}</p><h2>{post.heading}</h2><p>{post.description}</p><span>Read article →</span></div></Link></article>; }
