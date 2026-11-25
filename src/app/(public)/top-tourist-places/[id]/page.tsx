import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import EnquirySidebar from "@/components/EnquirySidebar";
import RichContent from "@/components/RichContent";
import DestinationCard from "@/components/DestinationCard";
import { stripHtml } from "@/lib/content";

async function getPlace(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("places_to_visit").select("*").eq("id", id).maybeSingle();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const place = await getPlace(id);
  if (!place) return { title: "Place not found" };
  return {
    title: `${place.name} | Vizag Sightseeing`,
    description: place.description || stripHtml(place.content).slice(0, 155),
    openGraph: place.image_url ? { images: [place.image_url] } : undefined,
  };
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const place = await getPlace(id);
  if (!place || place.is_published === false) notFound();

  const supabase = await createClient();
  const { data: others } = await supabase
    .from("places_to_visit")
    .select("*")
    .eq("is_published", true)
    .neq("id", place.id)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="bg-warm-white pb-20">
      {/* hero image */}
      <section className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:px-8">
        <Link href="/top-tourist-places" className="mb-4 inline-flex items-center gap-2 rounded-full border border-ocean/12 bg-white px-4 py-2.5 text-sm font-semibold text-ocean shadow-sm transition-colors hover:bg-sand">
          <ArrowLeft size={16} /> All places
        </Link>
        <div className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden rounded-[28px] bg-sand sm:rounded-[36px]">
          {place.image_url && <img src={place.image_url} alt={place.name} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/85 via-ocean/25 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-10 sm:bottom-9">
            {place.category && <span className="mb-3 inline-block rounded-full bg-sunset px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider">{place.category}</span>}
            <h1 className="font-heading text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.05]">{place.name}</h1>
            {place.location && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-white/80">
                <MapPin size={15} /> {place.location}
              </p>
            )}
          </div>
        </div>
      </section>

      <EnquirySidebar context={place.name}>
        <div className="py-10">
          {place.content ? (
            <RichContent html={place.content} />
          ) : (
            <p className="whitespace-pre-line text-[1.05rem] leading-relaxed text-charcoal/75">{place.description}</p>
          )}
        </div>

        {others && others.length > 0 && (
          <div className="border-t border-ocean/10 pb-6 pt-10">
            <h2 className="mb-6 font-heading text-[1.8rem] text-ocean">More places to visit</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {others.map((p: any) => (
                <DestinationCard
                  key={p.id}
                  destination={{
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    category: p.category || "Place",
                    imageGradient: "from-blue-400 to-ocean",
                    imageUrl: p.image_url,
                    customLink: p.custom_link || `/top-tourist-places/${p.id}`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </EnquirySidebar>
    </div>
  );
}
