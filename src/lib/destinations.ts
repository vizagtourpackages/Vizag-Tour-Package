import type { Metadata } from "next";
import { destinationDetails } from "@/data/destinations";
import { createPublicClient as createClient } from "@/lib/supabase/public";

/** Places that have their own public page, all editable under Admin → Destination Pages. */
export const DESTINATION_SLUGS = ["araku-valley", "lambasingi", "vanjangi", "maredumilli"] as const;
export type DestinationSlug = (typeof DESTINATION_SLUGS)[number];

export const isDestinationSlug = (s: string): s is DestinationSlug =>
  (DESTINATION_SLUGS as readonly string[]).includes(s);

/** Built-in content in the shape of a `destination_pages` row, used until the admin saves the page. */
export function defaultDestination(slug: DestinationSlug) {
  const d = destinationDetails[slug];
  return {
    id: slug as string,
    name: d.name,
    tagline: d.tagline,
    description: d.description,
    highlights: d.highlights,
    best_time_to_visit: d.bestTimeToVisit,
    distance: d.distance,
    elevation: d.elevation || "",
    image_url: "",
    content: "",
    package_ids: [] as string[],
    hotel_ids: [] as string[],
  };
}

/** SEO title and description follow what the admin saved. */
export async function destinationMetadata(slug: DestinationSlug): Promise<Metadata> {
  const supabase = await createClient();
  const { data } = await supabase.from("destination_pages").select("name, description, image_url").eq("id", slug).maybeSingle();
  const fallback = defaultDestination(slug);
  const title = `${data?.name || fallback.name} Tour Packages`;
  const description = (data?.description || fallback.description).slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title, description, images: data?.image_url ? [data.image_url] : undefined },
  };
}
