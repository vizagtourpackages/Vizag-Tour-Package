'use client'
import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { submitCabBooking } from '@/app/actions/booking'
import { createClient } from '@/lib/supabase/client'
import TermsButton from '@/components/TermsButton'
import ModalShell from './ModalShell'
import { FormError, FormSuccess, PhoneInput, SelectInput, Stepper, SubmitButton, TextInput, Field, controlClass } from '../forms/Fields'
import { useSite } from '@/components/SiteProvider'
import { formatDate } from '@/lib/format'
import { TRIP_TYPES, rupees } from '@/lib/fares'

/** `data` is null (pick a vehicle), a vehicle, or `{ preset }` from a row of the fare table. */
export default function CabBookingModal({ data, onClose }: { data: any; onClose: () => void }) {
  const { openWhatsApp } = useSite();
  const preset = data?.preset
  const given = preset ? preset.vehicle : data
  const [step, setStep] = useState<1 | 2>(given ? 2 : 1)
  const [vehicle, setVehicle] = useState<any>(given)
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
    pickup: preset?.from || '',
    drop: preset?.to || '',
    tripType: preset?.tripType || '',
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

  const tripOptions = Array.from(new Set([...TRIP_TYPES, ...(preset?.tripType ? [preset.tripType] : [])]))
  // the listed fare applies only while the journey is still the one picked from the table
  const sameJourney = !!preset && form.pickup === (preset.from || '') && form.drop === (preset.to || '') && form.tripType === (preset.tripType || '')
  const fare: number | undefined = sameJourney ? preset.prices?.[String(vehicle?.id)] : undefined

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // the bookings table has no trip type or fare column, so they travel with the drop point
    const extras = [
      form.tripType && `Trip type: ${form.tripType}`,
      form.places && `Places to visit: ${form.places}`,
      fare && `Listed fare: ${rupees(fare)}`,
    ].filter(Boolean)
    const booking = {
      full_name: form.fullName.trim(),
      phone_number: form.phone,
      pickup_location: form.pickup.trim() || 'Not specified',
      drop_location: (form.drop.trim() || 'Not specified') + (extras.length ? ` (${extras.join('; ')})` : ''),
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

    const text = [
      'New Cab Booking Request',
      `Vehicle: ${booking.vehicle_type}`,
      `Name: ${booking.full_name}`,
      `Contact: +91 ${booking.phone_number}`,
      form.tripType && `Trip type: ${form.tripType}`,
      form.pickup && `Pickup: ${form.pickup}`,
      form.drop && `Drop: ${form.drop}`,
      form.places && `Places to visit: ${form.places}`,
      `Dates: ${formatDate(booking.start_date)} to ${formatDate(booking.end_date)}`,
      `Passengers: ${booking.adults} Adults, ${booking.kids} Kids`,
      fare && `Listed fare: ${rupees(fare)}`,
    ].filter(Boolean).join('\n')
    setDone(text)
    setLoading(false)
    openWhatsApp(text)
  }

  if (done) {
    return (
      <ModalShell key="done" title="Cab request" onClose={onClose}>
        <FormSuccess whatsappMessage={done} onClose={onClose} />
      </ModalShell>
    )
  }

  if (step === 1) {
    return (
      <ModalShell key="vehicles" title="Choose your vehicle" subtitle="Select a vehicle for your journey." onClose={onClose}>
        <div className="space-y-3">
          {vehicles.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => { setVehicle(v); setStep(2) }}
              className="group flex w-full items-center gap-4 rounded-2xl border-2 border-ocean/10 p-3 text-left transition-colors hover:border-coral hover:bg-coral/5"
            >
              <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-sand">
                {v.image && <img src={v.image} alt="" loading="lazy" className="h-full w-full object-contain mix-blend-multiply" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-lg leading-tight text-ocean">{v.model}</span>
                <span className="mt-1 flex items-center gap-1 text-xs font-medium text-charcoal/65"><Users size={13} aria-hidden /> {v.pax} seats</span>
              </span>
              <span className="shrink-0 text-sm font-semibold text-coral">Select</span>
            </button>
          ))}
          {vehicles.length === 0 && <p role="status" className="py-10 text-center text-sm text-charcoal/65">Loading vehicles…</p>}
        </div>
      </ModalShell>
    )
  }

  return (
    <ModalShell
      key="form"
      title="Book a cab"
      onClose={onClose}
      onBack={!given ? () => setStep(1) : undefined}
      backLabel="Back to vehicles"
    >
      <form onSubmit={submit} className="space-y-4">
        <FormError message={error} />

        {given && !preset ? (
          <Field label="Vehicle">{(id) => <input id={id} readOnly value={vehicle?.model || ''} className={controlClass} />}</Field>
        ) : (
          <SelectInput label="Vehicle" required value={vehicle?.model || ''} onChange={(e) => setVehicle(vehicles.find((v) => v.model === e.target.value))}>
            {vehicles.length === 0 && vehicle && <option value={vehicle.model}>{vehicle.model}</option>}
            {vehicles.map((v) => <option key={v.id} value={v.model}>{v.model}</option>)}
          </SelectInput>
        )}

        <SelectInput label="Trip type" hint="optional" value={form.tripType} onChange={(e) => set({ tripType: e.target.value })}>
          <option value="">Not sure yet</option>
          {tripOptions.map((t) => <option key={t} value={t}>{t}</option>)}
        </SelectInput>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="From" hint="optional" value={form.pickup} onChange={(e) => set({ pickup: e.target.value })} placeholder="e.g. Vizag Airport" />
          <TextInput label="To" hint="optional" value={form.drop} onChange={(e) => set({ drop: e.target.value })} placeholder="e.g. Araku Valley" />
        </div>

        <div role="status">
          {fare && (
            <p className="flex items-baseline justify-between gap-3 rounded-2xl bg-sand px-4 py-3 text-sm text-ocean">
              <span className="font-semibold">Listed fare for {vehicle?.model}</span>
              <span className="font-heading text-xl tabular-nums">{rupees(fare)}</span>
            </p>
          )}
        </div>

        <TextInput label="Full name" required autoComplete="name" value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} placeholder="Your full name" />
        <PhoneInput required label="Mobile number" value={form.phone} onChange={(v) => set({ phone: v })} />

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
          <TermsButton category="travels" label="View Terms & Conditions" className="cursor-pointer text-xs font-semibold text-ocean underline underline-offset-2 hover:text-coral" />
        </div>
      </form>
    </ModalShell>
  )
}
