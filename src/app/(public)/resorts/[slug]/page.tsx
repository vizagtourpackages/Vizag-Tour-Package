import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MapPin, Snowflake, Star, Sun, Utensils } from "lucide-react";
import { createPublicClient as createClient } from "@/lib/supabase/public";
import RichContent from "@/components/RichContent";
import { EnquiryForm } from "@/components/EnquirySidebar";
import ResortGallery from "@/components/ResortGallery";
import HotelCard from "@/components/HotelCard";
import ResortBookingButton from "@/components/ResortBookingButton";
import HotelBookBar from "@/components/HotelBookBar";
import TermsButton from "@/components/TermsButton";
import { Reveal } from "@/components/Motion";
import { siteInfo } from "@/data/siteInfo";
import { waMessages, waUrl } from "@/lib/whatsapp";
import { getSiteSettings } from "@/lib/settings";

// built on first visit, then served from cache (refreshed every minute and on admin saves)
export const generateStaticParams = async () => [];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: hotel } = await supabase
    .from("hotels_resorts")
    .select("name, description, meta_title, meta_description, meta_keywords, og_image_url, cover_image_url")
    .eq("slug", slug)
    .maybeSingle();

  if (!hotel) return { title: "Stay not found" };

  const image = hotel.og_image_url || hotel.cover_image_url;
  return {
    title: hotel.meta_title || `${hotel.name} | ${siteInfo.name}`,
    description: hotel.meta_description || hotel.description || `Book your stay at ${hotel.name} with us today!`,
    keywords: hotel.meta_keywords || "",
    openGraph: image ? { images: [image] } : undefined,
  };
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const unitLabel = (label?: string) => {
  const base = "per night";
  if (!label) return base;
  const clean = label.replace(/^\/?\s*/, "").toLowerCase().trim();
  if (clean === "per night" || clean === "night" || clean === "") return base;
  return `${base} / ${label.replace(/^\/?\s*/, "")}`;
};

