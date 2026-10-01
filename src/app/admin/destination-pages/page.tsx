import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Edit } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'Manage Destination Pages - Admin',
}

export default async function DestinationPagesList() {
  const supabase = await createClient()
  const { data: pages } = await supabase.from('destination_pages').select('*').order('name')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Destination Pages</h1>
          <p className="mt-1 text-gray-500">Manage the content for the 3 main destination pages (Araku, Lambasingi, Vanjangi).</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
            {pages?.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50/50">
                <td className="p-4">
                  {page.image_url ? (
                    <div className="relative w-16 h-12 rounded overflow-hidden">
                      <Image src={page.image_url} alt={page.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </td>
                <td className="p-4 font-medium text-gray-900">{page.name}</td>
                <td className="p-4 text-gray-600">{page.tagline}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/destination-pages/${page.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm flex items-center gap-2">
                      <Edit className="w-4 h-4" /> Edit Page
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {(!pages || pages.length === 0) && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No destination pages found. Please run the SQL setup script first.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
