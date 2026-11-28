import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ListTree } from "lucide-react";
import { createPublicClient as createClient } from "@/lib/supabase/public";
import EnquirySidebar from "@/components/EnquirySidebar";
import RichContent from "@/components/RichContent";
import { indexHeadings, looksLikeHtml, stripHtml } from "@/lib/content";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getGuide(slug: string) {
  const supabase = await createClient();
  let { data } = await supabase.from("travel_guides").select("*").eq("slug", slug).maybeSingle();
  if (!data && UUID.test(slug)) {
    ({ data } = await supabase.from("travel_guides").select("*").eq("id", slug).maybeSingle());
  }
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  return {
    title: guide.title,
    description: guide.excerpt || guide.description || stripHtml(guide.content).slice(0, 155),
    openGraph: guide.image_url ? { images: [guide.image_url] } : undefined,
  };
}

export default async function TravelGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide || guide.is_published === false) notFound();

  const supabase = await createClient();
  const { data: others } = await supabase
    .from("travel_guides")
    .select("id, slug, title, category, image_url")
    .eq("is_published", true)
    .neq("id", guide.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const isHtml = looksLikeHtml(guide.content);
  const indexed = isHtml ? indexHeadings(guide.content) : { html: guide.content as string | null, headings: [] };
  const highlights: string[] = guide.highlights || guide.items || [];

  return (
    <div className="bg-warm-white min-h-screen pb-20">
      {/* Hero */}
      <section className="relative -mt-[72px] pt-[110px] pb-14 overflow-hidden rounded-b-[40px] bg-ocean">
        {guide.image_url && <img src={guide.image_url} alt={guide.title} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/50 to-coral/20" />
        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <Link href="/travel-guides" className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white mb-6">
            <ArrowLeft size={14} /> All guides
          </Link>
          {guide.category && <span className="block badge bg-white/15 text-white border border-white/20 w-fit mb-4">{guide.category}</span>}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white leading-tight max-w-4xl">{guide.title}</h1>
          {(guide.excerpt || guide.description) && (
            <p className="text-white/80 text-base sm:text-lg mt-4 max-w-3xl">{guide.excerpt || guide.description}</p>
          )}
        </div>
      </section>

      <EnquirySidebar context={guide.title}>
        <div className="py-10 space-y-10">
          {/* Index */}
          {indexed.headings.length > 0 && (
            <nav className="rounded-[24px] bg-white border border-charcoal/5 shadow-card p-5 sm:p-6" aria-label="Guide index">
              <h2 className="flex items-center gap-2 font-heading font-bold text-lg text-charcoal mb-3">
                <ListTree size={18} className="text-coral" /> In this guide
              </h2>
              <ol className="space-y-1.5">
                {indexed.headings.map((h, i) => (
                  <li key={h.id} className={h.level === 3 ? "ml-5" : ""}>
                    <a href={`#${h.id}`} className="group flex items-start gap-2 text-sm font-medium text-charcoal/70 hover:text-coral transition-colors">
                      {h.level === 2 && <span className="text-coral/60 font-bold w-5 shrink-0">{i + 1}.</span>}
                      <span className="group-hover:translate-x-0.5 transition-transform">{h.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {highlights.length > 0 && !guide.content && (
            <ul className="grid sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 bg-white rounded-2xl p-4 border border-charcoal/5">
                  <CheckCircle2 size={18} className="text-teal shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-charcoal/80">{h}</span>
                </li>
              ))}
            </ul>
          )}

          <RichContent html={indexed.html} />

          {/* More guides */}
          {others && others.length > 0 && (
            <div className="pt-8 border-t border-charcoal/10">
              <h2 className="font-heading font-black text-2xl text-charcoal mb-5">More travel guides</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {others.map((g: any) => (
                  <Link key={g.id} href={`/travel-guides/${g.slug || g.id}`} className="group rounded-2xl overflow-hidden bg-white border border-charcoal/5 shadow-card hover:-translate-y-1 transition-transform">
                    <div className="aspect-[16/10] bg-sand overflow-hidden">
                      {g.image_url && <img src={g.image_url} alt={g.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                    </div>
                    <div className="p-4 font-heading font-bold text-charcoal leading-snug group-hover:text-coral transition-colors">{g.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </EnquirySidebar>
    </div>
  );
}
