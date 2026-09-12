import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Check, X } from 'lucide-react'
import { deleteFaq, togglePublish } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function FaqsPage() {
  const supabase = await createClient()
  const { data: faqs } = await supabase.from('faqs').select('*').order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-1 text-gray-500">Manage FAQs that appear on the homepage and contact pages.</p>
        </div>
        <Link 
          href="/admin/faqs/new" 
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
              <th className="p-4">Question</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs?.map((faq) => (
              <tr key={faq.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-900 max-w-md truncate" title={faq.question}>{faq.question}</td>
                <td className="p-4 text-gray-600">
                  <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-sm">{faq.category || 'General'}</span>
                </td>
                <td className="p-4 text-center">
                  <form action={togglePublish.bind(null, faq.id, !faq.is_published)}>
                    <button type="submit" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${faq.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {faq.is_published ? <Check size={12} /> : <X size={12} />}
                      {faq.is_published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/faqs/${faq.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </Link>
                    <form action={deleteFaq.bind(null, faq.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!faqs || faqs.length === 0) && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No FAQs found. Click "Add New" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
