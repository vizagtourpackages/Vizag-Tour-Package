import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Clock, ListTree, User } from "lucide-react";
import { postDate, publishedPostBySlug, publishedPosts } from "@/lib/blog";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { indexHeadings, looksLikeHtml, stripHtml } from "@/lib/content";
import RichContent from "@/components/RichContent";
import ShareBar from "@/components/ShareBar";
import BlogCard from "@/components/BlogCard";
import BlogPackagesList from "@/components/BlogPackagesList";
import BlogCta from "@/components/BlogCta";
import { siteInfo } from "@/data/siteInfo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await publishedPostBySlug(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || stripHtml(post.content).slice(0, 160);
  const image = post.og_image_url || post.cover_image_url || undefined;
  const url = post.canonical_url || absoluteUrl(`/blog/${post.slug}`);

  return {
    title,
    description,
    keywords: post.meta_keywords || (post.tags || []).join(", ") || undefined,
    alternates: { canonical: url },
    robots: post.noindex ? { index: false, follow: true } : { index: true, follow: true },
    authors: post.author_name ? [{ name: post.author_name }] : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: siteInfo.name,
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at || undefined,
      authors: post.author_name ? [post.author_name] : undefined,
      section: post.category || undefined,
      tags: post.tags || undefined,
      images: image ? [{ url: image, alt: post.cover_alt || post.title }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await publishedPostBySlug(slug);
  if (!post) notFound();

  const { posts: sameCategory } = post.category ? await publishedPosts({ category: post.category, excludeId: post.id, limit: 3 }) : { posts: [] };
  const related =
    sameCategory.length >= 3 ? sameCategory : [...sameCategory, ...(await publishedPosts({ excludeId: post.id, limit: 6 })).posts.filter((p) => !sameCategory.some((s) => s.id === p.id))].slice(0, 3);

  const indexed = looksLikeHtml(post.content) ? indexHeadings(post.content || "") : { html: post.content, headings: [] as { id: string; text: string; level: 2 | 3 }[] };
  const url = post.canonical_url || absoluteUrl(`/blog/${post.slug}`);
  const published = post.published_at || post.created_at;

  // structured data for rich results
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.meta_description || post.excerpt || stripHtml(post.content).slice(0, 160),
      image: post.og_image_url || post.cover_image_url || undefined,
      datePublished: published,
      dateModified: post.updated_at || published,
      author: { "@type": "Organization", name: post.author_name || siteInfo.name },
      publisher: { "@type": "Organization", name: siteInfo.name, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: (post.tags || []).join(", ") || undefined,
      articleSection: post.category || undefined,
      wordCount: stripHtml(post.content).split(/\s+/).filter(Boolean).length,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <article className="bg-warm-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:px-8">
        {/* breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-charcoal/55">
          <Link href="/" className="hover:text-coral">Home</Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-coral">Blog</Link>
          {post.category && (
            <>
              <ChevronRight size={14} />
              <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-coral">{post.category}</Link>
            </>
          )}
        </nav>

        {/* header */}
        <header className="max-w-4xl">
          {post.category && <span className="mb-4 inline-block rounded-full bg-sunset px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-white">{post.category}</span>}
          <h1 className="font-heading text-[clamp(1.6rem,4.6vw,3.3rem)] leading-[1.08] text-ocean">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-[1.05rem] leading-relaxed text-charcoal/70 sm:text-[1.15rem]">{post.excerpt}</p>}
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-charcoal/55">
            <span className="inline-flex items-center gap-1.5"><User size={15} /> {post.author_name || siteInfo.name}</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={15} /> <time dateTime={published}>{postDate(post)}</time></span>
            {post.reading_minutes && <span className="inline-flex items-center gap-1.5"><Clock size={15} /> {post.reading_minutes} min read</span>}
          </p>
        </header>

        {post.cover_image_url && (
          <figure className="mt-8 overflow-hidden rounded-[28px] bg-sand sm:rounded-[36px]">
            <img src={post.cover_image_url} alt={post.cover_alt || post.title} fetchPriority="high" className="aspect-[16/9] w-full object-cover" />
          </figure>
        )}

        <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_350px] xl:gap-14">
          {/* ---------- article ---------- */}
          <div className="min-w-0">
            {indexed.headings.length >= 3 && (
              <nav aria-label="Table of contents" className="mb-10 rounded-[24px] border border-ocean/8 bg-white p-5 shadow-card sm:p-6">
                <h2 className="mb-3 flex items-center gap-2 font-heading text-[1.15rem] text-ocean"><ListTree size={18} className="text-coral" /> In this article</h2>
                <ol className="space-y-1.5">
                  {indexed.headings.map((h, i) => (
                    <li key={h.id} className={h.level === 3 ? "ml-5" : ""}>
                      <a href={`#${h.id}`} className="group flex items-start gap-2 text-[0.93rem] font-medium text-charcoal/70 transition-colors hover:text-coral">
                        {h.level === 2 && <span className="w-5 shrink-0 font-bold text-coral/60">{i + 1}.</span>}
                        <span>{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <RichContent html={indexed.html} />

            {/* tags */}
            {post.tags && post.tags.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((t) => (
                  <li key={t}>
                    <Link href={`/blog?q=${encodeURIComponent(t)}`} className="rounded-full border border-ocean/12 bg-white px-3.5 py-1.5 text-sm font-medium text-ocean/75 transition-colors hover:border-coral hover:text-coral">#{t}</Link>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 border-t border-ocean/10 pt-6"><ShareBar url={url} title={post.title} /></div>

            <div className="mt-10"><BlogCta title={post.title} /></div>
          </div>

          {/* ---------- sidebar: chosen packages (sticky on wide screens, below the article elsewhere) ---------- */}
          <aside className="min-w-0 self-start xl:sticky xl:top-24" aria-label="Popular packages">
            <BlogPackagesList />
          </aside>
        </div>

        {/* ---------- related ---------- */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-ocean/10 pt-12">
            <h2 className="mb-8 font-heading text-[clamp(1.6rem,3.4vw,2.4rem)] text-ocean">Keep reading</h2>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
