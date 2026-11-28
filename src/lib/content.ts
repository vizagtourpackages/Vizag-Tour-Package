// Helpers for rich-text (HTML) content coming from the admin editor.

export function slugify(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function looksLikeHtml(value?: string | null): boolean {
  return !!value && /<\/?[a-z][\s\S]*>/i.test(value)
}

export function stripHtml(value?: string | null): string {
  if (!value) return ''
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

/** Adds ids to <h2>/<h3> tags and returns the html plus a table of contents. */
export function indexHeadings(html: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = []
  const used = new Set<string>()
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, lvl, attrs, inner) => {
    const text = stripHtml(inner)
    if (!text) return _m
    let id = slugify(text) || `section-${headings.length + 1}`
    while (used.has(id)) id = `${id}-${headings.length + 1}`
    used.add(id)
    headings.push({ id, text, level: Number(lvl) as 2 | 3 })
    const cleanAttrs = String(attrs).replace(/\sid="[^"]*"/i, '')
    return `<h${lvl}${cleanAttrs} id="${id}">${inner}</h${lvl}>`
  })
  return { html: out, headings }
}

/** Property categories. `value` is what is stored on the hotel. */
export const HOTEL_CATEGORIES = [
  { value: 'Hotels', label: 'Hotels' },
  { value: 'Resorts', label: 'Resorts' },
  { value: 'Camp Sites', label: 'Camp Sites' },
  { value: 'Homestays', label: 'Home Stays' },
  { value: 'Cottages', label: 'Cottages' },
] as const

/** "Home Stays", "homestays" and "Homestay" are the same category. */
export const categoryKey = (c?: string | null) => (c || '').toLowerCase().replace(/[^a-z]/g, '').replace(/s$/, '')

export const ACCOMMODATION_TYPES = ['Non AC', 'Deluxe AC', 'Premium AC'] as const
export type AccommodationType = (typeof ACCOMMODATION_TYPES)[number]

/** Which accommodation type a free-text plan title means ("AC DELUXE" -> "Deluxe AC"), or null. */
export function accommodationTypeOf(title?: string | null): AccommodationType | null {
  const n = (title || '').toLowerCase().replace(/[^a-z]/g, '')
  if (n.includes('nonac')) return 'Non AC'
  if (n.includes('premium')) return 'Premium AC'
  if (n.includes('deluxe')) return 'Deluxe AC'
  return null
}

/**
 * Stable sort by display_order (1 first). Rows without an order (0/null) keep their incoming
 * order (newest first) after the explicitly ordered ones.
 */
export function sortByDisplayOrder<T extends { display_order?: number | null }>(rows: T[]): T[] {
  return rows
    .map((row, i) => ({ row, i }))
    .sort((a, b) => {
      const ao = a.row.display_order || 0
      const bo = b.row.display_order || 0
      if (ao && bo) return ao - bo || a.i - b.i
      if (ao) return -1
      if (bo) return 1
      return a.i - b.i
    })
    .map(x => x.row)
}

/** Estimated reading time in whole minutes (≈200 words per minute). */
export function readingMinutes(html?: string | null): number {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
