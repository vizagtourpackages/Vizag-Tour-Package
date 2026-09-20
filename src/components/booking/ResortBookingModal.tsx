'use client'
import { useState, useEffect } from 'react'
import { siteInfo } from '@/data/siteInfo'
import { submitResortBooking } from '@/app/actions/booking'
import { createClient } from '@/lib/supabase/client'

export default function ResortBookingModal({ data, onClose }: { data: any, onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [roomTypes, setRoomTypes] = useState<any[]>([])
  const [loadingRooms, setLoadingRooms] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    whatsappNumber: '',
    sameAsContact: false,
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    specialRequests: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchRooms() {
      if (!data?.id) {
        setLoadingRooms(false)
        return
      }
      const supabase = createClient()
      const { data: rooms } = await supabase
        .from('resort_room_types')
        .select('*')
        .eq('resort_id', data.id)
        .eq('is_available', true)
        
      setRoomTypes(rooms || [])
      setLoadingRooms(false)
      
      // Auto-skip if no rooms in DB to prevent blocking
      if (!rooms || rooms.length === 0) {
        setSelectedRoom({ room_type: 'Standard Room' })
        setStep(2)
      }
    }
    fetchRooms()
  }, [data?.id])

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room)
    setStep(2)
  }

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
      resort_name: data?.name || 'Unknown Resort',
      full_name: formData.fullName,
      contact_number: formData.contactNumber,
      whatsapp_number: formData.whatsappNumber,
      email: formData.email,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      guests: formData.guests,
      room_type: selectedRoom?.room_type || 'Unknown Room',
      special_requests: formData.specialRequests
    }

    const res = await submitResortBooking(bookingData)
    
    if (!res.success) {
      setError(res.error || 'Failed to save booking')
      setLoading(false)
      return
    }

    // Format WhatsApp message
    const waText = `New Resort Booking Request
Resort: ${bookingData.resort_name}
Room Type: ${bookingData.room_type}
Name: ${bookingData.full_name}
Contact: ${bookingData.contact_number}${bookingData.whatsapp_number ? ` (WA: ${bookingData.whatsapp_number})` : ''}
Dates: ${bookingData.check_in} to ${bookingData.check_out}
Guests: ${bookingData.guests}
Special Requests: ${bookingData.special_requests || 'None'}`

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
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-0.5">Choose Room</h2>
              <p className="text-charcoal/60 text-sm">Select a room at {data?.name}</p>
            </div>
            
            {loadingRooms ? (
              <div className="py-12 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-teal border-t-transparent rounded-full"></div></div>
            ) : (
              <div className="space-y-4">
                {roomTypes.map(room => (
                  <div 
                    key={room.id}
                    className="border border-charcoal/10 rounded-[20px] p-5 sm:p-6 hover:border-teal/50 hover:shadow-md transition-all bg-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        {room.has_ac ? (
                          <span className="inline-block px-3 py-1 bg-teal/10 text-teal text-[10px] font-bold rounded-full mb-3 border border-teal/20 uppercase tracking-wider">
                            AC Room
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-charcoal/5 text-charcoal/60 text-[10px] font-bold rounded-full mb-3 border border-charcoal/10 uppercase tracking-wider">
                            Non-AC Room
                          </span>
                        )}
                        <h4 className="font-heading text-lg font-bold text-charcoal mb-1">
                          {room.room_type}
                        </h4>
                      </div>
                      
                      <div className="sm:text-right shrink-0 flex flex-col justify-center mt-2 sm:mt-0">
                        <div className="mb-3 text-left sm:text-right flex items-end sm:flex-col gap-3 sm:gap-0">
                          <div className="text-2xl font-black font-heading text-charcoal tracking-tight">
                            ₹{(room.price || 0).toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-charcoal/50 font-bold uppercase sm:mt-1 pb-1 sm:pb-0">per night</div>
                        </div>
                        <button 
                          onClick={() => handleRoomSelect(room)}
                          className="btn-primary !py-2.5 !px-6 !text-sm rounded-full w-full sm:w-auto hover:scale-[1.02] transition-transform shadow-sm bg-charcoal hover:bg-teal text-white"
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-1">
            <div className="mb-5 pr-10">
              <div className="flex items-center gap-2 mb-2">
                <button type="button" onClick={() => setStep(1)} className="text-xs text-charcoal/60 hover:text-coral flex items-center gap-1">
                  ← Back to rooms
                </button>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal mb-0.5">Book Resort Stay</h2>
              <p className="text-charcoal/60 text-xs sm:text-sm">Fill in details and we'll confirm shortly</p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1">Resort Name</label>
                  <input type="text" readOnly value={data?.name || ''} className="w-full p-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium" />
                </div>
                
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase mb-1">Room Type</label>
                  <input type="text" readOnly value={selectedRoom?.room_type || ''} className="w-full p-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium" />
                </div>
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
                    <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase">WhatsApp</label>
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
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Check-in Date *</label>
                  <input type="date" required value={formData.checkIn} min={new Date().toISOString().split('T')[0]} onChange={e => setFormData({...formData, checkIn: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Check-out Date *</label>
                  <input type="date" required value={formData.checkOut} min={formData.checkIn || new Date().toISOString().split('T')[0]} onChange={e => setFormData({...formData, checkOut: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase mb-1">Guests *</label>
                <div className="flex border rounded-lg overflow-hidden w-full sm:w-1/2">
                  <button type="button" onClick={() => setFormData(p => ({...p, guests: Math.max(1, p.guests - 1)}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-r">-</button>
                  <input type="number" required min="1" value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value) || 1})} className="w-full p-2 text-center text-sm outline-none" />
                  <button type="button" onClick={() => setFormData(p => ({...p, guests: p.guests + 1}))} className="px-3 bg-gray-50 hover:bg-gray-100 border-l">+</button>
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
