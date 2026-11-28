import { cache } from "react";
import { createPublicClient as createClient } from "@/lib/supabase/public";
import { siteInfo } from "@/data/siteInfo";

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  x: string;
  linkedin: string;
}

export interface SiteSettings {
  contact: {
    phone: string; // shown + used for tel: links, e.g. +917780739851
    whatsapp: string; // click-to-chat number, digits with country code
    email: string;
    address: string;
    landline: string;
  };
  socials: SocialLinks;
  hero: {
    packageId: string;
    tile2: { image: string; url: string };
    tile3: { image: string; url: string };
  };
  blogSidebarIds: string[];
}

/** Every key the admin Settings page can write. */
export const SETTING_KEYS = {
  contact_phone: "contact_phone",
  contact_whatsapp: "contact_whatsapp",
  contact_email: "contact_email",
  contact_address: "contact_address",
  contact_landline: "contact_landline",
  social_facebook: "social_facebook",
  social_instagram: "social_instagram",
  social_youtube: "social_youtube",
  social_x: "social_x",
  social_linkedin: "social_linkedin",
  hero_package_id: "hero_package_id",
  hero_image_2: "hero_image_2",
  hero_image_2_url: "hero_image_2_url",
  hero_image_3: "hero_image_3",
  hero_image_3_url: "hero_image_3_url",
  blog_sidebar_packages: "blog_sidebar_packages",
} as const;

export const DEFAULT_SETTINGS: SiteSettings = {
  contact: {
    phone: siteInfo.whatsapp,
    whatsapp: siteInfo.whatsapp,
    email: siteInfo.email,
    address: siteInfo.address,
    landline: siteInfo.landline,
  },
  socials: { facebook: "", instagram: "", youtube: "", x: "", linkedin: "" },
  hero: { packageId: "", tile2: { image: "", url: "" }, tile3: { image: "", url: "" } },
  blogSidebarIds: [],
};

function parseIds(raw?: string): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Reads site_settings with the given client. Falls back to siteInfo so the site never shows blanks. */
export async function readSettings(supabase: { from: (table: string) => any }): Promise<SiteSettings> {
  try {
    const { data } = (await supabase.from("site_settings").select("key, value")) as {
      data: { key: string; value: string | null }[] | null;
    };
    const get = (k: string, d = "") => {
      const row = data?.find((r) => r.key === k);
      return row && typeof row.value === "string" && row.value.trim() !== "" ? row.value.trim() : d;
    };
    const d = DEFAULT_SETTINGS;
    return {
      contact: {
        phone: get(SETTING_KEYS.contact_phone, d.contact.phone),
        whatsapp: get(SETTING_KEYS.contact_whatsapp, d.contact.whatsapp),
        email: get(SETTING_KEYS.contact_email, d.contact.email),
        address: get(SETTING_KEYS.contact_address, d.contact.address),
        landline: get(SETTING_KEYS.contact_landline, d.contact.landline),
      },
      socials: {
        facebook: get(SETTING_KEYS.social_facebook),
        instagram: get(SETTING_KEYS.social_instagram),
        youtube: get(SETTING_KEYS.social_youtube),
        x: get(SETTING_KEYS.social_x),
        linkedin: get(SETTING_KEYS.social_linkedin),
      },
      hero: {
        packageId: get(SETTING_KEYS.hero_package_id),
        tile2: { image: get(SETTING_KEYS.hero_image_2), url: get(SETTING_KEYS.hero_image_2_url) },
        tile3: { image: get(SETTING_KEYS.hero_image_3), url: get(SETTING_KEYS.hero_image_3_url) },
      },
      blogSidebarIds: parseIds(get(SETTING_KEYS.blog_sidebar_packages)),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Public site: read once per request (cached for a minute, cleared on every admin save). */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => readSettings(await createClient()));
