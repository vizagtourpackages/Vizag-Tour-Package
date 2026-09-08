import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import DestinationCard from "@/components/DestinationCard";
import GuideCard from "@/components/GuideCard";
import EventCard from "@/components/EventCard";
import FleetSection from "@/components/VehicleCard";
import MobileTrustBanner from "@/components/MobileTrustBanner";
import CustomizeTourForm from "@/components/CustomizeTourForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import ScrollCarousel from "@/components/ScrollCarousel";
import {
  trendingPackages,
  oneDayPackages,
} from "@/data/packages";
import { topPlaces } from "@/data/destinations";
import { guides } from "@/data/guides";
import { events } from "@/data/events";
import { vehicles } from "@/data/vehicles";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Mobile Trust Banner */}
      <MobileTrustBanner />

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
          <div className="text-center mb-2">
            <span className="inline-block text-xs font-bold text-ocean bg-ocean/10 border border-ocean/20 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Fleet
            </span>
          </div>
          <SectionHeading
            title="Our Premium Fleet"
            subtitle="Choose from our well-maintained fleet of vehicles, each equipped with professional drivers and modern amenities."
          />
          <FleetSection vehicles={vehicles} />
        </div>
      </section>

      {/* Top Destinations */}
      <section className="section-padding bg-sand-light">
        <div className="container-max">
          <SectionHeading
            title="Top Destinations from Vizag"
            subtitle="Popular outstation routes with transparent pricing. Book a comfortable cab for temple tours, pilgrimages, and city trips."
          />
          <ScrollCarousel>
            {topPlaces.map((destination) => (
              <div key={destination.id} className="min-w-[280px] w-[calc(25%-15px)] flex-shrink-0 snap-start">
                <DestinationCard destination={destination} />
              </div>
            ))}
          </ScrollCarousel>
          <div className="mt-12 text-center">
            <Link href="/route-map" className="btn-secondary">
              View All Routes <ArrowRight size={18} />
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

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {/* Badge + Heading */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold text-ocean bg-ocean/10 border border-ocean/20 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-3">Your Trusted Travel Partner</h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto">
              With years of experience serving Visakhapatnam, we&apos;ve built our reputation on reliability, safety, and customer satisfaction.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: "5+", label: "Years Experience", icon: "🏆" },
              { value: "10,000+", label: "Happy Customers", icon: "👥" },
              { value: "50+", label: "Professional Drivers", icon: "🛡️" },
              { value: "24/7", label: "Customer Support", icon: "📞" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-sand-light rounded-2xl p-6 text-center border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-ocean/10 flex items-center justify-center mx-auto mb-3 text-2xl">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-1">{stat.value}</div>
                <div className="text-xs font-medium text-charcoal/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "Local Expertise",
                description: "5+ years of dedicated service in Visakhapatnam with deep knowledge of local routes and hidden gems.",
                icon: "📍",
              },
              {
                title: "Safety First",
                description: "All drivers are thoroughly verified with clean driving records. Regular vehicle maintenance ensures your safety.",
                icon: "🛡️",
              },
              {
                title: "Transparent Pricing",
                description: "Clear, upfront pricing with no hidden charges. What you see is what you pay — always.",
                icon: "💳",
              },
              {
                title: "24/7 Availability",
                description: "Round-the-clock service for all your transportation needs. We're here whenever you need us.",
                icon: "⏰",
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-sand-light rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-ocean/10 flex items-center justify-center shrink-0 text-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-1">{feature.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-sand-light rounded-2xl p-8 text-center border border-gray-100">
            <h3 className="font-heading text-xl sm:text-2xl text-charcoal mb-2">Ready to Experience the Difference?</h3>
            <p className="text-charcoal/60 text-sm mb-5 max-w-lg mx-auto">
              Join thousands of satisfied customers who trust us for their transportation needs.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="/contact" className="btn-primary">Book Online</a>
              <span className="text-charcoal/50 text-sm">or call <a href="tel:+919966363662" className="font-semibold text-charcoal hover:text-ocean transition-colors">+91 9966363662</a></span>
            </div>
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
