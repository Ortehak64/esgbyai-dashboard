import type { Metadata } from "next";
import FeaturesPageClient from "../../components/FeaturesPageClient";

export const metadata: Metadata = {
  title: "Features | ESGbyAI",
  description:
    "Explore ESGbyAI’s features: automated compliance, AI insights, dashboards, and risk detection.",
};

export default function Page() {
  return <FeaturesPageClient />;
}
