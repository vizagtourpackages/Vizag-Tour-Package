'use client'

import { useState, useTransition } from 'react'
import { ArrowDown, ArrowUp, Check, Loader2, Plus, Trash2 } from 'lucide-react'
import { saveFares } from '@/app/admin/travels/fares/actions'
import { TRIP_TYPES, journeyLabel, type FareRow } from '@/lib/fares'

type Vehicle = { id: string; model: string; pax: string | number }

const input = 'w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/30'
const label = 'mb-1 block text-xs font-bold text-gray-600'
const iconButton = 'grid size-9 place-items-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40'

export default function FareTableEditor({ vehicles, initialRows }: { vehicles: Vehicle[]; initialRows: FareRow[] }) {
  const [rows, setRows] = useState<FareRow[]>(initialRows)
  const [dirty, setDirty] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, start] = useTransition()

  const change = (next: FareRow[]) => { setRows(next); setDirty(true); setMessage(null) }
  const update = (i: number, patch: Partial<FareRow>) => change(rows.map((r, k) => (k === i ? { ...r, ...patch } : r)))
  const move = (i: number, by: number) => {
    const next = [...rows]
    ;[next[i], next[i + by]] = [next[i + by], next[i]]
    change(next)
  }
  const add = () => change([...rows, { id: `fare-${Date.now()}`, from: '', to: '', tripType: '', prices: {} }])
  const remove = (i: number) => {
    if (window.confirm(`Remove "${journeyLabel(rows[i])}" from the fare table?`)) change(rows.filter((_, k) => k !== i))
  }

  const save = () => {
    const empty = rows.findIndex(r => !r.from?.trim() && !r.to?.trim() && !r.tripType?.trim())
    if (empty !== -1) return setMessage({ ok: false, text: `Journey ${empty + 1} needs a From, a To or a Trip type.` })
    start(async () => {
      const res = await saveFares(rows)
      if (res.success) {
        setRows(res.rows || [])
        setDirty(false)
        setMessage({ ok: true, text: 'Fare table saved.' })
      } else setMessage({ ok: false, text: res.error || 'Could not save the fare table.' })
    })
  }

  return (
    <div className="space-y-4">
      <datalist id="trip-types">{TRIP_TYPES.map(t => <option key={t} value={t} />)}</datalist>

      {rows.length === 0 && (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          No journeys yet. The Travels page hides the fare table until you add one.
        </p>
      )}

      <ol className="space-y-4">
        {rows.map((r, i) => (
          <li key={r.id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-bold text-gray-900">{i + 1}. {journeyLabel(r)}</h3>
              <div className="flex gap-2">
                <button type="button" className={iconButton} onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up"><ArrowUp size={16} aria-hidden /></button>
                <button type="button" className={iconButton} onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label="Move down"><ArrowDown size={16} aria-hidden /></button>
                <button type="button" className={`${iconButton} hover:!text-red-600`} onClick={() => remove(i)} aria-label="Remove journey"><Trash2 size={16} aria-hidden /></button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div><label className={label} htmlFor={`${r.id}-from`}>From (optional)</label><input id={`${r.id}-from`} className={input} value={r.from || ''} onChange={e => update(i, { from: e.target.value })} placeholder="e.g. Vizag" /></div>
              <div><label className={label} htmlFor={`${r.id}-to`}>To (optional)</label><input id={`${r.id}-to`} className={input} value={r.to || ''} onChange={e => update(i, { to: e.target.value })} placeholder="e.g. Araku Valley" /></div>
              <div><label className={label} htmlFor={`${r.id}-type`}>Trip type (optional)</label><input id={`${r.id}-type`} list="trip-types" className={input} value={r.tripType || ''} onChange={e => update(i, { tripType: e.target.value })} placeholder="e.g. Vizag Local" /></div>
            </div>

            <fieldset className="mt-4 border-t border-gray-100 pt-4">
              <legend className="sr-only">Fare for each vehicle</legend>
              <p className="mb-3 text-xs text-gray-500">Fare in ₹ per vehicle. Leave empty to show “On request”.</p>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {vehicles.map(v => (
                  <div key={v.id}>
                    <label className={label} htmlFor={`${r.id}-${v.id}`}>{v.model}</label>
                    <input
                      id={`${r.id}-${v.id}`}
                      type="number"
                      min={0}
                      inputMode="numeric"
                      className={input}
                      value={r.prices[v.id] ?? ''}
                      onChange={e => {
                        const prices = { ...r.prices }
                        if (e.target.value === '') delete prices[v.id]
                        else prices[v.id] = Number(e.target.value)
                        update(i, { prices })
                      }}
                      placeholder="₹"
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="sticky bottom-6 z-20 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
        <button type="button" onClick={add} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 font-bold text-gray-800 hover:bg-gray-50">
          <Plus size={16} aria-hidden /> Add journey
        </button>
        <button type="button" onClick={save} disabled={pending || !dirty} className="inline-flex items-center gap-2 rounded-lg bg-charcoal px-5 py-2.5 font-bold text-white hover:bg-charcoal/90 disabled:opacity-50">
          {pending && <Loader2 size={16} className="animate-spin" aria-hidden />} Save fare table
        </button>
        <p role="status" className={`text-sm font-medium ${message?.ok ? 'text-emerald-700' : 'text-red-600'}`}>
          {message ? <span className="inline-flex items-center gap-1">{message.ok && <Check size={16} aria-hidden />}{message.text}</span> : dirty ? <span className="text-gray-500">Unsaved changes</span> : null}
        </p>
      </div>
    </div>
  )
}
