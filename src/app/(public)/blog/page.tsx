import { Metadata } from "next";
import Link from "next/link";
import { Clock, Search } from "lucide-react";
import { blogCategories, postDate, publishedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import BlogCard from "@/components/BlogCard";
import { Reveal, Arrow } from "@/components/Motion";
import { stripHtml } from "@/lib/content";

const PAGE_SIZE = 9;

export const metadata: Metadata = {
  title: "Blog — Vizag & Araku travel tips, guides and stories",
  description: "Travel tips, itineraries and local guides for Visakhapatnam, Araku Valley, Lambasingi and Vanjangi from the Vizag Tour Packages team.",
  alternates: { canonical: absoluteUrl("/blog"), types: { "application/rss+xml": absoluteUrl("/blog/rss.xml") } },
  openGraph: { title: "Vizag Tour Packages Blog", description: "Travel tips, itineraries and local guides for Vizag and Araku.", url: absoluteUrl("/blog"), type: "website" },
};

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const q = typeof sp.q === "string" ? sp.q.slice(0, 80) : undefined;
  const page = Math.max(1, parseInt(typeof sp.page === "string" ? sp.page : "1") || 1);
  const filtering = !!(category || q || page > 1);

  const [categories, pool, listRes] = await Promise.all([
    blogCategories(),
    filtering ? Promise.resolve(null) : publishedPosts({ limit: 30 }),
    publishedPosts({ category, q, limit: PAGE_SIZE + 1, offset: (page - 1) * PAGE_SIZE }),
  ]);

  // featured = the flagged post, else the newest (only on the unfiltered first page)
  const featured = pool ? pool.posts.find((x) => x.is_featured) || pool.posts[0] : undefined;
  const list = listRes.posts.filter((p) => p.id !== featured?.id).slice(0, PAGE_SIZE);
  const hasNext = listRes.posts.length > PAGE_SIZE;

  const href = (params: Record<string, string | number | undefined>) => {
    const u = new URLSearchParams();
    Object.entries({ category, q, ...params }).forEach(([k, v]) => v !== undefined && v !== "" && u.set(k, String(v)));
    const qs = u.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <div className="bg-warm-white pb-24">
      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(255,179,71,.42),rgba(255,106,61,.12)_55%,transparent_70%)]" />
          <div className="absolute -left-24 bottom-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(45,156,219,.15),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 pb-8 pt-12 text-center sm:px-8 lg:pt-16">
          <p className="kicker mb-5">The blog</p>
          <h1 className="font-heading text-[clamp(2.1rem,6vw,4.2rem)] leading-[1.05] text-ocean">
            Stories &amp; tips for <span className="italic text-coral">your trip</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-charcoal/70">
            Itineraries, local know-how and planning advice for Vizag, Araku Valley, Lambasingi and Vanjangi.
          </p>

          <form action="/blog" method="get" role="search" className="relative mx-auto mt-8 max-w-xl">
            {category && <input type="hidden" name="category" value={category} />}
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-ocean/40" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-full rounded-full border border-ocean/12 bg-white py-3.5 pl-12 pr-28 text-base font-medium text-ocean outline-none placeholder:font-normal placeholder:text-ocean/35 focus:border-coral focus:ring-4 focus:ring-coral/15"
            />
            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-ocean px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral">Search</button>
          </form>
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* ---------- Categories ---------- */}
        {categories.length > 0 && (
          <nav aria-label="Blog categories" className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {[{ label: "All", value: undefined }, ...categories.map((c) => ({ label: c, value: c }))].map((c) => {
              const active = c.value === category || (!c.value && !category);
              return (
                <Link
                  key={c.label}
                  href={href({ category: c.value, page: undefined })}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-[background-color,color,border-color] duration-150 ${active ? "border-ocean bg-ocean text-white" : "border-ocean/15 bg-white text-ocean/75 hover:border-ocean/40"}`}
                >
                  {c.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* ---------- Featured ---------- */}
        {featured && (
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group mb-14 grid overflow-hidden rounded-[32px] border border-ocean/8 bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-sand lg:aspect-auto lg:min-h-[380px]">
                {featured.cover_image_url && <img src={featured.cover_image_url} alt={featured.cover_alt || featured.title} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-105" />}
                <span className="absolute left-4 top-4 rounded-full bg-sunset px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-white">Featured</span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                {featured.category && <p className="kicker mb-3">{featured.category}</p>}
                <h2 className="font-heading text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.1] text-ocean transition-colors group-hover:text-coral">{featured.title}</h2>
                <p className="mt-4 line-clamp-3 text-[1rem] leading-relaxed text-charcoal/65">{featured.excerpt || stripHtml(featured.content).slice(0, 180)}</p>
                <p className="mt-5 flex items-center gap-4 text-xs font-medium text-charcoal/50">
                  <time dateTime={featured.published_at || featured.created_at}>{postDate(featured)}</time>
                  {featured.reading_minutes && <span className="inline-flex items-center gap-1"><Clock size={12} /> {featured.reading_minutes} min read</span>}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-coral">Read the article <Arrow className="transition-transform group-hover:translate-x-1.5" /></span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* ---------- Grid ---------- */}
        {list.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.05}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          !featured && (
            <div className="rounded-[28px] bg-white py-16 text-center shadow-card">
              <p className="font-heading text-xl text-ocean">{q || category ? "No articles match your search" : "Articles are coming soon"}</p>
              {(q || category) && <Link href="/blog" className="btn-secondary mt-5">Clear filters</Link>}
            </div>
          )
        )}

        {/* ---------- Pagination ---------- */}
        {(page > 1 || hasNext) && (
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-3">
            {page > 1 && <Link href={href({ page: page - 1 })} rel="prev" className="btn-secondary">Newer</Link>}
            <span className="text-sm font-medium text-charcoal/55">Page {page}</span>
            {hasNext && <Link href={href({ page: page + 1 })} rel="next" className="btn-coral">Older <Arrow /></Link>}
          </nav>
        )}
      </div>
    </div>
  );
}
