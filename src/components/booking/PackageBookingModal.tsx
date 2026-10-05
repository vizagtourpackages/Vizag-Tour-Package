'use client'
import { useState, useEffect } from 'react'
import { siteInfo } from '@/data/siteInfo'
import { submitPackageBooking } from '@/app/actions/booking'
import { createClient } from '@/lib/supabase/client'

export default function PackageBookingModal({ data, onClose }: { data: any, onClose: () => void }) {
  const [formData, setFormData] = useState({
    packageName: data?.title || '',
    fullName: '',
    contactNumber: '',
    whatsappNumber: '',
    sameAsContact: false,
    email: '',
    startDate: '',
    endDate: '',
    vehiclePreference: 'Sedan/Hatchback 4+1',
    accommodationType: data?.isCustomEnquiry ? 'Standard (2/3 Star)' : ((data?.duration?.toLowerCase().includes('1 day') || data?.duration === '1D') 
      ? 'Not Required' 
      : (data?.selected_plan || ((data?.rate_plans && data.rate_plans.length > 0) ? '' : 'Not Required'))),
    guests: 2,
    rooms: 1,
    specialRequests: ''
  })
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState<any[]>([])

  useEffect(() => {
    async function fetchVehicles() {
      const supabase = createClient()
      const { data: travelsData } = await supabase
        .from('travels')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
      
      if (travelsData && travelsData.length > 0) {
        setVehicles(travelsData)
        // If current preference is not in the list, set to first available
        const hasPref = travelsData.some(v => v.model === formData.vehiclePreference);
        if (!hasPref) {
          setFormData(prev => ({ ...prev, vehiclePreference: travelsData[0].model }))
        }
      }
    }
    fetchVehicles()
  }, [])
  const [error, setError] = useState('')
  
  const hasRatePlans = data?.rate_plans && data.rate_plans.length > 0;
  const isOneDayPackage = data?.duration?.toLowerCase().includes('1 day') || data?.duration === '1D';
  
  // State for Rate Plan Selector step
  const [showPlanSelector, setShowPlanSelector] = useState(
    hasRatePlans && !data?.selected_plan
  );
  const [selectedPlan, setSelectedPlan] = useState(data?.selected_plan || '');

  // State for Resort Selector step
  const [showResortSelector, setShowResortSelector] = useState(false);
  const [ratePlanResorts, setRatePlanResorts] = useState<any[]>([]);
  const [loadingResorts, setLoadingResorts] = useState(false);

  // If a plan is pre-selected on mount, check if it has resorts and fetch them
  useEffect(() => {
    if (data?.selected_plan && data?.rate_plans) {
      const plan = data.rate_plans.find((p: any) => p.title === data.selected_plan);
      if (plan && plan.resort_ids && plan.resort_ids.length > 0) {
        setShowResortSelector(true);
        setLoadingResorts(true);
        const supabase = createClient();
        supabase
          .from('hotels_resorts')
          .select('id, name, location, cover_image_url, category')
          .in('id', plan.resort_ids)
          .eq('is_published', true)
          .then(({ data: resorts }) => {
            setRatePlanResorts(resorts || []);
            setLoadingResorts(false);
          });
      }
    }
  }, [data?.selected_plan, data?.rate_plans]);

  const handlePlanSelect = async (plan: any) => {
    setSelectedPlan(plan.title);
    setFormData(prev => ({ ...prev, accommodationType: plan.title || 'Selected Plan' }));
    
    if (plan.resort_ids && plan.resort_ids.length > 0) {
      setShowPlanSelector(false);
      setShowResortSelector(true);
      setLoadingResorts(true);
      const supabase = createClient();
      const { data: resorts } = await supabase
        .from('hotels_resorts')
        .select('id, name, location, cover_image_url, category')
        .in('id', plan.resort_ids)
        .eq('is_published', true);
      
      setRatePlanResorts(resorts || []);
      setLoadingResorts(false);
    } else {
      setShowPlanSelector(false);
    }
  };

  const handleResortSelect = (resort: any) => {
    setFormData(prev => ({ ...prev, accommodationType: `${selectedPlan || 'Selected Plan'} - ${resort.name}` }));
    setShowResortSelector(false);
  };

  // Auto-calculate end date
  useEffect(() => {
    if (!formData.startDate || !data?.duration || data?.isCustomEnquiry) return

    const startDateObj = new Date(formData.startDate)
    if (isNaN(startDateObj.getTime())) return

    // Extract days from duration string (e.g., "3 Days", "1 Day", "3D/2N")
    const durationStr = (data.duration || '').toLowerCase()
    let daysToAdd = 0
    const dayMatch = durationStr.match(/(\d+)\s*(day|d)/)
    if (dayMatch) {
      // If 3 days, we add 2 days to start date to get end date
      const days = parseInt(dayMatch[1])
      daysToAdd = Math.max(0, days - 1)
    }

    const endDateObj = new Date(startDateObj)
    endDateObj.setDate(endDateObj.getDate() + daysToAdd)
    
    setFormData(prev => ({
      ...prev,
      endDate: endDateObj.toISOString().split('T')[0]
    }))
  }, [formData.startDate, data?.duration])

  const handleSameAsContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setFormData(prev => ({
      ...prev,
      sameAsContact: checked,
      whatsappNumber: checked ? prev.contactNumber : prev.whatsappNumber
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const bookingData = {
      package_name: formData.packageName || 'Unknown Package',
      full_name: formData.fullName,
      contact_number: formData.contactNumber,
      whatsapp_number: formData.whatsappNumber,
      email: formData.email,
      start_date: formData.startDate,
      end_date: formData.endDate,
      vehicle_preference: formData.vehiclePreference,
      accommodation_type: formData.accommodationType,
      guests: formData.guests,
      rooms: formData.rooms,
      special_requests: formData.specialRequests,
      pickup_location: data?.pickup_location || 'Visakhapatnam (Vizag)',
      drop_location: data?.drop_location || 'Visakhapatnam (Vizag)'
    }

    const res = await submitPackageBooking(bookingData)
    
    if (!res.success) {
      setError(res.error || 'Failed to save booking')
      setLoading(false)
      return
    }

    // Format WhatsApp message
    const waText = `New Booking Request
Package: ${bookingData.package_name}
Name: ${bookingData.full_name}
Contact: ${bookingData.contact_number}${bookingData.whatsapp_number ? ` (WA: ${bookingData.whatsapp_number})` : ''}
Dates: ${bookingData.start_date} to ${bookingData.end_date}
Guests: ${bookingData.guests} | Rooms: ${bookingData.rooms}
Vehicle: ${bookingData.vehicle_preference}
Accommodation: ${bookingData.accommodation_type}
Pickup: ${bookingData.pickup_location}
Drop: ${bookingData.drop_location}
Special Requests: ${bookingData.special_requests || 'None'}`

    const encodedMessage = encodeURIComponent(waText)
    
    // Attempt to open WhatsApp directly (bypasses browser prompt on mobile)
    window.location.href = `whatsapp://send?phone=917780739851&text=${encodedMessage}`
    
    // Fallback for desktop/if app is not installed
    setTimeout(() => {
      window.location.href = `https://wa.me/917780739851?text=${encodedMessage}`
    }, 500)
    
    // We don't close the modal or set loading false because we are redirecting away
  }

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-6">
      <div className="relative mx-auto w-full max-w-2xl bg-white rounded-2xl p-5 sm:p-6 shadow-xl mt-4 mb-4 sm:mt-10 sm:mb-10">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-charcoal bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors">✕</button>
        
        {showPlanSelector ? (
          <div className="animate-fade-in">
            <div className="mb-6 mt-2 pr-10">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-1">Select Rate Plan</h2>
              <p className="text-charcoal/60 text-sm">Choose your preferred accommodation option for this package.</p>
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {data.rate_plans.map((plan: any, i: number) => (
                <div key={i} className="border border-charcoal/10 rounded-xl p-4 hover:border-teal/50 hover:bg-teal/5 cursor-pointer transition-all flex flex-col sm:flex-row gap-4 justify-between"
                     onClick={() => handlePlanSelect(plan)}>
                  <div>
                    {plan.badge && (
                      <span className="inline-block px-2 py-0.5 bg-teal/10 text-teal text-[10px] font-bold rounded-full mb-2">
                        {plan.badge}
                      </span>
                    )}
                    <h3 className="font-bold text-charcoal text-base mb-1">{plan.title}</h3>
                    {plan.features && plan.features.length > 0 && (
                      <div className="text-xs text-charcoal/60 line-clamp-2">
                        {plan.features.join(' • ')}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                    <div className="text-right">
                      {plan.mrp && <div className="text-[10px] text-charcoal/40 line-through">₹{plan.mrp.toLocaleString('en-IN')}</div>}
                      <div className="font-black text-charcoal text-lg">₹{plan.price?.toLocaleString('en-IN') || 0}</div>
                    </div>
                    <button className="sm:mt-2 px-4 py-1.5 bg-charcoal text-white text-xs font-bold rounded-lg group-hover:bg-teal transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : showResortSelector ? (
          <div className="animate-fade-in">
            <div className="mb-6 mt-2 pr-10">
              <button 
                onClick={() => { setShowResortSelector(false); setShowPlanSelector(true); }}
                className="text-teal text-xs font-bold mb-2 flex items-center gap-1 hover:underline"
              >
                ← Back to Plans
              </button>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-1">Select Resort</h2>
              <p className="text-charcoal/60 text-sm">Choose your preferred resort for {selectedPlan || 'this plan'}.</p>
            </div>

            {loadingResorts ? (
              <div className="py-8 text-center text-charcoal/60">Loading resorts...</div>
            ) : ratePlanResorts.length === 0 ? (
              <div className="py-8 text-center text-charcoal/60">No resorts found. <button onClick={() => setShowResortSelector(false)} className="text-teal underline">Continue booking</button></div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {ratePlanResorts.map((resort: any) => (
                  <div key={resort.id} className="border border-charcoal/10 rounded-xl p-3 hover:border-teal/50 hover:bg-teal/5 cursor-pointer transition-all flex gap-4 items-center"
                    onClick={() => handleResortSelect(resort)}>
                    {resort.cover_image_url && (
                      <img src={resort.cover_image_url} alt={resort.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                    )}
                    <div className="flex-1">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-charcoal text-[10px] font-bold rounded-full mb-1">
                        {resort.category || 'Resort'}
                      </span>
                      <h3 className="font-bold text-charcoal text-base leading-tight">{resort.name}</h3>
                      <p className="text-xs text-charcoal/60 mt-1">{resort.location}</p>
                    </div>
                    <button className="px-4 py-1.5 bg-charcoal text-white text-xs font-bold rounded-lg group-hover:bg-teal transition-colors shrink-0">
                      Select
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-5 mt-1 pr-10">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-0.5">Book Your Trip</h2>
              <p className="text-charcoal/60 text-xs sm:text-sm">Fill in details and we'll confirm shortly</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1">Package Name</label>
                <input 
                  type="text" 
                  readOnly={!data?.isCustomEnquiry} 
                  value={data?.isCustomEnquiry ? formData.packageName : (selectedPlan ? `${data?.title} - ${selectedPlan}` : (data?.title || ''))} 
                  onChange={e => setFormData({...formData, packageName: e.target.value})}
                  className={`w-full p-2 border rounded-lg text-sm font-medium ${!data?.isCustomEnquiry ? 'bg-gray-100 border-gray-200 text-gray-600' : 'bg-white border-gray-300 text-charcoal'}`} 
                />
              </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Full Name *</label>
            <input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="Enter your full name" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Contact Number *</label>
              <input type="tel" required pattern="[0-9]{10}" title="10 digit phone number" value={formData.contactNumber} onChange={e => {
                const val = e.target.value
                setFormData(prev => ({...prev, contactNumber: val, whatsappNumber: prev.sameAsContact ? val : prev.whatsappNumber}))
              }} className="w-full p-2 border rounded-lg text-sm" placeholder="10-digit mobile" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700 uppercase">WhatsApp</label>
                <label className="flex items-center gap-1.5 text-[10px] text-gray-500 cursor-pointer">
                  <input type="checkbox" checked={formData.sameAsContact} onChange={handleSameAsContact} className="rounded-sm border-gray-300" />
                  Same as contact
                </label>
              </div>
              <input type="tel" value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value, sameAsContact: false})} className="w-full p-2 border rounded-lg text-sm" placeholder="Optional" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Email ID</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded-lg text-sm" placeholder="Optional" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Start Date *</label>
              <input type="date" required value={formData.startDate} min={new Date().toISOString().split('T')[0]} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1">End Date {data?.isCustomEnquiry && '*'}</label>
              <input 
                type="date" 
                readOnly={!data?.isCustomEnquiry}
                required={data?.isCustomEnquiry}
                min={data?.isCustomEnquiry && formData.startDate ? formData.startDate : undefined}
                value={formData.endDate} 
                onChange={e => setFormData({...formData, endDate: e.target.value})}
                className={`w-full p-2 border rounded-lg text-sm ${!data?.isCustomEnquiry ? 'bg-gray-50 border-gray-200 text-gray-500' : 'bg-white border-gray-300'}`} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Guests *</label>
              <div className="flex border rounded-lg overflow-hidden">
                <button type="button" onClick={() => setFormData(p => ({...p, guests: Math.max(1, p.guests - 1)}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-r">-</button>
                <input type="number" required min="1" value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 1})} className="w-full p-2 text-center text-sm outline-none" />
                <button type="button" onClick={() => setFormData(p => ({...p, guests: p.guests + 1}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-l">+</button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Rooms *</label>
              <div className="flex border rounded-lg overflow-hidden">
                <button type="button" onClick={() => setFormData(p => ({...p, rooms: Math.max(1, p.rooms - 1)}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-r">-</button>
                <input type="number" required min="1" value={formData.rooms} onChange={e => setFormData({...formData, rooms: parseInt(e.target.value) || 1})} className="w-full p-2 text-center text-sm outline-none" />
                <button type="button" onClick={() => setFormData(p => ({...p, rooms: p.rooms + 1}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-l">+</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Vehicle *</label>
              <select required value={formData.vehiclePreference} onChange={e => setFormData({...formData, vehiclePreference: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-white">
                {vehicles.length > 0 ? (
                  vehicles.map((v, i) => (
                    <option key={i} value={v.model}>{v.model} ({v.pax} Pax)</option>
                  ))
                ) : (
                  <option value="Sedan/Hatchback 4+1">Sedan/Hatchback 4+1</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Accommodation *</label>
              {selectedPlan || hasRatePlans ? (
                <input 
                  type="text" 
                  readOnly 
                  value={formData.accommodationType} 
                  className="w-full p-2 border rounded-lg text-sm bg-gray-100 border-gray-200 text-gray-600 font-medium cursor-not-allowed" 
                />
              ) : (
                <select 
                  required 
                  value={formData.accommodationType} 
                  disabled={!data?.isCustomEnquiry && isOneDayPackage} 
                  onChange={e => setFormData({...formData, accommodationType: e.target.value})} 
                  className="w-full p-2 border rounded-lg text-sm bg-white disabled:bg-gray-100 disabled:text-gray-500"
                >
                  {!data?.isCustomEnquiry && <option value="Not Required">Not Required</option>}
                  <option value="Standard (2/3 Star)">Standard (2/3 Star)</option>
                  <option value="Premium (4 Star)">Premium (4 Star)</option>
                  <option value="Luxury (5 Star / Resort)">Luxury (5 Star / Resort)</option>
                  {data?.isCustomEnquiry && <option value="Not Required">Not Required</option>}
                </select>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Special Requests</label>
            <textarea value={formData.specialRequests} onChange={e => setFormData({...formData, specialRequests: e.target.value})} className="w-full p-2 border rounded-lg text-sm h-16 resize-none" placeholder="Any specific requirements..."></textarea>
          </div>

              <button type="submit" disabled={loading} className="w-full btn-primary !py-2.5 !rounded-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                {loading ? 'Processing...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
