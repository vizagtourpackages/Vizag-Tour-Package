'use client'

import { useState } from 'react'
import { saveTopDestination } from '@/app/admin/top-destinations/actions'
import ImageUpload from './ImageUpload'
import Link from 'next/link'

export default function TopDestinationForm({ initialData, id }: { initialData?: any, id: string }) {
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.append('id', id)
    formData.append('image_url', imageUrl)
    
    try {
      await saveTopDestination(formData)
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
          <h3 className="text-lg font-bold border-b pb-2">Destination Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="name" defaultValue={initialData?.name} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location / Category</label>
              <input type="text" name="location" defaultValue={initialData?.location || initialData?.category} className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (e.g. "₹3,000")</label>
              <input type="text" name="price" defaultValue={initialData?.price} className="w-full p-2.5 border rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                <input type="text" name="distance_km" defaultValue={initialData?.distance_km || initialData?.distance} placeholder="100 km" className="w-full p-2.5 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input type="text" name="duration" defaultValue={initialData?.duration} placeholder="10 hours" className="w-full p-2.5 border rounded-lg" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" defaultValue={initialData?.description} required rows={3} className="w-full p-2.5 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold border-b pb-2">Cover Image</h3>
          <div className="max-w-md">
            <ImageUpload 
              bucket="site-images" 
              folder="top-destinations" 
              defaultImage={imageUrl} 
              onUpload={setImageUrl} 
            />
          </div>
        </div>
        
        {/* Settings */}
        <div className="md:col-span-2 pt-4 border-t flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_published" value="true" defaultChecked={initialData ? initialData.is_published : true} className="w-5 h-5 rounded border-gray-300 text-teal focus:ring-teal" />
            <span className="font-medium text-gray-700">Publish immediately</span>
          </label>
          
          <div className="flex gap-4">
            <Link href="/admin/top-destinations" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Destination'}
            </button>
          </div>
        </div>

      </div>
    </form>
  )
}
