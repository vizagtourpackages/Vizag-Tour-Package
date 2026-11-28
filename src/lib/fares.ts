/**
 * Travel fare table: one row per journey, with a price for each vehicle.
 * Stored as JSON in `site_settings` and edited under Admin → Travels → Fare Table.
 */
export interface FareRow {
  id: string;
  from?: string;
  to?: string;
  tripType?: string;
  /** vehicle id (travels.id) → fare in rupees */
  prices: Record<string, number>;
}

export const FARES_KEY = "travel_fares";

export const TRIP_TYPES = ["Vizag Local", "Airport / Station Transfer", "Araku Day Trip", "Outstation", "Pilgrimage"];

const text = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 80) : "");

/** Keeps only rows that describe a journey, and only positive prices. */
export function cleanFares(input: unknown): FareRow[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((row: any, i) => {
      const prices: Record<string, number> = {};
      for (const [vehicle, value] of Object.entries(row?.prices || {})) {
        const n = Math.round(Number(value));
        if (n > 0) prices[vehicle] = n;
      }
      return {
        id: text(row?.id) || `fare-${i}`,
        from: text(row?.from),
        to: text(row?.to),
        tripType: text(row?.tripType),
        prices,
      };
    })
    .filter((r) => r.from || r.to || r.tripType);
}

export function parseFares(value?: string | null): FareRow[] {
  if (!value) return [];
  try {
    return cleanFares(JSON.parse(value));
  } catch {
    return [];
  }
}

export async function readFares(supabase: { from: (table: string) => any }): Promise<FareRow[]> {
  const { data } = (await supabase.from("site_settings").select("value").eq("key", FARES_KEY).maybeSingle()) as {
    data: { value: string | null } | null;
  };
  return parseFares(data?.value);
}

/** "Vizag to Araku", or whichever parts the row has. */
export const journeyLabel = (r: Pick<FareRow, "from" | "to" | "tripType">) =>
  r.from && r.to ? `${r.from} to ${r.to}` : r.from ? `From ${r.from}` : r.to ? `To ${r.to}` : r.tripType || "Journey";

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
