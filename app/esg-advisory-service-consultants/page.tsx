import type { Metadata } from "next";
import { ServicePage } from "@/components/standalone-pages";
import { pageMetadata, servicePages } from "@/content/standalone";

export const metadata: Metadata = pageMetadata(servicePages["esg-advisory-service-consultants"]);

export default function EsgAdvisoryServiceConsultantsPage() {
  return <ServicePage data={servicePages["esg-advisory-service-consultants"]} />;
}
