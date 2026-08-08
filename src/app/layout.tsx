import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { siteInfo } from "@/data/siteInfo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
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
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
