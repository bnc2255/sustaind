import type { Metadata } from "next";
import { ServicePage } from "@/components/standalone-pages";
import { pageMetadata, servicePages } from "@/content/standalone";

export const metadata: Metadata = pageMetadata(servicePages["irfs-service-consultant"]);

export default function IrfsServiceConsultantPage() {
  return <ServicePage data={servicePages["irfs-service-consultant"]} />;
}
