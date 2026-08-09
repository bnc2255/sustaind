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
    <div className="service-sections">{data.sections.map((section, index) => <section className={`service-section ${index % 2 ? "is-muted" : ""} ${section.image ? "" : "is-text-only"}`} id={slugify(section.heading)} key={section.heading}><div className={`site-container service-section__inner ${section.image ? "" : "is-text-only"}`}><div className="service-section__copy"><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>{section.image && <HeroImage asset={section.image} className="service-section__image" />}</div></section>)}</div>
    {data.endings?.map((ending) => ending.variant === "illustrated" && ending.image ? <section className="service-ending service-ending--illustrated site-container" key={ending.heading}><div className="service-ending__image"><HeroImage asset={ending.image} /></div><div><SectionHeading>{ending.heading}</SectionHeading>{ending.intro && <p>{ending.intro}</p>}<ul>{ending.items.map((item) => <li key={item}>{item}</li>)}</ul></div></section> : <section className="service-ending service-ending--summary" key={ending.heading}><div className="site-container service-ending__summary-inner"><h2>{ending.heading}</h2>{ending.intro && <p>{ending.intro}</p>}<ul>{ending.items.map((item) => <li key={item}>{item}</li>)}</ul></div></section>)}
  </article>;
}

export function AboutPage({ data }: { data: typeof import("@/content/standalone-company").aboutPage }) {
  return <article className="standalone-page company-page">
    <CompanyHero title={data.title} intro={data.intro} hero={data.hero} />
    <section className="company-diagram"><HeroImage asset={data.diagram} /></section>
    <CardGrid title="Our Expertise" cards={data.expertise} />
    <CardGrid title="Our Project Experience" cards={data.projects} className="company-cards--projects" />
    <section className="company-strength"><div className="site-container company-strength__inner"><div><h2>Our Strength</h2><p>{data.strength}</p></div><HeroImage asset={data.strengthImage} /></div></section>
  </article>;
}

function CompanyHero({ title, intro, hero }: { title: string; intro: string[]; hero: PageImage }) {
  return <section className="company-hero"><HeroImage asset={hero} /><div className="company-hero__card"><h1>{title}</h1>{intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>;
}

function CardGrid({ title, cards, className = "" }: { title: string; cards: unknown; className?: string }) {
  const entries = cards as Array<[string, string[]]>;
  return <section className={`company-cards site-container ${className}`}><SectionHeading>{title}</SectionHeading><div className="company-cards__grid">{entries.map(([heading, items]) => <article key={heading}><h3>{heading}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>;
}

export function UmbrellaPage({ data }: { data: typeof import("@/content/standalone-company").umbrellaPage }) {
  return <article className="standalone-page umbrella-page">
    <section className="umbrella-hero site-container">
      <h1>ESG, Carbon Credit &amp; Sustainability <span>Consulting Services</span></h1>
      <div className="umbrella-hero__copy">
        <p>{data.intro[0]}</p>
        <p>{data.intro[1]}</p>
        <p className="umbrella-hero__portfolio-heading">{data.portfolioHeading}</p>
        <ul>{data.portfolio.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul>
        <p>{data.closing}</p>
      </div>
    </section>
    <div className="umbrella-hero-image"><HeroImage asset={data.hero} /></div>
    <div className="umbrella-services">
      {data.pillars.map((pillar, index) => <div key={pillar.heading}>
        <section className={`umbrella-service ${index % 2 ? "is-muted" : ""}`}>
          <div className="umbrella-service__inner">
            <h2><ServiceHeading heading={pillar.heading} accent={pillar.accent} /></h2>
            <p>{pillar.linkedText ? renderLinkedCopy(pillar.copy, pillar.linkedText, pillar.href) : pillar.copy}</p>
          </div>
        </section>
        {index === 1 && <section className="umbrella-diagram"><HeroImage asset={data.servicesDiagram} /></section>}
      </div>)}
    </div>
    <div className="umbrella-office"><HeroImage asset={data.whyImage} /></div>
    <section className="umbrella-why site-container">
      <h4><span />Why Choose Sustaind?<span /></h4>
      <div className="umbrella-why__grid">{data.why.map((item) => <p key={item.copy}>{item.emphasis && <strong>{item.emphasis} </strong>}{item.copy}</p>)}</div>
    </section>
    <p className="sr-only">{data.description}</p>
  </article>;
}

function ServiceHeading({ heading, accent }: { heading: string; accent: string }) {
  const accentIndex = heading.lastIndexOf(accent);
  return <>{heading.slice(0, accentIndex)}<span>{heading.slice(accentIndex)}</span></>;
}

function renderLinkedCopy(copy: string, linkedText: string, href: string) {
  const [before, after] = copy.split(linkedText);
  return <>{before}<Link href={href}>{linkedText}</Link>{after}</>;
}

export function TeamPage({ data }: { data: typeof import("@/content/standalone-company").teamPage }) {
  return <article className="standalone-page team-page"><CompanyHero title="Meet The Team" intro={[]} hero={data.hero} /><section className="team-grid site-container">{data.members.map((member) => <article className="team-card" key={member.name}><HeroImage asset={member.image} /><div><h2>{member.name}</h2><h3>{member.role}</h3><a href={`mailto:${member.email}`}>{member.email}</a><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}>in</a></div><p>{member.bio}</p></article>)}</section><section className="team-experience site-container"><SectionHeading>Team Experience</SectionHeading><p>Our team brings cross-sectoral expertise in sustainability, ESG, and climate action, with deep capabilities across the following domains:</p><div className="team-experience__grid"><ul>{data.experience.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul><HeroImage asset={data.experienceImage} /><ul>{data.experience.slice(3).map((item) => <li key={item}>{item}</li>)}</ul></div></section></article>;
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
