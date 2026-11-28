import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const nowIso = new Date().toISOString();

  const [packages, hotels, posts, guides, places, events, devotional] = await Promise.all([
    supabase.from("tour_packages").select("slug, updated_at").eq("is_published", true),
    supabase.from("hotels_resorts").select("slug, updated_at").eq("is_published", true),
    supabase.from("blog_posts").select("slug, updated_at, published_at, noindex").eq("is_published", true).or(`published_at.is.null,published_at.lte.${nowIso}`),
    supabase.from("travel_guides").select("slug, id, updated_at").eq("is_published", true),
    supabase.from("places_to_visit").select("id, updated_at").eq("is_published", true),
    supabase.from("upcoming_events").select("id, updated_at").eq("is_published", true),
    supabase.from("top_destinations").select("id, updated_at").eq("is_published", true),
  ]);

  const stat = (path: string, priority = 0.6, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  });

  const date = (v?: string | null) => (v ? new Date(v) : undefined);

  return [
    stat("/", 1, "daily"),
    stat("/tour-packages", 0.9, "daily"),
    stat("/hotels-and-resorts", 0.9, "daily"),
    stat("/travels", 0.8),
    stat("/blog", 0.8, "daily"),
    stat("/travel-guides", 0.6),
    stat("/top-tourist-places", 0.7),
    stat("/araku-valley", 0.7),
    stat("/lambasingi", 0.7),
    stat("/vanjangi", 0.7),
    stat("/maredumilli", 0.7),
    stat("/itinerary", 0.5),
    stat("/how-it-works", 0.5, "monthly"),
    stat("/about", 0.4, "monthly"),
    stat("/contact", 0.4, "monthly"),
    ...(packages.data || []).map((p) => ({ url: absoluteUrl(`/packages/${p.slug}`), lastModified: date(p.updated_at), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...(hotels.data || []).map((h) => ({ url: absoluteUrl(`/resorts/${h.slug}`), lastModified: date(h.updated_at), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...(posts.data || []).filter((p) => !p.noindex).map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: date(p.updated_at || p.published_at), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...(guides.data || []).map((g) => ({ url: absoluteUrl(`/travel-guides/${g.slug || g.id}`), lastModified: date(g.updated_at), changeFrequency: "monthly" as const, priority: 0.5 })),
    ...(places.data || []).map((p) => ({ url: absoluteUrl(`/top-tourist-places/${p.id}`), lastModified: date(p.updated_at), changeFrequency: "monthly" as const, priority: 0.5 })),
    ...(events.data || []).map((e) => ({ url: absoluteUrl(`/events/${e.id}`), lastModified: date(e.updated_at), changeFrequency: "monthly" as const, priority: 0.4 })),
    ...(devotional.data || []).map((d) => ({ url: absoluteUrl(`/devotional/${d.id}`), lastModified: date(d.updated_at), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
