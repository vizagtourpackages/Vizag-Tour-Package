import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, CheckCircle2, ChevronRight, Home, Info } from "lucide-react";
import HotelCard from "@/components/HotelCard";
import { siteInfo } from "@/data/siteInfo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: hotel } = await supabase
    .from("hotels_resorts")
    .select("name, description, meta_title, meta_description, meta_keywords, og_image_url, cover_image_url")
    .eq("slug", slug)
    .single();

  if (!hotel) {
    return { title: "Resort Not Found" };
  }

  return {
    title: hotel.meta_title || `${hotel.name} | ${siteInfo.name}`,
    description: hotel.meta_description || hotel.description || `Book your stay at ${hotel.name} with us today!`,
    keywords: hotel.meta_keywords || "",
    openGraph: {
      images: [hotel.og_image_url || hotel.cover_image_url],
    }
  };
}

export default async function ResortDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Fetch current resort
  const { data: hotel } = await supabase
    .from("hotels_resorts")
    .select("*")
    .eq("slug", slug)
    .single();

  // Fetch room types
  const { data: roomTypes } = await supabase
    .from("resort_room_types")
    .select("*")
    .eq("resort_id", hotel?.id);

  if (!hotel) {
    return (
      <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <h1 className="text-4xl font-heading font-black text-charcoal mb-4">Resort Not Found</h1>
        <p className="text-charcoal/60 mb-8 text-center max-w-md">We couldn't find the hotel or resort you're looking for. It may have been removed or the link is incorrect.</p>
        <Link href="/tour-packages" className="btn-primary py-3 px-8 rounded-full">
          Browse Options
        </Link>
      </div>
    );
  }

  // Fetch similar resorts (just a few others in the same type or general)
  let { data: similarResorts } = await supabase
    .from("hotels_resorts")
    .select("*")
    .eq("type", hotel.type)
    .neq("slug", slug)
    .limit(3);

  // If none match the exact type, just get any other resorts
  if (!similarResorts || similarResorts.length === 0) {
    const { data: fallbackResorts } = await supabase
      .from("hotels_resorts")
      .select("*")
      .neq("slug", slug)
      .limit(3);
    similarResorts = fallbackResorts;
  }

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in booking a stay at "${hotel.name}". Could you share availability and details?`
  );

  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      {/* Breadcrumbs & Back Button */}
      <div className="container-max px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link 
          href="/hotels-and-resorts" 
          className="inline-flex items-center gap-2 text-charcoal/60 hover:text-charcoal font-bold text-sm bg-sand px-4 py-2 rounded-full w-fit transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Hotels
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium text-charcoal/60 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-teal flex items-center gap-1.5"><Home size={14} /> Home</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link href="/hotels-and-resorts" className="hover:text-teal">Hotels & Resorts</Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-charcoal truncate max-w-[200px] sm:max-w-none">{hotel.name}</span>
        </nav>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Image */}
            <div className="relative aspect-[4/3] sm:aspect-video rounded-[32px] overflow-hidden bg-sand shadow-sm">
              <img 
                src={hotel.cover_image_url || hotel.image_url} 
                alt={hotel.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-charcoal shadow-sm border border-charcoal/5">
                {hotel.category || hotel.type}
              </div>
            </div>

            {/* Title & Quick Info */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-4xl sm:text-5xl font-heading font-black text-charcoal leading-tight tracking-tight pr-4">
                  {hotel.name}
                </h1>
                {hotel.rating && (
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 bg-sand-light border border-charcoal/5 px-4 py-2 rounded-full text-lg font-bold shadow-sm">
                      <Star size={20} className="text-coral fill-coral" />
                      {hotel.rating}
                    </div>
                    {hotel.reviews && <span className="text-xs text-charcoal/50 mt-1 font-medium">{hotel.reviews} reviews</span>}
                  </div>
                )}
              </div>
              
              {hotel.tagline && (
                <p className="text-xl text-charcoal/70 font-medium mb-4">{hotel.tagline}</p>
              )}

              <div className="flex items-center gap-2 text-charcoal/60 font-medium text-lg">
                <MapPin size={20} className="text-teal" />
                {hotel.location}
              </div>
            </div>

            {/* Description */}
            {hotel.description && (
              <div className="prose prose-lg prose-charcoal max-w-none">
                <h3 className="font-heading text-2xl font-bold mb-4">About the Property</h3>
                <p className="text-charcoal/80 leading-relaxed whitespace-pre-line">{hotel.description}</p>
              </div>
            )}

            {/* Highlights */}
            {hotel.highlights && hotel.highlights.length > 0 && (
              <div>
                <h3 className="font-heading text-2xl font-bold mb-4 text-charcoal">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.highlights.map((highlight: string, i: number) => (
                    <span key={i} className="bg-orange-50 text-orange-800 px-4 py-2 rounded-full font-medium text-sm border border-orange-100">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div className="bg-sand/30 p-8 rounded-[32px] border border-charcoal/5">
                <h3 className="font-heading text-2xl font-bold mb-6 text-charcoal">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 gap-x-4">
                  {hotel.amenities.map((amenity: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-charcoal/80 font-medium">
                      <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="leading-tight">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Room Types */}
            {roomTypes && roomTypes.length > 0 && (
              <div>
                <h3 className="font-heading text-2xl font-bold mb-6 text-charcoal">Room Options</h3>
                <div className="space-y-4">
                  {roomTypes.map((rt: any) => (
                    <div key={rt.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border ${rt.is_available ? 'border-charcoal/10 bg-white' : 'border-gray-200 bg-gray-50 opacity-75'}`}>
                      <div>
                        <h4 className="font-bold text-lg text-charcoal mb-1">{rt.room_type}</h4>
                        <div className="flex items-center gap-3 text-sm text-charcoal/60 font-medium">
                          {rt.has_ac && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs border border-blue-100">AC Included</span>}
                          {!rt.is_available && <span className="text-red-500 font-bold">Currently Unavailable</span>}
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-xs font-bold text-charcoal/50 uppercase tracking-widest">Price</div>
                          <div className="font-heading font-black text-2xl text-charcoal">₹{rt.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Places */}
            {hotel.nearby_places && hotel.nearby_places.length > 0 && (
              <div>
                <h3 className="font-heading text-2xl font-bold mb-6 text-charcoal">Nearby Attractions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hotel.nearby_places.map((place: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                        <MapPin size={18} className="text-teal" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 leading-tight">{place.name}</h4>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <span className="text-gray-500 capitalize">{place.category.replace(/_/g, ' ')}</span>
                          <span className="text-gray-300">•</span>
                          <span className="font-medium text-teal">{place.distance_km} km away</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-charcoal/10 shadow-xl rounded-[32px] p-6 sm:p-8">
              <div className="mb-8 pb-8 border-b border-charcoal/10">
                <div className="text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-2">Starting from</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-heading font-black tracking-tight text-charcoal">
                    {hotel.price_per_night ? `₹${hotel.price_per_night}` : hotel.price}
                  </span>
                  <span className="text-charcoal/60 font-medium">/ night</span>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href={`${siteInfo.whatsappLink}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center text-center text-lg py-4 shadow-md hover:shadow-lg bg-teal hover:bg-teal-dark"
                >
                  Book on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="btn-secondary w-full justify-center text-center text-lg py-4 border-charcoal/10 rounded-full bg-charcoal/5 hover:bg-charcoal/10 transition-colors font-bold"
                >
                  Request Availability
                </Link>
              </div>
              
              <div className="mt-6 flex items-start gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900/70 font-medium leading-tight">
                  Prices may vary based on season and availability. Contact us for exact quotes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Resorts */}
        {similarResorts && similarResorts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-charcoal/10">
            <h2 className="font-heading text-3xl font-black text-charcoal mb-10 tracking-tight">Similar Resorts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarResorts.map((r: any) => (
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
                    image: r.cover_image_url || r.image_url,
                    amenities: r.amenities || []
                  }} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
