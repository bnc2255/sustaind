import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  ["Facebook", "https://www.facebook.com/sustaind.india", "/assets/11062b-f4e3e7f537ff4762a1914aa14e3e36b9-mv2-png-589bf12a480d.png"],
  ["Instagram", "https://www.instagram.com/sustaind.india/", "/assets/11062b-603340b7bcb14e7785c7b65b233cd9f9-mv2-png-bc43511ebd47.png"],
  ["YouTube", "https://www.youtube.com/@sustain.d", "/assets/11062b-c67939a99eaf442d95d3f851857ceedf-mv2-png-b751ec640a2e.png"],
  ["LinkedIn", "https://www.linkedin.com/company/sustaindindia", "/assets/11062b-b5690303a8ff470e9b1c03a24aff140b-mv2-png-23b64a4d48d7.png"],
] as const;

export function SiteFooter() {
  return <footer className="site-container footer-wrap"><div className="site-footer">
    <div className="footer-social" aria-label="Sustaind social links">{socialLinks.map(([label, href, image]) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Image src={image} alt="" width={201} height={201} /></a>)}</div>
    <address className="footer-contact"><a href="tel:+919810575613">+91-98105-75613</a><a href="mailto:summit@sutaind.in">summit@sutaind.in</a><p>ILD Trade Centre, Sohna Road,<br />Gurugram, Haryana – 122018, India</p></address>
    <div className="footer-links"><Link href="/blog">Blogs</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/accessibility-statement">Accessibility Statement</Link><small>© 2026 by Sustaind India</small></div>
  </div></footer>;
}
