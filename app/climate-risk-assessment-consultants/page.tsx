import type { Metadata } from "next";
import { ServicePage } from "@/components/standalone-pages";
import { pageMetadata, servicePages } from "@/content/standalone";

export const metadata: Metadata = pageMetadata(servicePages["climate-risk-assessment-consultants"]);

export default function ClimateRiskAssessmentConsultantsPage() {
  return <ServicePage data={servicePages["climate-risk-assessment-consultants"]} />;
}
