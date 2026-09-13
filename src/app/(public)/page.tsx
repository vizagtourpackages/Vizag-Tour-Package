import Link from "next/link";
import { ArrowRight, Car, Plane, MapPin, Building, Heart, Map as MapIcon, Mountain, Sunrise, Users } from "lucide-react";
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
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: dbPackages } = await supabase
    .from('tour_packages')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4);

  const { data: dbEvents } = await supabase
    .from('upcoming_events')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: dbHotels } = await supabase
    .from('hotels_resorts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6);

  // Map DB rows to match the existing Event interface, with a fallback
  const displayEvents = dbEvents && dbEvents.length > 0
    ? dbEvents.map(evt => ({
      id: evt.id,
      title: evt.title,
      description: evt.description,
      category: evt.category,
      year: evt.date,
      imageGradient: 'from-purple-500 to-pink-600', // fallback
      imageUrl: evt.image_url
    }))
    : [];

  const { data: dbGuides } = await supabase
    .from('travel_guides')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: dbFaqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: true });

  const displayGuides = dbGuides && dbGuides.length > 0
    ? dbGuides.map(guide => ({
      id: guide.id,
      title: guide.title,
      category: guide.category,
      highlights: guide.highlights || [],
      imageGradient: 'from-emerald-400 to-teal-600', // fallback
      imageUrl: guide.image_url
    }))
    : [];

  const displayFaqs = dbFaqs && dbFaqs.length > 0
    ? dbFaqs.map(faq => ({
      id: faq.id,
      q: faq.question,
      a: faq.answer,
    }))
    : [];

  const { data: dbDestinations } = await supabase
    .from('top_destinations')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const { data: dbPlaces } = await supabase
    .from('places_to_visit')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const displayDestinations = dbDestinations && dbDestinations.length > 0
    ? dbDestinations.map(dest => ({
      id: dest.id,
      name: dest.name,
      description: dest.description,
      category: dest.location || dest.category || 'Destination',
      price: dest.price,
      distance: dest.distance_km,
      duration: dest.duration,
      imageGradient: 'from-amber-400 to-orange-600', // fallback
      imageUrl: dest.image_url
    }))
    : [];

  const displayPlaces = dbPlaces && dbPlaces.length > 0
    ? dbPlaces.map(place => ({
      id: place.id,
      name: place.name,
      description: place.description,
      category: place.category || 'Place',
      imageGradient: 'from-blue-400 to-ocean', // fallback
      imageUrl: place.image_url
    }))
    : [];

  // Map DB rows to match the existing Package interface, with a fallback
  const displayPackages = dbPackages && dbPackages.length > 0
    ? dbPackages.map(pkg => ({
      id: pkg.id,
      slug: pkg.slug,
      title: pkg.title,
      price: pkg.price,
      priceLabel: pkg.price_label,
      duration: pkg.duration,
      people: pkg.people,
      badge: pkg.badge,
      highlights: pkg.highlights,
      includes: pkg.includes,
      excludes: pkg.excludes,
      category: pkg.category,
      imageGradient: 'from-teal to-blue-600', // fallback
      imageUrl: pkg.cover_image_url || pkg.image_url
    }))
    : [];

  const displayHotels = dbHotels && dbHotels.length > 0
    ? dbHotels.map(r => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      type: r.category || 'Resorts',
      rating: r.rating || 4.5,
      location: r.location,
      price: r.price_per_night ? `₹${r.price_per_night}` : (r.price || '₹0'),
      image: r.cover_image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      amenities: r.amenities || []
    }))
    : [];

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
            <ScrollCarousel gap="gap-4">
              {displayPackages.map((pkg: any) => (
                <div key={pkg.id} className="w-[320px] sm:w-[320px] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] flex-shrink-0 snap-start">
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </ScrollCarousel>
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
            title="Best Travels for Vizag Tours & Outstation Trips"
            subtitle="Book reliable Vizag tour vehicles including Sedans, SUVs, Tempo Travellers, Urbania, and Buses for local and outstation travel."
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
          <div className="mb-8 sm:mb-12 w-full text-center flex flex-col items-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-teal bg-teal/10 px-4 py-2 rounded-full uppercase tracking-widest mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse-soft"></span>
              Our Services
            </span>
            <div className="w-full min-w-0 max-w-full px-2">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold leading-[1.2] tracking-tight text-charcoal mb-3 sm:mb-6">
                What We Offer
              </h2>
            </div>
            <div className="w-full min-w-0 max-w-full px-4">
              <p className="mt-3 sm:mt-6 text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto text-charcoal/60">
                From Vizag city sightseeing to the scenic hills of Araku, Vanjangi and Lambasingi, we make your complete travel experience simple, comfortable and memorable.
              </p>
            </div>
          </div>

          <ScrollCarousel>
            {[
              {
                title: "Vizag Local Sightseeing",
                description: "Explore the best of Visakhapatnam with customized sightseeing tours covering beaches, viewpoints, temples, museums, parks, and popular attractions.",
                icon: <MapPin size={20} strokeWidth={2} />,
              },
              {
                title: "Vizag Airport Transfers",
                description: "Comfortable airport pickup and drop services with professional drivers, flight monitoring, and convenient transfers to hotels and tourist destinations.",
                icon: <Plane size={20} strokeWidth={2} />,
              },
              {
                title: "Vizag to Araku Tours",
                description: "Discover Araku Valley with well-planned tour packages covering Borra Caves, coffee plantations, viewpoints, tribal attractions, and scenic locations.",
                icon: <Mountain size={20} strokeWidth={2} />,
              },
              {
                title: "Hotels & Stay Packages",
                description: "Find comfortable stays in Vizag, Araku, Vanjangi, Lambasingi and other destinations with accommodation options to suit different budgets.",
                icon: <Building size={20} strokeWidth={2} />,
              },
              {
                title: "Group & Family Tour Packages",
                description: "Travel together with comfortable Sedans, SUVs, Tempo Travellers, Urbania and buses for families, friends, corporate groups and large tours.",
                icon: <Users size={20} strokeWidth={2} />,
              },
            ].map((service, idx) => (
              <div key={idx} className="min-w-[260px] w-[260px] flex-shrink-0 snap-start">
                <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-charcoal/5 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 group h-full">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-4 text-charcoal group-hover:bg-coral group-hover:text-white transition-colors duration-500 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-charcoal mb-2 group-hover:text-coral transition-colors tracking-tight leading-tight">{service.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed text-xs sm:text-sm font-medium">{service.description}</p>
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
            title="Book Hotels & Resorts in Vizag"
            subtitle="Find the right stay for your journey—from budget-friendly hotels and family stays to premium resorts and beachfront properties across Vizag and nearby destinations."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel gap="gap-4">
              {displayHotels.map((hotel) => (
                <div key={hotel.id} className="w-[320px] sm:w-[320px] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] flex-shrink-0 snap-start">
                  <HotelCard hotel={hotel as any} />
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
            title="Spiritual & Devotional Tours from Vizag"
            subtitle="Explore Vizag temples and pilgrimage destinations with comfortable travel, customized itineraries, experienced drivers, and reliable support for a peaceful devotional journey."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {displayDestinations.map((destination) => (
                <div key={destination.id} className="min-w-[280px] w-[280px] sm:w-[calc(25%-15px)] flex-shrink-0 snap-start">
                  <DestinationCard destination={destination as any} />
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
            title="Vizag Sightseeing – Top Tourist Places in Visakhapatnam"
            subtitle="Explore the top tourist attractions in Visakhapatnam, including beautiful beaches, scenic viewpoints, historic museums, temples, parks, and family-friendly destinations."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {displayPlaces.map((destination) => (
                <div key={destination.id} className="w-[280px] sm:w-[280px] md:w-[calc(33.333%-1.25rem)] lg:w-[calc(25%-1.25rem)] flex-shrink-0 snap-start">
                  <DestinationCard destination={destination as any} />
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
            title="Near by Eastern Ghats Getaways"
            subtitle="Experience cool weather, breathtaking mountain views, coffee plantations, waterfalls, valleys, and tribal culture on unforgettable trips from Vizag."
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
            title="Vizag Travel Guide – Things to Do & Places to Visit"
            subtitle="Plan your Visakhapatnam trip with helpful guides covering tourist places, beaches, sightseeing, local food, best time to visit, travel tips, and nearby destinations."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {displayGuides.map((guide: any) => (
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
            title="Upcoming Activities & Events in Vizag (Visakhapatnam) – 2026"
            subtitle="Stay updated with Vizag’s upcoming festivals, cultural celebrations, tourism events, exhibitions, and special activities—then plan your perfect trip around them."
          />
          <ScrollReveal delay={0.2}>
            <ScrollCarousel>
              {displayEvents.map((event: any) => (
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
            title="Vizag Travel Updates, Offers & Tour Deals"
            subtitle="Stay updated with the latest Vizag travel news, new tour packages, seasonal offers, special deals, and exciting travel opportunities from Vizag to Araku, Vanjangi, Lambasingi, and beyond."
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
      <FAQAccordion faqs={displayFaqs} />

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
    </>
  );
}
