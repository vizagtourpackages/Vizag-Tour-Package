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
import GoldStandardGrid from "@/components/GoldStandardGrid";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import CommunityCTA from "@/components/CommunityCTA";
import {
  trendingPackages,
} from "@/data/packages";
import { topPlaces, vizagPlaces, destinationDetails } from "@/data/destinations";
import { guides } from "@/data/guides";
import { events } from "@/data/events";
import { vehicles } from "@/data/vehicles";
import { hotels } from "@/data/hotels";
import HotelCard from "@/components/HotelCard";
import NewsPromoCard from "@/components/NewsPromoCard";
import { newsData, promotionsData } from "@/data/news";

export default function Home() {
  return (
    <>
      {/* 1. Home/Hero section */}
      <HeroSection />

      {/* Mobile Trust Banner */}
      <MobileTrustBanner />

      {/* 2. Trending Packages */}
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

      {/* 3. Customize Your Dream Tour */}
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

      {/* 4. Our Premium Fleet */}
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

      {/* NEW: Gold Standard */}
      <GoldStandardGrid />

      {/* NEW: Comparison Table */}
      <ComparisonTable />

      {/* 5. What We Offer */}
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

      {/* 6. Hotels & Resorts */}
      <section className="section-padding bg-sand-light relative overflow-hidden">
        <div className="container-max relative z-10">
          <SectionHeading
            title="Hotels & Resorts"
            subtitle="Discover handpicked stays from luxury beachfront resorts to cozy eco-camps in the hills."
          />
          <ScrollCarousel>
            {hotels.map((hotel) => (
              <div key={hotel.id} className="w-[85vw] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
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

      {/* 7. Top Destinations from Vizag */}
      <section className="section-padding bg-white">
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

      {/* 8. Places to Visit in Vizag */}
      <section className="section-padding bg-sand-light">
        <div className="container-max">
          <SectionHeading
            title="Places to Visit in Vizag"
            subtitle="Explore the best in-city attractions including serene beaches, beautiful parks, and historic museums."
          />
          <ScrollCarousel>
            {vizagPlaces.map((destination) => (
              <div key={destination.id} className="w-[85vw] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                <DestinationCard destination={destination} />
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </section>

      {/* NEW: Hill Station Destinations */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 pointer-events-none -z-10"></div>
        
        <div className="container-max relative z-10">
          <SectionHeading
            title="Hill Station Escapes"
            subtitle="Leave the city heat behind and explore the misty mountains, coffee plantations, and tribal culture of the Eastern Ghats."
          />
          <ScrollCarousel>
            {Object.values(destinationDetails).map((d) => {
              const hillStationData = {
                id: d.id,
                name: d.name,
                description: d.description,
                category: "Hill Station",
                imageGradient: d.imageGradient,
              };
              return (
                <div key={d.id} className="w-[85vw] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                  <DestinationCard destination={hillStationData} />
                </div>
              );
            })}
          </ScrollCarousel>
          <div className="mt-12 text-center">
            <Link href="/tour-packages/araku-valley" className="btn-secondary">
              View Hill Station Packages <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Travel Guides */}
      <section className="section-padding bg-warm-white">
        <div className="container-max">
          <SectionHeading
            title="Travel Guides & Things to Do"
            subtitle="Expert tips and recommendations to make the most of your Vizag vacation."
          />
          <ScrollCarousel>
            {guides.map((guide) => (
              <div key={guide.id} className="w-[85vw] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                <GuideCard guide={guide} />
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </section>

      {/* 10. Upcoming Events */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionHeading
            title="Upcoming Events in 2026"
            subtitle="Plan your trip around these exciting activities and mega events happening in Vizag."
          />
          <ScrollCarousel>
            {events.map((event) => (
              <div key={event.id} className="w-[85vw] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                <EventCard event={event} />
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </section>

      {/* Your Trusted Travel Partner (Redesigned) */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-max">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl text-charcoal/80">Your Trusted Travel Partner</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {["MakeMyTrip", "Agoda", "Goibibo", "TripAdvisor", "Booking.com"].map((partner, idx) => (
              <div key={idx} className="text-xl md:text-2xl font-bold text-charcoal/50 uppercase tracking-wider">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Promotions & News */}
      <section className="section-padding bg-charcoal">
        <div className="container-max">
          <SectionHeading
            title="Latest Updates & Offers"
            subtitle="Catch up on the latest travel news and take advantage of our seasonal promotions."
            light
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-heading text-white mb-6 border-b border-white/10 pb-4">Special Promotions</h3>
              {promotionsData.map((promo) => (
                <NewsPromoCard key={promo.id} item={promo} />
              ))}
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-heading text-white mb-6 border-b border-white/10 pb-4">Travel News</h3>
              {newsData.map((news) => (
                <NewsPromoCard key={news.id} item={news} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW: FAQ Section */}
      <FAQAccordion />

      {/* 11. Customer Reviews */}
      <section className="section-padding bg-sand-light overflow-hidden">
        <div className="container-max">
          <SectionHeading
            title="What Our Travelers Say"
            subtitle="Don't just take our word for it. Read honest reviews from our happy customers."
          />
          <TestimonialsSection />
        </div>
      </section>

      {/* NEW: Community CTA */}
      <CommunityCTA />
    </>
  );
}
