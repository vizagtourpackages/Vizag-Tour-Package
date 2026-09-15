import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Image as ImageIcon } from 'lucide-react'
import DeleteButton from '@/components/admin/DeleteButton'
import { deleteHillStation, togglePublish } from './actions'
import Image from 'next/image'

export const metadata = {
  title: 'Manage Hill Stations - Admin',
}

export default async function HillStationsPage() {
  const supabase = await createClient()
  const { data: stations } = await supabase.from('hill_station_escapes').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hill Stations</h1>
        <Link 
          href="/admin/hill-stations/new" 
          className="flex items-center gap-2 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral/90 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Hill Station
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-sm text-gray-600">Image</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Name</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Category</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Location</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stations?.map((station) => (
              <tr key={station.id} className="hover:bg-gray-50/50">
                <td className="p-4">
                  {station.image_url ? (
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image src={station.image_url} alt={station.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                </td>
                <td className="p-4 font-medium text-gray-900">{station.name}</td>
                <td className="p-4 text-gray-600">{station.category}</td>
                <td className="p-4 text-gray-600">{station.location}</td>
                <td className="p-4">
                  <form action={async () => {
                    'use server'
                    await togglePublish(station.id, !station.is_published)
                  }}>
                    <button type="submit" className={`px-2.5 py-1 rounded-full text-xs font-medium ${station.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {station.is_published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/hill-stations/${station.id}`} className="p-2 text-gray-400 hover:text-coral transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={station.id} action={deleteHillStation} />
                  </div>
                </td>
              </tr>
            ))}
            {(!stations || stations.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No hill stations found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
