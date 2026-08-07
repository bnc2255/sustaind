"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/esg-carbon-credit-and-sustainability-consulting-services", label: "Services" },
  { href: "/about-us", label: "About" },
  { href: "/meet-the-team", label: "Meet The Team" },
  { href: "/contact-us", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
          {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? "is-active" : undefined}>{link.label}</Link>)}
          <button className="search-button" type="button" aria-label="Search"><span aria-hidden="true" /></button>
        </nav>
        <button ref={buttonRef} className="menu-button" type="button" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span><span aria-hidden="true" />
        </button>
      </div>
      {open && <div className="mobile-menu" id="mobile-navigation"><nav className="site-container" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? "is-active" : undefined}>{link.label}</Link>)}<button type="button" onClick={closeMenu}>Close menu</button></nav></div>}
    </header>
  );
}
