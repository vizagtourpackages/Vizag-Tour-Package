'use client'
import { MessageCircle } from 'lucide-react'
import { useBooking } from './BookingContext'

export default function CustomEnquiryButton() {
  const { openBooking } = useBooking()

  return (
    <button 
      onClick={() => openBooking('package', { title: 'Custom Package', isCustomEnquiry: true })}
      className="w-full py-4 rounded-full border-2 border-amber-500 text-amber-600 font-bold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
    >
      <MessageCircle size={18} />
      Enquire Custom Package
    </button>
  )
}
