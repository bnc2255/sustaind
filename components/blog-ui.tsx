"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { PostMetadata } from "@/content/posts";

export function BlogCard({ post, compact = false }: { post: PostMetadata; compact?: boolean }) {
  return <article className={`blog-card${compact ? " blog-card--compact" : ""}`}>
    <Link href={post.canonicalPath} className="blog-card__link">
      <Image className="blog-card__image" src={post.heroImage} alt={post.heroAlt} width={1200} height={628} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" />
      <div className="blog-card__body">
        <div className="blog-card__meta"><Image src={post.authorImage} alt="" width={32} height={32} /><span>{post.author}</span><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time><span aria-hidden="true">·</span><span>{post.readTime ?? "5 min read"}</span><span className="blog-card__menu" aria-hidden="true">⋮</span></div>
        <p className="section-kicker">{post.category}</p>
        <h2>{post.heading}</h2>
        <p className="blog-card__description">{post.description}</p>
        <span className="blog-card__read-more">Read article <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  </article>;
}

export function BlogCarousel({ posts }: { posts: PostMetadata[] }) {
  const [page, setPage] = useState(0);
  const isMobile = useSyncExternalStore(
    (onChange) => { const query = window.matchMedia("(max-width: 760px)"); query.addEventListener("change", onChange); return () => query.removeEventListener("change", onChange); },
    () => window.matchMedia("(max-width: 760px)").matches,
    () => false,
  );
  const perPage = isMobile ? 1 : 2;
  const pageCount = Math.max(1, Math.ceil(posts.length / perPage));
  const activePage = Math.min(page, pageCount - 1);
  const visiblePosts = useMemo(() => posts.slice(activePage * perPage, activePage * perPage + perPage), [activePage, perPage, posts]);

  function move(nextPage: number) {
    setPage(Math.max(0, Math.min(pageCount - 1, nextPage)));
  }

  return <div className="blog-carousel" aria-label="Sustaind blog highlights">
    <div className="blog-carousel__viewport" aria-live="polite">
      {visiblePosts.map((post) => <BlogCard key={post.slug} post={post} compact />)}
    </div>
    <div className="blog-carousel__controls">
      <button type="button" onClick={() => move(activePage - 1)} disabled={activePage === 0} aria-label="Previous blog page">←</button>
      <div className="blog-carousel__pages" aria-label={`Blog page ${activePage + 1} of ${pageCount}`}>
        {Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" className={index === activePage ? "is-active" : undefined} aria-label={`Blog page ${index + 1}`} aria-current={index === activePage ? "page" : undefined} onClick={() => move(index)}>{index + 1}</button>)}
      </div>
      <button type="button" onClick={() => move(activePage + 1)} disabled={activePage === pageCount - 1} aria-label="Next blog page">→</button>
    </div>
  </div>;
}

export function BlogNavigation({ activeSlug = "all" }: { activeSlug?: string }) {
  const links = [
    ["all", "All Posts", "/blog"],
    ["carbon-credits", "Carbon Credits", "/blog/categories/carbon-credits"],
    ["ifrs-service", "IFRS Service", "/blog/categories/ifrs-service"],
    ["sustaind-consulting", "Sustaind Consulting", "/blog/categories/sustaind-consulting"],
    ["esg-advisory", "ESG Advisory", "/blog/categories/esg-advisory"],
    ["climate-risk-assessment", "Climate Risk", "/blog/categories/climate-risk-assessment"],
    ["sustainability-service", "Sustainability", "/blog/categories/sustainability-service"],
  ] as const;
  return <nav className="blog-navigation site-container" aria-label="Blog categories"><div className="blog-navigation__links">{links.map(([slug, label, href]) => <Link key={slug} href={href} className={activeSlug === slug ? "is-active" : undefined}>{label}</Link>)}</div></nav>;
}

function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric" }).format(new Date(value));
}
