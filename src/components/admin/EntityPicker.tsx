'use client'

import { useMemo, useState } from 'react'
import { Check, Search } from 'lucide-react'

export interface PickerItem {
  id: string
  title: string
  subtitle?: string
  image?: string | null
}

/** Searchable multi-select list of entities (hotels, packages...) that stores selected ids. */
export default function EntityPicker({
  items,
  value,
  onChange,
  emptyText = 'Nothing available yet.',
}: {
  items: PickerItem[]
  value: string[]
  onChange: (ids: string[]) => void
  emptyText?: string
}) {
  const [q, setQ] = useState('')
  const filtered = useMemo(
    () => items.filter(i => (i.title + ' ' + (i.subtitle || '')).toLowerCase().includes(q.toLowerCase())),
    [items, q]
  )
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter(v => v !== id) : [...value, id])

  if (items.length === 0) {
    return <div className="text-sm text-gray-500 bg-gray-50 border border-dashed rounded-lg p-6 text-center">{emptyText}</div>
  }

  return (
    <div>
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
        />
      </div>
      <p className="text-xs text-gray-500 mb-2">{value.length} selected</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
        {filtered.map(item => {
          const on = value.includes(item.id)
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`flex items-center gap-3 text-left p-2.5 rounded-lg border-2 transition-all ${on ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
            >
              {item.image ? (
                <img src={item.image} alt="" className="w-12 h-12 rounded-md object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-md bg-gray-100 shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-gray-900 truncate">{item.title}</div>
                {item.subtitle && <div className="text-xs text-gray-500 truncate">{item.subtitle}</div>}
              </div>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${on ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}>
                {on && <Check size={12} />}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
