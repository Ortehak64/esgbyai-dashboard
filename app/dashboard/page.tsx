// dashboard/page.tsx  (root-level route)
import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Use the alias and load on the client only (charts & window APIs)
const DashboardPageClient = dynamic(
  () => import("@/components/DashboardPageClient"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Dashboard | ESGbyAI",
  description: "Track emissions, savings, initiatives, and pillar maturity.",
};

export default function Page() {
  return <DashboardPageClient />;
}
