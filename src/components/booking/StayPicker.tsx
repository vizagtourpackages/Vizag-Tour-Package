'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BedDouble, Check, ChevronLeft, ChevronRight, Images, MapPin } from 'lucide-react'
import ModalShell from './ModalShell'
import { areaLabel } from '@/lib/areas'

export interface StayHotel {
  id: string
  name: string
  area?: string
  location?: string
  category?: string
  cover?: string
  images: string[]
}

/** One accommodation type. The price is the tour package price for that type. */
export interface StayOption {
  type: string
  price: number
  mrp?: number
  features?: string[]
  unit: string // e.g. "couple"
  hotels: StayHotel[]
}

/** One stay in the trip, e.g. "Araku Valley, nights 1–2". */
export interface StayLeg {
  area: string
  nights: number
  from: number
}

export interface StayPick {
  leg: StayLeg | null
  hotel: StayHotel
}

const money = (n: number) => `₹${n.toLocaleString('en-IN')}`
const nightsText = (l: StayLeg) =>
  l.nights === 1 ? `Night ${l.from}` : `Nights ${l.from}–${l.from + l.nights - 1}`

/**
 * The whole "choose your stay" popup.
 * 1) pick the room type (this sets the package price), 2) pick a hotel for each place. Guests can
 * jump between places and change picks until they confirm, 3) optional photo view.
 * The back arrow lives in the popup header, left of the title.
 */
