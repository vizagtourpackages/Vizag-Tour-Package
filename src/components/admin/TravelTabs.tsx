import Link from 'next/link'

const TABS = [
  { id: 'fleet', label: 'Fleet', href: '/admin/travels' },
  { id: 'fares', label: 'Fare Table', href: '/admin/travels/fares' },
  { id: 'trust', label: 'Trust Points', href: '/admin/travels/trust-points' },
  { id: 'notes', label: 'Notes', href: '/admin/travels/notes' },
] as const

export default function TravelTabs({ active }: { active: (typeof TABS)[number]['id'] }) {
  return (
    <nav aria-label="Travels sections" className="flex gap-4 mb-6 border-b border-gray-200">
      {TABS.map(t => (
        <Link
          key={t.id}
          href={t.href}
          aria-current={t.id === active ? 'page' : undefined}
          className={`-mb-px border-b-2 px-2 pb-2 ${
            t.id === active ? 'border-teal font-bold text-emerald-800' : 'border-transparent font-medium text-gray-500 hover:text-gray-900'
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  )
}
