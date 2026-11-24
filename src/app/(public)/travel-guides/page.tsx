import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import { stripHtml } from "@/lib/content";

export const metadata: Metadata = {
  title: "Vizag Travel Guides",
  description: "Helpful guides for your Visakhapatnam trip: places to visit, beaches, local food, best time to visit and travel tips.",
};

export default async function TravelGuidesIndexPage() {
  const supabase = await createClient();
  const { data: guides } = await supabase
    .from("travel_guides")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="bg-warm-white min-h-screen pb-24 pt-5">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Vizag Travel Guides"
          subtitle="Everything you need to plan the perfect trip – tourist places, beaches, local food, best time to visit and more."
        />
        {guides && guides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((g: any, i: number) => (
              <ScrollReveal key={g.id} delay={(i % 3) * 0.08}>
                <Link
                  href={`/travel-guides/${g.slug || g.id}`}
                  className="group block h-full bg-white rounded-[24px] overflow-hidden border border-charcoal/5 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                    {g.image_url && (
                      <img src={g.image_url} alt={g.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    )}
                    {g.category && (
                      <span className="absolute top-3 left-3 badge bg-white/90 text-charcoal shadow-sm">{g.category}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading font-bold text-xl text-charcoal leading-tight group-hover:text-coral transition-colors">{g.title}</h2>
                    <p className="text-sm text-charcoal/60 mt-2 line-clamp-2">
                      {g.excerpt || g.description || stripHtml(g.content).slice(0, 140)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-coral mt-4">
                      Read guide <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-charcoal/50 py-16">Guides are coming soon.</p>
        )}
      </div>
    </div>
  );
}
