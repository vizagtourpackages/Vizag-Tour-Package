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
      <div>
        <div className="mb-5 mt-2 pr-10">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-1">Choose your stay</h2>
          <p className="text-charcoal/60 text-sm">Pick the kind of room you would like for this trip.</p>
        </div>
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
                className="w-full flex items-center gap-4 text-left p-4 rounded-2xl border-2 border-charcoal/10 hover:border-coral hover:bg-coral/5 transition-colors"
              >
                <span className="w-12 h-12 rounded-xl bg-sunset text-white flex items-center justify-center shrink-0">
                  <BedDouble size={22} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-heading font-bold text-charcoal text-lg">{o.type}</span>
                  <span className="block text-xs text-charcoal/60">{o.hotels.length} hotel{o.hotels.length > 1 ? 's' : ''} available</span>
                </span>
                <span className="text-right shrink-0">
                  <span className="block text-[10px] uppercase tracking-wider text-charcoal/40 font-bold">from</span>
                  <span className="block font-heading font-black text-charcoal text-lg">{money(from)}</span>
                  <span className="block text-[10px] text-charcoal/50">/ {o.hotels[0]?.unit || 'night'}</span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    )
  }

  // ---- Step 2b: images of one hotel ----
  if (gallery) {
    const imgs = gallery.images.length ? gallery.images : gallery.cover ? [gallery.cover] : []
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="mb-4 mt-2 pr-10">
          <button
            type="button"
            onClick={() => { setGallery(null); setImgIdx(0) }}
            className="text-coral text-xs font-bold mb-2 flex items-center gap-1 hover:underline"
          >
            <ArrowLeft size={14} /> Back to hotels
          </button>
          <h2 className="text-xl font-bold font-heading text-charcoal leading-tight">{gallery.name}</h2>
          <p className="text-charcoal/60 text-sm">{active.type} room photos</p>
        </div>
        {imgs.length === 0 ? (
          <div className="py-12 text-center text-charcoal/50 text-sm">No photos added yet.</div>
        ) : (
          <>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={imgs[imgIdx]}
                  alt={`${gallery.name} ${imgIdx + 1}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {imgs.length > 1 && (
                <>
                  <button type="button" onClick={() => setImgIdx((imgIdx - 1 + imgs.length) % imgs.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow" aria-label="Previous">
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" onClick={() => setImgIdx((imgIdx + 1) % imgs.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow" aria-label="Next">
                    <ChevronRight size={18} />
                  </button>
                  <span className="absolute bottom-2 right-3 text-xs font-bold text-white bg-black/50 rounded-full px-2.5 py-1">{imgIdx + 1} / {imgs.length}</span>
                </>
              )}
            </div>
            {imgs.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                {imgs.map((u, i) => (
                  <button type="button" key={u + i} onClick={() => setImgIdx(i)} className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 ${i === imgIdx ? 'border-coral' : 'border-transparent opacity-70'}`}>
                    <img src={u} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
        <button
          type="button"
          onClick={() => { setSelected(gallery.id); setGallery(null); setImgIdx(0) }}
          className="btn-coral w-full mt-5 !py-3 text-sm"
        >
          Select this hotel
        </button>
      </motion.div>
    )
  }

  // ---- Step 2a: hotels list ----
  const chosen = active.hotels.find(h => h.id === selected)
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="mb-4 mt-2 pr-10">
        {options.length > 1 && (
          <button type="button" onClick={() => { setType(null); setSelected(null) }} className="text-coral text-xs font-bold mb-2 flex items-center gap-1 hover:underline">
            <ArrowLeft size={14} /> Back to room types
          </button>
        )}
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-1">{active.type} hotels</h2>
        <p className="text-charcoal/60 text-sm">Select the hotel you would like to stay in.</p>
      </div>

      <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
        {active.hotels.map(h => {
          const on = selected === h.id
          return (
            <div
              key={h.id}
              role="radio"
              aria-checked={on}
              tabIndex={0}
              onClick={() => setSelected(h.id)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setSelected(h.id)}
              className={`relative flex gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${on ? 'border-coral bg-coral/5 shadow-[0_8px_24px_-12px_rgba(255,106,61,0.5)]' : 'border-charcoal/10 hover:border-charcoal/25'}`}
            >
              {/* radio in the corner */}
              <span className={`absolute top-3 left-3 z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white ${on ? 'border-coral' : 'border-charcoal/30'}`}>
                {on && <span className="w-2.5 h-2.5 rounded-full bg-coral" />}
              </span>
              {h.cover ? (
                <img src={h.cover} alt="" onError={e => { e.currentTarget.style.visibility = 'hidden' }} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 bg-sand" />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-sand shrink-0" />
              )}
              <div className="flex-1 min-w-0 flex flex-col">
                {h.category && <span className="text-[10px] font-bold uppercase tracking-wider text-teal">{h.category}</span>}
                <h3 className="font-bold text-charcoal leading-tight">{h.name}</h3>
                {h.location && (
                  <p className="text-xs text-charcoal/60 mt-1 flex items-center gap-1"><MapPin size={12} /> {h.location}</p>
                )}
              </div>
              <div className="flex flex-col items-end justify-between shrink-0 text-right">
                <div>
                  <div className="font-heading font-black text-charcoal text-lg leading-none">{money(h.price)}</div>
                  <div className="text-[10px] text-charcoal/50">/ {h.unit || 'night'}</div>
                </div>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); setGallery(h); setImgIdx(0) }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-ocean hover:text-coral transition-colors"
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
        className="btn-coral w-full mt-5 !py-3 text-sm disabled:opacity-50 disabled:pointer-events-none"
      >
        {chosen ? (<><Check size={16} /> Continue with {chosen.name}</>) : 'Select a hotel to continue'}
      </button>
    </motion.div>
  )
}
