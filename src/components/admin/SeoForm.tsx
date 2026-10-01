'use client'

import { useState } from 'react'
import { savePageSeo } from '@/app/admin/seo/actions'
import { Save } from 'lucide-react'

export default function SeoForm({ page }: { page: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)
    
    const formData = new FormData(e.currentTarget)
    formData.append('id', page.id)

    try {
      const result = await savePageSeo(formData)
      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{page.page_name}</h3>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wider">
          /{page.page_slug}
        </span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm font-medium">
          Saved successfully!
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
          <input 
            type="text" 
            name="meta_title" 
            defaultValue={page.meta_title || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none"
            placeholder={`Vizag ${page.page_name}...`}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
          <input 
            type="text" 
            name="meta_keywords" 
            defaultValue={page.meta_keywords || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none"
            placeholder="vizag tour packages, araku trip, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
          <textarea 
            name="meta_description" 
            rows={3}
            defaultValue={page.meta_description || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none resize-none"
            placeholder={`Description for ${page.page_name}...`}
          ></textarea>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-bold text-white bg-coral hover:bg-coral/90 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={16} />
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  )
}
