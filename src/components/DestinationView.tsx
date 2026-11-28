import { CheckCircle2, Clock, MapPin, Mountain } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import HotelCard from "@/components/HotelCard";
import PlaceholderImage from "@/components/PlaceholderImage";
import DestinationTabs from "@/components/DestinationTabs";
import EnquirySidebar from "@/components/EnquirySidebar";
import RichContent from "@/components/RichContent";
import { defaultDestination, type DestinationSlug } from "@/lib/destinations";
import { waMessages, waUrl } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/settings";
import { createPublicClient as createClient } from "@/lib/supabase/public";
import { sortByDisplayOrder } from "@/lib/content";

// older "show on page" checkboxes (no such column exists for newer destinations)
const LEGACY_FLAG: Partial<Record<DestinationSlug, string>> = {
  "araku-valley": "araku",
  lambasingi: "lambasingi",
  vanjangi: "vanjangi",
};

const GRADIENT: Record<DestinationSlug, string> = {
  "araku-valley": "from-green-400 to-emerald-600",
  lambasingi: "from-blue-300 to-indigo-600",
  vanjangi: "from-purple-400 to-violet-600",
  maredumilli: "from-emerald-500 to-teal-700",
};

/**
 * Shared destination page: hero, info strip, overview (inline, not a tab),
 * then tabs for the attached Packages and Hotels. A sticky enquiry sidebar sits beside the content.
 */
