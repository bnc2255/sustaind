import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sustaind.in"),
  title: { default: "Sustaind – ESG, Carbon Credit Services Consultants", template: "%s | Sustaind" },
  description: "Sustaind helps businesses implement ESG frameworks, climate risk assessments, carbon credit services consultants, and sustainable value chain solutions across agriculture, manufacturing, finance, and public systems.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></body></html>;
}
