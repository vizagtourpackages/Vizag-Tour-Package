import { createClient } from "@/lib/supabase/server";
import TravelsClient from "./TravelsClient";

export default async function TravelsPage() {
  const supabase = await createClient();

  const { data: dbTravels } = await supabase
    .from('travels')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  const displayTravels = dbTravels && dbTravels.length > 0
    ? dbTravels.map(t => ({
      id: t.id,
      model: t.model,
      pricePerKm: t.price_per_km,
      pax: t.pax,
      amenities: t.amenities || [],
      image: t.image,
      minKmNote: t.min_km_note
    }))
    : [];

  return <TravelsClient vehicles={displayTravels} />;
}
