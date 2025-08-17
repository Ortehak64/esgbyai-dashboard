// app/dashboard/page.tsx
import type { Metadata } from "next";
import DashboardPageClient from "@/components/DashboardPageClient"; // Client Component (has "use client")

export const metadata: Metadata = {
  title: "Dashboard | ESGbyAI",
  description: "Track emissions, savings, initiatives, and pillar maturity.",
};

export default function DashboardPage() {
  // Server Component rendering a Client Component is fully supported
  return <DashboardPageClient />;
}
