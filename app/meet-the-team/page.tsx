import type { Metadata } from "next";
import { TeamPage } from "@/components/standalone-pages";
import { pageMetadata } from "@/content/standalone";
import { teamPage } from "@/content/standalone-company";

export const metadata: Metadata = pageMetadata(teamPage);

export default function MeetTheTeamPage() {
  return <TeamPage data={teamPage} />;
}
