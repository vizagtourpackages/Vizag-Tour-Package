'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'
import { savePromoBanner } from '@/app/admin/promo-banner/actions'
import { Loader2, Trash2, GripVertical, Plus } from 'lucide-react'

export default function PromoBannerForm({ id, initialData, initialImages = [] }: { id: string, initialData: any, initialImages: {image_url: string}[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>(initialImages.map(img => img.image_url))

  const addImage = (url: string) => {
    if (url) {
      setImages([...images, url])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newImages = [...images]
      const temp = newImages[index - 1]
      newImages[index - 1] = newImages[index]
      newImages[index] = temp
      setImages(newImages)
    } else if (direction === 'down' && index < images.length - 1) {
      const newImages = [...images]
      const temp = newImages[index + 1]
      newImages[index + 1] = newImages[index]
      newImages[index] = temp
      setImages(newImages)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (images.length === 0) {
      alert("Please upload at least one background image.")
      return
    }

    try {
      setLoading(true)
      const formData = new FormData(e.currentTarget)
      await savePromoBanner(formData, images, id !== 'new' ? id : undefined)
    } catch (error: any) {
      alert(error.message)
      setLoading(false)
    }
  }

  // format date for datetime-local input
  const formattedDate = initialData?.offer_end_datetime 
    ? new Date(initialData.offer_end_datetime).toISOString().slice(0, 16) 
    : ''

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Badge Text</label>
            <input
              name="badge_text"
              defaultValue={initialData?.badge_text || ''}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-all"
              placeholder="e.g. 🔥 FLAT 20% OFF"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Headline</label>
            <input
              name="headline"
              defaultValue={initialData?.headline || ''}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-all"
              placeholder="e.g. Araku 1 Day Trip – Just ₹4,999/-"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              defaultValue={initialData?.description || ''}
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-all"
              placeholder="e.g. Borra Caves, Katiki Waterfalls, Pets & Wings..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">CTA Text</label>
            <input
              name="cta_text"
              defaultValue={initialData?.cta_text || 'Book Now'}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">CTA Link</label>
            <input
              name="cta_link"
              defaultValue={initialData?.cta_link || ''}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-all"
              placeholder="/tour-packages/araku-valley"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Offer End Date/Time (Optional)</label>
            <input
              type="datetime-local"
              name="offer_end_datetime"
              defaultValue={formattedDate}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:bg-white transition-all"
            />
            <p className="text-xs text-gray-500">Leave blank to hide the countdown timer.</p>
          </div>
          
          <div className="space-y-2 flex items-center md:col-span-2 mt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked={initialData?.is_active ?? true}
                className="w-5 h-5 text-teal border-gray-300 rounded focus:ring-teal"
              />
              <span className="text-sm font-semibold text-gray-700">Set as Active Banner</span>
            </label>
            <span className="ml-2 text-xs text-gray-500">(Only the most recently updated active banner is shown on the homepage)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold mb-1">Background Images</h2>
          <p className="text-sm text-gray-500 mb-4">Upload one or more images. If multiple, they will auto-rotate every 2 seconds.</p>
          
          <div className="space-y-4">
            {images.map((url, index) => (
              <div key={index} className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg border border-gray-200">
                <div className="flex flex-col gap-1">
                  <button type="button" onClick={() => moveImage(index, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"><GripVertical size={16} /></button>
                </div>
                <div className="w-32 h-20 relative rounded overflow-hidden">
                  <img src={url} alt={`Banner ${index}`} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-sm text-gray-500 truncate">{url}</div>
                <button type="button" onClick={() => removeImage(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-sm font-medium mb-2">Add New Image</h3>
              <div className="w-64">
                <ImageUpload 
                  bucket="vizag-tour-images"
                  folder="promo-banners"
                  onUpload={addImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-dark transition-colors flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {id === 'new' ? 'Create Banner' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
