'use client'

import { Info, Trash2 } from 'lucide-react'
import { ACCOMMODATION_TYPES, accommodationTypeOf, type AccommodationType } from '@/lib/content'

export interface RatePlan {
  id?: string
  title: string
  price?: number | string
  mrp?: number | string
  badge?: string
  is_best_value?: boolean
  features?: string[]
  resort_ids?: string[]
}

const input = 'w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-emerald-500 outline-none'
const label = 'block text-xs font-bold text-gray-500 uppercase mb-1'

/** The plan that sets the price of an accommodation type (the first one whose title means that type). */
const planIndexOf = (plans: RatePlan[], type: AccommodationType) =>
  plans.findIndex(p => accommodationTypeOf(p.title) === type)

/** What gets saved: priced type plans (with canonical titles) plus any other named plan with a price. */
export function cleanRatePlans(plans: RatePlan[]): RatePlan[] {
  return plans
    .map((p, i) => ({
      ...p,
      title: ACCOMMODATION_TYPES.find(t => planIndexOf(plans, t) === i) || p.title,
      features: (p.features || []).map(f => f.trim()).filter(Boolean),
    }))
    .filter(p => Number(p.price) > 0 && p.title?.trim())
}

/**
 * Package price for each accommodation type. Guests see only these prices when they choose a stay;
 * hotel room tariffs are never shown inside a package.
 */
export default function PackagePriceEditor({
  value,
  onChange,
  basePrice,
  offeredTypes,
  hasHotels,
}: {
  value: RatePlan[]
  onChange: (plans: RatePlan[]) => void
  basePrice: number
  /** Types that at least one attached hotel offers. */
  offeredTypes: Set<string>
  hasHotels: boolean
}) {
  const update = (type: AccommodationType, patch: Partial<RatePlan>) => {
    const i = planIndexOf(value, type)
    if (i === -1) onChange([...value, { id: `plan-${type}`, title: type, price: '', mrp: '', features: [], ...patch }])
    else onChange(value.map((p, k) => (k === i ? { ...p, ...patch } : p)))
  }

  const priceOf = (t: AccommodationType) => Number(value[planIndexOf(value, t)]?.price) || 0
  // what visitors can choose: with hotels attached, a priced type must also be offered by a hotel
  const typePrices = ACCOMMODATION_TYPES.filter(t => !hasHotels || offeredTypes.has(t)).map(priceOf).filter(n => n > 0)
  const lowest = typePrices.length ? Math.min(...typePrices) : 0
  const others = value.filter((p, i) => p.title?.trim() && !ACCOMMODATION_TYPES.some(t => planIndexOf(value, t) === i))

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
      <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-2">Package Price by Accommodation Type</h3>
      <p className="text-sm text-gray-500 mb-5">
        This is the price visitors see for each room type. Hotel tariffs are not shown inside a package. A room type
        is shown to visitors only when it has a price here and an attached hotel offers it.
      </p>

      <p role="status" className="mb-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
        <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
        {lowest > 0
          ? `Visitors will see “Starting from ₹${lowest.toLocaleString('en-IN')}”, the lowest accommodation price. The package price at the top is not shown.`
          : `No accommodation price applies yet, so visitors see the package price at the top${basePrice > 0 ? ` (₹${basePrice.toLocaleString('en-IN')})` : ''}.`}
      </p>

      <div className="space-y-4">
        {ACCOMMODATION_TYPES.map(type => {
          const plan = value[planIndexOf(value, type)]
          const priced = Number(plan?.price) > 0
          const offered = offeredTypes.has(type)
          const warning = !hasHotels
            ? ''
            : priced && !offered
              ? `No attached hotel offers ${type} yet, so visitors will not see it. Enable ${type} on a hotel under Hotels & Resorts.`
              : !priced && offered
                ? `Hidden from visitors. Attached hotels offer ${type}; add a price to show it.`
                : ''
          return (
            <div key={type} className={`rounded-xl border-2 p-5 ${priced ? 'border-blue-300 bg-blue-50/30' : 'border-gray-200 bg-gray-50/50'}`}>
              <h4 className="mb-3 font-bold text-gray-900 text-lg">{type}</h4>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className={label} htmlFor={`${type}-price`}>Package price (₹)</label>
                  <input id={`${type}-price`} type="number" min={0} className={input} value={plan?.price ?? ''} onChange={e => update(type, { price: e.target.value })} placeholder="e.g. 8999" />
                </div>
                <div>
                  <label className={label} htmlFor={`${type}-mrp`}>Original price (₹)</label>
                  <input id={`${type}-mrp`} type="number" min={0} className={input} value={plan?.mrp ?? ''} onChange={e => update(type, { mrp: e.target.value })} placeholder="Strikethrough, optional" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor={`${type}-features`}>What is included (comma separated)</label>
                  <input id={`${type}-features`} type="text" className={input} value={(plan?.features || []).join(',')} onChange={e => update(type, { features: e.target.value.split(',') })} placeholder="e.g. Breakfast included" />
                </div>
              </div>
              {warning && <p className="mt-3 text-xs font-medium text-amber-700">{warning}</p>}
            </div>
          )
        })}
      </div>

      {others.length > 0 && (
        <div className="mt-6 rounded-lg border bg-gray-50 p-4">
          <p className="mb-2 text-sm font-bold text-gray-700">Other existing plans</p>
          <p className="mb-3 text-xs text-gray-500">These do not match a room type, so they are not used when hotels are attached.</p>
          <ul className="space-y-2">
            {others.map(p => (
              <li key={value.indexOf(p)} className="flex items-center justify-between gap-3 rounded-md border bg-white px-3 py-2 text-sm">
                <span>{p.title}{Number(p.price) > 0 ? ` – ₹${Number(p.price).toLocaleString('en-IN')}` : ''}</span>
                <button type="button" onClick={() => onChange(value.filter(x => x !== p))} className="inline-flex items-center gap-1 text-gray-500 hover:text-red-600">
                  <Trash2 size={14} /> Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
