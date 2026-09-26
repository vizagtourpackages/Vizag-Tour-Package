'use client'

import { Shield, Car, MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import FleetSection from "@/components/VehicleCard";
import { siteInfo } from "@/data/siteInfo";
import { useBooking } from "@/components/booking/BookingContext";
import type { Vehicle } from "@/data/vehicles";

import DynamicIcon from "@/components/admin/DynamicIcon";

export default function TravelsClient({ 
  vehicles,
  trustPoints = [],
  notes = []
}: { 
  vehicles: Vehicle[],
  trustPoints?: any[],
  notes?: any[]
}) {
  const { openBooking } = useBooking();

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

          {/* Features Marquee */}
          {trustPoints.length > 0 && (
            <div className="mb-10 overflow-hidden relative w-full group/marquee">
              <div className="flex gap-4 w-max animate-marquee group-hover/marquee:[animation-play-state:paused] whitespace-nowrap shrink-0 px-4">
                {trustPoints.map((tp, i) => (
                  <span key={i} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
                {/* Duplicates for seamless loop */}
                {trustPoints.map((tp, i) => (
                  <span key={`dup1-${i}`} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
                {trustPoints.map((tp, i) => (
                  <span key={`dup2-${i}`} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
                {trustPoints.map((tp, i) => (
                  <span key={`dup3-${i}`} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
                {trustPoints.map((tp, i) => (
                  <span key={`dup4-${i}`} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            <button 
              onClick={() => openBooking('cab', null)}
              className="w-full bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white py-4 px-8 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-500/30"
            >
              <Car size={24} /> Book Your Taxi Now
            </button>
          </div>
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Premium Fleet"
          subtitle="Choose from our well-maintained fleet of vehicles, each equipped with professional drivers and modern amenities."
        />
        
        {/* Fleet Section Carousel */}
        <FleetSection vehicles={vehicles} />

        {/* Our Main Cabs / Trust Points */}
        {trustPoints.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-heading text-center text-[#1E293B] mb-8">Our Main Cabs</h2>
            <div className="overflow-hidden relative w-full group/marquee">
              <div className="flex gap-4 w-max animate-marquee group-hover/marquee:[animation-play-state:paused] whitespace-nowrap shrink-0 px-4">
                {trustPoints.map((tp, i) => (
                  <span key={i} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
                {/* Duplicates for seamless loop */}
                {trustPoints.map((tp, i) => (
                  <span key={`main-dup1-${i}`} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
                {trustPoints.map((tp, i) => (
                  <span key={`main-dup2-${i}`} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
                {trustPoints.map((tp, i) => (
                  <span key={`main-dup3-${i}`} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
                {trustPoints.map((tp, i) => (
                  <span key={`main-dup4-${i}`} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm text-sm font-semibold text-[#334155] shrink-0">
                    <DynamicIcon name={tp.icon} size={18} className="text-[#3B82F6]" /> {tp.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notes Section */}
        {notes.length > 0 && (
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MessageCircle className="text-blue-600" /> Important Information
            </h2>
            <div className="space-y-6">
              {notes.map((note) => (
                <div key={note.id} className="bg-gray-50 rounded-2xl p-6">
                  {note.title && <h3 className="font-bold text-gray-900 mb-2">{note.title}</h3>}
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{note.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
