import { createClient } from '@/lib/supabase/server'
import { updateCabBookingStatus } from '@/app/actions/booking'
import StatusBadge from '@/components/admin/StatusBadge'
import StatusActions from '@/components/admin/StatusActions'
import BookingFilter from '@/components/admin/BookingFilter'

export const dynamic = 'force-dynamic'

export default async function CabBookingsPage(props: { searchParams?: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const supabase = await createClient()
  const resolvedParams = await props.searchParams
  const statusFilter = resolvedParams?.status || 'all'

  let query = supabase.from('cab_bookings').select('*').order('created_at', { ascending: false })
  
  if (statusFilter !== 'all') {
    query = query.eq('status', statusFilter)
  }

  const { data: bookings } = await query

  return (
    <div>
      <BookingFilter />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-sm text-gray-600">Date</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Customer</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Vehicle & Pax</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Route & Dates</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {!bookings?.length ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">No cab bookings found</td></tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-500 align-top">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 align-top">
                    <p className="font-bold text-gray-900 text-sm">{booking.full_name}</p>
                    <p className="text-sm text-gray-500 mt-1">{booking.phone_number}</p>
                  </td>
                  <td className="p-4 align-top">
                    <p className="font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded inline-block text-xs mb-2 border border-teal-100">{booking.vehicle_type}</p>
                    <p className="text-xs text-gray-500 mt-1">Adults: {booking.adults}</p>
                    <p className="text-xs text-gray-500 mt-1">Kids: {booking.kids}</p>
                  </td>
                  <td className="p-4 align-top">
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 uppercase font-bold">Pickup</p>
                      <p className="text-sm text-gray-900">{booking.pickup_location}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 uppercase font-bold">Drop</p>
                      <p className="text-sm text-gray-900">{booking.drop_location}</p>
                    </div>
                    <p className="text-xs text-gray-500">{booking.start_date} to {booking.end_date}</p>
                  </td>
                  <td className="p-4 align-top">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="p-4 align-top text-right">
                    <StatusActions id={booking.id} status={booking.status} updateAction={updateCabBookingStatus} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
    </div>
    </div>
    </div>
  )
}
