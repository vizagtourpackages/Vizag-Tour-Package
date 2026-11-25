"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

/** Share an article: WhatsApp, Facebook, X, copy link (and the native share sheet on phones). */
export default function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  const native = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    copy();
  };

  const btn =
    "grid h-11 w-11 place-items-center rounded-full border border-ocean/12 bg-white text-ocean transition-[background-color,color,transform,border-color] duration-150 hover:border-transparent hover:bg-ocean hover:text-white active:scale-95";

  return (
    <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Share this article">
      <span className="mr-1 text-sm font-semibold text-ocean/70">Share</span>
      <a className={btn} href={`https://wa.me/?text=${enc(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><FaWhatsapp size={18} /></a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><FaFacebookF size={16} /></a>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X"><FaXTwitter size={16} /></a>
      <button type="button" className={btn} onClick={copy} aria-label="Copy link">{copied ? <Check size={17} className="text-teal" /> : <Link2 size={17} />}</button>
      <button type="button" onClick={native} className="sm:hidden rounded-full border border-ocean/12 px-4 py-2.5 text-sm font-semibold text-ocean">More…</button>
    </div>
  );
}
