import type { Metadata } from "next";
import { siteInfo } from "@/data/siteInfo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import MobileBottomNav from "@/components/MobileBottomNav";
import EnquiryDrawer from "@/components/EnquiryDrawer";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteInfo.name}`,
    default: `${siteInfo.name} - ${siteInfo.tagline}`,
  },
  description: siteInfo.intro,
  keywords: ["Vizag Tour Packages", "Araku Valley", "Lambasingi", "Visakhapatnam Tourism", "Travel Agency Vizag"],
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[72px] overflow-x-hidden">{children}</main>
      <Footer />
      <div className="hidden md:block">
        <WhatsAppFAB />
      </div>
      <MobileBottomNav />
      <EnquiryDrawer />
    </>
  );
}
