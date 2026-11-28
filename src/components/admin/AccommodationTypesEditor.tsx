'use client'

import type { Dispatch, SetStateAction } from 'react'
import { BedDouble } from 'lucide-react'
import MultiImageUpload from './MultiImageUpload'
import { ACCOMMODATION_TYPES } from '@/lib/content'

export interface RoomTypeRow {
  room_type: string
  price: number | string
  has_ac?: boolean
  is_available: boolean
  images?: string[]
}

const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z]/g, '')

/**
 * Fixed editor for the three accommodation types (Non AC, Deluxe AC, Premium AC):
 * each has availability, a price per night and a set of images.
 * Rows with any other room_type name are preserved untouched.
 */
export default function AccommodationTypesEditor({
  value,
  onChange,
}: {
  value: RoomTypeRow[]
  onChange: Dispatch<SetStateAction<RoomTypeRow[]>>
}) {
  const find = (type: string) => value.find(r => norm(r.room_type) === norm(type))

  // functional update: an image upload that finishes late must not undo edits made meanwhile
  const update = (type: string, patch: Partial<RoomTypeRow>) => {
    onChange(prev => {
      const existing = prev.find(r => norm(r.room_type) === norm(type))
      if (existing) return prev.map(r => (r === existing ? { ...r, ...patch, has_ac: type !== 'Non AC' } : r))
      return [...prev, { room_type: type, price: '', is_available: false, images: [], ...patch, has_ac: type !== 'Non AC' }]
    })
  }

  const legacy = value.filter(r => !ACCOMMODATION_TYPES.some(t => norm(t) === norm(r.room_type)))

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h4 className="font-bold text-gray-900 text-xl flex items-center gap-2 mb-1">
        <BedDouble className="text-gray-500" />
        Accommodation Types
      </h4>
      <p className="text-sm text-gray-500 mb-6">
        Enable the types this hotel offers, set the price per night and add photos. The price is used for direct hotel bookings.
        Inside tour packages guests see the package price, and this hotel is listed under every type enabled here.
      </p>

      <div className="grid grid-cols-1 gap-5">
        {ACCOMMODATION_TYPES.map(type => {
          const row = find(type)
          const enabled = !!row?.is_available
          return (
            <div
              key={type}
              className={`rounded-xl border-2 p-5 transition-colors ${enabled ? 'border-emerald-500 bg-emerald-50/40' : 'border-gray-200 bg-gray-50/50'}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={e => update(type, { is_available: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-bold text-gray-900 text-lg">{type}</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">Price / night (₹)</span>
                  <input
                    type="number"
                    min={1}
                    required={enabled}
                    value={enabled && Number(row?.price) === 0 ? '' : row?.price ?? ''}
                    disabled={!enabled}
                    onChange={e => update(type, { price: e.target.value })}
                    className="w-32 p-2 border rounded-lg disabled:bg-gray-100 focus:ring-1 focus:ring-emerald-500"
                    placeholder="e.g. 2500"
                  />
                </div>
              </div>
              {enabled && (
                <MultiImageUpload
                  folder="hotels/rooms"
                  value={row?.images || []}
                  onChange={images => update(type, { images })}
                />
              )}
            </div>
          )
        })}
      </div>

      {legacy.length > 0 && (
        <div className="mt-6 text-sm text-gray-500">
          Other existing room types kept as-is: {legacy.map(l => l.room_type).join(', ')}
        </div>
      )}
    </div>
  )
}
