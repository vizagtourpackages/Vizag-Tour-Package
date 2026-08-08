"use client";

import { MessageCircle } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";

export default function WhatsAppFAB() {
  return (
    <a
      href={siteInfo.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-float hover:bg-green-600 hover:shadow-xl transition-all duration-300 animate-pulse-soft group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} className="fill-white" />
      <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
        Book on WhatsApp
      </span>
    </a>
  );
}
