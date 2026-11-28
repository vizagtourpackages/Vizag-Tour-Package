import Link from "next/link";
import { createPublicClient as createClient } from "@/lib/supabase/public";
import { getSiteSettings } from "@/lib/settings";
import { Arrow } from "./Motion";
import { withDisplayPrices } from "@/lib/stay";

const FIELDS = "id, slug, title, price, price_label, rate_plans, resort_ids, duration, cover_image_url, image_url";

/**
 * The packages chosen in admin → Settings → Blog sidebar (up to 5), shown as a list with photo and starting price.
 * Falls back to the newest published packages when none are chosen.
 */
export default async function BlogPackagesList({ className = "" }: { className?: string }) {
  const { blogSidebarIds } = await getSiteSettings();
  const supabase = await createClient();

  let rows: any[] = [];
  if (blogSidebarIds.length > 0) {
    const { data } = await supabase
      .from("tour_packages")
      .select(FIELDS)
      .in("id", blogSidebarIds.slice(0, 5))
      .eq("is_published", true);
    rows = blogSidebarIds.map((id) => (data || []).find((p) => p.id === id)).filter(Boolean) as any[];
  }
  if (rows.length === 0) {
    const { data } = await supabase
      .from("tour_packages")
      .select(FIELDS)
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(5);
    rows = data || [];
  }
  if (rows.length === 0) return null;
  rows = await withDisplayPrices(supabase, rows);

  return (
    <section className={`overflow-hidden rounded-[28px] border border-ocean/8 bg-white shadow-float ${className}`} aria-labelledby="blog-packages-heading">
      <div className="bg-sunset px-6 py-5 text-white">
        <p className="text-[0.66rem] font-bold uppercase tracking-widest text-white/80">Plan your trip</p>
        <h2 id="blog-packages-heading" className="font-heading text-[1.25rem] leading-tight">Popular tour packages</h2>
      </div>
      <ul className="divide-y divide-ocean/8">
        {rows.map((p) => (
          <li key={p.id}>
            <Link href={`/packages/${p.slug}`} className="group flex items-center gap-3.5 p-4 transition-colors hover:bg-sand/50">
              <span className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl bg-sand">
                {(p.cover_image_url || p.image_url) && (
                  <img src={p.cover_image_url || p.image_url} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 block font-heading text-[1.02rem] leading-snug text-ocean group-hover:text-coral">{p.title}</span>
                <span className="mt-1 block text-[0.7rem] font-semibold uppercase tracking-wider text-charcoal/45">{p.duration}</span>
                <span className="mt-0.5 block text-[0.78rem] text-charcoal/60">
                  Starting from <span className="font-heading text-[1.05rem] text-ocean">₹{Number(p.price).toLocaleString("en-IN")}</span>
                </span>
              </span>
              <Arrow className="shrink-0 text-ocean/30 transition-transform group-hover:translate-x-1 group-hover:text-coral" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-ocean/8 p-4">
        <Link href="/tour-packages" className="btn-secondary w-full !py-3 text-sm">View all packages</Link>
      </div>
    </section>
  );
}
