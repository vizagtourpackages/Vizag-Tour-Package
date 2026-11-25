import Link from "next/link";
import { Clock } from "lucide-react";
import { Arrow } from "./Motion";
import { stripHtml } from "@/lib/content";
import { postDate, type BlogPost } from "@/lib/blog";

export default function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const summary = post.excerpt || stripHtml(post.content).slice(0, 140);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_2px_0_rgba(10,42,77,.04)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_rgba(10,42,77,.4)]">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-sand">
        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.cover_alt || post.title}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-110"
          />
        )}
        {post.category && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ocean backdrop-blur">{post.category}</span>}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <p className="flex items-center gap-3 text-xs font-medium text-charcoal/50">
          <time dateTime={post.published_at || post.created_at}>{postDate(post)}</time>
          {post.reading_minutes && (
            <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.reading_minutes} min read</span>
          )}
        </p>
        <h3 className="mt-2 font-heading text-[1.35rem] leading-tight text-ocean transition-colors group-hover:text-coral">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {summary && <p className="mt-3 line-clamp-3 flex-1 text-[0.92rem] leading-relaxed text-charcoal/65">{summary}</p>}
        <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ocean transition-colors group-hover:text-coral">
          Read article <Arrow className="transition-transform group-hover:translate-x-1.5" />
        </Link>
      </div>
    </article>
  );
}
