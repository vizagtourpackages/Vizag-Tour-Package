import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { siteInfo } from "@/data/siteInfo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import MobileBottomNav from "@/components/MobileBottomNav";
import EnquiryDrawer from "@/components/EnquiryDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
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
    <html lang="en" className={`${inter.variable} ${outfit.variable} bg-warm-white`}>
      <body className="antialiased min-h-screen flex flex-col bg-warm-white text-charcoal overflow-x-hidden">
        <Navbar />
        <main className="flex-1 pt-[72px]">{children}</main>
        <Footer />
        <div className="hidden md:block">
          <WhatsAppFAB />
        </div>
        <MobileBottomNav />
        <EnquiryDrawer />
      </body>
    </html>
  );
}
