import { Shield, Car, MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FleetSection from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";
import { siteInfo } from "@/data/siteInfo";

export default function TravelsPage() {
  return (
    <div className="bg-warm-white min-h-screen pb-24 pt-16">
      {/* Ready to Book Your Ride Hero Section */}
      <section className="py-16 md:py-20 bg-[#F3F7FA] mb-16 rounded-b-[3rem]">
        <div className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-[#1E293B] mb-4">
            Ready to Book Your Ride?
          </h1>
          <p className="text-[#64748B] text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience hassle-free travel with Vizag Tour Packages. Professional service guaranteed.
          </p>

          {/* Features Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <span className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155]">
              <Shield size={18} className="text-[#3B82F6]" /> Verified Drivers
            </span>
            <span className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155]">
              <Car size={18} className="text-[#3B82F6]" /> Clean Vehicles
            </span>
            <span className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155]">
              <MapPin size={18} className="text-[#3B82F6]" /> GPS Tracking
            </span>
            <span className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155]">
              <Clock size={18} className="text-[#3B82F6]" /> 24/7 Service
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <a 
              href="/contact"
              className="w-full bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-500/30"
            >
              <Car size={24} /> Book Your Taxi Now
            </a>
            
            <div className="flex w-full gap-4">
              <a 
                href={`tel:${siteInfo.whatsapp}`}
                className="flex-1 bg-white hover:bg-gray-50 text-[#334155] py-3.5 px-6 rounded-full font-bold flex items-center justify-center gap-2 transition-colors border border-gray-200 shadow-sm"
              >
                <Phone size={20} /> Call Now
              </a>
              <a 
                href={siteInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#128C7E] hover:bg-[#075E54] text-white py-3.5 px-6 rounded-full font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Premium Fleet"
          subtitle="Choose from our well-maintained fleet of vehicles, each equipped with professional drivers and modern amenities."
        />
        
        {/* Fleet Section Carousel (Same as Home Page) */}
        <FleetSection vehicles={vehicles} />
      </div>
    </div>
  );
}
