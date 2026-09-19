'use client';

import { useBooking } from './booking/BookingContext';

export default function PackageBookingButton({ pkg, plan }: { pkg: any, plan?: any }) {
  const { openBooking } = useBooking();

  const formattedPkg = {
    title: pkg.title,
    duration: pkg.duration,
    rate_plans: pkg.rate_plans,
    selected_plan: plan ? plan.title : null
  };

  return (
    <button
      onClick={() => openBooking('package', formattedPkg)}
      className={plan 
        ? "inline-block w-full sm:w-auto px-8 py-3 text-sm font-bold text-center text-teal border-2 border-teal rounded-lg hover:bg-teal hover:text-white transition-colors"
        : "w-full flex items-center justify-center gap-2 text-white bg-teal py-4 rounded-full font-bold text-lg shadow-md hover:bg-teal-dark hover:shadow-lg transition-all"
      }
    >
      {plan ? 'SELECT' : 'Book Now'}
    </button>
  );
}
