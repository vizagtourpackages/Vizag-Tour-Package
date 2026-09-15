'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type BookingType = 'package' | 'resort' | 'cab' | null;

interface BookingState {
  type: BookingType;
  data: any;
}

interface BookingContextProps {
  bookingState: BookingState;
  openBooking: (type: BookingType, data: any) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>({ type: null, data: null });

  const openBooking = (type: BookingType, data: any) => setBookingState({ type, data });
  const closeBooking = () => setBookingState({ type: null, data: null });

  return (
    <BookingContext.Provider value={{ bookingState, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}
