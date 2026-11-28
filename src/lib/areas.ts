/** The places we operate stays in. Vizag is the default everywhere. */
export const AREAS = [
  { id: "vizag", label: "Vizag" },
  { id: "araku-valley", label: "Araku Valley" },
  { id: "lambasingi", label: "Lambasingi" },
  { id: "vanjangi", label: "Vanjangi" },
  { id: "maredumilli", label: "Maredumilli" },
] as const;

export type AreaId = (typeof AREAS)[number]["id"];
export const DEFAULT_AREA: AreaId = "vizag";

export function areaLabel(id?: string | null): string {
  return AREAS.find((a) => a.id === id)?.label || "Vizag";
}

export function normalizeArea(id?: string | null): AreaId {
  return (AREAS.find((a) => a.id === id)?.id as AreaId) || DEFAULT_AREA;
}

/** Group a per-night location list (["araku-valley","lambasingi"]) into stays: Araku × 1 night, Lambasingi × 1 night. */
export function stayLegs(plan: unknown): { area: AreaId; nights: number; from: number }[] {
  const list = Array.isArray(plan) ? (plan as string[]) : [];
  const legs: { area: AreaId; nights: number; from: number }[] = [];
  list.forEach((raw, i) => {
    const area = normalizeArea(raw);
    const last = legs[legs.length - 1];
    if (last && last.area === area) last.nights += 1;
    else legs.push({ area, nights: 1, from: i + 1 });
  });
  return legs;
}
