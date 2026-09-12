'use client'

import { useState } from 'react'
import { saveFaq } from '@/app/admin/faqs/actions'
import Link from 'next/link'

export default function FaqForm({ initialData, id }: { initialData?: any, id: string }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.append('id', id)
    
    try {
      await saveFaq(formData)
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 gap-6">
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2">FAQ Details</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <input type="text" name="question" defaultValue={initialData?.question} required className="w-full p-2.5 border rounded-lg" placeholder="e.g. Do you offer pickup from the airport?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <textarea 
                name="answer" 
                defaultValue={initialData?.answer} 
                rows={4} 
                required
                className="w-full p-2.5 border rounded-lg" 
                placeholder="Write the detailed answer here..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (Optional)</label>
              <input type="text" name="category" defaultValue={initialData?.category || 'General'} className="w-full p-2.5 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="pt-4 border-t flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_published" value="true" defaultChecked={initialData ? initialData.is_published : true} className="w-5 h-5 rounded border-gray-300 text-teal focus:ring-teal" />
            <span className="font-medium text-gray-700">Publish this FAQ immediately</span>
          </label>
          
          <div className="flex gap-4">
            <Link href="/admin/faqs" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save FAQ'}
            </button>
          </div>
        </div>

      </div>
    </form>
  )
}
