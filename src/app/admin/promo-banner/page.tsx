import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import DeleteButton from '@/components/admin/DeleteButton'
import { deletePromoBanner, togglePublishPromoBanner } from './actions'

export const metadata = {
  title: 'Manage Promo Banners - Admin',
}

export default async function PromoBannersPage() {
  const supabase = await createClient()
  const { data: items } = await supabase.from('promo_banner').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Promo Banners</h1>
        <Link 
          href="/admin/promo-banner/new" 
          className="flex items-center gap-2 bg-coral text-white px-4 py-2 rounded-lg hover:bg-coral/90 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Banner
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-sm text-gray-600">Badge</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Headline</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Ends At</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Status</th>
              <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-700">
                    {item.badge_text}
                  </span>
                </td>
                <td className="p-4 font-medium text-gray-900">{item.headline}</td>
                <td className="p-4 text-gray-600 text-sm">
                  {item.offer_end_datetime ? new Date(item.offer_end_datetime).toLocaleString() : 'N/A'}
                </td>
                <td className="p-4">
                  <form action={async () => {
                    'use server'
                    await togglePublishPromoBanner(item.id, !item.is_active)
                  }}>
                    <button type="submit" className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </form>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/promo-banner/${item.id}`} className="p-2 text-gray-400 hover:text-coral transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <form action={async () => {
                      'use server'
                      await deletePromoBanner(item.id)
                    }}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!items || items.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No promo banners found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
