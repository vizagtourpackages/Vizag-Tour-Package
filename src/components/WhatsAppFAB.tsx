"use client";

import { motion } from "framer-motion";
import { waMessages, waUrl } from "@/lib/whatsapp";
import { ease } from "./Motion";

export default function WhatsAppFAB() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.7, ease }}
      className="fixed bottom-6 right-6 z-40"
    >
      <span className="ping-soft absolute inset-0 rounded-full bg-[#25d366]" />
      <a
        href={waUrl(waMessages.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.95-.4-4.2-1.15l-.3-.18-3.1.8.83-3.02-.2-.31A8.2 8.2 0 1 1 12.04 20.1Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.34.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.65.31 2.75 2.75 0 0 0-.86 2.05c0 1.2.88 2.38 1 2.55.12.16 1.72 2.62 4.17 3.68 1.55.67 2.16.72 2.94.6.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.47-.28Z" />
        </svg>
      </a>
    </motion.div>
  );
}
