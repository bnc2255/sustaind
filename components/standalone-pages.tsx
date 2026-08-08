import Image from "next/image";
import Link from "next/link";
import type { PageImage, ServicePageData } from "@/content/standalone";
import { ContactForm } from "@/components/contact-form";

function HeroImage({ asset, className = "" }: { asset: PageImage; className?: string }) {
  return <Image className={className} src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} />;
}

function PageHero({ title, description, intro, hero }: { title: string; description: string; intro: string[]; hero: PageImage }) {
  return <>
    <section className="standalone-hero site-container">
      <div className="standalone-hero__title"><p className="section-kicker">Sustaind consulting</p><h1>{title}</h1></div>
      <div className="standalone-hero__copy"><p>{intro[0]}</p><p>{intro[1]}</p></div>
    </section>
    <div className="standalone-hero-image"><HeroImage asset={hero} /></div>
    <p className="sr-only">{description}</p>
  </>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="standalone-section-heading"><span />{children}<span /></h2>;
}

export function ServicePage({ data }: { data: ServicePageData }) {
  return <article className="standalone-page service-page">
    <PageHero title={data.title} description={data.description} intro={data.intro} hero={data.hero} />
    <section className="service-index site-container"><SectionHeading>{data.serviceHeading}</SectionHeading><nav aria-label={`${data.serviceHeading} sections`}><ol>{data.sections.map((section) => <li key={section.heading}><a href={`#${slugify(section.heading)}`}>{section.heading}</a></li>)}</ol></nav></section>
    <div className="service-sections">{data.sections.map((section, index) => <section className={`service-section ${index % 2 ? "is-muted" : ""}`} id={slugify(section.heading)} key={section.heading}><div className="site-container service-section__inner"><div className="service-section__copy"><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>{section.image && <HeroImage asset={section.image} className="service-section__image" />}</div></section>)}</div>
    <section className="service-industries site-container"><div className="service-industries__image"><HeroImage asset={data.sections.find((section) => section.image)?.image ?? data.hero} /></div><div><SectionHeading>{data.industries.length ? "Industries We Serve" : "Our Services"}</SectionHeading><p>Our consulting services are tailored to the needs of organisations across sectors including:</p><ul>{data.industries.map((industry) => <li key={industry}>{industry}</li>)}</ul></div></section>
    <section className="service-why"><div className="site-container service-why__inner"><h2>{data.whyHeading}</h2><ul>{data.why.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
  </article>;
}

export function AboutPage({ data }: { data: typeof import("@/content/standalone-company").aboutPage }) {
  return <article className="standalone-page company-page">
    <CompanyHero title={data.title} intro={data.intro} hero={data.hero} />
    <section className="company-vision site-container"><div><h2>Our Vision</h2><p>{data.vision}</p></div><div><h2>Our Mission</h2><p>{data.mission}</p></div></section>
    <CardGrid title="Our Expertise" cards={data.expertise} />
    <section className="company-diagram"><HeroImage asset={data.diagram} /></section>
    <CardGrid title="Our Project Experience" cards={data.projects} />
    <section className="company-strength"><div className="site-container company-strength__inner"><div><h2>Our Strength</h2><p>{data.strength}</p></div><HeroImage asset={data.strengthImage} /></div></section>
  </article>;
}

function CompanyHero({ title, intro, hero }: { title: string; intro: string[]; hero: PageImage }) {
  return <section className="company-hero"><HeroImage asset={hero} /><div className="company-hero__card"><h1>{title}</h1>{intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>;
}

function CardGrid({ title, cards }: { title: string; cards: unknown }) {
  const entries = cards as Array<[string, string[]]>;
  return <section className="company-cards site-container"><SectionHeading>{title}</SectionHeading><div className="company-cards__grid">{entries.map(([heading, items]) => <article key={heading}><h3>{heading}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>;
}

export function UmbrellaPage({ data }: { data: typeof import("@/content/standalone-company").umbrellaPage }) {
  const pillars = data.pillars as Array<[string, string, string]>;
  return <article className="standalone-page umbrella-page"><PageHero title={data.title} description={data.description} intro={data.intro} hero={data.hero} /><section className="umbrella-pillars">{pillars.map(([heading, copy, href], index) => <section className={`umbrella-pillar ${index % 2 ? "is-muted" : ""}`} key={heading}><div className="site-container"><div><h2>{heading}</h2><p>{copy}</p><Link className="outline-link" href={href}>Explore service <span>→</span></Link></div></div></section>)}</section><section className="umbrella-why site-container"><SectionHeading>Why Choose Sustaind?</SectionHeading><div className="umbrella-why__grid"><ul>{data.why.map((item) => <li key={item}>{item}</li>)}</ul><HeroImage asset={data.whyImage} /></div></section></article>;
}

export function TeamPage({ data }: { data: typeof import("@/content/standalone-company").teamPage }) {
  return <article className="standalone-page team-page"><CompanyHero title={data.title} intro={[]} hero={data.hero} /><section className="team-grid site-container">{data.members.map((member) => <article className="team-card" key={member.name}><HeroImage asset={member.image} /><div><h2>{member.name}</h2><h3>{member.role}</h3><a href={`mailto:${member.email}`}>{member.email}</a><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}>in</a></div><p>{member.bio}</p></article>)}</section><section className="team-experience site-container"><SectionHeading>Team Experience</SectionHeading><p>Our team brings cross-sectoral expertise in sustainability, ESG, and climate action, with deep capabilities across the following domains:</p><div className="team-experience__grid"><ul>{data.experience.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul><HeroImage asset={data.experienceImage} /><ul>{data.experience.slice(3).map((item) => <li key={item}>{item}</li>)}</ul></div></section></article>;
}

export function ContactPage({ data }: { data: typeof import("@/content/standalone-legal").contactPage }) {
  return <article className="standalone-page contact-page site-container"><HeroImage asset={data.image} /><div className="contact-page__content"><h1>{data.title.replace(" | Sustaind", "")}</h1><p>{data.intro}</p><ContactForm /></div></article>;
}

type LegalSection = [string, string[], Array<[string, string]>?];
export function LegalPage({ data }: { data: typeof import("@/content/standalone-legal").privacyPage | typeof import("@/content/standalone-legal").accessibilityPage }) {
  const sections = data.sections as LegalSection[];
  return <article className="standalone-page legal-page site-container"><h1>{data.title.replace(" | Sustaind", "")}</h1>{"intro" in data && data.intro.map((paragraph) => <p className="legal-intro" key={paragraph}>{paragraph}</p>)}<div className="legal-sections">{sections.map(([heading, paragraphs, subSections]) => <section key={heading}><h2>{heading}</h2>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{subSections?.map(([subHeading, copy]) => <div className="legal-subsection" key={subHeading}><h3>{subHeading}</h3><p>{copy}</p></div>)}</section>)}</div></article>;
}

function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
