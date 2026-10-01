'use client'
import { MessageCircle } from 'lucide-react'
import { useBooking } from './BookingContext'

export default function CustomEnquiryButton() {
  const { openBooking } = useBooking()

  return (
    <button 
      onClick={() => openBooking('package', { title: 'Custom Package', isCustomEnquiry: true })}
      className="w-full py-2.5 lg:py-4 rounded-full border-2 border-amber-500 text-amber-600 font-bold text-xs lg:text-base hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
    >
      <MessageCircle size={16} className="lg:w-[18px] lg:h-[18px]" />
      Enquire Custom Package
    </button>
  )
}
