import type { Metadata } from "next";
import "./globals.css";
import { ScrollCopyOpacity } from "@/components/ScrollCopyOpacity";
import { SiteOpening } from "@/components/SiteOpening";

export const metadata: Metadata = {
  title: "Taz Investments — Early-Stage Capital",
  description:
    "Investor-first partner for seed and Series A. We move with clear terms, fast diligence, and steady support for founders building real businesses.",
  openGraph: {
    title: "Taz Investments — Early-Stage Capital",
    description:
      "Investor-first partner for seed and Series A. Clear terms, fast diligence, steady founder support.",
    images: ["/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <SiteOpening />
        <ScrollCopyOpacity />
        {children}
      </body>
    </html>
  );
}
