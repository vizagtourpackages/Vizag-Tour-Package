import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Image as ImageIcon } from 'lucide-react'
import DeleteButton from '@/components/admin/DeleteButton'
import { deleteUpdateOffer, togglePublish } from './actions'
import Image from 'next/image'

export const metadata = {
  title: 'Manage Updates & Offers - Admin',
}

export default async function UpdatesOffersPage() {
  const supabase = await createClient()
  const { data: items } = await supabase.from('latest_updates_offers').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Updates & Offers</h1>
        <Link 
          href="/admin/updates-offers/new" 
          className="flex items-center gap-2 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral/90 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-sm text-gray-600">Image</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Type</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Title</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Badge/Date</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="p-4">
                  {item.image_url ? (
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${item.type === 'Offer' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.type}
                  </span>
                </td>
                <td className="p-4 font-medium text-gray-900">{item.title}</td>
                <td className="p-4 text-gray-600 text-sm">
                  {item.badge_text && <div><span className="font-medium text-coral">{item.badge_text}</span></div>}
                  {item.date && <div>{item.date}</div>}
                </td>
                <td className="p-4">
                  <form action={async () => {
                    'use server'
                    await togglePublish(item.id, !item.is_published)
                  }}>
                    <button type="submit" className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/updates-offers/${item.id}`} className="p-2 text-gray-400 hover:text-coral transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={item.id} action={deleteUpdateOffer} />
                  </div>
                </td>
              </tr>
            ))}
            {(!items || items.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No updates or offers found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
