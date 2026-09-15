import { createClient } from '@/lib/supabase/server'
import { updatePackageBookingStatus } from '@/app/actions/booking'
import StatusBadge from '@/components/admin/StatusBadge'
import StatusActions from '@/components/admin/StatusActions'
import BookingFilter from '@/components/admin/BookingFilter'

export const dynamic = 'force-dynamic'

export default async function PackageBookingsPage(props: { searchParams?: Promise<{ [key: string]: string | undefined }> | { [key: string]: string | undefined } }) {
  const supabase = await createClient()
  const resolvedParams = await props.searchParams
  const statusFilter = resolvedParams?.status || 'all'

  let query = supabase.from('package_bookings').select('*').order('created_at', { ascending: false })
  
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
              <th className="p-4 font-semibold text-sm text-gray-600">Package Details</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Travel Dates</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {!bookings?.length ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">No package bookings found</td></tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-500 align-top">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 align-top">
                    <p className="font-bold text-gray-900 text-sm">{booking.full_name}</p>
                    <p className="text-sm text-gray-500 mt-1">{booking.contact_number}</p>
                    {booking.whatsapp_number && <p className="text-xs text-green-600 mt-1">WA: {booking.whatsapp_number}</p>}
                    {booking.email && <p className="text-xs text-gray-500 mt-1">{booking.email}</p>}
                  </td>
                  <td className="p-4 align-top">
                    <p className="font-bold text-gray-900 text-sm">{booking.package_name}</p>
                    <p className="text-xs text-gray-500 mt-2">Guests: {booking.guests} | Rooms: {booking.rooms}</p>
                    <p className="text-xs text-gray-500 mt-1">Vehicle: {booking.vehicle_preference}</p>
                    <p className="text-xs text-gray-500 mt-1">Acc: {booking.accommodation_type}</p>
                    {booking.special_requests && (
                      <p className="text-xs text-gray-400 mt-2 italic max-w-xs truncate">"{booking.special_requests}"</p>
                    )}
                  </td>
                  <td className="p-4 align-top">
                    <p className="text-sm font-medium text-gray-900">{booking.start_date}</p>
                    <p className="text-xs text-gray-500">to {booking.end_date}</p>
                  </td>
                  <td className="p-4 align-top">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="p-4 align-top text-right">
                    <StatusActions id={booking.id} status={booking.status} updateAction={updatePackageBookingStatus} />
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
