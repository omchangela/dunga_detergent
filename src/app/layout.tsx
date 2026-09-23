import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeProvider from "@/components/ThemeProvider";

import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Monagodu 501 — Powerful Cleaning. Brilliant Freshness.",
  description:
    "Monagodu 501 delivers high-quality cleaning products — liquid detergents, dishwash liquids, and herbal bath soaps — trusted by 8,000+ happy customers across India.",
  keywords:
    "detergent, liquid detergent, dishwash liquid, bath soap, herbal soap, cleaning products, Monagodu 501, AVD",
  openGraph: {
    title: "Monagodu 501 — Powerful Cleaning. Brilliant Freshness.",
    description:
      "Advanced formula that removes tough stains and gives long lasting freshness. ISO certified, GMP certified, Make in India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
