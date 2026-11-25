/** dd/mm/yyyy — used for every date shown in the admin and in messages. Accepts ISO strings, Dates or yyyy-mm-dd. */
export function formatDate(value?: string | Date | null): string {
  if (!value) return "—";
  // plain date (yyyy-mm-dd) → avoid timezone shifts
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }
  const dt = value instanceof Date ? value : new Date(value);
  if (isNaN(dt.getTime())) return String(value);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${dt.getFullYear()}`;
}

/** dd/mm/yyyy, hh:mm AM/PM */
export function formatDateTime(value?: string | Date | null): string {
  if (!value) return "—";
  const dt = value instanceof Date ? value : new Date(value);
  if (isNaN(dt.getTime())) return String(value);
  const time = dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${formatDate(dt)}, ${time}`;
}
