import { createPublicClient as createClient } from "@/lib/supabase/public";
import { nowToTheMinute } from "@/lib/format";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  cover_alt: string | null;
  author_name: string | null;
  category: string | null;
  tags: string[] | null;
  reading_minutes: number | null;
  is_featured: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  noindex: boolean | null;
}

/** Published and not scheduled for the future. (Filtered explicitly so a signed-in admin never sees drafts on the public site.) */
export async function publishedPosts(
  opts: { category?: string; q?: string; limit?: number; offset?: number; excludeId?: string } = {}
): Promise<{ posts: BlogPost[]; total: number }> {
  const supabase = await createClient();
  const nowIso = nowToTheMinute();
  let query = supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .or(`published_at.is.null,published_at.lte.${nowIso}`)
    .order("published_at", { ascending: false, nullsFirst: false });

  if (opts.category) query = query.eq("category", opts.category);
  if (opts.q) {
    const term = opts.q.replace(/[%,()]/g, " ").trim();
    if (term) query = query.or(`title.ilike.%${term}%,excerpt.ilike.%${term}%`);
  }
  if (opts.excludeId) query = query.neq("id", opts.excludeId);
  if (opts.limit !== undefined) {
    const from = opts.offset || 0;
    query = query.range(from, from + opts.limit - 1);
  }

  const { data, count, error } = await query;
  if (error) return { posts: [], total: 0 };
  return { posts: (data || []) as BlogPost[], total: count || 0 };
}

export async function publishedPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const nowIso = nowToTheMinute();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .or(`published_at.is.null,published_at.lte.${nowIso}`)
    .maybeSingle();
  return (data as BlogPost) || null;
}

export async function blogCategories(): Promise<string[]> {
  const supabase = await createClient();
  const nowIso = nowToTheMinute();
  const { data } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("is_published", true)
    .or(`published_at.is.null,published_at.lte.${nowIso}`);
  return Array.from(new Set((data || []).map((r: any) => r.category).filter(Boolean))) as string[];
}

export function postDate(post: Pick<BlogPost, "published_at" | "created_at">): string {
  return new Date(post.published_at || post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
