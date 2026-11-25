'use client'
import { useEffect, useState } from 'react'
import { submitPackageBooking } from '@/app/actions/booking'
import { createClient } from '@/lib/supabase/client'
import { openWhatsApp } from '@/lib/whatsapp'
import StayPicker, { StayOption } from './StayPicker'
import ModalShell from './ModalShell'
import { FormError, FormSuccess, PhoneInput, SelectInput, Stepper, SubmitButton, TextArea, TextInput, Field, controlClass } from '../forms/Fields'

export default function PackageBookingModal({ data, onClose }: { data: any; onClose: () => void }) {
  const isCustom = !!data?.isCustomEnquiry
  const stayOptions: StayOption[] = data?.stay_options || []
  const hasStay = stayOptions.length > 0 && !isCustom
  const hasRatePlans = !hasStay && !isCustom && data?.rate_plans && data.rate_plans.length > 0
  const isOneDay = data?.duration?.toLowerCase().includes('1 day') || data?.duration === '1D'

  const [form, setForm] = useState({
    fullName: '',
    contact: '',
    whatsapp: '',
    sameAsContact: false,
    email: '',
    startDate: data?.prefill?.date || '',
    endDate: '',
    vehicle: 'Sedan/Hatchback 4+1',
    accommodation: isCustom
      ? 'Standard (2/3 Star)'
      : hasStay
        ? ''
        : isOneDay
          ? 'Not Required'
          : data?.selected_plan || (hasRatePlans ? '' : 'Not Required'),
    guests: data?.prefill?.guests || 2,
    rooms: 1,
    notes: '',
    customName: data?.title && isCustom ? data.title : '',
  })
  const set = (patch: Partial<typeof form>) => setForm((p) => ({ ...p, ...patch }))

  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<string | null>(null) // WhatsApp message once saved

  // steps
  const [stayStep, setStayStep] = useState(hasStay)
  const [planStep, setPlanStep] = useState(!!hasRatePlans && !data?.selected_plan)
  const [resortStep, setResortStep] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>(data?.selected_plan || '')
  const [planResorts, setPlanResorts] = useState<any[]>([])
  const [loadingResorts, setLoadingResorts] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('travels')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })
      .then(({ data: rows }) => {
        if (rows && rows.length > 0) {
          setVehicles(rows)
          setForm((p) => (rows.some((v: any) => v.model === p.vehicle) ? p : { ...p, vehicle: rows[0].model }))
        }
      })
  }, [])

  const loadResorts = async (ids: string[]) => {
    setLoadingResorts(true)
    const supabase = createClient()
    const { data: rows } = await supabase
      .from('hotels_resorts')
      .select('id, name, location, cover_image_url, category')
      .in('id', ids)
      .eq('is_published', true)
    setPlanResorts(rows || [])
    setLoadingResorts(false)
  }

  // Pre-selected legacy plan that lists resorts
  useEffect(() => {
    if (data?.selected_plan && data?.rate_plans && !hasStay) {
      const plan = data.rate_plans.find((p: any) => p.title === data.selected_plan)
      if (plan?.resort_ids?.length) {
        setResortStep(true)
        loadResorts(plan.resort_ids)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const choosePlan = (plan: any) => {
    setSelectedPlan(plan.title)
    set({ accommodation: plan.title || 'Selected Plan' })
    setPlanStep(false)
    if (plan.resort_ids?.length) {
      setResortStep(true)
      loadResorts(plan.resort_ids)
    }
  }

  // End date follows the package length
  useEffect(() => {
    if (!form.startDate || !data?.duration || isCustom) return
    const start = new Date(form.startDate)
    if (isNaN(start.getTime())) return
    const m = (data.duration || '').toLowerCase().match(/(\d+)\s*(day|d)/)
    const add = m ? Math.max(0, parseInt(m[1]) - 1) : 0
    const end = new Date(start)
    end.setDate(end.getDate() + add)
    setForm((p) => ({ ...p, endDate: end.toISOString().split('T')[0] }))
  }, [form.startDate, data?.duration, isCustom])

  const today = new Date().toISOString().split('T')[0]
  const packageName = isCustom
    ? form.customName || 'Custom Package'
    : selectedPlan && !hasStay
      ? `${data?.title} - ${selectedPlan}`
      : data?.title || 'Unknown Package'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.accommodation && (hasStay || hasRatePlans)) {
      setError('Please choose your stay before sending the request.')
      return
    }
    setLoading(true)
    setError('')

    const booking = {
      package_name: packageName,
      full_name: form.fullName.trim(),
      contact_number: form.contact,
      whatsapp_number: form.whatsapp,
      email: form.email,
      start_date: form.startDate,
      end_date: form.endDate || form.startDate,
      vehicle_preference: form.vehicle,
      accommodation_type: form.accommodation,
      guests: form.guests,
      rooms: form.rooms,
      special_requests: form.notes,
      pickup_location: data?.pickup_location || 'Visakhapatnam (Vizag)',
      drop_location: data?.drop_location || 'Visakhapatnam (Vizag)',
    }

    const res = await submitPackageBooking(booking)
    if (!res.success) {
      setError(res.error || 'Could not save your request. Please try again.')
      setLoading(false)
      return
    }

    const text = `New Booking Request
Package: ${booking.package_name}
Name: ${booking.full_name}
Contact: +91 ${booking.contact_number}${booking.whatsapp_number ? ` (WA: +91 ${booking.whatsapp_number})` : ''}
Dates: ${booking.start_date} to ${booking.end_date}
Guests: ${booking.guests} | Rooms: ${booking.rooms}
Vehicle: ${booking.vehicle_preference}
Accommodation: ${booking.accommodation_type}
Pickup: ${booking.pickup_location}
Drop: ${booking.drop_location}
Special Requests: ${booking.special_requests || 'None'}`

    setDone(text)
    setLoading(false)
    openWhatsApp(text)
  }

  // ---------- which screen ----------
  if (done) {
    return (
      <ModalShell title="Booking request" onClose={onClose}>
        <FormSuccess whatsappMessage={done} onClose={onClose} />
      </ModalShell>
    )
  }

  if (stayStep) {
    return (
      <ModalShell title="Choose your stay" subtitle="Pick a room type, then the hotel you prefer." onClose={onClose}>
        <StayPicker
          options={stayOptions}
          initialType={data?.initial_stay_type}
          onConfirm={(type, hotel) => {
            set({ accommodation: `${type} - ${hotel.name}` })
            setStayStep(false)
          }}
        />
      </ModalShell>
    )
  }

  if (planStep) {
    return (
      <ModalShell title="Select a plan" subtitle="Choose your preferred accommodation option." onClose={onClose}>
        <div className="space-y-3">
          {data.rate_plans.map((plan: any, i: number) => (
            <button
              key={i}
              type="button"
              onClick={() => choosePlan(plan)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border-2 border-ocean/10 p-4 text-left transition-colors hover:border-coral hover:bg-coral/5"
            >
              <span className="min-w-0">
                {plan.badge && <span className="mb-1.5 inline-block rounded-full bg-teal/10 px-2.5 py-0.5 text-[0.65rem] font-bold text-teal">{plan.badge}</span>}
                <span className="block font-heading text-lg text-ocean">{plan.title}</span>
                {plan.features?.length > 0 && <span className="mt-0.5 block text-xs text-charcoal/55">{plan.features.join(' • ')}</span>}
              </span>
              <span className="shrink-0 text-right">
                {plan.mrp && <span className="block text-[0.68rem] text-charcoal/40 line-through">₹{Number(plan.mrp).toLocaleString('en-IN')}</span>}
                <span className="font-heading text-xl text-ocean">₹{Number(plan.price || 0).toLocaleString('en-IN')}</span>
              </span>
            </button>
          ))}
        </div>
      </ModalShell>
    )
  }

  if (resortStep) {
    return (
      <ModalShell
        title="Select a resort"
        subtitle={`Choose your preferred resort for ${selectedPlan || 'this plan'}.`}
        onClose={onClose}
        onBack={hasRatePlans ? () => { setResortStep(false); setPlanStep(true) } : undefined}
        backLabel="Back to plans"
      >
        {loadingResorts ? (
          <p className="py-10 text-center text-sm text-charcoal/55">Loading resorts…</p>
        ) : planResorts.length === 0 ? (
          <p className="py-10 text-center text-sm text-charcoal/55">
            No resorts found. <button type="button" className="font-semibold text-coral underline" onClick={() => setResortStep(false)}>Continue booking</button>
          </p>
        ) : (
          <div className="space-y-3">
            {planResorts.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => { set({ accommodation: `${selectedPlan || 'Selected Plan'} - ${r.name}` }); setResortStep(false) }}
                className="flex w-full items-center gap-4 rounded-2xl border-2 border-ocean/10 p-3 text-left transition-colors hover:border-coral hover:bg-coral/5"
              >
                {r.cover_image_url && <img src={r.cover_image_url} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />}
                <span className="min-w-0">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-teal">{r.category || 'Resort'}</span>
                  <span className="block font-heading text-lg leading-tight text-ocean">{r.name}</span>
                  <span className="text-xs text-charcoal/55">{r.location}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </ModalShell>
    )
  }

  // ---------- booking form ----------
  return (
    <ModalShell
      title={isCustom ? 'Plan your custom trip' : 'Book your trip'}
      subtitle="Fill in the details. We save your request and open WhatsApp to confirm."
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-4">
        <FormError message={error} />

        {isCustom ? (
          <TextInput label="Trip / package name" value={form.customName} onChange={(e) => set({ customName: e.target.value })} placeholder="e.g. Araku weekend for 4" />
        ) : (
          <Field label="Package">{(id) => <input id={id} readOnly value={packageName} className={controlClass} />}</Field>
        )}

        <TextInput label="Full name" required autoComplete="name" value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} placeholder="Your full name" />

        <PhoneInput
          required
          label="Mobile number"
          value={form.contact}
          onChange={(v) => set({ contact: v, whatsapp: form.sameAsContact ? v : form.whatsapp })}
        />

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
          <TextInput label="Start date" required type="date" min={today} value={form.startDate} onChange={(e) => set({ startDate: e.target.value })} />
          <TextInput
            label="End date"
            required={isCustom}
            type="date"
            min={form.startDate || today}
            value={form.endDate}
            readOnly={!isCustom}
            onChange={(e) => set({ endDate: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stepper label="Guests" required min={1} value={form.guests} onChange={(n) => set({ guests: n })} />
          <Stepper label="Rooms" required min={1} value={form.rooms} onChange={(n) => set({ rooms: n })} />
        </div>

        <SelectInput label="Vehicle" required value={form.vehicle} onChange={(e) => set({ vehicle: e.target.value })}>
          {vehicles.length > 0 ? (
            vehicles.map((v, i) => <option key={i} value={v.model}>{v.model} ({v.pax} pax)</option>)
          ) : (
            <option value="Sedan/Hatchback 4+1">Sedan/Hatchback 4+1</option>
          )}
        </SelectInput>

        {hasStay || hasRatePlans ? (
          <Field label="Your stay" required>
            {(id) => (
              <div className="flex items-center gap-2">
                <input id={id} readOnly required value={form.accommodation} placeholder="Not chosen yet" className={controlClass} />
                <button
                  type="button"
                  onClick={() => (hasStay ? setStayStep(true) : setPlanStep(true))}
                  className="shrink-0 rounded-full border border-coral/40 px-4 py-3 text-sm font-semibold text-coral transition-[background-color,transform] duration-150 hover:bg-coral/5 active:scale-95"
                >
                  {form.accommodation ? 'Change' : 'Choose'}
                </button>
              </div>
            )}
          </Field>
        ) : (
          <SelectInput label="Accommodation" required disabled={!isCustom && isOneDay} value={form.accommodation} onChange={(e) => set({ accommodation: e.target.value })}>
            {!isCustom && <option value="Not Required">Not required</option>}
            <option value="Standard (2/3 Star)">Standard (2/3 Star)</option>
            <option value="Premium (4 Star)">Premium (4 Star)</option>
            <option value="Luxury (5 Star / Resort)">Luxury (5 Star / Resort)</option>
            {isCustom && <option value="Not Required">Not required</option>}
          </SelectInput>
        )}

        <TextArea label="Special requests" hint="optional" value={form.notes} onChange={(e) => set({ notes: e.target.value })} placeholder="Anything specific — dietary needs, pickup time, celebrations…" />

        <SubmitButton loading={loading}>Send booking request</SubmitButton>
        <p className="text-center text-xs text-charcoal/45">Your details are saved securely and used only to arrange your trip.</p>
      </form>
    </ModalShell>
  )
}