export default function StayPicker({
  options,
  legs = [],
  initialType,
  initialPicks,
  onConfirm,
  onClose,
}: {
  options: StayOption[]
  legs?: StayLeg[]
  initialType?: string | null
  /** hotel id per stay, to restore earlier choices when the guest reopens the picker */
  initialPicks?: string[]
  onConfirm: (type: string, picks: StayPick[]) => void
  onClose: () => void
}) {
  // no plan → one stay with every attached hotel
  const stays: (StayLeg | null)[] = legs.length > 0 ? legs : [null]
  const multi = stays.length > 1

  const [type, setType] = useState<string | null>(initialType || null)
  const [li, setLi] = useState(0)
  const [pickedType, setPickedType] = useState(initialType || null) // type the current picks belong to
  const [picks, setPicks] = useState<Record<number, string>>(() => Object.fromEntries((initialPicks || []).map((id, i) => [i, id])))
  const [gallery, setGallery] = useState<StayHotel | null>(null)
  const [imgIdx, setImgIdx] = useState(0)

  // keep the current place chip in view when there are more places than fit
  const chips = useRef<HTMLOListElement>(null)
  useEffect(() => {
    const row = chips.current
    const chip = row?.children[li] as HTMLElement | undefined
    if (row && chip) row.scrollTo({ left: chip.offsetLeft - row.offsetLeft - 24, behavior: 'smooth' })
  }, [li, type, gallery])

  const active = options.find(o => o.type === type)
  const leg = stays[li]

  // hotels for the current stay: same place first; if none are attached there, show them all
  const hotelsFor = (opt: StayOption, l: StayLeg | null) => {
    if (!l) return opt.hotels
    const inArea = opt.hotels.filter(h => h.area === l.area)
    return inArea.length > 0 ? inArea : opt.hotels
  }

  // ---- Step 1: accommodation types ----
  if (!active) {
    return (
      <ModalShell
        title="Choose your stay"
        subtitle={multi ? 'Your package price depends on the room type. Then pick a hotel in each place.' : 'Your package price depends on the room type. Then pick your hotel.'}
        onClose={onClose}
      >
        {multi && (
          <ol className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl bg-sand/70 px-4 py-3 text-[0.82rem] font-semibold text-ocean">
            {stays.map((l, i) => l && (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight size={14} className="text-ocean/35" />}
                <span>{areaLabel(l.area)} <span className="font-medium text-charcoal/50">· {l.nights} night{l.nights > 1 ? 's' : ''}</span></span>
              </li>
            ))}
          </ol>
        )}
        <div className="space-y-3">
          {options.map((o, i) => (
            <motion.button
              key={o.type}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => { if (o.type !== pickedType) setPicks({}); setPickedType(o.type); setType(o.type); setLi(0) }}
              className="flex w-full items-center gap-4 rounded-2xl border-2 border-ocean/10 p-4 text-left transition-colors hover:border-coral hover:bg-coral/5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sunset text-white">
                <BedDouble size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-lg text-ocean">{o.type}</span>
                <span className="block text-xs text-charcoal/55">{o.hotels.length} hotel{o.hotels.length > 1 ? 's' : ''} available</span>
                {!!o.features?.length && <span className="mt-0.5 block text-xs text-teal">{o.features.join(' • ')}</span>}
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-charcoal/40">Package price</span>
                {!!o.mrp && o.mrp > o.price && <span className="block text-[0.68rem] text-charcoal/40 line-through">{money(o.mrp)}</span>}
                <span className="block font-heading text-lg leading-tight text-ocean">{money(o.price)}</span>
                <span className="block text-[0.62rem] text-charcoal/50">/ {o.unit}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </ModalShell>
    )
  }

  const list = hotelsFor(active, leg)
  const selectedId = picks[li] || null
  const chosen = list.find(h => h.id === selectedId)

  // picks survive going back, so guests can move around freely until they confirm
  const goBack = () => {
    if (li > 0) setLi(li - 1)
    else setType(null)
  }

  const pickedHotel = (i: number) => hotelsFor(active, stays[i]).find(h => h.id === picks[i])
  const pendingStay = stays.findIndex((_, i) => !pickedHotel(i))
  const allPicked = pendingStay === -1
  // the next stay still needing a hotel, looking forward first
  const nextPending = stays.findIndex((_, i) => i > li && !pickedHotel(i))
  const goTo = nextPending !== -1 ? nextPending : pendingStay

  // ---- Step 3: images of one hotel ----
  if (gallery) {
    const imgs = gallery.images.length ? gallery.images : gallery.cover ? [gallery.cover] : []
    return (
      <ModalShell
        title={gallery.name}
        subtitle={`${active.type} room photos${gallery.area ? ` · ${areaLabel(gallery.area)}` : ''}`}
        onClose={onClose}
        onBack={() => { setGallery(null); setImgIdx(0) }}
        backLabel="Back to hotels"
      >
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
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
            onClick={() => { setPicks({ ...picks, [li]: gallery.id }); setGallery(null); setImgIdx(0) }}
            className="btn-coral mt-5 w-full !py-3.5 text-sm"
          >
            Select this hotel
          </button>
        </motion.div>
      </ModalShell>
    )
  }

  // ---- Step 2: hotels for the current stay ----
  const advance = () => {
    if (!chosen) return
    if (!allPicked) {
      setLi(goTo)
      return
    }
    const finalPicks: StayPick[] = stays.map((l, i) => ({ leg: l, hotel: pickedHotel(i) as StayHotel }))
    onConfirm(active.type, finalPicks)
  }

  return (
    <ModalShell
      title={multi && leg ? `${areaLabel(leg.area)} · ${active.type}` : `${active.type} hotels`}
      subtitle={multi && leg ? `${nightsText(leg)} · tap a place below to switch` : 'Select the hotel you would like to stay in.'}
      onClose={onClose}
      onBack={options.length > 1 || li > 0 ? goBack : undefined}
      backLabel={li > 0 ? 'Back to the previous stay' : 'Back to room types'}
    >
      <motion.div key={li} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
        {/* where am I in the trip */}
        {multi && (
          <ol ref={chips} className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1" aria-label="Your stays">
            {stays.map((l, i) => l && (
              <li key={i} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setLi(i)}
                  aria-current={i === li ? 'step' : undefined}
                  className={`flex items-center gap-2 rounded-full border-2 px-3.5 py-2.5 text-xs font-semibold transition-[background-color,border-color,transform] duration-150 active:scale-95 ${
                    i === li ? 'border-coral bg-coral/8 text-ocean' : pickedHotel(i) ? 'border-teal/40 bg-teal/8 text-ocean' : 'border-ocean/12 text-ocean/60 hover:border-ocean/30'
                  }`}
                >
                  <span className={`grid h-5 w-5 place-items-center rounded-full text-[0.65rem] text-white ${pickedHotel(i) ? 'bg-teal' : i === li ? 'bg-coral' : 'bg-ocean/25'}`}>
                    {pickedHotel(i) ? <Check size={11} strokeWidth={3} /> : i + 1}
                  </span>
                  {areaLabel(l.area)}
                </button>
              </li>
            ))}
          </ol>
        )}

        <div role="radiogroup" aria-label={`${active.type} hotels in ${leg ? areaLabel(leg.area) : 'your trip'}`} className="space-y-3">
          {list.map(h => {
            const on = selectedId === h.id
            return (
              <div
                key={h.id}
                role="radio"
                aria-checked={on}
                tabIndex={0}
                onClick={() => setPicks({ ...picks, [li]: h.id })}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setPicks({ ...picks, [li]: h.id }))}
                className={`relative flex cursor-pointer gap-3 rounded-2xl border-2 p-3 transition-colors ${on ? 'border-coral bg-coral/5' : 'border-ocean/10 hover:border-ocean/25'}`}
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
                  <span className="mb-1 flex flex-wrap items-center gap-1.5">
                    {h.area && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky/12 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-sky">
                        <MapPin size={10} /> {areaLabel(h.area)}
                      </span>
                    )}
                    {h.category && <span className="text-[0.62rem] font-bold uppercase tracking-wider text-teal">{h.category}</span>}
                  </span>
                  <h4 className="font-heading text-[1.05rem] leading-tight text-ocean">{h.name}</h4>
                  {h.location && <p className="mt-1 text-xs text-charcoal/55">{h.location}</p>}
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); setGallery(h); setImgIdx(0) }}
                    className="mt-auto inline-flex w-fit items-center gap-1.5 whitespace-nowrap py-1 text-xs font-bold text-ocean hover:text-coral"
                  >
                    <Images size={14} /> View images
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 rounded-2xl bg-sand/70 px-4 py-3 text-sm">
          <span className="font-semibold text-ocean">{active.type} package</span>
          <span className="whitespace-nowrap font-heading text-lg text-ocean">{money(active.price)} <span className="font-sans text-[0.68rem] text-charcoal/55">/ {active.unit}</span></span>
        </p>

        <button
          type="button"
          disabled={!chosen}
          onClick={advance}
          className="btn-coral mt-3 w-full !py-3.5 text-sm disabled:pointer-events-none disabled:opacity-50"
        >
          {!chosen
            ? 'Select a hotel to continue'
            : allPicked
              ? <><Check size={16} /> {multi ? 'Confirm my stays' : `Continue with ${chosen.name}`}</>
              : <>Next: {stays[goTo] ? areaLabel(stays[goTo]!.area) : ''} <ChevronRight size={16} /></>}
        </button>
      </motion.div>
    </ModalShell>
  )
}
