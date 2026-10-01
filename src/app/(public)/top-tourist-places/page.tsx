import { createClient } from "@/lib/supabase/server";
import DestinationCard from "@/components/DestinationCard";

export const metadata = {
  title: "Vizag Sightseeing | Top Tourist Places in Visakhapatnam",
  description: "Explore the best sightseeing locations and top tourist places in Visakhapatnam.",
};

export default async function VizagSightseeingPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const firstId = resolvedSearchParams.first as string;

  const supabase = await createClient();

  const { data: dbPlaces } = await supabase
    .from('places_to_visit')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  let displayPlaces = dbPlaces && dbPlaces.length > 0
    ? dbPlaces.map(place => ({
      id: place.id,
      name: place.name,
      description: place.description,
      category: place.category || 'Place',
      imageGradient: 'from-blue-400 to-ocean',
      imageUrl: place.image_url,
      customLink: place.custom_link
    }))
    : [];

  // Reorder if "first" query parameter is provided
  if (firstId) {
    const selectedIndex = displayPlaces.findIndex(p => p.id === firstId);
    if (selectedIndex > -1) {
      const selected = displayPlaces[selectedIndex];
      displayPlaces.splice(selectedIndex, 1);
      displayPlaces.unshift(selected);
    }
  }

  return (
    <div className="bg-warm-white min-h-screen pb-24">
      <div className="bg-charcoal pt-[104px] pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="container-max relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-4 tracking-tight">
            Vizag Sightseeing
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Top Tourist Places in Visakhapatnam
          </p>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {displayPlaces.map((place: any) => (
            <div 
              key={place.id} 
              id={place.id}
              className={`h-full ${firstId === place.id ? '-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] scale-[1.02] relative z-20 transition-all duration-500 rounded-[24px]' : ''}`}
            >
              <DestinationCard destination={place} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
