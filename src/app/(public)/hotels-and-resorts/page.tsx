import SectionHeading from "@/components/SectionHeading";
import HotelCard from "@/components/HotelCard";
import { createClient } from "@/lib/supabase/server";

export default async function HotelsPage() {
  const supabase = await createClient();
  const { data: resorts } = await supabase
    .from('hotels_resorts')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  // map Supabase results to Hotel interface expected by HotelCard
  const mappedHotels = (resorts || []).map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    type: r.category || 'Resorts',
    rating: r.rating || 4.5,
    location: r.location,
    price: r.price_per_night ? `₹${r.price_per_night}` : (r.price || '₹0'),
    image: r.cover_image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    amenities: r.amenities || [],
    reviews: r.review_count || 120
  }));

  return (
    <div className="bg-warm-white min-h-screen pb-24 pt-5">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Book Hotels & Resorts in Vizag"
          subtitle="Find the right stay for your journey—from budget-friendly hotels and family stays to premium resorts and beachfront properties across Vizag and nearby destinations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {mappedHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
          {mappedHotels.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No hotels found. Check back soon!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
