import { ACCOMMODATION_TYPES } from "@/lib/content";
import type { StayOption } from "@/components/booking/StayPicker";
import { normalizeArea } from "@/lib/areas";

const norm = (s: string) => (s || "").toLowerCase().replace(/[^a-z]/g, "");

/** Maps a free-text plan title ("Deluxe AC", "Premium AC - Breakfast") to a canonical accommodation type. */
function canonicalType(title: string): string {
  const n = norm(title);
  const hit = ACCOMMODATION_TYPES.find(t => n.startsWith(norm(t)));
  return hit || title;
}

/**
 * Builds the "Choose Your Stay" options for a package.
 *
 * 1. Preferred: hotels attached to the package (`resort_ids`) → one option per accommodation type
 *    that at least one attached hotel offers, priced per night from the hotel's own room types.
 * 2. Fallback for packages not migrated yet: the old custom rate plans (each plan = a type, each
 *    plan's `resort_ids` = its hotels). Every hotel is shown at the plan's package price so units stay
 *    consistent with what the page showed before.
 */
export async function buildStayOptions(
  supabase: any,
  pkg: { resort_ids?: unknown; rate_plans?: any[]; price_label?: string }
): Promise<StayOption[]> {
  const attached = Array.isArray(pkg.resort_ids) ? (pkg.resort_ids as string[]) : [];
  const plans = Array.isArray(pkg.rate_plans) ? pkg.rate_plans : [];
  const planResortIds = plans.flatMap((p: any) => (Array.isArray(p.resort_ids) ? p.resort_ids : []));
  const ids = Array.from(new Set([...attached, ...(attached.length ? [] : planResortIds)]));
  if (ids.length === 0) return [];

  const [{ data: resorts }, { data: rooms }] = await Promise.all([
    supabase
      .from("hotels_resorts")
      .select("*")
      .in("id", ids)
      .eq("is_published", true),
    supabase.from("resort_room_types").select("*").in("resort_id", ids).eq("is_available", true),
  ]);
  if (!resorts) return [];
  const roomRows: any[] = rooms || [];

  const toHotel = (r: any, type: string, fallbackPrice?: number, unit?: string, forceFallback = false) => {
    const room = forceFallback ? undefined : roomRows.find((rm: any) => rm.resort_id === r.id && norm(rm.room_type) === norm(type));
    if (!room && fallbackPrice === undefined) return null;
    const roomImages: string[] = room && Array.isArray(room.images) ? room.images.filter(Boolean) : [];
    const fallbackImgs: string[] = [r.cover_image_url, ...(r.gallery_images || [])].filter(Boolean);
    return {
      id: r.id,
      name: r.name,
      area: normalizeArea(r.area ?? (r.show_in_araku ? "araku-valley" : r.show_in_lambasingi ? "lambasingi" : r.show_in_vanjangi ? "vanjangi" : "vizag")),
      location: r.location,
      category: r.category,
      cover: roomImages[0] || r.cover_image_url,
      price: room ? Number(room.price) || 0 : (fallbackPrice as number),
      unit: room ? "night" : unit || "night",
      images: roomImages.length ? roomImages : fallbackImgs,
    };
  };

  const options: StayOption[] = [];

  if (attached.length > 0) {
    const order = new Map(attached.map((id, i) => [id, i]));
    const sorted = [...resorts].sort((a: any, b: any) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
    for (const type of ACCOMMODATION_TYPES) {
      const hotels = sorted.map((r: any) => toHotel(r, type)).filter(Boolean) as StayOption["hotels"];
      if (hotels.length) options.push({ type, hotels });
    }
    return options;
  }

  // Legacy fallback: rate plans that list hotels
  const unit = (pkg.price_label || "couple").toLowerCase().replace(/^per\s+/, "");
  for (const plan of plans) {
    const planIds: string[] = Array.isArray(plan.resort_ids) ? plan.resort_ids : [];
    if (!planIds.length) continue;
    const type = canonicalType(plan.title || "");
    const hotels = planIds
      .map((rid: string) => resorts.find((r: any) => r.id === rid))
      .filter(Boolean)
      .map((r: any) => toHotel(r, type, Number(plan.price) || 0, unit, true))
      .filter(Boolean) as StayOption["hotels"];
    if (!hotels.length) continue;
    const existing = options.find(o => o.type === type);
    if (existing) existing.hotels.push(...hotels.filter(h => !existing.hotels.some(e => e.id === h.id)));
    else options.push({ type, hotels });
  }
  return options;
}
