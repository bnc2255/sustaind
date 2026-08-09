import { img, standaloneMeta } from "@/content/standalone";

export const contactPage = {
  ...standaloneMeta["/contact-us"],
  image: img("/assets/11062b-e454078d2ded40a69b25f4016b234211-mv2-jpg-b282c212e144.jpg", "Green buildings", 496, 887),
  intro: "Reach out to our sustainability experts for ESG strategy, climate advisory, and implementation support."
};

export const accessibilityPage = {
  ...standaloneMeta["/accessibility-statement"],
  intro: ["Sustaind is committed to ensuring that our website and digital services are accessible to people with disabilities. We are continually improving the user experience and applying relevant accessibility standards to our content and interfaces."],
  sections: [
    ["Our commitment", ["We aim to provide an inclusive digital experience through clear content, meaningful alternative text, keyboard-friendly interactions, sufficient colour contrast, and responsive layouts across devices."]],
    ["Feedback and assistance", ["If you experience an accessibility barrier or need information in an alternative format, please contact us at summit@sustaind.in. We welcome feedback and will make reasonable efforts to respond and improve the experience."]]
  ]
};

export const privacyPage = {
  ...standaloneMeta["/privacy-policy"],
  intro: ["At Sustaind, protecting your data is a core part of our commitment to responsible and ethical business practices. As a sustainability consulting firm, we handle sensitive organisational and environmental data and ensure it is managed with high standards of confidentiality and security.", "This Privacy Policy outlines how we collect, use, and safeguard information across ESG and sustainability reporting, supply-chain audits, carbon emissions estimation, climate risk assessment, and compliance training."],
  sections: [
    ["1. Our Privacy Philosophy", ["We follow a purpose-driven and minimal data collection approach, gathering only information necessary to deliver our consulting services. Your data is never used beyond its intended scope."]],
    ["2. Information We Collect", ["We may collect business and operational information, contact and professional details, and digital and technical data needed to deliver services and improve our website."], [["Business & Operational Information", "Company operations, infrastructure, processes, ESG metrics, sustainability disclosures, emissions data, and supply-chain information."], ["Contact & Professional Details", "Name, email address, phone number, job title, and organisation."], ["Digital & Technical Data", "IP address, browser type, device information, and website interaction data through analytics tools."]]],
    ["3. How We Use Your Information", ["We use data to develop ESG and sustainability reports, conduct carbon and climate assessments, execute supply-chain audits, deliver training, communicate project updates, and provide advisory services. We do not sell or misuse data for unrelated purposes."]],
    ["4. Data Sharing & Confidentiality", ["We do not sell or commercially distribute your data. Information is shared only with authorised professionals under confidentiality agreements or when required by law or regulatory authorities."]],
    ["5. Data Security Measures", ["We use secure servers, encrypted communication channels, controlled access, and regular system monitoring and updates to protect information."]],
    ["6. Data Retention", ["We retain data only as long as necessary to fulfil service requirements, comply with legal obligations, or resolve disputes. When no longer needed, data is securely deleted or archived."]],
    ["7. Your Data Rights & Choices", ["You may request access to, correction of, or deletion of personal data where legally permitted, and you may withdraw consent for specific uses. Contact summit@sustaind.in to exercise these rights."]],
    ["8. Cookies & Website Analytics", ["Our website may use cookies and similar technologies to improve functionality and understand how users interact with our content. You can manage or disable cookies through your browser settings."]],
    ["9. Third-Party Links", ["Our website may contain links to external platforms. Sustaind is not responsible for the privacy practices or content of third-party websites."]],
    ["10. Updates to This Policy", ["We may revise this Privacy Policy periodically to reflect changes in regulations or services. Updates will be posted on this page with the revised effective date."]],
    ["11. Contact Us", ["If you have questions or concerns regarding this Privacy Policy, please contact Sustaind at summit@sustaind.in or visit www.sustaind.in."]]
  ]
};
