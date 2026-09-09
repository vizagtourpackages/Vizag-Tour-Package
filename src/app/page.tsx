import Link from "next/link";
import { ArrowRight, Car, Plane, MapPin, Building, Heart, Map as MapIcon } from "lucide-react";
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
import { hotels } from "@/data/hotels";
import HotelCard from "@/components/HotelCard";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Mobile Trust Banner */}
      <MobileTrustBanner />

      {/* Our Services */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-ocean/5 blur-[120px]"></div>
        </div>

        <div className="container-max">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-ocean bg-ocean/5 border border-ocean/10 px-5 py-2 rounded-full uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-ocean animate-pulse"></span>
              Our Services
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl text-charcoal mb-4">What We Offer</h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
              Experience the best of Visakhapatnam with our premium, reliable, and comfortable travel services.
            </p>
          </div>

          <ScrollCarousel>
            {[
              {
                title: "Local Taxi Service in Vizag",
                description: "24/7 local taxi service in Visakhapatnam for city rides, shopping, office travel, railway station and hospital visits.",
                icon: <Car size={24} strokeWidth={1.5} />,
              },
              {
                title: "Airport Taxi Service",
                description: "Reliable Vizag Airport taxi with on-time pickup & drop, flight tracking and affordable fares.",
                icon: <Plane size={24} strokeWidth={1.5} />,
              },
              {
                title: "Outstation Taxi Service",
                description: "One-way & round-trip outstation taxi from Vizag to Araku, Tirupati, Vijayawada, Hyderabad and more.",
                icon: <MapPin size={24} strokeWidth={1.5} />,
              },
              {
                title: "Corporate Taxi Service",
                description: "Professional corporate cab service for employee transport, client pickups and business travel.",
                icon: <Building size={24} strokeWidth={1.5} />,
              },
              {
                title: "Wedding Car Rental",
                description: "Luxury wedding car rental in Vizag with professional chauffeurs for weddings and special events.",
                icon: <Heart size={24} strokeWidth={1.5} />,
              },
              {
                title: "Vizag Tour Packages",
                description: "Affordable Vizag sightseeing and Andhra Pradesh tour packages including Araku, Lambasingi and Borra Caves.",
                icon: <MapIcon size={24} strokeWidth={1.5} />,
              },
            ].map((service, idx) => (
              <div key={idx} className="min-w-[260px] w-[260px] flex-shrink-0 snap-start">
                <div className="bg-white rounded-[24px] p-6 border border-gray-100 hover:border-ocean/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group h-full">
                  <div className="w-14 h-14 rounded-2xl bg-ocean/5 flex items-center justify-center mb-6 text-ocean group-hover:bg-ocean group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3 group-hover:text-ocean transition-colors">{service.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-sand-light relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-coral bg-coral/5 border border-coral/10 px-5 py-2 rounded-full uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-coral"></span>
              How It Works
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl text-charcoal mb-4">Book Your Ride in 4 Easy Steps</h2>
          </div>
          
          <div className="flex md:grid overflow-x-auto snap-x snap-mandatory pb-4 md:overflow-visible md:pb-0 md:grid-cols-2 lg:grid-cols-4 gap-6 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {[
              {
                step: "1",
                title: "Search & Choose",
                description: "Browse our fleet or tour packages and select what perfectly fits your travel needs.",
              },
              {
                step: "2",
                title: "Book & Confirm",
                description: "Provide your travel details and confirm your booking instantly through our platform.",
              },
              {
                step: "3",
                title: "Enjoy Your Ride",
                description: "Experience a comfortable, safe, and premium journey with our professional chauffeurs.",
              },
              {
                step: "4",
                title: "Rate & Review",
                description: "Share your amazing experience to help us serve you even better next time.",
              },
            ].map((item, idx) => (
              <div key={idx} className="min-w-[250px] w-[250px] md:min-w-0 md:w-auto flex-shrink-0 snap-start md:flex-shrink bg-white rounded-3xl p-6 md:p-8 border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center">
                {/* Large faded number in background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] font-black text-sand-light group-hover:text-ocean/5 transition-colors duration-500 leading-none select-none z-0">
                  {item.step}
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean to-coral flex items-center justify-center text-white font-bold text-2xl mb-8 shadow-lg shadow-ocean/20 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{item.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Hotels & Resorts */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-max relative z-10">
          <SectionHeading
            title="Hotels & Resorts"
            subtitle="Discover handpicked stays from luxury beachfront resorts to cozy eco-camps in the hills."
          />
          <ScrollCarousel>
            {hotels.map((hotel) => (
              <div key={hotel.id} className="min-w-[320px] md:w-[calc(33.333%-14px)] flex-shrink-0 snap-start">
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </ScrollCarousel>
          <div className="mt-12 text-center">
            <Link href="/hotels-and-resorts" className="btn-secondary">
              View All Hotels <ArrowRight size={18} />
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
          <ScrollCarousel>
            {oneDayPackages.map((pkg) => (
              <div key={pkg.id} className="min-w-[320px] md:w-[calc(33.333%-14px)] flex-shrink-0 snap-start">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </section>
      {/* Travel Guides */}
      <section className="section-padding bg-sand-light">
        <div className="container-max">
          <SectionHeading
            title="Travel Guides & Things to Do"
            subtitle="Expert tips and recommendations to make the most of your Vizag vacation."
          />
          <ScrollCarousel>
            {guides.map((guide) => (
              <div key={guide.id} className="min-w-[320px] md:w-[calc(33.333%-14px)] flex-shrink-0 snap-start">
                <GuideCard guide={guide} />
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-warm-white">
        <div className="container-max">
          <SectionHeading
            title="Upcoming Events in 2026"
            subtitle="Plan your trip around these exciting activities and mega events happening in Vizag."
          />
          <ScrollCarousel>
            {events.map((event) => (
              <div key={event.id} className="min-w-[320px] md:w-[calc(33.333%-14px)] flex-shrink-0 snap-start">
                <EventCard event={event} />
              </div>
            ))}
          </ScrollCarousel>
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
