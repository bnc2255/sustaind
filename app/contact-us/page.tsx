import type { Metadata } from "next";
import { ContactPage } from "@/components/standalone-pages";
import { pageMetadata } from "@/content/standalone";
import { contactPage } from "@/content/standalone-legal";

export const metadata: Metadata = pageMetadata(contactPage);

export default function ContactUsPage() {
  return <ContactPage data={contactPage} />;
}
