import { img, standaloneMeta } from "@/content/standalone";

export const aboutPage = {
  ...standaloneMeta["/about-us"],
  hero: img("/assets/11062b-c6ad8c65b8d44f14b4a3000e7f511e0c-mv2-jpg-e43b705020bc.jpg", "Eco-friendly buildings", 1440, 612),
  intro: ["Sustaind is a specialised ESG Advisory Service Consultant and Sustainability Service Consultant enabling organisations to integrate sustainability into core business strategies.", "We help businesses navigate climate risks, regulatory requirements, and ESG expectations while unlocking long-term value through responsible practices."],
  vision: "A future where sustainability drives business performance and global resilience.",
  mission: "To accelerate the transition toward sustainable, low-carbon, and socially responsible business ecosystems through practical, scalable, and data-backed solutions.",
  expertise: [
    ["Climate Change & GHG Inventorization", ["GHG inventories", "Climate risk and vulnerability assessments", "CDP reporting", "SBTi target setting"]],
    ["ESG Strategy, Reporting & Advisory", ["ESG reporting and disclosures", "Materiality assessment", "BRSR, EcoVadis, DJSI reporting"]],
    ["Assurance & Risk Advisory", ["Environmental and Social Due Diligence", "ESG risk screening"]],
    ["Monitoring, Evaluation & Impact Assessment", ["Impact assessments", "M&E frameworks", "Learning needs assessments"]],
    ["Strategic Advisory & Green Finance", ["Policy formulation and action plans", "Sustainability strategy", "Green finance enablement"]],
    ["Circular Economy & Sustainable Agriculture", ["Sustainable value chains", "Circular economy initiatives"]]
  ],
  projects: [
    ["Climate & ESG Projects", ["Climate risk and scenario analysis across sectors", "GHG accounting and decarbonisation pathways", "Climate and health vulnerability tools", "Green public procurement advisory"]],
    ["Reporting & Impact Projects", ["ESG and sustainability reporting aligned with global frameworks", "Corporate ESG framework development", "Just transition impact assessments"]],
    ["Public Sector & Environment", ["Climate landscape studies", "Water risk and investment studies", "Air quality capacity assessments"]],
    ["Risk & Finance", ["Enterprise risk management frameworks", "Finance transformation and cost optimisation", "SOX compliance and internal control systems"]]
  ],
  strengthImage: img("/assets/8ef393d429d64c5ab445f84c3e1337d2-jpg-15eade10e6f9.jpg", "Green building viewed from below", 900, 650),
  strength: "Our team brings cross-sectoral experience with deep domain expertise in sustainability, ESG, and climate action—delivering measurable impact across industries and geographies.",
  diagram: img("/assets/0446e3-b999ba461fdc4fc09627cbf35b0177e4-mv2-png-e6e97b470ea4.png", "About Us | Sustaind", 1920, 1080)
};

export const umbrellaPage = {
  ...standaloneMeta["/esg-carbon-credit-and-sustainability-consulting-services"],
  hero: img("/assets/11062b-853c1ec79d71437bba18202d42761e37-mv2-jpg-9be376623fc8.jpg", "Urban Green Space", 1440, 542),
  intro: [
    "At Sustaind, we believe sustainability is not merely a compliance obligation — it is a strategic advantage. As one of India's most trusted Carbon Credit Services Consultants and ESG Advisory Service Consultants, we deliver integrated, outcome-driven consulting services that help businesses build resilience, demonstrate accountability, and accelerate long-term growth aligned with global environmental and social standards.",
    "Headquartered in Gurugram, India, with an active presence in Saudi Arabia, Sustaind works across diverse industries — agriculture, healthcare, FMCG, logistics, energy, fintech, and government — bringing deep domain expertise, global framework knowledge, and on-ground execution capabilities to every engagement."
  ],
  portfolioHeading: "Our end-to-end service portfolio spans five core pillars:",
  portfolio: [
    ["Carbon Credit Services & Emissions Management", "/carbon-credit-service-consulting"],
    ["ESG Advisory, Reporting & Governance", "/esg-advisory-service-consultants"],
    ["IRFS (International Reporting Framework Standards) Compliance", "/irfs-service-consultant"],
    ["Climate Risk Assessment & Resilience Planning", "/climate-risk-assessment-consultants"],
    ["Sustainability Training & Capacity Building", "/sustainability-service-consultants"]
  ],
  closing: "Whether you are beginning your ESG journey or scaling an established sustainability programme, Sustaind's consultants provide the strategic clarity, technical rigour, and implementation support you need to achieve measurable impact.",
  pillars: [
    { heading: "Carbon Credit Services", accent: "Services", copy: "As a leading Carbon Credit Services Consultant in India and the Middle East, Sustaind helps organisations quantify, reduce, and monetise their carbon footprint. We develop GHG inventories compliant with ISO 14064 and the GHG Protocol, identify decarbonisation opportunities, and support your entry into voluntary and compliance carbon markets.", href: "/carbon-credit-service-consulting", linkedText: "Carbon Credit Services Consultant" },
    { heading: "ESG Advisory & Reporting", accent: "Reporting", copy: "Our ESG Advisory Service Consultants work with corporate leadership teams to build robust ESG frameworks, conduct materiality assessments, and produce disclosure-ready reports aligned with CDP, GRI, BRSR, SBTi, DJSI, EcoVadis, and IFC Performance Standards.", href: "/esg-advisory-service-consultants", linkedText: "ESG Advisory Service Consultants" },
    { heading: "IRFS Consulting", accent: "Consulting", copy: "Navigating International Reporting Framework Standards can be complex. Sustaind's IRFS Service Consultants provide end-to-end support — from gap analysis and data collection to assurance-ready report preparation — ensuring your organisation meets regulatory expectations while building stakeholder trust.", href: "/irfs-service-consultant", linkedText: "IRFS Service Consultants" },
    { heading: "Sustainability Strategy & Green Finance", accent: "Green Finance", copy: "Beyond reporting, our Sustainability Service Consultants help you build actionable strategies that unlock access to green finance, sustainability-linked instruments, and long-term value creation tied to environmental and social performance.", href: "/sustainability-service-consultants", linkedText: "Sustainability Service Consultants" },
    { heading: "Climate Risk Assessment", accent: "Assessment", copy: "We assess physical and transition climate risks using scenario analysis frameworks, sector-specific vulnerability tools, and climate adaptation planning methodologies — helping your business prepare for a climate-uncertain future.", href: "/climate-risk-assessment-consultants" },
    { heading: "Compliance Training & Capacity Building", accent: "Building", copy: "Sustainability transformation requires people. We deliver customised ESG and compliance training programmes — online and in-person — to build organisation-wide capability across functions, geographies, and leadership levels.", href: "/contact-us" }
  ],
  servicesDiagram: img("/assets/0446e3-6bb260d19a5440cfafc616f3afadc12d-mv2-png-aca7ba8d29c9.png", "Sustaind Services", 1920, 1080),
  why: [
    { emphasis: "Dual presence:", copy: "Gurugram, India & Saudi Arabia — serving South Asian and Middle East markets" },
    { copy: "Cross-industry expertise across 15+ sectors" },
    { emphasis: "Alignment with global standards:", copy: "GHG Protocol, ISO 14064, CDP, SBTi, IFC, GRI, BRSR" },
    { copy: "Projects delivered for clients supported by World Bank, UNICEF, and WHO" },
    { copy: "End-to-end capabilities from assessment to assurance" },
    { copy: "Multilingual, multi-geography delivery capability" }
  ],
  whyImage: img("/assets/11062b-0d0684a101fe4e36a74f6e3db0afb71c-mv2-jpg-a789cc188128.jpg", "Modern Office Lobby", 2464, 1856)
};

