'use client'
import { MessageCircle } from 'lucide-react'
import { useBooking } from './BookingContext'

export default function CustomEnquiryButton() {
  const { openBooking } = useBooking()

  return (
    <button 
      onClick={() => openBooking('package', { title: 'Custom Package', isCustomEnquiry: true })}
      className="flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full border-2 border-coral/40 px-5 py-3 text-[0.95rem] font-semibold text-coral transition-[background-color,transform] duration-150 hover:bg-coral/5 active:scale-[0.98]"
    >
      <MessageCircle size={18} />
      Enquire Custom Package
    </button>
  )
}
