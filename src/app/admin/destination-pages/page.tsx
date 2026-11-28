import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Edit, ExternalLink } from 'lucide-react'
import { DESTINATION_SLUGS, defaultDestination } from '@/lib/destinations'

export const metadata = {
  title: 'Manage Destination Pages - Admin',
}

export default async function DestinationPagesList() {
  const supabase = await createClient()
  const { data: rows } = await supabase.from('destination_pages').select('*')

  // every destination is always listed; unsaved ones show the built-in content
  const pages = DESTINATION_SLUGS.map(slug => {
    const row = rows?.find(r => r.id === slug)
    return { ...(row || defaultDestination(slug)), saved: !!row }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Destination Pages</h1>
        <p className="mt-1 text-gray-500">Edit the public pages for Araku Valley, Lambasingi, Vanjangi and Maredumilli.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-sm text-gray-600">Image</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Name</th>
              <th className="p-4 font-semibold text-sm text-gray-600">Tagline</th>
              <th className="p-4 font-semibold text-sm text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-gray-50/50">
                <td className="p-4">
                  {page.image_url ? (
                    <img src={page.image_url} alt="" className="w-16 h-12 rounded object-cover" />
                  ) : (
                    <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">No Image</div>
                  )}
                </td>
                <td className="p-4 font-medium text-gray-900">
                  {page.name}
                  {!page.saved && <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">Default content, not saved yet</span>}
                </td>
                <td className="p-4 text-gray-600">{page.tagline}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <a href={`/${page.id}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> View
                    </a>
                    <Link href={`/admin/destination-pages/${page.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm flex items-center gap-2">
                      <Edit className="w-4 h-4" /> Edit Page
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
