'use client';

import { useBooking } from './booking/BookingContext';

/** Opens the resort booking popup. Pass `room` to start with that room already chosen. */
export default function ResortBookingButton({
  hotel,
  room,
  className = 'btn-coral w-full !py-4 text-base',
  children = 'Book now',
}: {
  hotel: any;
  room?: any;
  className?: string;
  children?: React.ReactNode;
}) {
  const { openBooking } = useBooking();

  const data = {
    id: hotel.id, // database id (used to load room types)
    slug: hotel.slug,
    name: hotel.name,
    price_label: hotel.price_label,
    room, // chosen room: the popup opens on the booking form
  };

  return (
    <button type="button" onClick={() => openBooking('resort', data)} className={className}>
      {children}
    </button>
  );
}
