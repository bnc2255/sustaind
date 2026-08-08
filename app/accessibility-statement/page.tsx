import type { Metadata } from "next";
import { LegalPage } from "@/components/standalone-pages";
import { pageMetadata } from "@/content/standalone";
import { accessibilityPage } from "@/content/standalone-legal";

export const metadata: Metadata = pageMetadata(accessibilityPage);

export default function AccessibilityStatementPage() {
  return <LegalPage data={accessibilityPage} />;
}
