import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Check, X } from 'lucide-react'
import { deleteHotelResort, togglePublish } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function HotelsResortsPage() {
  const supabase = await createClient()
  const { data: resorts } = await supabase.from('hotels_resorts').select('*').order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Hotels & Resorts</h2>
          <p className="mt-1 text-gray-500">Manage all your hotels and resorts.</p>
        </div>
        <Link 
          href="/admin/hotels-resorts/new" 
          className="bg-charcoal hover:bg-charcoal/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus size={18} />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <th className="p-4">Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resorts?.map((resort) => (
              <tr key={resort.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-900">{resort.name}</td>
                <td className="p-4 text-gray-600">{resort.category || resort.type}</td>
                <td className="p-4 text-gray-600">{resort.location}</td>
                <td className="p-4 text-gray-600">{resort.price_per_night ? `₹${resort.price_per_night}` : resort.price}</td>
                <td className="p-4 text-center">
                  <form action={togglePublish.bind(null, resort.id, !resort.is_published)}>
                    <button type="submit" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${resort.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {resort.is_published ? <Check size={12} /> : <X size={12} />}
                      {resort.is_published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/hotels-resorts/${resort.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </Link>
                    <form action={deleteHotelResort.bind(null, resort.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!resorts || resorts.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No hotels or resorts found. Click "Add New" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
