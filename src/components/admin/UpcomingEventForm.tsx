'use client'

import { useState } from 'react'
import { saveEvent } from '@/app/admin/upcoming-events/actions'
import ImageUpload from './ImageUpload'
import Link from 'next/link'

export default function UpcomingEventForm({ initialData, id }: { initialData?: any, id: string }) {
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.append('id', id)
    formData.append('image_url', imageUrl)
    
    try {
      await saveEvent(formData)
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Basic Details */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold border-b pb-2">Event Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" defaultValue={initialData?.title} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (e.g. Concert, Tourism)</label>
              <input type="text" name="category" defaultValue={initialData?.category} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date / Year (e.g. "2026")</label>
              <input type="text" name="date" defaultValue={initialData?.date || initialData?.year} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" defaultValue={initialData?.description} required rows={3} className="w-full p-2.5 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold border-b pb-2">Event Image</h3>
          
          <div className="max-w-md">
            <ImageUpload 
              bucket="site-images" 
              folder="upcoming-events" 
              defaultImage={imageUrl} 
              onUpload={setImageUrl} 
            />
          </div>
        </div>
        
        {/* Settings */}
        <div className="md:col-span-2 pt-4 border-t flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_published" value="true" defaultChecked={initialData ? initialData.is_published : true} className="w-5 h-5 rounded border-gray-300 text-teal focus:ring-teal" />
            <span className="font-medium text-gray-700">Publish this event immediately</span>
          </label>
          
          <div className="flex gap-4">
            <Link href="/admin/upcoming-events" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Event'}
            </button>
          </div>
        </div>

      </div>
    </form>
  )
}
