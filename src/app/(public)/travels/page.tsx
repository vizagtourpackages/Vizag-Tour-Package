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

  const { data: dbTrustPoints } = await supabase
    .from('travel_trust_points')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const { data: dbNotes } = await supabase
    .from('travel_notes')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const trustPoints = dbTrustPoints || [];
  const notes = dbNotes || [];

  return <TravelsClient vehicles={displayTravels} trustPoints={trustPoints} notes={notes} />;
}
