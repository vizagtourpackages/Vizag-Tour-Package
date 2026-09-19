'use client';

import { Building2 } from 'lucide-react';
import { useBooking } from './booking/BookingContext';

export default function ResortBookingButton({ hotel }: { hotel: any }) {
  const { openBooking } = useBooking();

  const formattedHotel = {
    id: hotel.slug || hotel.id,
    slug: hotel.slug,
    name: hotel.name,
    type: hotel.category || hotel.type || 'Resorts',
    rating: hotel.rating || 0,
    reviews: hotel.reviews || 0,
    location: hotel.location || '',
    price: hotel.price_per_night ? `₹${hotel.price_per_night}` : hotel.price || 'Contact for price',
    image: hotel.cover_image_url || hotel.image_url || '/placeholder.jpg',
    amenities: hotel.amenities || []
  };

  return (
    <button
      onClick={() => openBooking('resort', formattedHotel)}
      className="w-full flex items-center justify-center gap-2 btn-coral text-white py-3.5 rounded-[12px] font-bold text-lg mt-6 shadow-sm"
    >
      <Building2 size={20} />
      Book Now
    </button>
  );
}
