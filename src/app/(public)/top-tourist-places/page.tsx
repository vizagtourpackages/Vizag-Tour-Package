import { createClient } from "@/lib/supabase/server";
import PlacesClient from "./PlacesClient";

export const metadata = {
  title: "Vizag Sightseeing | Top Tourist Places in Visakhapatnam",
  description: "Explore the best sightseeing locations and top tourist places in Visakhapatnam — beaches, viewpoints, museums, temples and more.",
};

export default async function VizagSightseeingPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolved = await searchParams;
  const firstId = typeof resolved.first === "string" ? resolved.first : undefined;

  const supabase = await createClient();
  const { data: dbPlaces } = await supabase
    .from("places_to_visit")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const places = (dbPlaces || []).map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    category: p.category || "Place",
    imageGradient: "from-blue-400 to-ocean",
    imageUrl: p.image_url,
    customLink: p.custom_link || `/top-tourist-places/${p.id}`,
  }));

  return (
    <div className="bg-warm-white pb-24">
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,179,71,.42),rgba(255,106,61,.12)_55%,transparent_70%)]" />
          <div className="absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(45,156,219,.15),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 pb-10 pt-12 text-center sm:px-8 lg:pt-16">
          <p className="kicker mb-5">Vizag sightseeing</p>
          <h1 className="font-heading text-[clamp(2.3rem,6vw,4.3rem)] leading-[1.05] text-ocean">
            Top tourist places in <span className="italic text-coral">Visakhapatnam</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-charcoal/70">
            Beaches, viewpoints, museums, temples and hidden corners — everything worth seeing in and around the City of Destiny.
          </p>
        </div>
      </section>

      <PlacesClient places={places} firstId={firstId} />
    </div>
  );
}
