import type { Metadata } from "next";

export type PageImage = { src: string; alt: string; width: number; height: number };
export type ServiceSection = { heading: string; paragraphs: string[]; bullets?: string[]; image?: PageImage };
export type ServicePageData = { path: string; title: string; description: string; hero: PageImage; intro: string[]; serviceHeading: string; sections: ServiceSection[]; industries: string[]; whyHeading: string; why: string[] };

export const img = (src: string, alt: string, width = 1200, height = 650): PageImage => ({ src, alt, width, height });

export const servicePages = {
  "carbon-credit-service-consulting": {
    path: "/carbon-credit-service-consulting",
    title: "Carbon Credit Service Consultant",
    description: "Sustaind is a specialist Carbon Credit Services Consultant based in Gurugram, India with presence in Saudi Arabia. We offer GHG inventorisation, Scope 1-2-3 emissions accounting, carbon market access, and decarbonisation roadmaps for businesses across India and the Middle East.",
    hero: img("/assets/11062b-03ad2bb2f5ae4a43a581798782d9f3d6-mv2-jpg-55f7f3595c04.jpg", "People holding a globe", 1440, 500),
    intro: ["Carbon credits represent one tonne of CO₂ equivalent that has been reduced, avoided, or removed from the atmosphere. Organisations that reduce their emissions below a set threshold can generate credits for voluntary or compliance markets.", "Sustaind helps businesses measure emissions accurately, identify reduction opportunities, structure credible strategies, and connect to verified carbon markets."],
    serviceHeading: "Sustaind's Carbon Credit Consulting Services",
    sections: [
      { heading: "GHG Inventorisation & Scope 1, 2, 3 Emissions Accounting", paragraphs: ["We build comprehensive GHG inventories across direct emissions, purchased energy, and value-chain activity using the GHG Protocol and ISO 14064 standards."], bullets: ["Scope 1: direct emissions from facilities, vehicles, and processes", "Scope 2: emissions from purchased electricity and heat", "Scope 3: supply-chain, travel, product-use, and disposal emissions"], image: img("/assets/11062b-d50125819cd142e79d87a4d50407389a-mv2-jpg-115391476e25.jpg", "Woman working in a greenhouse", 432, 549) },
      { heading: "Decarbonisation Roadmaps", paragraphs: ["We develop science-aligned roadmaps that prioritise reduction opportunities by cost, feasibility, and impact, with clear milestones for implementation."], image: img("/assets/11062b-67afed52835a4157b2bee387e00b4c95-mv2-jpg-fe32c678d9db.jpg", "Solar panels across a landscape", 591, 319) },
      { heading: "Carbon Market Access & Credit Strategy", paragraphs: ["We evaluate voluntary standards, compliance schemes, project eligibility, methodology, issuance, and trading requirements so credits are credible and market-ready."], image: img("/assets/11062b-d7798f4b354e43159b3f36ec4d0922ac-mv2-jpg-c23649c62755.jpg", "Green facade design") },
      { heading: "CDP Climate Disclosure Support", paragraphs: ["We help organisations respond accurately to CDP questionnaires, improve disclosure scores, and demonstrate environmental leadership."], image: img("/assets/11062b-99dd15b159eb4d84b2e3b28f937d86db-mv2-jpg-00bce764aea3.jpg", "Modern solar panels") },
      { heading: "SBTi Target Setting", paragraphs: ["We support near-term and long-term target setting, validation, and annual progress reporting aligned with science-based pathways."], image: img("/assets/11062b-325c85da0bea47789798ed15415f4fd3-mv2-jpg-299cac64f471.jpg", "Sustainable project landscape") }
    ],
    industries: ["Manufacturing & Heavy Industry", "Agriculture & Food Systems", "Logistics & Supply Chain", "Healthcare & Pharma", "Energy & Utilities", "Financial Services & Fintech", "Government & Public Sector"],
    whyHeading: "Why Sustaind for Carbon Credit Consulting?",
    why: ["Gurugram base with active operations in Saudi Arabia", "ISO 14064 and GHG Protocol-aligned methods", "Experience with CDP, SBTi, and UNFCCC standards", "Multi-sector delivery across India and international markets", "Integrated accounting, strategy, reporting, and market access"]
  },
  "climate-risk-assessment-consultants": {
    path: "/climate-risk-assessment-consultants",
    title: "Climate Risk Assessment Consultants",
    description: "Sustaind's expert team of ESG Advisory and Sustainability Service Consultants provides comprehensive climate risk assessments—covering physical risks, transition risks, and scenario analysis—for businesses across India and Saudi Arabia.",
    hero: img("/assets/11062b-80f9cd9bf13c41cd971261d773fcc312-mv2-d-5700-3804-s-4-2-jpg-47099f8fe42b.jpg", "Farmers standing together", 1440, 500),
    intro: ["Climate change creates material risks for every organisation, from extreme weather and resource stress to policy shifts, technology disruption, and changing stakeholder expectations.", "Sustaind translates climate science into practical insights for boards, investors, operations teams, and communities."],
    serviceHeading: "Our Climate Risk Assessment Approach",
    sections: [
      { heading: "Physical Risk Analysis", paragraphs: ["We assess acute hazards such as floods, heatwaves, cyclones, and droughts, together with chronic changes in temperature, rainfall, and water availability."], image: img("/assets/11062b-bf57c14a628542cb9c9730f1c5ec2fd6-mv2-jpg-78645f6dc7ac.jpg", "Solar energy field", 432, 400) },
      { heading: "Transition Risk Analysis", paragraphs: ["We consider regulatory, market, technology, reputation, and customer changes associated with the transition to a low-carbon economy."], image: img("/assets/11062b-ab35a454d6ff4038bbd00a2278c32c68-mv2-jpg-dca280619c34.jpg", "Community gardening effort", 591, 430) },
      { heading: "Climate Scenario Analysis", paragraphs: ["Recognised climate scenarios help us test the resilience of strategies and investments across different warming and transition pathways."], image: img("/assets/8ef393d429d64c5ab445f84c3e1337d2-jpg-15eade10e6f9.jpg", "Green rooftop architecture") },
      { heading: "Climate & Health Vulnerability Tools", paragraphs: ["Our climate and health tools integrate climate data with public-health and community-vulnerability indicators for healthcare, agriculture, and government clients."], image: img("/assets/11062b-344738b5f26b433fb54e4dc3570fcc90-mv2-jpeg-f5b7f522ecc9.jpg", "Community garden gathering") },
      { heading: "Climate Adaptation Strategy", paragraphs: ["We develop adaptation strategies that strengthen resilience, define ownership, prioritise investment, and establish measurable milestones."], image: img("/assets/11062b-2fbf53a29e91416ca35461c5a39f4344-mv2-jpg-289368708226.jpg", "Woman holding fresh produce") }
    ],
    industries: ["Agriculture & Food Systems", "Healthcare & Pharmaceuticals", "Infrastructure & Real Estate", "Energy & Utilities", "Manufacturing", "Financial Services", "Government & Public Systems"],
    whyHeading: "Why Partner with Sustaind?",
    why: ["Climate analysis connected to operational and financial decisions", "Global frameworks translated into local execution", "Data-driven tools for assets, communities, and value chains", "Clear adaptation roadmaps rather than reports that sit on a shelf"]
  },
  "esg-advisory-service-consultants": {
    path: "/esg-advisory-service-consultants",
    title: "ESG Advisory Service Consultants",
    description: "Sustaind is a leading ESG Advisory Service Consultant in India, headquartered in Gurugram with presence in Saudi Arabia. We deliver end-to-end ESG strategy, materiality assessment, ESG reporting (BRSR, GRI, CDP), and governance frameworks for businesses across industries.",
    hero: img("/assets/480890ceef2444b8a2c9914e773d1404-jpg-2797a2ed695f.jpg", "Environmental activity outdoors", 1440, 500),
    intro: ["Environmental, social, and governance performance is now a core part of business strategy, access to capital, and stakeholder trust.", "Sustaind connects leadership ambition with reliable data, practical implementation, and decision-useful reporting."],
    serviceHeading: "What is ESG Advisory",
    sections: [
      { heading: "ESG Strategy Development", paragraphs: ["We define ESG priorities that reflect business objectives, stakeholder expectations, sector risks, and global sustainability frameworks."], image: img("/assets/11062b-66846533db5941479adb11ae8381e92a-mv2-jpg-61a79a95b594.jpg", "Modern green building", 432, 400) },
      { heading: "Materiality Assessment", paragraphs: ["We combine stakeholder engagement, peer analysis, risk assessment, and impact thinking to focus resources where they create value."], image: img("/assets/11062b-1438881d90a0412794c23f52eafc32a8-mv2-jpg-a3c9143d23d5.jpg", "Electric vehicle charging", 591, 334) },
      { heading: "ESG Reporting & Disclosures", paragraphs: ["We prepare disclosure-ready information aligned with BRSR, GRI, CDP, TCFD, IFRS S1/S2, DJSI, EcoVadis, and IFC Performance Standards."], image: img("/assets/11062b-e6c08a9eb8fb4bc28210a4ff39466df3-mv2-jpeg-814acf4f0989.jpg", "Sustainable growth") },
      { heading: "ESG Governance Framework", paragraphs: ["We define board responsibilities, integrate ESG metrics into executive KPIs, establish committees, and build auditable data-management systems."] },
      { heading: "Supplier ESG Engagement & Supply Chain Audits", paragraphs: ["We support supplier assessments, responsible-sourcing programmes, ESG audits, corrective-action plans, and value-chain data collection."], image: img("/assets/11062b-9e1bfe52f4a44ef3a4e1fdf580a01465-mv2-jpg-f0bfb17134f9.jpg", "Responsible supply chain") },
      { heading: "Assurance & ESG Risk Screening", paragraphs: ["We provide Environmental and Social Due Diligence and ESG risk screening for transactions, investments, and new-market entry."], image: img("/assets/11062b-55afbdfae50b4fa1af9708669d35a69d-mv2-d-2048-1365-s-2-jpg-8e5e7ec0b0ef.jpg", "ESG risk review") }
    ],
    industries: ["Agriculture & Food Systems", "Healthcare & Pharmaceuticals", "FMCG & Consumer Goods", "Logistics & Transport", "Fintech & Financial Services", "Energy & Utilities", "Manufacturing & Government"],
    whyHeading: "Sustaind's ESG Advisory Differentiators",
    why: ["End-to-end support from strategy through reporting and assurance", "Framework expertise across BRSR, GRI, CDP, TCFD, and IFRS", "Practical supplier and value-chain engagement", "Cross-sector experience across India and the Middle East"]
  },
  "irfs-service-consultant": {
    path: "/irfs-service-consultant",
    title: "IRFS Service Consultant",
    description: "Sustaind is a specialist IRFS Service Consultant in India, headquartered in Gurugram with a presence in Saudi Arabia. We provide end-to-end IRFS reporting, compliance gap analysis, data collection, and assurance-ready disclosure support for businesses in India and the Middle East.",
    hero: img("/assets/11062b-fefd82df6e8c4a71b1d93b3ece3002db-mv2-jpg-71bf3d05ea72.jpg", "Elderly man with a wind turbine", 1440, 500),
    intro: ["IRFS reporting is becoming a central part of how organisations communicate sustainability-related risks and opportunities to capital markets.", "Sustaind supports readiness, data collection, disclosure preparation, assurance, and internal capability building."],
    serviceHeading: "Our IRFS Consulting Services",
    sections: [
      { heading: "Why IRFS Compliance Matters", paragraphs: ["High-quality sustainability disclosures improve transparency, strengthen investor confidence, and help organisations identify the financial implications of climate and sustainability issues."], image: img("/assets/11062b-aaf31ded725448698abf486ccfc04dd7-mv2-jpg-d15237c66c36.jpg", "Farmer using a tablet", 432, 400) },
      { heading: "IRFS Gap Analysis & Readiness Assessment", paragraphs: ["We benchmark current reporting, governance, policies, and data systems against applicable IRFS requirements, then create a prioritised readiness plan." ] },
      { heading: "IRFS Disclosure Preparation & Report Structuring", paragraphs: ["We structure disclosures, connect narrative to metrics, and prepare clear, decision-useful reporting aligned with material risks and opportunities."], image: img("/assets/11062b-77732064ecf74c17b2f55f40778e5c19-mv2-jpg-a6962dc24de7.jpg", "Greenhouse farming scene") },
      { heading: "Data Collection & Management Systems", paragraphs: ["We establish data dictionaries, controls, collection workflows, and documentation standards so information is traceable and ready for future cycles."], image: img("/assets/11062b-7fe9c6e056b546f88ab46be01b0c046d-mv2-jpeg-2efececd0300.jpg", "Vertical garden design") },
      { heading: "Assurance Readiness", paragraphs: ["We review data quality, documentation standards, and internal controls so disclosures meet the evidentiary standards required by assurance providers."], image: img("/assets/7b547e2ada214ed2974cc522cfc425e8-jpg-34f3429eec5e.jpg", "Assurance-ready sustainability data") },
      { heading: "SOX Compliance & Internal Control Systems", paragraphs: ["We help finance and sustainability teams design controls that support reliable reporting, accountability, review, and sign-off."], image: img("/assets/11062b-caa79f32ca114d63b652b1182c10e530-mv2-jpg-9606af07659b.jpg", "Internal control systems") },
      { heading: "IRFS Training & Awareness Programmes", paragraphs: ["We deliver customised training for finance teams, ESG managers, board members, and operational leaders."], image: img("/assets/11062b-5f2ceef3a7b841958ae3fc01d9c1933a-mv2-jpeg-0f5bb38e5ec2.jpg", "Sustainability training") }
    ],
    industries: ["Financial Services", "Manufacturing", "Energy & Utilities", "Technology", "Infrastructure", "Healthcare", "Public and Listed Companies"],
    whyHeading: "Sustaind's IRFS Consulting Advantage",
    why: ["End-to-end support from readiness through assurance", "Integrated finance, ESG, and data expertise", "Clear controls and evidence trails", "Training that builds lasting internal capability"]
  },
  "sustainability-service-consultants": {
    path: "/sustainability-service-consultants",
    title: "Sustainability Service Consultants",
    description: "Sustaind is a trusted Sustainability Service Consultant headquartered in Gurugram, India with presence in Saudi Arabia. We deliver sustainability strategy, circular economy, green finance, climate resilience, and impact assessment services across industries and geographies.",
    hero: img("/assets/598af248b6334b2a822f736abb5549c0-jpg-ec2122a1ffaa.jpg", "Wind turbine field", 1440, 500),
    intro: ["Sustainability is a practical operating model for resilient, future-ready organisations. Sustaind helps businesses and public systems translate ambition into strategies, investments, and measurable outcomes.", "Our consultants combine global framework knowledge with local implementation experience across India, Saudi Arabia, and emerging markets."],
    serviceHeading: "Our Sustainability Consulting Services",
    sections: [
      { heading: "Sustainability Strategy & Roadmap", paragraphs: ["We develop strategies aligned with business priorities, stakeholder expectations, science-based targets, and long-term value creation."], image: img("/assets/11062b-b3d81e77da124646b5424e71556a0f1a-mv2-jpeg-58a5774d4e2a.jpg", "Irrigation system in a field", 432, 400) },
      { heading: "Climate Risk & Vulnerability Assessment", paragraphs: ["We identify physical and transition risks affecting assets, communities, operations, and supply chains, then develop resilience responses."], image: img("/assets/f3d55eda0a4a48bfb298d9e5393e8fb3-jpg-0ed5259dda84.jpg", "Climate-resilient agriculture") },
      { heading: "Impact Assessment & Monitoring, Evaluation", paragraphs: ["Our specialists build theories of change, indicators, monitoring systems, evaluation frameworks, and learning loops that connect activities to outcomes."], image: img("/assets/11062b-be928fefe3cf42c0960e13b0289714a8-mv2-jpg-30192804bbd9.jpg", "Impact assessment workshop") },
      { heading: "Green Finance & Sustainability-Linked Instruments", paragraphs: ["We help organisations access green bonds, sustainability-linked loans, blended finance structures, and impact investment."], image: img("/assets/11062b-6a3d71cdc9474cd995b1e34adc0392e5-mv2-jpg-9991a029dcb1.jpg", "Green finance planning") },
      { heading: "Circular Economy & Sustainable Value Chains", paragraphs: ["We help organisations reduce waste, redesign materials and processes, improve resource productivity, and build responsible value chains."], image: img("/assets/11062b-afca362c2c3644629af5489b89c22008-mv2-jpg-668a482912d8.jpg", "Circular economy value chain") },
      { heading: "Sustainable Agriculture & Food Systems", paragraphs: ["We support agribusinesses, food companies, and development organisations in improving soil health, reducing agrochemical use, managing water, and building climate-resilient supply chains."], image: img("/assets/11062b-7e2b0fe258dd4ccca228799eda4960a7-mv2-jpeg-2982076850ad.jpg", "Sustainable food systems") },
      { heading: "Public Sector & Policy Advisory", paragraphs: ["We support governments, development partners, and public institutions with climate studies, policy design, green procurement, and capacity building."], image: img("/assets/11062b-b5bc17a6db7345238f6d2558e8da475b-mv2-jpg-a10a49e5b678.jpg", "Public sector sustainability planning") },
      { heading: "Sustainability Training & Capacity Building", paragraphs: ["We deliver role-specific online courses, in-person workshops, and executive sustainability leadership programmes."], image: img("/assets/11062b-cf82eeea45604a13a5cb25e47eafc916-mv2-jpg-57a3948fc4a2.jpg", "Sustainability training session") }
    ],
    industries: ["Agriculture & Food Systems", "Healthcare", "FMCG & Retail", "Logistics & Transport", "Energy & Utilities", "Manufacturing", "Government and Development Partners"],
    whyHeading: "Sectors We Serve",
    why: ["India and Saudi Arabia, with reach across the wider Middle East", "Cross-sector sustainability strategy and implementation", "Global frameworks combined with local execution", "Assessment, finance, reporting, and capacity building in one team"]
  }
} satisfies Record<string, ServicePageData>;

