import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import EnquirySidebar from "@/components/EnquirySidebar";
import RichContent from "@/components/RichContent";
import EventCard from "@/components/EventCard";
import { stripHtml } from "@/lib/content";

async function getEvent(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("upcoming_events").select("*").eq("id", id).maybeSingle();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: `${event.title} | Events in Vizag`,
    description: event.description || stripHtml(event.content).slice(0, 155) || `Learn more about ${event.title} in Visakhapatnam.`,
    openGraph: event.image_url ? { images: [event.image_url] } : undefined,
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event || event.is_published === false) notFound();

  const supabase = await createClient();
  const { data: others } = await supabase
    .from("upcoming_events")
    .select("*")
    .eq("is_published", true)
    .neq("id", event.id)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div className="bg-warm-white pb-20">
      {/* ---------- Hero ---------- */}
      <section className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:px-8">
        <Link href="/#events" className="mb-4 inline-flex items-center gap-2 rounded-full border border-ocean/12 bg-white px-4 py-2.5 text-sm font-semibold text-ocean shadow-sm transition-colors hover:bg-sand">
          <ArrowLeft size={16} /> All events
        </Link>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-sand sm:aspect-[16/8] sm:rounded-[36px] lg:max-h-[520px]">
          {event.image_url && <img src={event.image_url} alt={event.title} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/90 via-ocean/30 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-10 sm:bottom-9">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sunset px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider">{event.category || "Event"}</span>
              {event.date && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider backdrop-blur">
                  <CalendarDays size={13} /> {event.date}
                </span>
              )}
            </div>
            <h1 className="max-w-4xl font-heading text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.05]">{event.title}</h1>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-white/80">
              <MapPin size={15} /> Visakhapatnam
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Details + enquiry ---------- */}
      <EnquirySidebar context={event.title}>
        <div className="py-10">
          <h2 className="mb-4 font-heading text-[1.8rem] text-ocean">About this event</h2>
          {event.content ? (
            <RichContent html={event.content} />
          ) : (
            <p className="whitespace-pre-line text-[1.05rem] leading-relaxed text-charcoal/75">
              {event.description || "More details about this event are coming soon."}
            </p>
          )}
          <p className="mt-8 rounded-2xl bg-sand px-5 py-4 text-[0.95rem] text-charcoal/70">
            Planning to attend? We can arrange your transport and stay around the event — send us an enquiry and we&apos;ll plan it with you.
          </p>
        </div>

        {others && others.length > 0 && (
          <div className="border-t border-ocean/10 pb-6 pt-10">
            <h2 className="mb-6 font-heading text-[1.8rem] text-ocean">More events</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {others.map((e: any) => (
                <EventCard
                  key={e.id}
                  event={{
                    id: e.id,
                    title: e.title,
                    description: e.description,
                    category: e.category || "Event",
                    year: e.date,
                    imageGradient: "from-purple-500 to-pink-600",
                    imageUrl: e.image_url,
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
