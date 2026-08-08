import type { Metadata } from "next";
import { LegalPage } from "@/components/standalone-pages";
import { pageMetadata } from "@/content/standalone";
import { privacyPage } from "@/content/standalone-legal";

export const metadata: Metadata = pageMetadata(privacyPage);

export default function PrivacyPolicyPage() {
  return <LegalPage data={privacyPage} />;
}
