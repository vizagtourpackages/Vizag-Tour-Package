'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, BedDouble, Check, ChevronLeft, ChevronRight, Images, MapPin } from 'lucide-react'

export interface StayHotel {
  id: string
  name: string
  location?: string
  category?: string
  cover?: string
  price: number
  unit?: string // "night" (default) or e.g. "couple" for legacy plan pricing
  images: string[]
}

export interface StayOption {
  type: string
  hotels: StayHotel[]
}

const money = (n: number) => `₹${n.toLocaleString('en-IN')}`

/** Clearly visible, comfortably sized back button used on every sub-step. */
function BackButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 inline-flex h-11 items-center gap-2 rounded-full border border-ocean/15 bg-white px-5 text-[0.95rem] font-semibold text-ocean shadow-[0_4px_14px_-6px_rgba(10,42,77,.3)] transition-[background-color,transform] duration-150 hover:bg-sand active:scale-95"
    >
      <ArrowLeft size={18} /> {children}
    </button>
  )
}

/**
 * Step 1: pick an accommodation type. Step 2: pick a hotel for it (radio, price, view images).
 * Calls onConfirm(type, hotel) once a hotel is chosen.
 */
export default function StayPicker({
  options,
  initialType,
  onConfirm,
}: {
  options: StayOption[]
  initialType?: string | null
  onConfirm: (type: string, hotel: StayHotel) => void
}) {
  const [type, setType] = useState<string | null>(initialType || null)
  const [selected, setSelected] = useState<string | null>(null)
  const [gallery, setGallery] = useState<StayHotel | null>(null)
  const [imgIdx, setImgIdx] = useState(0)

  const active = options.find(o => o.type === type)

  // ---- Step 1: accommodation types ----
  if (!active) {
    return (
      <div className="space-y-3">
        {options.map((o, i) => {
          const from = Math.min(...o.hotels.map(h => h.price))
          return (
            <motion.button
              key={o.type}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setType(o.type)}
              className="flex w-full items-center gap-4 rounded-2xl border-2 border-ocean/10 p-4 text-left transition-colors hover:border-coral hover:bg-coral/5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sunset text-white">
                <BedDouble size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-lg text-ocean">{o.type}</span>
                <span className="block text-xs text-charcoal/55">{o.hotels.length} hotel{o.hotels.length > 1 ? 's' : ''} available</span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-charcoal/40">from</span>
                <span className="block font-heading text-lg leading-tight text-ocean">{money(from)}</span>
                <span className="block text-[0.62rem] text-charcoal/50">/ {o.hotels[0]?.unit || 'night'}</span>
              </span>
            </motion.button>
          )
        })}
      </div>
    )
  }

  // ---- Step 2b: images of one hotel ----
  if (gallery) {
    const imgs = gallery.images.length ? gallery.images : gallery.cover ? [gallery.cover] : []
    return (
      <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
        <BackButton onClick={() => { setGallery(null); setImgIdx(0) }}>Back to hotels</BackButton>
        <h3 className="font-heading text-xl leading-tight text-ocean">{gallery.name}</h3>
        <p className="mb-3 mt-0.5 text-sm text-charcoal/55">{active.type} room photos</p>

        {imgs.length === 0 ? (
          <div className="py-12 text-center text-sm text-charcoal/50">No photos added yet.</div>
        ) : (
          <>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={imgs[imgIdx]}
                  alt={`${gallery.name} ${imgIdx + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              {imgs.length > 1 && (
                <>
                  <button type="button" onClick={() => setImgIdx((imgIdx - 1 + imgs.length) % imgs.length)} className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow" aria-label="Previous photo">
                    <ChevronLeft size={20} />
                  </button>
                  <button type="button" onClick={() => setImgIdx((imgIdx + 1) % imgs.length)} className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow" aria-label="Next photo">
                    <ChevronRight size={20} />
                  </button>
                  <span className="absolute bottom-2 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-bold text-white">{imgIdx + 1} / {imgs.length}</span>
                </>
              )}
            </div>
            {imgs.length > 1 && (
              <div className="thin-scroll mt-3 flex gap-2 overflow-x-auto pb-1">
                {imgs.map((u, i) => (
                  <button type="button" key={u + i} onClick={() => setImgIdx(i)} aria-label={`Photo ${i + 1}`} className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${i === imgIdx ? 'border-coral' : 'border-transparent opacity-70'}`}>
                    <img src={u} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        <button
          type="button"
          onClick={() => { setSelected(gallery.id); setGallery(null); setImgIdx(0) }}
          className="btn-coral mt-5 w-full !py-3.5 text-sm"
        >
          Select this hotel
        </button>
      </motion.div>
    )
  }

  // ---- Step 2a: hotels list ----
  const chosen = active.hotels.find(h => h.id === selected)
  return (
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
      {options.length > 1 && <BackButton onClick={() => { setType(null); setSelected(null) }}>Back to room types</BackButton>}
      <h3 className="font-heading text-xl text-ocean">{active.type} hotels</h3>
      <p className="mb-4 mt-0.5 text-sm text-charcoal/55">Select the hotel you would like to stay in.</p>

      <div role="radiogroup" aria-label={`${active.type} hotels`} className="space-y-3">
        {active.hotels.map(h => {
          const on = selected === h.id
          return (
            <div
              key={h.id}
              role="radio"
              aria-checked={on}
              tabIndex={0}
              onClick={() => setSelected(h.id)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(h.id))}
              className={`relative flex gap-3 rounded-2xl border-2 p-3 transition-colors ${on ? 'border-coral bg-coral/5' : 'border-ocean/10 hover:border-ocean/25'} cursor-pointer`}
            >
              <span className={`absolute left-3 top-3 z-10 grid h-5 w-5 place-items-center rounded-full border-2 bg-white ${on ? 'border-coral' : 'border-ocean/30'}`}>
                {on && <span className="h-2.5 w-2.5 rounded-full bg-coral" />}
              </span>
              {h.cover ? (
                <img src={h.cover} alt="" onError={e => { e.currentTarget.style.visibility = 'hidden' }} className="h-24 w-24 shrink-0 rounded-xl bg-sand object-cover sm:h-28 sm:w-28" />
              ) : (
                <div className="h-24 w-24 shrink-0 rounded-xl bg-sand sm:h-28 sm:w-28" />
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                {h.category && <span className="text-[0.62rem] font-bold uppercase tracking-wider text-teal">{h.category}</span>}
                <h4 className="font-heading text-[1.05rem] leading-tight text-ocean">{h.name}</h4>
                {h.location && <p className="mt-1 flex items-center gap-1 text-xs text-charcoal/55"><MapPin size={12} /> {h.location}</p>}
              </div>
              <div className="flex shrink-0 flex-col items-end justify-between text-right">
                <div>
                  <div className="font-heading text-lg leading-none text-ocean">{money(h.price)}</div>
                  <div className="text-[0.62rem] text-charcoal/50">/ {h.unit || 'night'}</div>
                </div>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setGallery(h); setImgIdx(0) }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-ocean hover:text-coral"
                >
                  <Images size={14} /> View images
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        disabled={!chosen}
        onClick={() => chosen && onConfirm(active.type, chosen)}
        className="btn-coral mt-5 w-full !py-3.5 text-sm disabled:pointer-events-none disabled:opacity-50"
      >
        {chosen ? (<><Check size={16} /> Continue with {chosen.name}</>) : 'Select a hotel to continue'}
      </button>
    </motion.div>
  )
}
