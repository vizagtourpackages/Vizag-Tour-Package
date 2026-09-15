'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function BookingFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const statuses = [
    { value: 'all', label: 'All Bookings' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm font-semibold text-gray-500 uppercase">Filter:</span>
      <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200 shadow-inner">
        {statuses.map(status => (
          <button
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${
              currentStatus === status.value
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}
