'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveTravel } from '@/app/admin/travels/actions'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ImageUpload from './ImageUpload'

export default function TravelForm({ initialData, id }: { initialData: any, id: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState(initialData?.image || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append('id', id)
    formData.append('image', imageUrl)
    
    // Convert comma separated amenities to JSON string array
    const amenitiesString = formData.get('amenities_text') as string
    const amenities = amenitiesString.split(',').map(a => a.trim()).filter(a => a.length > 0)
    formData.append('amenities', JSON.stringify(amenities))

    try {
      const result = await saveTravel(formData)
      if (result.error) {
        setError(result.error)
      } else {
        router.push('/admin/travels')
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const initialAmenities = initialData?.amenities ? initialData.amenities.join(', ') : ''

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl border border-gray-200">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Model Name *</label>
          <input 
            type="text" 
            name="model" 
            defaultValue={initialData?.model || ''}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none"
            placeholder="e.g. Swift Dzire"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Km *</label>
          <input 
            type="text" 
            name="price_per_km" 
            defaultValue={initialData?.price_per_km || ''}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none"
            placeholder="e.g. ₹14"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pax (Passengers) *</label>
          <input 
            type="number" 
            name="pax" 
            defaultValue={initialData?.pax || 4}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
          <input 
            type="number" 
            name="display_order" 
            defaultValue={initialData?.display_order || 0}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image (R2 Upload) *</label>
          <ImageUpload bucket="site-images" folder="travels" defaultImage={imageUrl} onUpload={setImageUrl} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amenities (Comma separated)</label>
          <input 
            type="text" 
            name="amenities_text" 
            defaultValue={initialAmenities}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none"
            placeholder="AC, Music System, Bottle Water"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum KM Note</label>
          <input 
            type="text" 
            name="min_km_note" 
            defaultValue={initialData?.min_km_note || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral outline-none"
            placeholder="Applies for min 300 km during outstation round trip"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <input 
            type="checkbox" 
            id="is_published"
            name="is_published" 
            value="true"
            defaultChecked={initialData ? initialData.is_published : true}
            className="w-5 h-5 text-coral rounded focus:ring-coral"
          />
          <label htmlFor="is_published" className="font-medium text-gray-900 cursor-pointer">
            Publish this vehicle
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
        <Link 
          href="/admin/travels"
          className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-2.5 text-sm font-bold text-white bg-coral hover:bg-coral/90 rounded-lg transition-colors shadow-lg shadow-coral/30 flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {isSubmitting ? 'Saving...' : 'Save Vehicle'}
        </button>
      </div>
    </form>
  )
}