export type StandaloneMeta = { path: string; title: string; description: string };
export const standaloneMeta: Record<string, StandaloneMeta> = {
  "/about-us": { path: "/about-us", title: "About Sustaind", description: "Learn how Sustaind, a trusted ESG Advisory Service Consultant and Sustainability Service Consultant, delivers carbon credit consulting, IRFS services, and climate-focused strategies across industries with global frameworks." },
  "/accessibility-statement": { path: "/accessibility-statement", title: "Accessibility Statement | Sustaind", description: "Accessibility Statement | Sustaind India Carbon Credit Service Consulting" },
  "/contact-us": { path: "/contact-us", title: "Contact Us | Sustaind", description: "Get in touch with Sustaind for ESG Advisory consulting, climate risk assessments, sustainability reporting, and data-driven value chain solutions. Visit our Gurugram office or contact our team for advisory support." },
  "/esg-carbon-credit-and-sustainability-consulting-services": { path: "/esg-carbon-credit-and-sustainability-consulting-services", title: "ESG, Carbon Credit & Sustainability Consulting Services", description: "Sustaind is India's trusted Carbon Credit Services Consultant, ESG Advisory Service Consultant, IRFS Service Consultant & Sustainability Service Consultant. Headquartered in Gurugram with a presence in Saudi Arabia, we help organizations across industries achieve compliance, reduce emissions, and unlock sustainable growth." },
  "/meet-the-team": { path: "/meet-the-team", title: "Meet The Team | Sustaind", description: "Meet the leadership team at Sustaind, featuring experts in climate risk, ESG strategy, carbon accounting, sustainable healthcare, governance, and data-driven sustainability solutions." },
  "/privacy-policy": { path: "/privacy-policy", title: "Privacy Policy | Sustaind", description: "Read the privacy policy of Sustaind. Learn how we collect, use, and protect your data across ESG reporting, carbon emissions estimation, climate risk assessment, and compliance services." },
  ...Object.fromEntries(Object.values(servicePages).map((page) => [page.path, { path: page.path, title: page.title, description: page.description }]))
};

export function pageMetadata(page: StandaloneMeta): Metadata {
  return { title: page.title, description: page.description, alternates: { canonical: page.path }, openGraph: { title: page.title, description: page.description, url: page.path, type: "website" } };
}
