import { looksLikeHtml } from "@/lib/content";

/** Renders admin rich-text. Falls back to plain paragraphs for legacy plain-text values. */
export default function RichContent({ html, className = "" }: { html?: string | null; className?: string }) {
  if (!html) return null;
  if (looksLikeHtml(html)) {
    return <div className={`rich-content ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return (
    <div className={`rich-content ${className}`}>
      {html.split(/\n{2,}/).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
