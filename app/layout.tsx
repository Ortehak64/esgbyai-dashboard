import "../styles/tailwind.css"; // ← use this instead of "./globals.css"
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterAwareChatButton from "@/components/FooterAwareChatButton";

export const metadata: Metadata = {
  title: "ESGbyAI™ | AI-powered ESG Reporting & Sustainability Intelligence",
  description:
    "Streamline ESG compliance, automate CSRD/GRI/SASB/ISSB reporting, and unlock insights with AI-powered dashboards and an ESG assistant.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="pt-28 md:pt-32">{children}</main>
        <Footer />
        {/* Floating AI-bot chat button with smooth hide/show */}
        <FooterAwareChatButton />
      </body>
    </html>
  );
}
