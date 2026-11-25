/** Canonical public URL (no trailing slash). Set NEXT_PUBLIC_SITE_URL in the hosting environment to override. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vizagtourpackages.com").replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
