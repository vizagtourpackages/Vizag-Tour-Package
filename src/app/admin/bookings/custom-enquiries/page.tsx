import { createClient } from '@/lib/supabase/server'
import { updateCustomEnquiryStatus } from '@/app/actions/booking'
import StatusActions from '@/components/admin/StatusActions'
import StatusBadge from '@/components/admin/StatusBadge'

export const metadata = {
  title: 'Custom Enquiries - Admin',
}

export default async function CustomEnquiriesPage() {
  const supabase = await createClient()
  const { data: enquiries } = await supabase
    .from('custom_enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-sm text-gray-600">Customer</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Travel Dates</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Guests</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Destinations</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enquiries?.map((enq) => (
              <tr key={enq.id} className="hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{enq.name}</div>
                  <div className="text-sm text-gray-500">{enq.phone}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(enq.created_at).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm">
                  <span className="font-medium">{enq.start_date}</span> to <br/><span className="font-medium">{enq.end_date}</span>
                </td>
                <td className="p-4 text-gray-600 text-sm">
                  {enq.adults} Adults<br/>
                  {enq.children} Children
                </td>
                <td className="p-4 text-gray-600 text-sm">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {enq.destinations?.map((d: string) => (
                      <span key={d} className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px]">{d}</span>
                    ))}
                  </div>
                  {enq.special_requirements && (
                    <div className="mt-2 text-xs text-gray-500 italic max-w-[200px] truncate" title={enq.special_requirements}>
                      &quot;{enq.special_requirements}&quot;
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <StatusBadge status={enq.status} />
                </td>
                <td className="p-4">
                  <StatusActions
                    id={enq.id}
                    status={enq.status}
                    updateAction={updateCustomEnquiryStatus}
                  />
                </td>
              </tr>
            ))}
            {(!enquiries || enquiries.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No custom enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
