'use client'

import { useState } from 'react'
import { saveUpdateOffer } from '@/app/admin/updates-offers/actions'
import ImageUpload from './ImageUpload'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function UpdatesOffersForm({ initialData, id }: { initialData?: any, id: string }) {
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.append('id', id)
    formData.append('image_url', imageUrl)
    
    try {
      const result = await saveUpdateOffer(formData)
      if (result?.error) {
        alert(result.error)
        setLoading(false)
      } else {
        router.push('/admin/updates-offers')
      }
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
          <h3 className="text-lg font-bold border-b pb-2">Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type (News / Offer)</label>
              <select name="type" defaultValue={initialData?.type || 'Offer'} required className="w-full p-2.5 border rounded-lg bg-white">
                <option value="News">News</option>
                <option value="Offer">Offer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" defaultValue={initialData?.title} required className="w-full p-2.5 border rounded-lg" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text (Optional)</label>
              <input type="text" name="badge_text" defaultValue={initialData?.badge_text} placeholder="e.g. 20% OFF" className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date (Optional)</label>
              <input type="text" name="date" defaultValue={initialData?.date} placeholder="e.g. Valid till Oct 2026" className="w-full p-2.5 border rounded-lg" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" defaultValue={initialData?.description} rows={3} className="w-full p-2.5 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Text (Optional)</label>
              <input type="text" name="link_text" defaultValue={initialData?.link_text} placeholder="e.g. Claim Offer" className="w-full p-2.5 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Destination (Href)</label>
              <input type="text" name="href" defaultValue={initialData?.href} placeholder="e.g. /packages/some-package" className="w-full p-2.5 border rounded-lg" />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold border-b pb-2">Cover Image</h3>
          <div className="max-w-md">
            <ImageUpload 
              bucket="site-images" 
              folder="updates-offers" 
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
            <Link href="/admin/updates-offers" className="px-6 py-2.5 border rounded-lg font-medium hover:bg-gray-50">
              Cancel
            </Link>
            <button type="submit" disabled={loading} className="px-6 py-2.5 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal/90 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </div>

      </div>
    </form>
  )
}
