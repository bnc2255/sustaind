"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const serviceLinks = [
  { href: "/carbon-credit-service-consulting", label: "Carbon Credit" },
  { href: "/esg-advisory-service-consultants", label: "ESG Advisory" },
  { href: "/irfs-service-consultant", label: "IRFS Service" },
  { href: "/sustainability-service-consultants", label: "Sustainability Service" },
  { href: "/climate-risk-assessment-consultants", label: "Climate Risk Assessment" },
];

const links = [
  { href: "/", label: "Home", className: "site-nav__link--home" },
  { href: "/esg-carbon-credit-and-sustainability-consulting-services", label: "Services", className: "site-nav__link--services" },
  { href: "/about-us", label: "About", className: "site-nav__link--about" },
  { href: "/meet-the-team", label: "Meet The Team", className: "site-nav__link--team" },
  { href: "/contact-us", label: "Contact", className: "site-nav__link--contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const servicesActive = pathname === links[1].href || serviceLinks.some((link) => pathname === link.href);

  function closeMenu() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link href="/" className="site-logo" aria-label="Sustaind home">
          <Image src="/assets/7afb9a-433a5bb49ea3439e8a87e0e79c303033-mv2-png-46bde764f709.png" alt="BNC Sustaind" width={813} height={813} priority />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href={links[0].href} className={`site-nav__link ${links[0].className}${pathname === links[0].href ? " is-active" : ""}`}>{links[0].label}</Link>
          <div className="site-nav__services">
            <Link href={links[1].href} className={`site-nav__link ${links[1].className}${servicesActive ? " is-active" : ""}`}>{links[1].label}</Link>
            <div className="site-nav__submenu" aria-label="Services">
              {serviceLinks.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? "is-active" : undefined}>{link.label}</Link>)}
            </div>
          </div>
          {links.slice(2).map((link) => <Link key={link.href} href={link.href} className={`site-nav__link ${link.className}${pathname === link.href ? " is-active" : ""}`}>{link.label}</Link>)}
          <button className="search-button" type="button" aria-label="Search"><span aria-hidden="true" /></button>
        </nav>
        <button ref={buttonRef} className="menu-button" type="button" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span><span aria-hidden="true" />
        </button>
      </div>
      {open && <div className="mobile-menu" id="mobile-navigation"><nav className="site-container" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href || (link.label === "Services" && servicesActive) ? "is-active" : undefined}>{link.label}</Link>)}<button type="button" onClick={closeMenu}>Close menu</button></nav></div>}
    </header>
  );
}
