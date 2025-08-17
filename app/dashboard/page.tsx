import type { Metadata } from "next";
import DashboardPageClient from "@/components/DashboardPageClient";

export const metadata: Metadata = {
  title: "Dashboard | ESGbyAI",
  description: "Track emissions, savings, initiatives, and pillar maturity.",
};

export default function DashboardPage() {
  return <DashboardPageClient />;
}
