import type { Metadata } from "next";
import { UmbrellaPage } from "@/components/standalone-pages";
import { pageMetadata } from "@/content/standalone";
import { umbrellaPage } from "@/content/standalone-company";

export const metadata: Metadata = pageMetadata(umbrellaPage);

export default function UmbrellaServicesPage() {
  return <UmbrellaPage data={umbrellaPage} />;
}