export default async function ResortDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { contact } = await getSiteSettings();

  const { data: hotel } = await supabase.from("hotels_resorts").select("*").eq("slug", slug).maybeSingle();
  if (!hotel) notFound();

  const { data: roomTypes } = await supabase.from("resort_room_types").select("*").eq("resort_id", hotel.id);

  let { data: similar } = await supabase
    .from("hotels_resorts")
    .select("*")
    .eq("is_published", true)
    .eq("type", hotel.type)
    .neq("slug", slug)
    .limit(3);
  if (!similar || similar.length === 0) {
    const { data: fallback } = await supabase.from("hotels_resorts").select("*").eq("is_published", true).neq("slug", slug).limit(3);
    similar = fallback;
  }

  // visitors only see room types the hotel has switched on and priced
  const rooms = (roomTypes || [])
    .filter((r: any) => r.is_available && Number(r.price) > 0)
    .sort((a: any, b: any) => Number(a.price) - Number(b.price));
  const roomPrices = rooms.map((r: any) => Number(r.price));
  const fromPrice = Number(hotel.price_per_night) || (roomPrices.length ? Math.min(...roomPrices) : 0);
  const priceText = fromPrice ? inr(fromPrice) : hotel.price || "On request";
  const unit = unitLabel(hotel.price_label);
  // minimal data for the booking popup (keeps the client payload small)
  const bookingHotel = { id: hotel.id, slug: hotel.slug, name: hotel.name, price_label: hotel.price_label };

  const cover = hotel.cover_image_url || hotel.image_url;
  const photos: string[] = [cover, ...(hotel.gallery_images || [])].filter(Boolean);

  const nearby: any[] = hotel.nearby_places || [];
  const restaurants = nearby.filter((p) => p.category === "restaurant");
  const attractions = nearby.filter((p) => p.category !== "restaurant");

  const mapHref =
    hotel.latitude && hotel.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${hotel.latitude},${hotel.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name} ${hotel.location || ""}`)}`;

  const NearbyList = ({ title, icon: Icon, items }: { title: string; icon: any; items: any[] }) => (
    <div className="rounded-[26px] border border-ocean/8 bg-white p-5 shadow-card sm:p-6">
      <h3 className="mb-3 flex items-center gap-2.5 font-heading text-[1.2rem] text-ocean">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-sand text-coral"><Icon size={17} /></span> {title}
      </h3>
      <ul className="divide-y divide-dashed divide-ocean/12">
        {items.slice(0, 4).map((p, i) => (
          <li key={i} className="flex items-center justify-between gap-3 py-3 text-[0.94rem]">
            <span className="font-medium text-ocean">{p.name}</span>
            {p.distance_km != null && <span className="shrink-0 rounded-full bg-sand px-3 py-1 text-xs font-semibold text-charcoal/65">{p.distance_km} km</span>}
          </li>
        ))}
      </ul>
      {items.length > 4 && (
        <details className="group">
          <summary className="mt-2 flex cursor-pointer list-none items-center justify-center rounded-full bg-coral/10 py-3 text-sm font-semibold text-coral transition-colors hover:bg-coral/15">
            <span className="group-open:hidden">Show all {items.length}</span>
            <span className="hidden group-open:block">Show less</span>
          </summary>
          <ul className="divide-y divide-dashed divide-ocean/12">
            {items.slice(4).map((p, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-3 text-[0.94rem]">
                <span className="font-medium text-ocean">{p.name}</span>
                {p.distance_km != null && <span className="shrink-0 rounded-full bg-sand px-3 py-1 text-xs font-semibold text-charcoal/65">{p.distance_km} km</span>}
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );

  const bookCard = (
    <div className="overflow-hidden rounded-[28px] border border-ocean/8 bg-white shadow-float">
      <div className="border-b border-ocean/8 bg-sand/60 px-6 py-5">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-charcoal/50">Starting from</p>
        <p className="font-heading text-[2.3rem] leading-none text-ocean">
          {priceText}
          <span className="ml-1.5 font-sans text-sm font-medium text-charcoal/55">/ {unit}</span>
        </p>
        <p className="mt-1.5 text-xs text-charcoal/55">Taxes included · choose a room to book</p>
      </div>
      <div className="space-y-3 p-5 sm:p-6">
        <ResortBookingButton hotel={bookingHotel} />
        <a
          href={waUrl(waMessages.hotel(hotel.name), contact.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-[#25d366]/40 text-sm font-semibold text-[#128c4a] transition-colors hover:bg-[#25d366]/10"
        >
          Ask on WhatsApp
        </a>
        <p className="pt-1 text-center text-xs text-charcoal/50">
          By booking you agree to our <TermsButton category="resorts" className="cursor-pointer font-medium text-coral hover:underline" />
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-warm-white pb-44 xl:pb-24">
      {/* ---------- Header + gallery ---------- */}
      <section className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:px-8">
        <Link href="/hotels-and-resorts" className="mb-5 inline-flex items-center gap-2 rounded-full border border-ocean/12 bg-white px-4 py-2.5 text-sm font-semibold text-ocean shadow-sm transition-colors hover:bg-sand">
          <ArrowLeft size={16} /> All stays
        </Link>

        <header className="mb-6">
          <span className="mb-3 inline-block rounded-full bg-sunset px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-white">
            {hotel.category || hotel.type || "Resort"}
          </span>
          <h1 className="font-heading text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-ocean">{hotel.name}</h1>
          {hotel.tagline && <p className="mt-2 text-[1.05rem] text-charcoal/65">{hotel.tagline}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {hotel.rating && (
              <span className="inline-flex items-center gap-1.5 font-semibold text-ocean">
                <Star size={16} className="fill-amber text-amber" /> {hotel.rating}
                <span className="font-normal text-charcoal/55">({hotel.reviews || 0} reviews)</span>
              </span>
            )}
            {hotel.location && (
              <a href={mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ocean/80 underline-offset-4 hover:text-coral hover:underline">
                <MapPin size={16} className="text-teal" /> {hotel.location}
              </a>
            )}
          </div>
        </header>

        <ResortGallery images={photos} name={hotel.name} />
      </section>

      {/* ---------- Content ---------- */}
      <div className="mx-auto mt-10 grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-14">
        <div className="min-w-0 space-y-14">
          {/* About */}
          {(hotel.content || hotel.description) && (
            <Reveal>
              <section>
                <h2 className="mb-4 font-heading text-[1.8rem] text-ocean">About this stay</h2>
                {hotel.content ? (
                  <RichContent html={hotel.content} />
                ) : (
                  <p className="whitespace-pre-line text-[1.02rem] leading-relaxed text-charcoal/75">{hotel.description}</p>
                )}
              </section>
            </Reveal>
          )}

          {/* Highlights */}
          {hotel.highlights?.length > 0 && (
            <Reveal>
              <section>
                <h2 className="mb-4 font-heading text-[1.8rem] text-ocean">Highlights</h2>
                <ul className="flex flex-wrap gap-2.5">
                  {hotel.highlights.map((h: string, i: number) => (
                    <li key={i} className="rounded-full border border-coral/25 bg-coral/8 px-4 py-2 text-sm font-semibold text-ocean">{h}</li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {/* Amenities */}
          {hotel.amenities?.length > 0 && (
            <Reveal>
              <section>
                <h2 className="mb-4 font-heading text-[1.8rem] text-ocean">Amenities</h2>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {hotel.amenities.map((a: string, i: number) => (
                    <li key={i} className="flex items-center gap-2.5 rounded-2xl border border-ocean/8 bg-white px-4 py-3.5 text-sm font-medium text-ocean shadow-sm">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal/12 text-teal"><Check size={14} strokeWidth={3} /></span> {a}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}

          {/* Rooms */}
          {rooms.length > 0 && (
            <section id="rooms" className="scroll-mt-28">
              <h2 className="mb-1 font-heading text-[1.8rem] text-ocean">Choose a room</h2>
              <p className="mb-5 text-sm text-charcoal/55">Prices are {unit}.</p>
              <div className="space-y-4">
                {rooms.map((r: any, i: number) => {
                  const img = Array.isArray(r.images) && r.images[0];
                  return (
                    <Reveal key={r.id} delay={i * 0.04}>
                      <div className="overflow-hidden rounded-[26px] border border-ocean/8 bg-white shadow-card sm:flex">
                        {img && (
                          <div className="relative aspect-[16/9] shrink-0 bg-sand sm:aspect-auto sm:w-[38%]">
                            <img src={img} alt={r.room_type} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
                          <div>
                            <span className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.66rem] font-bold uppercase tracking-wider ${r.has_ac ? "bg-sky/12 text-sky" : "bg-amber/20 text-ocean/70"}`}>
                              {r.has_ac ? <Snowflake size={12} /> : <Sun size={12} />} {r.has_ac ? "AC room" : "Non-AC room"}
                            </span>
                            <h3 className="font-heading text-[1.35rem] leading-tight text-ocean">{r.room_type}</h3>
                            {Array.isArray(r.images) && r.images.length > 1 && <p className="mt-1 text-xs text-charcoal/50">{r.images.length} photos</p>}
                          </div>
                          <div className="flex items-end justify-between gap-3">
                            <p className="font-heading text-[1.7rem] leading-none text-ocean">
                              {inr(Number(r.price) || 0)}
                              <span className="ml-1 font-sans text-xs font-medium text-charcoal/50">/ night</span>
                            </p>
                            <ResortBookingButton hotel={bookingHotel} room={r} className="btn-coral shrink-0 !px-6 !py-3 text-sm">
                              Select room
                            </ResortBookingButton>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          )}

          {/* Around the property */}
          {(attractions.length > 0 || restaurants.length > 0) && (
            <Reveal>
              <section>
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                  <h2 className="font-heading text-[1.8rem] text-ocean">Around the property</h2>
                  <a href={mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ocean/15 bg-white px-4 py-2.5 text-sm font-semibold text-ocean transition-colors hover:bg-sand">
                    <MapPin size={15} className="text-coral" /> View on map
                  </a>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {attractions.length > 0 && <NearbyList title="Attractions" icon={MapPin} items={attractions} />}
                  {restaurants.length > 0 && <NearbyList title="Restaurants" icon={Utensils} items={restaurants} />}
                </div>
              </section>
            </Reveal>
          )}

          {/* Questions (below xl; on wide screens the form sits in the sidebar) */}
          <section className="xl:hidden">
            <div className="overflow-hidden rounded-[28px] border border-ocean/8 bg-white shadow-card">
              <div className="bg-sunset px-6 py-5 text-white">
                <h2 className="font-heading text-[1.35rem] leading-tight">Questions about {hotel.name}?</h2>
              </div>
              <div className="p-5 sm:p-6">
                <EnquiryForm context={hotel.name} />
              </div>
            </div>
          </section>
        </div>

        {/* Sticky sidebar (wide screens) */}
        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-5">
            {bookCard}
            <div className="overflow-hidden rounded-[28px] border border-ocean/8 bg-white shadow-card">
              <div className="px-6 pt-5">
                <h3 className="font-heading text-[1.2rem] text-ocean">Have a question?</h3>
              </div>
              <div className="thin-scroll max-h-[50vh] overflow-y-auto p-5 pt-4">
                <EnquiryForm context={hotel.name} compact />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ---------- More stays ---------- */}
      {similar && similar.length > 0 && (
        <section className="mx-auto mt-20 max-w-[1240px] border-t border-ocean/10 px-4 pt-14 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-heading text-[clamp(1.7rem,3.5vw,2.4rem)] text-ocean">More places to stay</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {similar.map((r: any) => (
              <HotelCard
                key={r.id}
                hotel={{
                  id: r.slug,
                  slug: r.slug,
                  name: r.name,
                  type: r.category || r.type,
                  rating: r.rating || 0,
                  reviews: r.reviews || 0,
                  location: r.location,
                  price: r.price_per_night ? `₹${r.price_per_night}` : r.price,
                  price_label: r.price_label,
                  no_of_persons: r.no_of_persons,
                  image: r.cover_image_url || r.image_url,
                  amenities: r.amenities || [],
                }}
              />
            ))}
          </div>
        </section>
      )}

      <HotelBookBar hotel={bookingHotel} price={priceText} unit={unit} />
    </div>
  );
}