export default async function DestinationView({ slug }: { slug: DestinationSlug }) {
  const supabase = await createClient();
  const { contact } = await getSiteSettings();

  const { data: dbDest } = await supabase.from("destination_pages").select("*").eq("id", slug).maybeSingle();

  const row: any = dbDest || defaultDestination(slug);
  const dest: any = { ...row, bestTimeToVisit: row.best_time_to_visit, highlights: row.highlights || [] };
  const heroImage: string | undefined = row.image_url || undefined;
  const gradient = GRADIENT[slug];
  const flag = LEGACY_FLAG[slug];
  const infoItems = [
    { icon: MapPin, label: "Distance", value: dest.distance, hover: "group-hover:bg-coral" },
    { icon: Mountain, label: "Elevation", value: dest.elevation, hover: "group-hover:bg-teal" },
    { icon: Clock, label: "Best Time", value: dest.bestTimeToVisit, hover: "group-hover:bg-sky" },
  ].filter((i) => i.value);

  // ---- Packages: explicitly attached ones, else legacy "show on page" flag ----
  const packageIds: string[] = Array.isArray(dbDest?.package_ids) ? dbDest.package_ids : [];
  let dbPackages: any[] | null = null;
  if (packageIds.length > 0) {
    const { data } = await supabase.from("tour_packages").select("*").in("id", packageIds).eq("is_published", true);
    dbPackages = data
      ? [...data].sort((a, b) => packageIds.indexOf(a.id) - packageIds.indexOf(b.id))
      : null;
  } else {
    // automatic: packages with a night here (stay plan), plus any marked the old way
    const { data } = await supabase
      .from("tour_packages")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    dbPackages = data
      ? sortByDisplayOrder(
          data.filter((p: any) => (Array.isArray(p.stay_plan) && p.stay_plan.includes(slug)) || (flag && p[`show_in_${flag}`]))
        )
      : null;
  }

  // ---- Hotels: explicitly attached ones, else legacy flag ----
  const hotelIds: string[] = Array.isArray(dbDest?.hotel_ids) ? dbDest.hotel_ids : [];
  let dbHotels: any[] | null = null;
  if (hotelIds.length > 0) {
    const { data } = await supabase.from("hotels_resorts").select("*").in("id", hotelIds).eq("is_published", true);
    dbHotels = data ? [...data].sort((a, b) => hotelIds.indexOf(a.id) - hotelIds.indexOf(b.id)) : null;
  } else {
    // automatic: hotels whose area is this destination
    const { data } = await supabase
      .from("hotels_resorts")
      .select("*")
      .eq("is_published", true)
      .eq("area", slug)
      .order("created_at", { ascending: false });
    dbHotels = data;
  }

  const relatedPackages = (dbPackages || []).map((pkg: any) => ({
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
    imageGradient: "from-teal to-blue-600",
    imageUrl: pkg.cover_image_url || pkg.image_url,
    originalPrice: pkg.original_price || pkg.mrp,
  }));

  const mappedHotels = (dbHotels || []).map((r: any) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    type: r.category || "Resorts",
    rating: r.rating || 4.5,
    location: r.location,
    price: r.price_per_night ? `₹${r.price_per_night}` : r.price || "₹0",
    price_label: r.price_label,
    no_of_persons: r.no_of_persons,
    image: r.cover_image_url || r.image_url,
    amenities: r.amenities || [],
    reviews: r.reviews || 0,
  }));

  // ---- Overview (shown inline right after the info strip) ----
  const overview = (
    <section className="mb-12">
      <ScrollReveal direction="up">
        <SectionHeading title={`About ${dest.name}`} centered={true} />
      </ScrollReveal>

      {row.content && (
        <ScrollReveal direction="up">
          <RichContent html={row.content} className="mb-10" />
        </ScrollReveal>
      )}

      {dest.highlights.length > 0 && (
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10 items-start">
          <div className="xl:w-5/12 w-full">
            <ScrollReveal direction="right">
              {heroImage ? (
                <div className="w-full aspect-[4/3] rounded-[32px] shadow-card border border-charcoal/5 relative overflow-hidden">
                  <img loading="lazy" decoding="async" src={heroImage} alt={`${dest.name} Highlights`} className="w-full h-full object-cover" />
                </div>
              ) : (
                <PlaceholderImage
                  gradient={gradient}
                  alt={`${dest.name} Highlights`}
                  className="w-full aspect-[4/3] rounded-[32px] shadow-card border border-charcoal/5"
                />
              )}
            </ScrollReveal>
          </div>
          <div className="xl:w-7/12 w-full">
            <ScrollReveal direction="left">
              <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-[28px] shadow-card border border-charcoal/5">
                <ul className="space-y-4">
                  {dest.highlights.map((highlight: string, idx: number) => {
                    const [title, desc] = highlight.split("—");
                    return (
                      <li key={idx} className="flex gap-4 group">
                        <div className="mt-1 shrink-0">
                          <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                            <CheckCircle2 size={18} />
                          </div>
                        </div>
                        <div>
                          <strong className="text-charcoal text-lg block mb-0.5 font-heading tracking-tight leading-tight">{title.trim()}</strong>
                          {desc && <span className="text-charcoal/60 text-sm font-medium leading-relaxed block">{desc.trim()}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}
    </section>
  );

  const packagesContent = (
    <div>
      <SectionHeading
        title={`Tour Packages in ${dest.name}`}
        subtitle="Choose from our specially crafted itineraries to experience the best of this destination."
      />
      {relatedPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {relatedPackages.map((pkg: any) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No packages available for this destination currently. Please check back later!
        </div>
      )}
    </div>
  );

  const hotelsContent = (
    <div>
      <SectionHeading title={`Hotels & Resorts in ${dest.name}`} subtitle="Comfortable stays selected just for you." />
      {mappedHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {mappedHotels.map((hotel: any) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No hotels available for this destination currently. Please check back later!
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Destination Hero */}
      <section className="relative -mt-[72px] pt-[104px] pb-14 lg:pb-20 overflow-hidden rounded-b-[40px] shadow-sm">
        <div className="absolute inset-0 bg-ocean">
          {heroImage ? (
            <img src={heroImage} alt={dest.name} className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          ) : (
            <PlaceholderImage gradient={gradient} alt={dest.name} className="w-full h-full opacity-60 mix-blend-overlay" overlay />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/40 to-coral/20" />
        </div>
        <div className="container-max relative z-10 text-center px-4 mt-8">
          <ScrollReveal>
            {dest.tagline && (
              <span className="inline-flex badge bg-white/10 text-white backdrop-blur-md border border-white/20 mb-8 px-5 py-2.5 font-bold tracking-widest text-[10px] uppercase shadow-sm">
                {dest.tagline}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white mb-4 leading-[1.1] tracking-tight drop-shadow-sm">
              Explore <span className="text-sunset">{dest.name}</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
              {dest.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Info Strip */}
      <div className="relative z-20 -mt-10 mb-10 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="bg-white rounded-[24px] shadow-card border border-charcoal/5 p-2 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-center divide-y sm:divide-y-0 sm:divide-x divide-charcoal/5 py-4 w-full">
              {infoItems.map(({ icon: Icon, label, value, hover }) => (
                <div key={label} className="flex flex-col items-center py-4 sm:py-2 px-4 text-center group flex-1">
                  <div className={`w-10 h-10 rounded-full bg-sand flex items-center justify-center mb-2 ${hover} group-hover:text-white transition-colors text-charcoal duration-500 shadow-sm border border-charcoal/5`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold mb-1">{label}</span>
                  <span className="text-charcoal font-bold text-base tracking-tight">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overview inline + tabs (Packages / Hotels), with sticky enquiry sidebar */}
      <EnquirySidebar context={dest.name}>
        <div className="mt-6 mb-16">
          {overview}
          <DestinationTabs packagesContent={packagesContent} hotelsContent={hotelsContent} />
        </div>
      </EnquirySidebar>

      {/* CTA */}
      <section className="py-10 bg-ocean-gradient text-center px-4 relative overflow-hidden rounded-[24px] mx-4 sm:mx-6 lg:mx-8 mb-12 shadow-card">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] blob text-coral/30 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] blob text-amber/20 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        <ScrollReveal>
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white mb-3 tracking-tight leading-[1.1]">
              Ready to visit <span className="text-sunset">{dest.name}</span>?
            </h2>
            <p className="text-white/70 text-sm md:text-base mb-6 font-medium leading-relaxed">
              Contact our experts to customize your itinerary and book your trip today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={waUrl(waMessages.destination(dest.name), contact.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-coral">
                Plan on WhatsApp
              </a>
              <a href={`tel:${contact.phone}`} className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-charcoal">
                Call Us Now
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
