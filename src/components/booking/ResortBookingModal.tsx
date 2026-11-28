'use client'
import { useEffect, useState } from 'react'
import { Snowflake, Sun } from 'lucide-react'
import { submitResortBooking } from '@/app/actions/booking'
import { createClient } from '@/lib/supabase/client'
import ModalShell from './ModalShell'
import { FormError, FormSuccess, PhoneInput, Stepper, SubmitButton, TextArea, TextInput, Field, controlClass } from '../forms/Fields'
import { useSite } from '@/components/SiteProvider'
import PriceNote, { PRICE_NOTE, needsPriceNote } from '../forms/PriceNote'
import { formatDate } from '@/lib/format'

const priceUnit = (label?: string) => {
  const base = 'per night'
  if (!label) return base
  const clean = label.replace(/^\/?\s*/, '').toLowerCase().trim()
  if (clean === 'per night' || clean === 'night' || clean === '') return base
  return `${base} / ${label.replace(/^\/?\s*/, '')}`
}

export default function ResortBookingModal({ data, onClose }: { data: any; onClose: () => void }) {
  const { openWhatsApp } = useSite();
  const [step, setStep] = useState<1 | 2>(data?.room ? 2 : 1)
  const [rooms, setRooms] = useState<any[]>([])
  const [loadingRooms, setLoadingRooms] = useState(true)
  const [room, setRoom] = useState<any>(data?.room || null)

  const [form, setForm] = useState({
    fullName: '',
    contact: '',
    whatsapp: '',
    sameAsContact: false,
    email: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    rooms: 1,
    notes: '',
  })
  const set = (patch: Partial<typeof form>) => setForm((p) => ({ ...p, ...patch }))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      if (!data?.id) {
        setLoadingRooms(false)
        return
      }
      const supabase = createClient()
      const { data: rows } = await supabase.from('resort_room_types').select('*').eq('resort_id', data.id).eq('is_available', true)
      setRooms(rows || [])
      setLoadingRooms(false)
      if (!rows || rows.length === 0) {
        setRoom({ room_type: 'Standard Room' })
        setStep(2)
      }
    }
    load()
  }, [data?.id])

  const today = new Date().toISOString().split('T')[0]
  const showNote = needsPriceNote(form.adults + form.children, form.rooms)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const booking = {
      resort_name: data?.name || 'Unknown Resort',
      full_name: form.fullName.trim(),
      contact_number: form.contact,
      whatsapp_number: form.whatsapp,
      email: form.email,
      check_in: form.checkIn,
      check_out: form.checkOut,
      guests: form.adults + form.children,
      room_type: room?.room_type || 'Unknown Room',
      // the bookings table keeps one guest count, so the breakdown goes with the requests
      special_requests: [`Rooms: ${form.rooms} | Adults: ${form.adults} | Children: ${form.children}`, form.notes.trim()].filter(Boolean).join('\n'),
    }
    const res = await submitResortBooking(booking)
    if (!res.success) {
      setError(res.error || 'Could not save your request. Please try again.')
      setLoading(false)
      return
    }

    const text = `New Resort Booking Request
Resort: ${booking.resort_name}
Room Type: ${booking.room_type}
Name: ${booking.full_name}
Contact: +91 ${booking.contact_number}${booking.whatsapp_number ? ` (WA: +91 ${booking.whatsapp_number})` : ''}
Dates: ${formatDate(booking.check_in)} to ${formatDate(booking.check_out)}
Rooms: ${form.rooms} | Adults: ${form.adults} | Children: ${form.children}
Special Requests: ${form.notes.trim() || 'None'}${showNote ? `\nNote: ${PRICE_NOTE}` : ''}`
    setDone(text)
    setLoading(false)
    openWhatsApp(text)
  }

  if (done) {
    return (
      <ModalShell key="done" title="Booking request" onClose={onClose}>
        <FormSuccess whatsappMessage={done} onClose={onClose} />
      </ModalShell>
    )
  }

  if (step === 1) {
    return (
      <ModalShell key="rooms" title="Choose your room" subtitle={`Select a room at ${data?.name}`} onClose={onClose}>
        {loadingRooms ? (
          <div className="flex justify-center py-14"><span className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent" /></div>
        ) : (
          <div className="space-y-3">
            {rooms.map((r) => {
              const img = Array.isArray(r.images) && r.images[0]
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => { setRoom(r); setStep(2) }}
                  className="block w-full overflow-hidden rounded-2xl border-2 border-ocean/10 bg-white text-left transition-colors hover:border-coral"
                >
                  {img && <img src={img} alt="" loading="lazy" className="aspect-[16/8] w-full object-cover" />}
                  <span className="flex items-center justify-between gap-4 p-4">
                    <span className="block min-w-0">
                      <span className={`mb-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider ${r.has_ac ? 'bg-sky/12 text-ocean' : 'bg-amber/20 text-ocean'}`}>
                        {r.has_ac ? <Snowflake size={11} aria-hidden /> : <Sun size={11} aria-hidden />} {r.has_ac ? 'AC room' : 'Non-AC room'}
                      </span>
                      <span className="block font-heading text-lg leading-tight text-ocean">{r.room_type}</span>
                      <span className="mt-0.5 block text-xs text-charcoal/65">
                        <span className="font-heading text-base text-ocean">₹{(r.price || 0).toLocaleString('en-IN')}</span> / {priceUnit(data?.price_label)}
                      </span>
                    </span>
                    <span className="btn-coral shrink-0 !px-5 !py-3 text-sm">Select</span>
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </ModalShell>
    )
  }

  return (
    <ModalShell
      key="form"
      title="Book your stay"
      onClose={onClose}
      onBack={rooms.length > 0 ? () => setStep(1) : undefined}
      backLabel="Back to rooms"
    >
      <form onSubmit={submit} className="space-y-4">
        <FormError message={error} />

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Resort">{(id) => <input id={id} readOnly value={data?.name || ''} className={controlClass} />}</Field>
          <Field label="Room">{(id) => <input id={id} readOnly value={room?.room_type || ''} className={controlClass} />}</Field>
        </div>

        <TextInput label="Full name" required autoComplete="name" value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} placeholder="Your full name" />
        <PhoneInput required label="Mobile number" value={form.contact} onChange={(v) => set({ contact: v, whatsapp: form.sameAsContact ? v : form.whatsapp })} />

        <div>
          <PhoneInput label="WhatsApp number" value={form.whatsapp} onChange={(v) => set({ whatsapp: v, sameAsContact: false })} />
          <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-sm text-ocean/70">
            <input
              type="checkbox"
              checked={form.sameAsContact}
              onChange={(e) => set({ sameAsContact: e.target.checked, whatsapp: e.target.checked ? form.contact : form.whatsapp })}
              className="h-4 w-4 rounded border-ocean/30 accent-coral"
            />
            Same as mobile number
          </label>
        </div>

        <TextInput label="Email" hint="optional" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@example.com" />

        <div className="grid grid-cols-2 gap-3">
          <TextInput label="Check-in" required type="date" min={today} value={form.checkIn} onChange={(e) => set({ checkIn: e.target.value })} />
          <TextInput label="Check-out" required type="date" min={form.checkIn || today} value={form.checkOut} onChange={(e) => set({ checkOut: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stepper label="Adults" required min={1} value={form.adults} onChange={(n) => set({ adults: n })} />
          <Stepper label="Children" min={0} value={form.children} onChange={(n) => set({ children: n })} />
        </div>
        <Stepper label="Rooms" required min={1} value={form.rooms} onChange={(n) => set({ rooms: n })} />
        <PriceNote show={showNote} />

        <TextArea label="Special requests" hint="optional" value={form.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Early check-in, extra bed, celebrations…" />

        <SubmitButton loading={loading}>Send booking request</SubmitButton>
        <p className="text-center text-xs text-charcoal/45">Your details are saved securely and used only to arrange your stay.</p>
      </form>
    </ModalShell>
  )
}
