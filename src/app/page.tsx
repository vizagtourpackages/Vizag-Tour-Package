import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import DestinationCard from "@/components/DestinationCard";
import GuideCard from "@/components/GuideCard";
import EventCard from "@/components/EventCard";
import VehicleCard from "@/components/VehicleCard";
import StatsCounter from "@/components/StatsCounter";
import CustomizeTourForm from "@/components/CustomizeTourForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import {
  trendingPackages,
  oneDayPackages,
  pilgrimagePackages,
} from "@/data/packages";
import { topPlaces } from "@/data/destinations";
import { guides } from "@/data/guides";
import { events } from "@/data/events";
import { vehicles } from "@/data/vehicles";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Trending Packages */}
      <section className="section-padding bg-sand-light relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        
        <div className="container-max relative z-10">
          <SectionHeading
            title="Trending Packages"
            subtitle="Explore our most popular, handpicked itineraries designed for the perfect Vizag experience."
          />
          <div className="mobile-carousel-container gap-4">
            {trendingPackages.map((pkg) => (
              <div key={pkg.id} className="mobile-carousel-item">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/tour-packages" className="btn-primary">
              View All Packages <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Customize Your Tour */}
      <section className="section-padding bg-charcoal relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container-max relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="lg:w-1/2">
              <SectionHeading
                title="Customize Your Dream Tour"
                subtitle="Tell us your preferences and our travel experts will design a personalized itinerary just for you."
                centered={false}
                light
              />
              
              <div className="space-y-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-coral font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Fill the Form</h4>
                    <p className="text-white/60 text-sm">Provide your travel dates, group size, and preferences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-coral font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Get a Quote</h4>
                    <p className="text-white/60 text-sm">We&apos;ll send you a customized itinerary with the best pricing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-coral font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Confirm & Travel</h4>
                    <p className="text-white/60 text-sm">Approve the plan and get ready for a memorable vacation.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <CustomizeTourForm />
            </div>
          </div>
        </div>
      </section>

      {/* Fleet / Vehicles */}
      <section className="section-padding bg-warm-white">
        <div className="container-max">
          <SectionHeading
            title="Our Premium Fleet"
            subtitle="Travel in comfort and style. We offer a wide range of well-maintained vehicles for all group sizes."
          />
          <div className="mobile-carousel-container gap-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="mobile-carousel-item">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Tourist Places */}
      <section className="section-padding bg-sand-light">
        <div className="container-max">
          <SectionHeading
            title="Top Places to Visit in Vizag"
            subtitle="Discover the breathtaking beaches, ancient temples, and lush hill stations of the City of Destiny."
          />
          <div className="mobile-carousel-container gap-4">
            {topPlaces.slice(0, 8).map((destination) => (
              <div key={destination.id} className="mobile-carousel-item">
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/route-map" className="btn-secondary">
              View Route Map <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* One Day Packages */}
      <section className="section-padding bg-warm-white">
        <div className="container-max">
          <SectionHeading
            title="One Day Sightseeing Packages"
            subtitle="Short on time? Explore the best of Vizag and surrounding areas in a single day."
          />
          <div className="mobile-carousel-container gap-4 max-w-5xl mx-auto">
            {oneDayPackages.map((pkg) => (
              <div key={pkg.id} className="mobile-carousel-item">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilgrimage Packages */}
      <section className="section-padding bg-ocean relative">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTIwIDAgTDIwIDQwIE0wIDIwIEw0MCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] mix-blend-overlay"></div>
        <div className="container-max relative z-10">
          <SectionHeading
            title="Spiritual Journeys"
            subtitle="Embark on a divine pilgrimage to ancient and revered temples across Andhra Pradesh."
            light
          />
          <div className="mobile-carousel-container gap-4 pb-6">
            {pilgrimagePackages.map((pkg) => (
              <div key={pkg.id} className="mobile-carousel-item bg-white rounded-2xl overflow-hidden shadow-xl transform transition-transform md:hover:-translate-y-2 duration-300">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Travel Guides */}
      <section className="section-padding bg-sand-light">
        <div className="container-max">
          <SectionHeading
            title="Travel Guides & Things to Do"
            subtitle="Expert tips and recommendations to make the most of your Vizag vacation."
          />
          <div className="mobile-carousel-container gap-4">
            {guides.map((guide) => (
              <div key={guide.id} className="mobile-carousel-item">
                <GuideCard guide={guide} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-warm-white">
        <div className="container-max">
          <SectionHeading
            title="Upcoming Events in 2026"
            subtitle="Plan your trip around these exciting activities and mega events happening in Vizag."
          />
          <div className="mobile-carousel-container gap-4">
            {events.map((event) => (
              <div key={event.id} className="mobile-carousel-item">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-sand-light overflow-hidden">
        <div className="container-max">
          <SectionHeading
            title="What Our Travelers Say"
            subtitle="Don't just take our word for it. Read honest reviews from our happy customers."
          />
          <TestimonialsSection />
        </div>
      </section>
    </>
  );
}
