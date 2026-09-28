import SectionHeading from "@/components/SectionHeading";
import ResortListClient from "./ResortListClient";
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
    price_label: r.price_label,
    image: r.cover_image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    amenities: r.amenities || [],
    reviews: r.reviews || 0
  }));

  return (
    <div className="bg-warm-white min-h-screen pb-24 pt-5">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Book Hotels & Resorts in Vizag"
          subtitle="Find the right stay for your journey—from budget-friendly hotels and family stays to premium resorts and beachfront properties across Vizag and nearby destinations."
        />

        <ResortListClient initialHotels={mappedHotels} />
      </div>
    </div>
  );
}
