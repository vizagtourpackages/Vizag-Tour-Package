"use client";

import { createContext, useContext, useMemo } from "react";
import type { SiteSettings } from "@/lib/settings";
import { waUrl } from "@/lib/whatsapp";

type SiteContext = {
  contact: SiteSettings["contact"];
  socials: SiteSettings["socials"];
  /** WhatsApp link (optionally pre-filled) using the number configured in admin settings. */
  wa: (message?: string) => string;
  /** Navigate to WhatsApp with a message (safe after async calls on iOS). */
  openWhatsApp: (message: string) => void;
};

const Ctx = createContext<SiteContext | null>(null);

export function SiteProvider({ settings, children }: { settings: SiteSettings; children: React.ReactNode }) {
  const value = useMemo<SiteContext>(() => {
    const number = settings.contact.whatsapp;
    return {
      contact: settings.contact,
      socials: settings.socials,
      wa: (message?: string) => waUrl(message, number),
      openWhatsApp: (message: string) => {
        window.location.href = waUrl(message, number);
      },
    };
  }, [settings]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite(): SiteContext {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSite must be used inside SiteProvider");
  return v;
}
