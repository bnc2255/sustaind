"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogCarousel } from "@/components/blog-ui";
import { HomeHeroCarousel } from "@/components/home-hero-carousel";
import { getHomepagePosts } from "@/content/posts";

const asset = "/assets/";
const sectors = [
  ["Agriculture & Food Systems", "Carbon accounting for farming operations, sustainable value chain development, and agri-ESG reporting"],
  ["Healthcare & Pharmaceuticals", "ESG risk assessments, responsible sourcing frameworks, and Scope 3 emissions mapping"],
  ["FMCG & Consumer Goods", "Supplier ESG audits, product lifecycle carbon footprinting, and sustainability disclosure"],
  ["Logistics & Transport", "Fleet emissions accounting, decarbonisation roadmaps, and CDP reporting"],
  ["Fintech & Financial Services", "ESG integration in lending and investment decisions, green finance framework development"],
  ["Energy & Utilities", "Net-zero strategy, renewable energy transition planning, and climate scenario analysis"],
] as const;
const questions = [
  ["Climate Risk Assessment", "What does your climate risk assessment include?", "We cover physical risks, transition risks, scenario analysis, and a practical roadmap for building climate resilience."],
  ["ESG Advisory", "How can ESG improve business performance?", "Our ESG advisory work connects governance, sustainability data, risk management, and transparent reporting to long-term value creation."],
  ["Carbon Credits", "When should a business use carbon credits?", "Businesses should measure and reduce emissions first, then use high-quality credits for residual emissions with clear claims and traceable standards."],
  ["Sustainability Frameworks", "Which reporting frameworks do you support?", "We support organisations working with frameworks including BRSR, IFRS S1/S2, GHG Protocol, CDP, and science-aligned targets."],
] as const;

export default function Home() {
  const homepagePosts = getHomepagePosts();
  const [faqCategory, setFaqCategory] = useState("All");
  const [faqQuery, setFaqQuery] = useState("");
  const filteredQuestions = useMemo(() => questions.filter(([category, question]) => (faqCategory === "All" || category === faqCategory) && question.toLowerCase().includes(faqQuery.toLowerCase())), [faqCategory, faqQuery]);

  return <>
    <HomeHeroCarousel />
    <section className="logo-rail" aria-label="Frameworks and standards"><div className="site-container logo-rail__items"><span>GHG PROTOCOL</span><span>IFRS S1 / S2</span><span>CDP</span><span>BRSR</span><span>SCIENCE BASED TARGETS</span></div></section>
    <section className="home-intro site-container"><Image src={`${asset}0446e3-40328ef22d8a4893bab73f14f54b0d45-mv2-jpg-47aeffb5e08d.jpg`} alt="Sustaind consultants meeting" width={1200} height={1600}/><div><h2>Powering Responsible Growth for Businesses Across India &amp; the <em>Middle East</em></h2><p>In a world where environmental accountability is no longer optional, Sustaind stands as a trusted partner for organisations ready to lead the transition toward responsible, climate-aligned growth.</p><p>Headquartered in Gurugram, India — with an established presence in Saudi Arabia — we bring together deep domain expertise, global framework knowledge, and ground execution capability.</p><Link className="outline-link" href="/about-us">Discover Sustaind <span>→</span></Link></div></section>
    <section className="sector-band"><div className="site-container"><p className="section-kicker">Our expertise</p><h2>What We Do — End-to-End Sustainability Consulting</h2><p>Sustaind provides integrated sustainability consulting across four core disciplines — Carbon Credit Services, ESG Advisory, IFRS Compliance, and Sustainability Strategy.</p><div className="sector-grid">{sectors.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="image-divider"><Image src={`${asset}0446e3-ef6e2204be8f40c6af92b8a681b4a809-mv2-png-8ffa377ad5c9.png`} alt="Sustaind approach" fill sizes="100vw"/><div><p>Global frameworks.<br/><em>Local execution.</em><br/>Measurable outcomes.</p></div></section>
    <section className="approach"><div className="site-container approach-grid"><div><p className="section-kicker">How we work</p><h2><em>Our Approach</em> — Global Frameworks. Local Execution. Measurable Outcomes.</h2><p>Sustaind&apos;s consulting methodology is built on three foundational principles: rigorous adherence to globally recognised ESG and sustainability frameworks, practical on-ground execution tailored to local market realities, and an unwavering commitment to measurable outcomes.</p><p>Every project is undertaken to produce real, verifiable change — reducing carbon emissions, improving supply chain transparency, strengthening governance practices, or unlocking access to green capital.</p></div><Image className="approach-image" src={`${asset}11062b-03ad2bb2f5ae4a43a581798782d9f3d6-mv2-jpg-55f7f3595c04.jpg`} alt="People working on sustainability projects" width={1200} height={800}/></div></section>
    <section className="impact-section"><div className="site-container impact-grid"><Image src={`${asset}11062b-d50125819cd142e79d87a4d50407389a-mv2-jpg-115391476e25.jpg`} alt="Solar panels supporting a sustainable future" width={1200} height={800}/><div className="impact"><p className="section-kicker">The outcome</p><h2>Impact We Aim to <em>Create</em></h2><ul><li>Lower emissions</li><li>Climate-resilient supply chains</li><li>Transparent sustainability disclosures</li><li>Social equity &amp; responsible sourcing</li></ul><Link className="outline-link" href="/about-us">About Us <span>→</span></Link></div></div></section>
    <section className="articles site-container"><p className="section-kicker">Insights</p><h2>Industries We Serve</h2><p>Agriculture • Healthcare • FMCG • Retail • Logistics • Fintech • Manufacturing • Government</p><BlogCarousel posts={homepagePosts} /><Link className="outline-link articles__all" href="/blog">View all posts <span>→</span></Link></section>
    <section className="faq-back"><div className="site-container faq"><div className="faq-heading"><div><p className="section-kicker">Need to know</p><h2>Frequently asked questions</h2></div><label className="faq-search"><span aria-hidden="true">⌕</span><input value={faqQuery} onChange={(event) => setFaqQuery(event.target.value)} placeholder="Search questions" aria-label="Search questions"/></label></div><div className="faq-tabs" role="tablist" aria-label="FAQ categories">{["All", ...new Set(questions.map(([category]) => category))].map((category) => <button key={category} type="button" role="tab" aria-selected={faqCategory === category} className={faqCategory === category ? "is-active" : undefined} onClick={() => setFaqCategory(category)}>{category}</button>)}</div><div className="faq-list">{filteredQuestions.map(([, question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}{filteredQuestions.length === 0 && <p className="faq-empty">No questions match that search.</p>}</div><div className="faq-share"><span>Share this page</span><button type="button" aria-label="Share on Facebook">f</button><button type="button" aria-label="Share on LinkedIn">in</button><button type="button" aria-label="Copy page link" onClick={() => void navigator.clipboard?.writeText(window.location.href)}>↗</button></div></div></section>
  </>;
}
