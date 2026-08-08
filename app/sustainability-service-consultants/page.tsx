import type { Metadata } from "next";
import { ServicePage } from "@/components/standalone-pages";
import { pageMetadata, servicePages } from "@/content/standalone";

export const metadata: Metadata = pageMetadata(servicePages["sustainability-service-consultants"]);

export default function SustainabilityServiceConsultantsPage() {
  return <ServicePage data={servicePages["sustainability-service-consultants"]} />;
}
