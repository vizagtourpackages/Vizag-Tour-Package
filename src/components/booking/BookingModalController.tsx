'use client'
import { useBooking } from './BookingContext'
import PackageBookingModal from './PackageBookingModal'
import ResortBookingModal from './ResortBookingModal'
import CabBookingModal from './CabBookingModal'

export default function BookingModalController() {
  const { bookingState, closeBooking } = useBooking()

  if (!bookingState.type) return null;

  return (
    <>
      {bookingState.type === 'package' && <PackageBookingModal data={bookingState.data} onClose={closeBooking} />}
      {bookingState.type === 'resort' && <ResortBookingModal data={bookingState.data} onClose={closeBooking} />}
      {bookingState.type === 'cab' && <CabBookingModal data={bookingState.data} onClose={closeBooking} />}
    </>
  )
}
