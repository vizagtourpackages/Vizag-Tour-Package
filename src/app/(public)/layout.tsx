import type { Metadata } from "next";
import { siteInfo } from "@/data/siteInfo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LatestUpdatesSection from "@/components/LatestUpdatesSection";
import LatestUpdatesWrapper from "@/components/LatestUpdatesWrapper";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import MobileBottomNav from "@/components/MobileBottomNav";
import SmoothScroll from "@/components/SmoothScroll";
import { BookingProvider } from "@/components/booking/BookingContext";
import BookingModalController from "@/components/booking/BookingModalController";

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
    <BookingProvider>
      <SmoothScroll>
        <div className="site-theme flex flex-1 flex-col">
          <Navbar />
          {/* overflow-x-clip (not hidden) so sticky sidebars inside still stick */}
          <main className="flex-1 pt-[72px] overflow-x-clip">{children}</main>
          <LatestUpdatesWrapper>
            <LatestUpdatesSection />
          </LatestUpdatesWrapper>
          <Footer />
          <div className="hidden xl:block">
            <WhatsAppFAB />
          </div>
          <MobileBottomNav />
          <BookingModalController />
        </div>
      </SmoothScroll>
    </BookingProvider>
  );
}
