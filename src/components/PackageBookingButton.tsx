'use client';

import { useBooking } from './booking/BookingContext';

export default function PackageBookingButton({ pkg, plan }: { pkg: any; plan?: any }) {
  const { openBooking } = useBooking();

  const formattedPkg = {
    title: pkg.title,
    duration: pkg.duration,
    rate_plans: pkg.rate_plans,
    stay_options: pkg.stay_options,
    stay_legs: pkg.stay_legs,
    pickup_location: pkg.pickup_location,
    drop_location: pkg.drop_location,
    selected_plan: plan ? plan.title : null,
  };

  return (
    <button
      onClick={() => openBooking('package', formattedPkg)}
      className={plan ? 'btn-secondary w-full sm:w-auto' : 'btn-coral w-full !py-4 text-base'}
    >
      {plan ? 'Select' : 'Book now'}
    </button>
  );
}
