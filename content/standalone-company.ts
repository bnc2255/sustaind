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
  diagram: img("/assets/0446e3-bd315a92555d412a8e32d93ffa4e6d58-mv2-png-7de79ff2e6de.png", "Sustaind expertise and project experience", 1000, 600)
};

export const umbrellaPage = {
  ...standaloneMeta["/esg-carbon-credit-and-sustainability-consulting-services"],
  hero: img("/assets/11062b-853c1ec79d71437bba18202d42761e37-mv2-jpg-9be376623fc8.jpg", "Urban green space", 1440, 542),
  intro: ["At Sustaind, sustainability is not merely a compliance obligation—it is a strategic advantage. We deliver integrated, outcome-driven consulting services that help businesses build resilience, demonstrate accountability, and accelerate long-term growth aligned with global standards.", "Headquartered in Gurugram, India, with an active presence in Saudi Arabia, Sustaind works across diverse industries, bringing deep domain expertise, global framework knowledge, and on-ground execution capabilities to every engagement."],
  pillars: [
    ["Carbon Credit Services", "Measure, reduce, and manage emissions through GHG accounting, decarbonisation roadmaps, and credible carbon-market access.", "/carbon-credit-service-consulting"],
    ["ESG Advisory & Reporting", "Build ESG strategy, materiality, governance, supply-chain, and disclosure systems aligned with global frameworks.", "/esg-advisory-service-consultants"],
    ["IRFS Consulting", "Prepare for sustainability disclosures with gap analysis, data systems, report structuring, controls, and assurance readiness.", "/irfs-service-consultant"],
    ["Sustainability Strategy & Green Finance", "Turn sustainability ambition into practical strategies, circular value chains, green finance frameworks, and measurable impact.", "/sustainability-service-consultants"],
    ["Climate Risk Assessment", "Identify physical and transition risks, run scenario analysis, and develop adaptation strategies for resilient operations.", "/climate-risk-assessment-consultants"],
    ["Compliance Training & Capacity Building", "Build organisation-wide capability through customised training for boards, leaders, finance teams, and operations.", "/contact-us"]
  ],
  why: ["Dual presence: Gurugram, India and Saudi Arabia", "Cross-industry expertise across 15+ sectors", "Alignment with GHG Protocol, ISO 14064, CDP, SBTi, IFC, GRI, and BRSR", "Projects delivered for clients supported by World Bank, UNICEF, and WHO", "End-to-end capabilities from assessment to assurance", "Multilingual, multi-geography delivery capability"],
  whyImage: img("/assets/11062b-0d0684a101fe4e36a74f6e3db0afb71c-mv2-jpg-a789cc188128.jpg", "Modern office lobby", 900, 650)
};

export const teamPage = {
  ...standaloneMeta["/meet-the-team"],
  hero: img("/assets/11062b-c57a3fdd0b144c8c9bc5f3309234596c-mv2-jpeg-9e7e1c04bcf2.jpg", "Person travelling by train", 1440, 482),
  members: [
    { name: "Summit Goyal", role: "Head of Governance", email: "summit@sustaind.in", linkedin: "https://www.linkedin.com/in/summit-goyal-00457a23/", image: img("/assets/0446e3-b8cbc41bda9a4beeade149cd6f20cdfe-mv2-png-91a956bbeca1.png", "Summit Goyal", 200, 200), bio: "Summit brings 17+ years of experience in Governance and Data Analysis, with a background in Risk Advisory at KPMG and Protiviti." },
    { name: "Gurvinder Singh", role: "Head of Social Responsibility", email: "gurvinder@sustaind.in", linkedin: "https://www.linkedin.com/in/gurvinder-singh-338565a/", image: img("/assets/0446e3-2570de86943a4f75902c04567498d800-mv2-png-8f817b4a018d.png", "Gurvinder Singh", 200, 200), bio: "With 18+ years in Governance, Compliance, and Reporting, Gurvinder specialises in CSR impact assessments across sectors." },
    { name: "Saurabh Verma", role: "Head of Climate Risk", email: "saurabh@sustaind.in", linkedin: "https://www.linkedin.com/in/verma-saurabh/", image: img("/assets/0446e3-b86754fbc6a34ab78867063f96980ac1-mv2-png-a4db8da71314.png", "Saurabh Verma", 200, 200), bio: "Former Director at Moody's, Saurabh has expertise in climate change, risk analysis, and compliance reporting." },
    { name: "Pankhuri Jain", role: "Climate Change Advisory · Sustainable Healthcare ESG", email: "pankhuri@sustaind.in", linkedin: "https://www.linkedin.com/in/pankhuri-jain-2b115a159/", image: img("/assets/0446e3-64f8582d8d4346bb9d24762c1baf59d8-mv2-png-db019662d980.png", "Pankhuri Jain", 200, 200), bio: "Pankhuri focuses on impact assessments, sustainable healthcare, and ESG initiatives, fostering collaborations with corporate and global partners." },
    { name: "Pranav Bhardwaj", role: "Climate Change Advisory · Sustainability ESG", email: "pranav@sustaind.in", linkedin: "https://www.linkedin.com/in/pranav-bhardwaj-740261a3/", image: img("/assets/0446e3-82b859f955604a0fa9a2656e7c3285d5-mv2-png-efd416b0261c.png", "Pranav Bhardwaj", 200, 200), bio: "Pranav specialises in climate risk, ESG reporting, and monitoring and evaluation for governments and multilateral organisations." }
  ],
  experience: ["Climate Change & GHG Inventorization", "ESG Strategy, Reporting & Advisory", "Assurance", "Monitoring, Evaluation & Impact Assessment", "Strategic Advisory", "Circular Economy & Sustainable Agriculture"],
  experienceImage: img("/assets/0446e3-e1b0578864af4a8d8623ef3babb34d76-mv2-png-81c417301684.png", "Team experience across sustainability domains", 1000, 600)
};
