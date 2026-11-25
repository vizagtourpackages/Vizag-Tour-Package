'use client'
import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { submitCabBooking } from '@/app/actions/booking'
import { createClient } from '@/lib/supabase/client'
import { openWhatsApp } from '@/lib/whatsapp'
import TermsButton from '@/components/TermsButton'
import ModalShell from './ModalShell'
import { FormError, FormSuccess, PhoneInput, SelectInput, Stepper, SubmitButton, TextInput, Field, controlClass } from '../forms/Fields'

export default function CabBookingModal({ data, onClose }: { data: any; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(data ? 2 : 1)
  const [vehicle, setVehicle] = useState<any>(data)
  const [vehicles, setVehicles] = useState<any[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('travels')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .then(({ data: rows }) => rows && setVehicles(rows))
  }, [])

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    pickup: '',
    drop: '',
    places: '',
    startDate: '',
    endDate: '',
    adults: 2,
    kids: 0,
  })
  const set = (patch: Partial<typeof form>) => setForm((p) => ({ ...p, ...patch }))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<string | null>(null)
  const today = new Date().toISOString().split('T')[0]

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const booking = {
      full_name: form.fullName.trim(),
      phone_number: form.phone,
      pickup_location: form.pickup,
      drop_location: form.places ? `${form.drop} (Places to visit: ${form.places})` : form.drop,
      start_date: form.startDate,
      end_date: form.endDate || form.startDate,
      adults: form.adults,
      kids: form.kids,
      vehicle_type: vehicle?.model || 'Unknown Vehicle',
    }
    const res = await submitCabBooking(booking)
    if (!res.success) {
      setError(res.error || 'Could not save your request. Please try again.')
      setLoading(false)
      return
    }

    const text = `New Cab Booking Request
Vehicle: ${booking.vehicle_type}
Name: ${booking.full_name}
Contact: +91 ${booking.phone_number}
Pickup: ${booking.pickup_location}
Drop: ${booking.drop_location}
Dates: ${booking.start_date} to ${booking.end_date}
Passengers: ${booking.adults} Adults, ${booking.kids} Kids`
    setDone(text)
    setLoading(false)
    openWhatsApp(text)
  }

  if (done) {
    return (
      <ModalShell title="Cab request" onClose={onClose}>
        <FormSuccess whatsappMessage={done} onClose={onClose} />
      </ModalShell>
    )
  }

  if (step === 1) {
    return (
      <ModalShell title="Choose your vehicle" subtitle="Select a vehicle for your journey." onClose={onClose}>
        <div className="space-y-3">
          {vehicles.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setVehicle(v); setStep(2) }}
              className="group flex w-full items-center gap-4 rounded-2xl border-2 border-ocean/10 p-3 text-left transition-colors hover:border-coral hover:bg-coral/5"
            >
              <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-sand">
                {v.image && <img src={v.image} alt="" loading="lazy" className="h-full w-full object-contain mix-blend-multiply" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-lg leading-tight text-ocean">{v.model}</span>
                <span className="mt-1 flex items-center gap-1 text-xs font-medium text-charcoal/55"><Users size={13} /> {v.pax} seats</span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-coral">Select</span>
            </button>
          ))}
          {vehicles.length === 0 && <p className="py-10 text-center text-sm text-charcoal/55">Loading vehicles…</p>}
        </div>
      </ModalShell>
    )
  }

  return (
    <ModalShell
      title="Book a cab"
      onClose={onClose}
      onBack={!data ? () => setStep(1) : undefined}
      backLabel="Back to vehicles"
    >
      <form onSubmit={submit} className="space-y-4">
        <FormError message={error} />

        {data ? (
          <Field label="Vehicle">{(id) => <input id={id} readOnly value={vehicle?.model || ''} className={controlClass} />}</Field>
        ) : (
          <SelectInput label="Vehicle" required value={vehicle?.model || ''} onChange={(e) => setVehicle(vehicles.find((v) => v.model === e.target.value))}>
            {vehicles.map((v, i) => <option key={i} value={v.model}>{v.model}</option>)}
          </SelectInput>
        )}

        <TextInput label="Full name" required autoComplete="name" value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} placeholder="Your full name" />
        <PhoneInput required label="Mobile number" value={form.phone} onChange={(v) => set({ phone: v })} />

        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Pickup" required value={form.pickup} onChange={(e) => set({ pickup: e.target.value })} placeholder="e.g. Vizag Airport" />
          <TextInput label="Drop" required value={form.drop} onChange={(e) => set({ drop: e.target.value })} placeholder="e.g. Hotel in Vizag" />
        </div>

        <TextInput label="Places to visit" hint="optional" value={form.places} onChange={(e) => set({ places: e.target.value })} placeholder="RK Beach, Araku Valley, Kailasagiri…" />

        <div className="grid grid-cols-2 gap-3">
          <TextInput label="Start date" required type="date" min={today} value={form.startDate} onChange={(e) => set({ startDate: e.target.value })} />
          <TextInput label="End date" required type="date" min={form.startDate || today} value={form.endDate} onChange={(e) => set({ endDate: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stepper label="Adults" required min={1} value={form.adults} onChange={(n) => set({ adults: n })} />
          <Stepper label="Kids" min={0} value={form.kids} onChange={(n) => set({ kids: n })} />
        </div>

        <SubmitButton loading={loading}>Send booking request</SubmitButton>
        <div className="text-center">
          <TermsButton category="travels" label="View Terms & Conditions" className="cursor-pointer text-xs font-medium text-coral hover:underline" />
        </div>
      </form>
    </ModalShell>
  )
}
