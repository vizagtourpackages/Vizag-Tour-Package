import { createClient } from "@/lib/supabase/server";
import TourPackagesClient from "./TourPackagesClient";

export const metadata = {
  title: "Tour Packages | Vizag Tour Packages",
  description: "Explore our wide range of Vizag tour packages. From day trips to multi-day itineraries, find the perfect vacation package for Araku Valley and Visakhapatnam.",
};

export default async function TourPackagesPage() {
  const supabase = await createClient();

  const { data: dbPackages } = await supabase
    .from('tour_packages')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

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
      highlights: pkg.highlights || [],
      includes: pkg.includes || [],
      excludes: pkg.excludes || [],
      category: pkg.category || pkg.type || '',
      imageGradient: 'from-teal to-blue-600', // fallback
      imageUrl: pkg.cover_image_url || pkg.image_url
    }))
    : [];

  return (
    <TourPackagesClient initialPackages={displayPackages} />
  );
}
