import type { Metadata } from "next";
import { BlogCard, BlogNavigation } from "@/components/blog-ui";
import { getSortedPosts } from "@/content/posts";

export const metadata: Metadata = { title: "Blog", description: "Explore expert insights on IFRS, carbon credits, sustainability, and ESG. Stay updated with compliance, reporting standards, and strategies for sustainable growth.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  const postList = getSortedPosts();
  return <main className="blog-page">
    <BlogNavigation />
    <header className="blog-heading site-container"><p className="section-kicker">Sustaind insights</p><h1>All Posts</h1><p>Expert perspectives on IFRS, carbon credits, sustainability, climate risk, and ESG strategy.</p></header>
    <div className="site-container blog-grid" data-post-count={postList.length}>{postList.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
  </main>;
}
