import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Check, X } from 'lucide-react'
import { deletePlace, togglePublish } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function PlacesToVisitPage() {
  const supabase = await createClient()
  const { data: places } = await supabase.from('places_to_visit').select('*').order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Places to Visit in Vizag</h2>
          <p className="mt-1 text-gray-500">Manage local city attractions, beaches, and museums.</p>
        </div>
        <Link 
          href="/admin/places-to-visit/new" 
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
              <th className="p-4 w-16">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {places?.map((place) => (
              <tr key={place.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="p-4">
                  {place.image_url ? (
                    <img src={place.image_url} alt="" className="w-12 h-12 rounded object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">N/A</div>
                  )}
                </td>
                <td className="p-4 font-medium text-gray-900">{place.name}</td>
                <td className="p-4 text-gray-600">
                  <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-sm">{place.category}</span>
                </td>
                <td className="p-4 text-center">
                  <form action={togglePublish.bind(null, place.id, !place.is_published)}>
                    <button type="submit" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${place.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {place.is_published ? <Check size={12} /> : <X size={12} />}
                      {place.is_published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/places-to-visit/${place.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </Link>
                    <form action={deletePlace.bind(null, place.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!places || places.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No places found. Click "Add New" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
