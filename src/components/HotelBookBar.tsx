'use client';

import ResortBookingButton from './ResortBookingButton';

/** Sticky "Book now" bar on phones/tablets, sitting just above the bottom navigation. */
export default function HotelBookBar({ hotel, price, unit }: { hotel: any; price: string; unit: string }) {
  return (
    <div className="fixed inset-x-0 bottom-[calc(62px+env(safe-area-inset-bottom))] z-[140] border-t border-ocean/10 bg-white px-4 py-2.5 shadow-[0_-8px_20px_-14px_rgba(10,42,77,.35)] xl:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-bold uppercase tracking-wider text-charcoal/45">Starting from</p>
          <p className="font-heading text-[1.35rem] leading-none text-ocean">
            {price} <span className="font-sans text-[0.68rem] font-medium text-charcoal/50">/ {unit}</span>
          </p>
        </div>
        <ResortBookingButton hotel={hotel} className="btn-coral shrink-0 !px-8 !py-3">
          Book now
        </ResortBookingButton>
      </div>
    </div>
  );
}
