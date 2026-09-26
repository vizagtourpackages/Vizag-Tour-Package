import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Check, X } from 'lucide-react'
import { deleteNote, toggleNote } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function Page() {
  const supabase = await createClient()
  const { data: items } = await supabase.from('travel_notes').select('*').order('display_order', { ascending: true })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Travel Notes</h2>
        </div>
        <Link href="/admin/travels/notes/new" className="bg-charcoal hover:bg-charcoal/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Plus size={18} /> Add New
        </Link>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200 pb-2">
        <Link href="/admin/travels" className="text-gray-500 hover:text-gray-900 font-medium px-2 pb-2">Fleet</Link>
        <Link href="/admin/travels/trust-points" className="text-gray-500 hover:text-gray-900 font-medium px-2 pb-2">Trust Points</Link>
        <Link href="/admin/travels/notes" className="text-teal font-bold border-b-2 border-teal px-2 pb-2 -mb-[10px]">Notes</Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <th className="p-4">title</th>
              <th className="p-4">description</th>
              <th className="p-4">Order</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="p-4">{item.title}</td>
                <td className="p-4">{item.description}</td>
                <td className="p-4">{item.display_order}</td>
                <td className="p-4 text-center">
                  <form action={toggleNote.bind(null, item.id, !item.is_active)}>
                    <button type="submit" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {item.is_active ? <Check size={12} /> : <X size={12} />} {item.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </form>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/travels/notes/${item.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></Link>
                    <form action={deleteNote.bind(null, item.id)}><DeleteButton /></form>
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
