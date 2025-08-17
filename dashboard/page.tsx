import type { Metadata } from "next";
import DashboardPageClient from "../../components/DashboardPageClient";

export const metadata: Metadata = {
  title: "Dashboard | ESGbyAI",
  description:
    "Visualize ESG data with AI-powered analytics and compliance dashboards.",
};

export default function Page() {
  return <DashboardPageClient />;
}
