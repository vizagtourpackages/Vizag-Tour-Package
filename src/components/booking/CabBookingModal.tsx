'use client'
import { useState } from 'react'
import Image from 'next/image'
import { siteInfo } from '@/data/siteInfo'
import { submitCabBooking } from '@/app/actions/booking'
import { createClient } from '@/lib/supabase/client'
import { Users, Briefcase } from 'lucide-react'

export default function CabBookingModal({ data, onClose }: { data: any, onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(data ? 2 : 1)
  const [selectedVehicle, setSelectedVehicle] = useState<any>(data)
  const [vehicles, setVehicles] = useState<any[]>([])

  useEffect(() => {
    async function fetchVehicles() {
      const supabase = createClient()
      const { data: travelsData } = await supabase
        .from('travels')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
      
      if (travelsData) {
        setVehicles(travelsData)
      }
    }
    fetchVehicles()
  }, [])
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    pickupLocation: '',
    dropLocation: '',
    startDate: '',
    endDate: '',
    adults: 2,
    kids: 0,
    placesToVisit: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const bookingData = {
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      pickup_location: formData.pickupLocation,
      drop_location: formData.placesToVisit ? `${formData.dropLocation} (Places to visit: ${formData.placesToVisit})` : formData.dropLocation,
      start_date: formData.startDate,
      end_date: formData.endDate,
      adults: formData.adults,
      kids: formData.kids,
      vehicle_type: selectedVehicle?.model || 'Unknown Vehicle',
    }

    const res = await submitCabBooking(bookingData)
    
    if (!res.success) {
      setError(res.error || 'Failed to save booking')
      setLoading(false)
      return
    }

    // Format WhatsApp message
    const waText = `New Cab Booking Request
Vehicle: ${bookingData.vehicle_type}
Name: ${bookingData.full_name}
Contact: ${bookingData.phone_number}
Pickup: ${bookingData.pickup_location}
Drop: ${bookingData.drop_location}
Dates: ${bookingData.start_date} to ${bookingData.end_date}
Passengers: ${bookingData.adults} Adults, ${bookingData.kids} Kids`

    const encodedMessage = encodeURIComponent(waText)
    
    // Attempt to open WhatsApp directly (bypasses browser prompt on mobile)
    window.location.href = `whatsapp://send?phone=917780739851&text=${encodedMessage}`
    
    // Fallback for desktop/if app is not installed
    setTimeout(() => {
      window.location.href = `https://wa.me/917780739851?text=${encodedMessage}`
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="relative mx-auto w-full max-w-2xl bg-white rounded-2xl p-5 sm:p-6 shadow-xl mt-4 mb-4 sm:mt-10 sm:mb-10">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-charcoal bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">✕</button>
        
        {step === 1 ? (
          <div className="mt-1">
            <div className="mb-5 pr-10">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-0.5">Choose Your Vehicle</h2>
              <p className="text-charcoal/60 text-xs sm:text-sm">Select a vehicle for your journey</p>
            </div>
            
            <div className="space-y-3">
              {vehicles.map((v, i) => (
                <button 
                  key={i}
                  onClick={() => handleVehicleSelect(v)}
                  className="w-full text-left p-3 border border-gray-200 rounded-xl hover:border-coral hover:shadow-md transition-all flex gap-4 items-center group"
                >
                  <div className="relative w-20 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    {v.image && <Image fill src={v.image} alt={v.model} className="w-full h-full object-cover mix-blend-multiply" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-charcoal leading-tight">{v.model}</h4>
                    <div className="flex gap-3 text-xs text-gray-500 mt-2 font-medium">
                      <span className="flex items-center gap-1"><Users size={12} /> {v.pax} Pax</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-gray-400 group-hover:text-coral/80 font-bold px-2">Select →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-1">
            <div className="mb-5 pr-10">
              {/* Only show back button if they weren't forced into step 2 by pre-selection */}
              {!data && (
                <button type="button" onClick={() => setStep(1)} className="text-xs text-charcoal/60 hover:text-coral flex items-center gap-1 mb-2">
                  ← Back to vehicles
                </button>
              )}
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-0.5">Book a Cab</h2>
              <p className="text-charcoal/60 text-xs sm:text-sm">Fill in details and we'll confirm shortly</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1">Vehicle Type *</label>
                {data ? (
                  <input type="text" readOnly value={selectedVehicle?.model || ''} className="w-full p-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium" />
                ) : (
                  <select required value={selectedVehicle?.model || ''} onChange={e => setSelectedVehicle(vehicles.find(v => v.model === e.target.value))} className="w-full p-2 border rounded-lg text-sm bg-white">
                    {vehicles.map((v, i) => <option key={i} value={v.model}>{v.model}</option>)}
                  </select>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Your Name *</label>
                  <input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="Full name" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Phone Number *</label>
                  <input type="tel" required pattern="[0-9]{10}" title="10 digit phone number" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="10-digit mobile" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Pickup Location *</label>
                  <input type="text" required value={formData.pickupLocation} onChange={e => setFormData({...formData, pickupLocation: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="e.g. Vizag Airport" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Drop Location *</label>
                  <input type="text" required value={formData.dropLocation} onChange={e => setFormData({...formData, dropLocation: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="e.g. Hotel in Vizag" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Places to Visit (Optional)</label>
                <input type="text" value={formData.placesToVisit} onChange={e => setFormData({...formData, placesToVisit: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="e.g. RK Beach, Araku Valley, Kailasagiri" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Start Date *</label>
                  <input type="date" required value={formData.startDate} min={new Date().toISOString().split('T')[0]} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">End Date *</label>
                  <input type="date" required value={formData.endDate} min={formData.startDate || new Date().toISOString().split('T')[0]} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">No of Adults *</label>
                  <div className="flex border rounded-lg overflow-hidden">
                    <button type="button" onClick={() => setFormData(p => ({...p, adults: Math.max(1, p.adults - 1)}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-r">-</button>
                    <input type="number" required min="1" value={formData.adults} onChange={e => setFormData({...formData, adults: parseInt(e.target.value) || 1})} className="w-full p-2 text-center text-sm outline-none" />
                    <button type="button" onClick={() => setFormData(p => ({...p, adults: p.adults + 1}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-l">+</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">No of Kids</label>
                  <div className="flex border rounded-lg overflow-hidden">
                    <button type="button" onClick={() => setFormData(p => ({...p, kids: Math.max(0, p.kids - 1)}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-r">-</button>
                    <input type="number" min="0" value={formData.kids} onChange={e => setFormData({...formData, kids: parseInt(e.target.value) || 0})} className="w-full p-2 text-center text-sm outline-none" />
                    <button type="button" onClick={() => setFormData(p => ({...p, kids: p.kids + 1}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-l">+</button>
                  </div>
                </div>
              </div>

              <div>
                <button type="submit" disabled={loading} className="w-full btn-primary !py-2.5 !rounded-lg disabled:opacity-70 disabled:cursor-not-allowed mb-2 mt-2">
                  {loading ? 'Processing...' : 'Book Now'}
                </button>
                <div className="text-center">
                  <a href="/terms" className="text-[10px] sm:text-xs text-coral hover:underline font-medium">View Terms & Conditions</a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
