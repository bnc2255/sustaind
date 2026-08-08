import type { Metadata } from "next";
import { AboutPage } from "@/components/standalone-pages";
import { pageMetadata } from "@/content/standalone";
import { aboutPage } from "@/content/standalone-company";

export const metadata: Metadata = pageMetadata(aboutPage);

export default function AboutUsPage() {
  return <AboutPage data={aboutPage} />;
}
