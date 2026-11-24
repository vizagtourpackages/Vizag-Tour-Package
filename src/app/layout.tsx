import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { siteInfo } from "@/data/siteInfo";
import ScrollToTop from "@/components/ScrollToTop";

// Editorial display serif + clean grotesk body
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteInfo.name}`,
    default: `${siteInfo.name} - ${siteInfo.tagline}`,
  },
  description: siteInfo.intro,
  keywords: ["Vizag Tour Packages", "Araku Valley", "Lambasingi", "Visakhapatnam Tourism", "Travel Agency Vizag"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-warm-white text-charcoal">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
