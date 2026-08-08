import type { Metadata } from "next";
import { ServicePage } from "@/components/standalone-pages";
import { pageMetadata, servicePages } from "@/content/standalone";

export const metadata: Metadata = pageMetadata(servicePages["carbon-credit-service-consulting"]);

export default function CarbonCreditServiceConsultingPage() {
  return <ServicePage data={servicePages["carbon-credit-service-consulting"]} />;
}