export const teamPage = {
  ...standaloneMeta["/meet-the-team"],
  hero: img("/assets/11062b-c57a3fdd0b144c8c9bc5f3309234596c-mv2-jpeg-9e7e1c04bcf2.jpg", "Person travelling by train", 1440, 482),
  members: [
    { name: "Summit Goyal", role: "Head of Governance", email: "summit@sustaind.in", linkedin: "https://www.linkedin.com/in/summit-goyal-00457a23/", image: img("/assets/0446e3-b8cbc41bda9a4beeade149cd6f20cdfe-mv2-png-91a956bbeca1.png", "Summit Goyal", 200, 200), bio: "Summit brings 17+ years of experience in Governance and Data Analysis, with a background in Risk Advisory at KPMG and Protiviti." },
    { name: "Gurvinder Singh", role: "Head of Social Responsibility", email: "gurvinder@sustaind.in", linkedin: "https://www.linkedin.com/in/gurvinder-singh-338565a/", image: img("/assets/0446e3-2570de86943a4f75902c04567498d800-mv2-png-8f817b4a018d.png", "Gurvinder Singh", 200, 200), bio: "With 18+ years in Governance, Compliance, and Reporting, Gurvinder specialises in CSR impact assessments across sectors." },
    { name: "Saurabh Verma", role: "Head of Climate Risk", email: "saurabh@sustaind.in", linkedin: "https://www.linkedin.com/in/verma-saurabh/", image: img("/assets/0446e3-b86754fbc6a34ab78867063f96980ac1-mv2-png-a4db8da71314.png", "Saurabh Verma", 200, 200), bio: "Former Director at Moody's, Saurabh has expertise in climate change, risk analysis, and compliance reporting." },
    { name: "Pankhuri Jain", role: "Climate Change Advisory · Sustainable Healthcare ESG", email: "pankhuri@sustaind.in", linkedin: "https://www.linkedin.com/in/pankhuri-jain-2b115a159/", image: img("/assets/0446e3-64f8582d8d4346bb9d24762c1baf59d8-mv2-png-db019662d980.png", "Pankhuri Jain", 200, 200), bio: "Pankhuri focuses on impact assessments, sustainable healthcare, and ESG initiatives, fostering collaborations with corporate and global partners." },
    { name: "Pranav Bhardwaj", role: "Climate Change Advisory · Sustainability ESG", email: "pranav@sustaind.in", linkedin: "https://www.linkedin.com/in/pranav-bhardwaj-740261a3/", image: img("/assets/0446e3-e1b0578864af4a8d8623ef3babb34d76-mv2-png-81c417301684.png", "Pranav Bhardwaj", 500, 500), bio: "Pranav specialises in climate risk, ESG reporting, and monitoring and evaluation for governments and multilateral organisations." }
  ],
  experience: ["Climate Change & GHG Inventorization", "ESG Strategy, Reporting & Advisory", "Assurance", "Monitoring, Evaluation & Impact Assessment", "Strategic Advisory", "Circular Economy & Sustainable Agriculture"],
  experienceImage: img("/assets/0446e3-82b859f955604a0fa9a2656e7c3285d5-mv2-png-efd416b0261c.png", "Team experience across sustainability domains", 1920, 1080)
};
