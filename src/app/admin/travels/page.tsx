import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Check, X } from 'lucide-react'
import { deleteTravel, togglePublishTravel } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'
import Image from 'next/image'

export default async function TravelsPage() {
  const supabase = await createClient()
  const { data: travels } = await supabase.from('travels').select('*').order('display_order', { ascending: true })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Travels</h2>
          <p className="mt-1 text-gray-500">Manage your fleet of vehicles for tours and travels.</p>
        </div>
        <Link 
          href="/admin/travels/new" 
          className="bg-charcoal hover:bg-charcoal/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus size={18} />
          Add Vehicle
        </Link>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200 pb-2">
        <Link href="/admin/travels" className="text-teal font-bold border-b-2 border-teal px-2 pb-2 -mb-[10px]">Fleet</Link>
        <Link href="/admin/travels/trust-points" className="text-gray-500 hover:text-gray-900 font-medium px-2 pb-2">Trust Points</Link>
        <Link href="/admin/travels/notes" className="text-gray-500 hover:text-gray-900 font-medium px-2 pb-2">Notes</Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <th className="p-4">Image</th>
              <th className="p-4">Model</th>
              <th className="p-4">Pax</th>
              <th className="p-4">Price / Km</th>
              <th className="p-4">Order</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {travels?.map((travel) => (
              <tr key={travel.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="w-16 h-12 relative rounded-md overflow-hidden bg-gray-100">
                    {travel.image && (
                      <Image 
                        src={travel.image} 
                        alt={travel.model}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-900">{travel.model}</td>
                <td className="p-4 text-gray-600">{travel.pax}</td>
                <td className="p-4 text-gray-600">{travel.price_per_km}</td>
                <td className="p-4 text-gray-600 font-medium">{travel.display_order}</td>
                <td className="p-4 text-center">
                  <form action={togglePublishTravel.bind(null, travel.id, !travel.is_published)}>
                    <button type="submit" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${travel.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {travel.is_published ? <Check size={12} /> : <X size={12} />}
                      {travel.is_published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/travels/${travel.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </Link>
                    <form action={deleteTravel.bind(null, travel.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!travels || travels.length === 0) && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No travels found. Click "Add Vehicle" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
