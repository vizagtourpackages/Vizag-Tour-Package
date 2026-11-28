import { ACCOMMODATION_TYPES, accommodationTypeOf } from "@/lib/content";
import type { StayHotel, StayOption } from "@/components/booking/StayPicker";
import { normalizeArea } from "@/lib/areas";

const norm = (s: string) => (s || "").toLowerCase().replace(/[^a-z]/g, "");

/**
 * Builds the "Choose Your Stay" options for a package.
 *
 * The price shown to guests is ALWAYS the tour package price, and it varies only by accommodation
 * type (set in the package's rate plans). A hotel's own room tariff is never used here.
 *
 * 1. Hotels attached to the package (`resort_ids`): one option per type that at least one attached
 *    hotel offers. Non AC without its own price uses the main package price. An AC type without a
 *    price is left out when the package prices other AC types; when it prices none, every offered
 *    type uses the main package price.
 * 2. Packages without attached hotels: each priced rate plan with its own hotel list.
 */
export async function buildStayOptions(
  supabase: any,
  pkg: { resort_ids?: unknown; rate_plans?: any[]; price?: number | string; price_label?: string }
): Promise<StayOption[]> {
  const attached = Array.isArray(pkg.resort_ids) ? (pkg.resort_ids as string[]) : [];
  const plans = Array.isArray(pkg.rate_plans) ? pkg.rate_plans : [];
  const planResortIds = plans.flatMap((p: any) => (Array.isArray(p.resort_ids) ? p.resort_ids : []));
  const ids = Array.from(new Set(attached.length ? attached : planResortIds));
  if (ids.length === 0) return [];

  const [{ data: resorts }, { data: rooms }] = await Promise.all([
    supabase.from("hotels_resorts").select("*").in("id", ids).eq("is_published", true),
    supabase.from("resort_room_types").select("*").in("resort_id", ids).eq("is_available", true),
  ]);
  if (!resorts) return [];
  const roomRows: any[] = rooms || [];

  const roomOf = (resortId: string, type: string) =>
    roomRows.find((rm: any) => rm.resort_id === resortId && norm(rm.room_type) === norm(type));

  const toHotel = (r: any, type: string): StayHotel => {
    const room = roomOf(r.id, type);
    const roomImages: string[] = room && Array.isArray(room.images) ? room.images.filter(Boolean) : [];
    const fallback: string[] = [r.cover_image_url, ...(r.gallery_images || [])].filter(Boolean);
    return {
      id: r.id,
      name: r.name,
      area: normalizeArea(r.area ?? (r.show_in_araku ? "araku-valley" : r.show_in_lambasingi ? "lambasingi" : r.show_in_vanjangi ? "vanjangi" : "vizag")),
      location: r.location,
      category: r.category,
      cover: roomImages[0] || r.cover_image_url,
      images: roomImages.length ? roomImages : fallback,
    };
  };

  const unit = (pkg.price_label || "per couple").toLowerCase().replace(/^per\s+/, "");
  const planFor = (type: string) => plans.find((p: any) => accommodationTypeOf(p.title) === type && Number(p.price) > 0);
  const extras = (plan: any) => ({
    mrp: Number(plan?.mrp) || undefined,
    features: ((plan?.features || []) as string[]).filter(Boolean),
  });
  const options: StayOption[] = [];

  if (attached.length > 0) {
    const order = new Map(attached.map((id, i) => [id, i]));
    const sorted = [...resorts].sort((a: any, b: any) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
    const anyAcPriced = ACCOMMODATION_TYPES.some(t => t !== "Non AC" && planFor(t));
    for (const type of ACCOMMODATION_TYPES) {
      const plan = planFor(type);
      if (!plan && type !== "Non AC" && anyAcPriced) continue;
      const hotels = sorted.filter((r: any) => roomOf(r.id, type)).map((r: any) => toHotel(r, type));
      if (!hotels.length) continue;
      options.push({ type, price: Number(plan?.price ?? pkg.price) || 0, ...extras(plan), unit, hotels });
    }
    return options;
  }

  // Packages without attached hotels: rate plans that list their own hotels
  for (const plan of plans) {
    const planIds: string[] = Array.isArray(plan.resort_ids) ? plan.resort_ids : [];
    const price = Number(plan.price) || 0;
    if (!planIds.length || !price) continue;
    const type: string = accommodationTypeOf(plan.title) || plan.title;
    if (!type || options.some(o => o.type === type)) continue;
    const hotels = planIds
      .map((rid: string) => resorts.find((r: any) => r.id === rid))
      .filter(Boolean)
      .map((r: any) => toHotel(r, type));
    if (!hotels.length) continue;
    options.push({ type, price, ...extras(plan), unit, hotels });
  }
  return options;
}
