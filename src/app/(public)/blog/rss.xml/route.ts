import { publishedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { stripHtml } from "@/lib/content";
import { siteInfo } from "@/data/siteInfo";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const { posts } = await publishedPosts({ limit: 30 });

  const items = posts
    .map((p) => {
      const link = absoluteUrl(`/blog/${p.slug}`);
      const desc = p.excerpt || stripHtml(p.content).slice(0, 240);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.published_at || p.created_at).toUTCString()}</pubDate>
      ${p.category ? `<category>${esc(p.category)}</category>` : ""}
      <description>${esc(desc)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(siteInfo.name)} Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Travel tips, itineraries and local guides for Vizag and Araku.</description>
    <language>en-IN</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
