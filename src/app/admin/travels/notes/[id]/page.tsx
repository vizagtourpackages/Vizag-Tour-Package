import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { saveNote } from '../actions'

export default async function FormPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const isNew = id === 'new'
  const supabase = await createClient()
  
  let initialData = null
  if (!isNew) {
    const { data } = await supabase.from('travel_notes').select('*').eq('id', id).single()
    initialData = data
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/travels/notes" className="text-gray-500 hover:text-gray-900"><ArrowLeft size={24} /></Link>
        <h2 className="text-2xl font-bold text-gray-900">{isNew ? 'Add' : 'Edit'} Note</h2>
      </div>

      <form action={saveNote} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <input type="hidden" name="id" value={id} />
        
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">title</label>
          <input type="text" name="title" defaultValue={initialData?.title} className="w-full p-3 border rounded-lg" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">description</label>
          <textarea name="description" defaultValue={initialData?.description} rows={4} className="w-full p-3 border rounded-lg" required />
        </div>
        

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
          <input type="number" name="display_order" defaultValue={initialData?.display_order || 0} className="w-full p-3 border rounded-lg" required />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" id="is_active" defaultChecked={isNew ? true : initialData?.is_active} className="w-4 h-4 text-teal" />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active</label>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button type="submit" className="bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-bold">Save</button>
        </div>
      </form>
    </div>
  )
}
