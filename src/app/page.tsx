import Link from "next/link";
import { ArrowRight, Car, Plane, MapPin, Building, Heart, Map as MapIcon } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ScrollReveal from "@/components/ScrollReveal";
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
      <section className="section-padding bg-warm-white relative overflow-hidden ">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="container-max relative z-10">
          <SectionHeading
            title="Trending Packages"
            subtitle="Explore our most popular, handpicked itineraries designed for the perfect Vizag experience."
          />
          <ScrollReveal delay={0.2}>
            <div className="mobile-carousel-container gap-6">
              {trendingPackages.map((pkg) => (
                <div key={pkg.id} className="mobile-carousel-item w-[85vw] max-w-[300px] sm:max-w-none sm:w-[350px]">
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <Link href="/tour-packages" className="btn-secondary">
                View All Packages <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>



      {/* 4. Our Premium Fleet */}
      <section className="section-padding bg-warm-white relative overflow-hidden">
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
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal/5 blur-[120px]"></div>
        </div>

        <div className="container-max">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-teal bg-teal/10 px-4 py-2 rounded-full uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse-soft"></span>
              Our Services
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-charcoal mb-6 tracking-tight leading-[1.1]">What We Offer</h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Experience the best of Visakhapatnam with our premium, reliable, and comfortable travel services.
            </p>
          </div>

          <ScrollCarousel>
            {[
              {
                title: "Local Taxi Service in Vizag",
                description: "24/7 local taxi service in Visakhapatnam for city rides, shopping, office travel, railway station and hospital visits.",
                icon: <Car size={24} strokeWidth={2} />,
              },
              {
                title: "Airport Taxi Service",
                description: "Reliable Vizag Airport taxi with on-time pickup & drop, flight tracking and affordable fares.",
                icon: <Plane size={24} strokeWidth={2} />,
              },
              {
                title: "Outstation Taxi Service",
                description: "One-way & round-trip outstation taxi from Vizag to Araku, Tirupati, Vijayawada, Hyderabad and more.",
                icon: <MapPin size={24} strokeWidth={2} />,
              },
              {
                title: "Corporate Taxi Service",
                description: "Professional corporate cab service for employee transport, client pickups and business travel.",
                icon: <Building size={24} strokeWidth={2} />,
              },
              {
                title: "Wedding Car Rental",
                description: "Luxury wedding car rental in Vizag with professional chauffeurs for weddings and special events.",
                icon: <Heart size={24} strokeWidth={2} />,
              },
              {
                title: "Vizag Tour Packages",
                description: "Affordable Vizag sightseeing and Andhra Pradesh tour packages including Araku, Lambasingi and Borra Caves.",
                icon: <MapIcon size={24} strokeWidth={2} />,
              },
            ].map((service, idx) => (
              <div key={idx} className="min-w-[280px] w-[280px] flex-shrink-0 snap-start">
                <div className="bg-white rounded-[32px] p-8 border border-charcoal/5 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 group h-full">
                  <div className="w-14 h-14 rounded-full bg-sand flex items-center justify-center mb-6 text-charcoal group-hover:bg-coral group-hover:text-white transition-colors duration-500 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-charcoal mb-4 group-hover:text-coral transition-colors tracking-tight leading-tight">{service.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed text-sm font-medium">{service.description}</p>
                </div>
              </div>
            ))}
          </ScrollCarousel>
        </div>
      </section>

      {/* 6. Hotels & Resorts */}
      <section className="section-padding bg-warm-white relative overflow-hidden">
        <div className="container-max relative z-10">
          <SectionHeading
            title="Hotels & Resorts"
            subtitle="Discover handpicked stays from luxury beachfront resorts to cozy eco-camps in the hills."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {hotels.map((hotel) => (
                <div key={hotel.id} className="w-[320px] sm:w-[320px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                  <HotelCard hotel={hotel} />
                </div>
              ))}
            </ScrollCarousel>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <Link href="/hotels-and-resorts" className="btn-secondary">
                View All Hotels <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Top Destinations from Vizag */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sand rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container-max relative z-10">
          <SectionHeading
            title="Top Destinations from Vizag"
            subtitle="Popular outstation routes with transparent pricing. Book a comfortable cab for temple tours, pilgrimages, and city trips."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {topPlaces.map((destination) => (
                <div key={destination.id} className="min-w-[280px] w-[280px] sm:w-[calc(25%-15px)] flex-shrink-0 snap-start">
                  <DestinationCard destination={destination} />
                </div>
              ))}
            </ScrollCarousel>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <Link href="/route-map" className="btn-secondary">
                View All Routes <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. Places to Visit in Vizag */}
      <section className="section-padding bg-warm-white relative overflow-hidden">
        <div className="container-max">
          <SectionHeading
            title="Places to Visit in Vizag"
            subtitle="Explore the best in-city attractions including serene beaches, beautiful parks, and historic museums."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {vizagPlaces.map((destination) => (
                <div key={destination.id} className="w-[280px] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                  <DestinationCard destination={destination} />
                </div>
              ))}
            </ScrollCarousel>
          </ScrollReveal>
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
          <ScrollReveal delay={0.2}>
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
                  <div key={d.id} className="w-[280px] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                    <DestinationCard destination={hillStationData} />
                  </div>
                );
              })}
            </ScrollCarousel>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <Link href="/tour-packages/araku-valley" className="btn-secondary">
                View Hill Station Packages <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. Travel Guides */}
      <section className="section-padding bg-warm-white relative overflow-hidden">
        <div className="container-max">
          <SectionHeading
            title="Travel Guides & Things to Do"
            subtitle="Expert tips and recommendations to make the most of your Vizag vacation."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {guides.map((guide) => (
                <div key={guide.id} className="w-[280px] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                  <GuideCard guide={guide} />
                </div>
              ))}
            </ScrollCarousel>
          </ScrollReveal>
        </div>
      </section>

      {/* 10. Upcoming Events */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sand rounded-full blur-[120px] opacity-50 -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="container-max relative z-10">
          <SectionHeading
            title="Upcoming Events in 2026"
            subtitle="Plan your trip around these exciting activities and mega events happening in Vizag."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {events.map((event) => (
                <div key={event.id} className="w-[260px] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                  <EventCard event={event} />
                </div>
              ))}
            </ScrollCarousel>
          </ScrollReveal>
        </div>
      </section>

      {/* Your Trusted Travel Partner (Redesigned) */}
      <section className="py-16 bg-white border-y border-charcoal/5">
        <div className="container-max">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-lg md:text-xl text-charcoal/40 uppercase tracking-widest">Your Trusted Travel Partner</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-10 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {["MakeMyTrip", "Agoda", "Goibibo", "TripAdvisor", "Booking.com"].map((partner, idx) => (
                <div key={idx} className="text-xl md:text-3xl font-black text-charcoal tracking-tight">
                  {partner}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NEW: Promotions & News */}
      <section className="section-padding bg-charcoal relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-news" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-news)" />
          </svg>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="container-max relative z-10">
          <SectionHeading
            title="Latest Updates & Offers"
            subtitle="Catch up on the latest travel news and take advantage of our seasonal promotions."
            light
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1px,1fr] gap-8 lg:gap-12 mt-16">
            <ScrollReveal delay={0.2} className="w-full min-w-0">
              <div className="w-full">
                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-heading font-bold text-white tracking-tight">Special Promotions</h3>
                  <span className="badge bg-coral/20 text-coral border border-coral/30 tracking-widest text-[10px]">LIMITED</span>
                </div>
                <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                  {promotionsData.map((promo) => (
                    <div key={promo.id} className="w-[85vw] max-w-[300px] lg:max-w-none lg:w-[85%] shrink-0 snap-start">
                      <NewsPromoCard item={promo} />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-full h-full bg-white/10 rounded-full" />

            <ScrollReveal delay={0.3} className="w-full min-w-0">
              <div className="w-full">
                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4 mt-8 lg:mt-0">
                  <h3 className="text-2xl font-heading font-bold text-white tracking-tight">Travel News</h3>
                  <span className="badge bg-teal/20 text-teal border border-teal/30 tracking-widest text-[10px]">UPDATES</span>
                </div>
                <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
                  {newsData.map((news) => (
                    <div key={news.id} className="w-[85vw] max-w-[300px] lg:max-w-none lg:w-[85%] shrink-0 snap-start">
                      <NewsPromoCard item={news} />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
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
