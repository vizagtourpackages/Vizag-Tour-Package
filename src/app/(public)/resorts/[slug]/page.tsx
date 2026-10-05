import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, CheckCircle2, ChevronRight, Home, Info, ArrowLeft, Utensils, Building2, Map } from "lucide-react";
import ResortGallery from "@/components/ResortGallery";
import HotelCard from "@/components/HotelCard";
import ResortBookingButton from "@/components/ResortBookingButton";
import TermsButton from "@/components/TermsButton";
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
      <div className="bg-[#FFFBF4] min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <h1 className="text-4xl font-heading font-black text-[#6B5744] mb-4">Resort Not Found</h1>
        <p className="text-[#6B5744]/60 mb-8 text-center max-w-md">We couldn't find the hotel or resort you're looking for. It may have been removed or the link is incorrect.</p>
        <Link href="/tour-packages" className="bg-[#2D6A4F] text-white py-3 px-8 rounded-full font-bold">
          Browse Options
        </Link>
      </div>
    );
  }

  // Fetch similar resorts
  let { data: similarResorts } = await supabase
    .from("hotels_resorts")
    .select("*")
    .eq("type", hotel.type)
    .neq("slug", slug)
    .limit(3);

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

  const mainImageUrl = hotel.cover_image_url || hotel.image_url || '/placeholder.jpg';
  const priceDisplay = hotel.price_per_night ? `₹${hotel.price_per_night}` : hotel.price;
  
  const getFormattedPriceLabel = (label?: string) => {
    const base = "per night";
    if (!label) return base;
    const cleanLabel = label.replace(/^\/?\s*/, '').toLowerCase().trim();
    if (cleanLabel === "per night" || cleanLabel === "night" || cleanLabel === "") return base;
    return `${base} / ${label.replace(/^\/?\s*/, '')}`;
  };
  
  // Group nearby places by category
  const nearbyPlaces = hotel.nearby_places || [];
  const attractions = nearbyPlaces.filter((p: any) => p.category === 'attraction' || p.category !== 'restaurant');
  const restaurants = nearbyPlaces.filter((p: any) => p.category === 'restaurant');

  const bookingCard = (
    <div className="bg-white rounded-[24px] border border-[#E8DDD4] p-6 sm:p-8 shadow-sm lg:sticky lg:top-28">
      <div className="mb-2">
        <span className="text-[#6B5744]/70 text-[15px] font-medium">Starting from</span>
      </div>
      <div className="mb-4 flex flex-wrap items-baseline gap-2">
        <span className="text-[32px] font-bold text-[#332A20] leading-none mb-1">
          {priceDisplay}
        </span>
        <span className="text-sm font-medium text-[#6B5744]/70">
          / {getFormattedPriceLabel(hotel.price_label)}
        </span>
        <span className="text-[#6B5744]/60 text-sm block mt-1 w-full">Taxes included · Select a room to book</span>
      </div>

      <ResortBookingButton hotel={hotel} />
      
      <div className="mt-4 text-center">
        <span className="text-xs text-[#6B5744]/60">
          By booking you agree to our <TermsButton category="resorts" className="text-[#2D6A4F] hover:underline font-medium cursor-pointer" />
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFFBF4] min-h-screen md:pt-16 pt-0 pb-24 font-sans">
      {/* Container matching standard max-w */}
      <div className="container-max px-0 sm:px-6 lg:px-8 mx-auto">
        
        <ResortGallery 
          images={hotel.gallery_images && hotel.gallery_images.length > 0 ? hotel.gallery_images : [mainImageUrl]}
          hotel={hotel} 
        />

        {/* Content Layout */}
        <div className="px-4 sm:px-0">
          <div className="flex items-center gap-4 py-4 border-b border-[#E8DDD4]">
            {hotel.rating && (
              <div className="flex items-center gap-1.5 text-[#6B5744] font-bold">
                <Star size={18} className="text-[#F59E0B] fill-[#F59E0B]" />
                {hotel.rating} <span className="text-[#6B5744]/60 font-medium text-sm ml-1">({hotel.reviews || 0} reviews)</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-[#6B5744]/70 font-medium text-sm">
              <MapPin size={16} className="text-[#2D6A4F]" />
              {hotel.location}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mt-8 relative">
            
            {/* Left Content */}
            <div className="w-full lg:w-2/3 space-y-10">
              
              {/* About Resort */}
              {hotel.description && (
                <section>
                  <h2 className="text-2xl font-bold text-[#332A20] mb-4">About the Resort</h2>
                  <p className="text-[#6B5744] leading-relaxed whitespace-pre-line text-[15px] sm:text-[16px]">
                    {hotel.description}
                  </p>
                </section>
              )}

              {/* Amenities (Pill Style) */}
              {hotel.amenities && hotel.amenities.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#332A20] mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hotel.amenities.map((amenity: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5 bg-[#F0FDF4] text-[#166534] px-4 py-3 rounded-[12px] font-medium text-sm border border-[#DCFCE7]">
                        <CheckCircle2 size={16} className="text-[#166534]" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Room Types */}
              {roomTypes && roomTypes.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#332A20] mb-4">Room Options</h2>
                  <div className="space-y-3">
                    {roomTypes.map((rt: any) => (
                      <div key={rt.id} className={`flex justify-between items-center p-4 sm:p-5 rounded-[16px] border ${rt.is_available ? 'border-[#E8DDD4] bg-white' : 'border-gray-200 bg-gray-50 opacity-75'}`}>
                        <div>
                          <h4 className="font-bold text-lg text-[#332A20] mb-1">{rt.room_type}</h4>
                          <div className="flex items-center gap-2 text-sm text-[#6B5744]/70">
                            {rt.has_ac && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-bold border border-blue-100 tracking-wide">AC</span>}
                            {!rt.is_available && <span className="text-red-500 font-bold text-[11px] tracking-wide">UNAVAILABLE</span>}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <div className="font-bold text-xl sm:text-2xl text-[#332A20]">₹{rt.price}</div>
                          <div className="text-[11px] text-[#6B5744]/60">
                            / {getFormattedPriceLabel(hotel.price_label)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Mobile Booking Card (Before Around the Property) */}
              <div className="block lg:hidden">
                {bookingCard}
              </div>

              {/* Around the Property */}
              {(attractions.length > 0 || restaurants.length > 0) && (
                <section>
                  <h2 className="text-2xl font-bold text-[#332A20] mb-4">Around the Property</h2>
                  <div className="space-y-4">
                    
                    {attractions.length > 0 && (
                      <div className="bg-white rounded-[16px] border border-[#E8DDD4] p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-[#2D6A4F] font-bold mb-4">
                          <MapPin size={18} />
                          <h3>Attractions</h3>
                        </div>
                        <div className="space-y-0">
                          {attractions.slice(0, 4).map((place: any, i: number) => (
                            <div key={i} className="flex justify-between items-center py-3 border-b border-[#E8DDD4]/50 last:border-0 last:pb-0">
                              <span className="text-[#332A20] font-medium text-[15px]">{place.name}</span>
                              <span className="text-[#6B5744]/60 text-sm font-medium bg-[#FFFBF4] px-2 py-1 rounded-md">{place.distance_km} km</span>
                            </div>
                          ))}
                          
                          {attractions.length > 4 && (
                            <details className="group">
                              <summary className="list-none cursor-pointer flex justify-center py-3 text-[#2D6A4F] font-bold text-sm hover:underline border-t border-[#E8DDD4]/50 mt-1">
                                <span className="group-open:hidden">View All Attractions ({attractions.length})</span>
                                <span className="hidden group-open:block">Show Less</span>
                              </summary>
                              <div className="space-y-0 border-t border-[#E8DDD4]/50">
                                {attractions.slice(4).map((place: any, i: number) => (
                                  <div key={i + 4} className="flex justify-between items-center py-3 border-b border-[#E8DDD4]/50 last:border-0 last:pb-0">
                                    <span className="text-[#332A20] font-medium text-[15px]">{place.name}</span>
                                    <span className="text-[#6B5744]/60 text-sm font-medium bg-[#FFFBF4] px-2 py-1 rounded-md">{place.distance_km} km</span>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    )}

                    {restaurants.length > 0 && (
                      <div className="bg-white rounded-[16px] border border-[#E8DDD4] p-5 shadow-sm">
                        <div className="flex items-center gap-2 text-[#2D6A4F] font-bold mb-4">
                          <Utensils size={18} />
                          <h3>Restaurants</h3>
                        </div>
                        <div className="space-y-0">
                          {restaurants.slice(0, 4).map((place: any, i: number) => (
                            <div key={i} className="flex justify-between items-center py-3 border-b border-[#E8DDD4]/50 last:border-0 last:pb-0">
                              <span className="text-[#332A20] font-medium text-[15px]">{place.name}</span>
                              <span className="text-[#6B5744]/60 text-sm font-medium bg-[#FFFBF4] px-2 py-1 rounded-md">{place.distance_km} km</span>
                            </div>
                          ))}

                          {restaurants.length > 4 && (
                            <details className="group">
                              <summary className="list-none cursor-pointer flex justify-center py-3 text-[#2D6A4F] font-bold text-sm hover:underline border-t border-[#E8DDD4]/50 mt-1">
                                <span className="group-open:hidden">View All Restaurants ({restaurants.length})</span>
                                <span className="hidden group-open:block">Show Less</span>
                              </summary>
                              <div className="space-y-0 border-t border-[#E8DDD4]/50">
                                {restaurants.slice(4).map((place: any, i: number) => (
                                  <div key={i + 4} className="flex justify-between items-center py-3 border-b border-[#E8DDD4]/50 last:border-0 last:pb-0">
                                    <span className="text-[#332A20] font-medium text-[15px]">{place.name}</span>
                                    <span className="text-[#6B5744]/60 text-sm font-medium bg-[#FFFBF4] px-2 py-1 rounded-md">{place.distance_km} km</span>
                                  </div>
                                ))}
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                </section>
              )}
            </div>

            {/* Right Column / Sticky Booking Card */}
            <div className="hidden lg:block w-full lg:w-1/3 mt-8 lg:mt-0 pb-12 lg:pb-0">
              {bookingCard}
            </div>

          </div>
        </div>
      </div>
      
      {/* More Places to Stay */}
      {similarResorts && similarResorts.length > 0 && (
        <div className="bg-[#FFFBF4] mt-16 pt-16 border-t border-[#E8DDD4]">
          <div className="container-max px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-2xl font-bold text-[#332A20] mb-8">More Places to Stay</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    price_label: r.price_label,
                    no_of_persons: r.no_of_persons,
                    image: r.cover_image_url || r.image_url,
                    amenities: r.amenities || []
                  }} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
