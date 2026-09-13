'use client'

import { useState } from 'react'
import { saveTourPackage } from '@/app/admin/tour-packages/actions'
import ImageUpload from './ImageUpload'
import Link from 'next/link'

export default function TourPackageForm({ initialData, id }: { initialData?: any, id: string }) {
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData?.slug)

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugManuallyEdited(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.append('id', id)
    formData.append('image_url', imageUrl)
    
    try {
      await saveTourPackage(formData)
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
          <h3 className="text-lg font-bold border-b pb-2">Basic Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" value={title} onChange={handleTitleChange} required className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" name="slug" value={slug} onChange={handleSlugChange} required className="w-full p-2.5 border rounded-lg" placeholder="auto-generated-from-title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category" defaultValue={initialData?.category || 'trending'} className="w-full p-2.5 border rounded-lg">
                <option value="trending">Trending</option>
                <option value="one-day">One Day</option>
                <option value="pilgrimage">Pilgrimage</option>
                <option value="multi-day">Multi Day</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" defaultValue={initialData?.description} rows={3} className="w-full p-2.5 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* Pricing & Logistics */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2">Pricing & Logistics</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input type="number" name="price" defaultValue={initialData?.price} required className="w-full p-2.5 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Label</label>
            <input type="text" name="price_label" defaultValue={initialData?.price_label || 'per person'} className="w-full p-2.5 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (e.g., "3 Days, 2 Nights")</label>
            <input type="text" name="duration" defaultValue={initialData?.duration} required className="w-full p-2.5 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group Size (e.g., "2-6 Persons")</label>
            <input type="text" name="people" defaultValue={initialData?.people} required className="w-full p-2.5 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Optional)</label>
            <input type="text" name="badge" defaultValue={initialData?.badge} placeholder="e.g. Best Seller" className="w-full p-2.5 border rounded-lg" />
          </div>
        </div>

        {/* Arrays & Image */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2">Lists & Media</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (One per line)</label>
            <textarea name="highlights" defaultValue={initialData?.highlights?.join('\n')} rows={3} className="w-full p-2.5 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Includes (One per line)</label>
            <textarea name="includes" defaultValue={initialData?.includes?.join('\n')} rows={3} className="w-full p-2.5 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excludes (One per line)</label>
            <textarea name="excludes" defaultValue={initialData?.excludes?.join('\n')} rows={3} className="w-full p-2.5 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Package Image</label>
            <ImageUpload 
              bucket="site-images" 
              folder="tour-packages" 
              defaultImage={imageUrl} 
              onUpload={setImageUrl} 
            />
          </div>
        </div>
        
        {/* Settings */}
        <div className="md:col-span-2 pt-4 border-t flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_published" value="true" defaultChecked={initialData ? initialData.is_published : true} className="w-5 h-5 rounded border-gray-300 text-teal focus:ring-teal" />
            <span className="font-medium text-gray-700">Publish this package immediately</span>
          </label>
          
          <div className="flex gap-4">
            <Link href="/admin/tour-packages" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Package'}
            </button>
          </div>
        </div>

      </div>
    </form>
  )
}
