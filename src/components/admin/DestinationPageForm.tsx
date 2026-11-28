'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { updateDestinationPage } from '@/app/admin/destination-pages/actions'
import ImageUpload from './ImageUpload'
import RichTextField from './RichTextField'
import EntityPicker from './EntityPicker'

export default function DestinationPageForm({ initialData, packages = [], hotels = [] }: { initialData: any, packages?: any[], hotels?: any[] }) {
  const [packageIds, setPackageIds] = useState<string[]>(Array.isArray(initialData?.package_ids) ? initialData.package_ids : [])
  const [hotelIds, setHotelIds] = useState<string[]>(Array.isArray(initialData?.hotel_ids) ? initialData.hotel_ids : [])
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append('image_url', imageUrl)
      formData.append('package_ids', JSON.stringify(packageIds))
      formData.append('hotel_ids', JSON.stringify(hotelIds))

      const res = await updateDestinationPage(initialData.id, formData)
      if (res.error) alert(`Could not save: ${res.error}`)
      else {
        router.push('/admin/destination-pages')
        router.refresh()
      }
    } catch (error: any) {
      console.error(error)
      alert(`Failed to save changes: ${error?.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Info</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Page Name / Title</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={initialData?.name} 
            required 
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
          <input 
            type="text" 
            name="tagline" 
            defaultValue={initialData?.tagline} 
            placeholder="e.g. The Kashmir of Andhra Pradesh"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            name="description" 
            defaultValue={initialData?.description} 
            rows={4}
            required 
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors"
          />
        </div>
      </div>

      <RichTextField name="content" label="Detailed Overview" defaultValue={initialData?.content} hint="Shown on the destination page right after the info strip. Supports headings, lists, links and multiple images." />

      {/* Info Strip Data */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Info Strip Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Distance (from Vizag)</label>
            <input 
              type="text" 
              name="distance" 
              defaultValue={initialData?.distance} 
              placeholder="e.g. 107 km from Vizag (3 hours)"
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Elevation</label>
            <input 
              type="text" 
              name="elevation" 
              defaultValue={initialData?.elevation} 
              placeholder="e.g. 1,000 meters"
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Time To Visit</label>
            <input 
              type="text" 
              name="best_time_to_visit" 
              defaultValue={initialData?.best_time_to_visit} 
              placeholder="e.g. November to February"
              className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Top Attractions & Highlights</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Highlights List (One per line)</label>
          <p className="text-xs text-gray-500 mb-2">Use a dash "—" to separate the title and description. Example: <br/><b>Kothapalli Waterfalls — stunning waterfall in dense forest</b></p>
          <textarea 
            name="highlights" 
            defaultValue={initialData?.highlights?.join('\n')} 
            rows={6}
            placeholder={`Sub-zero temperatures in winter — experience frost in South India\nKothapalli Waterfalls — stunning waterfall in dense forest`}
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-coral/20 focus:border-coral transition-colors"
          />
        </div>
      </div>

      {/* Attached packages & hotels */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Attached Tour Packages</h3>
        <p className="text-xs text-gray-500">Packages selected here appear in the Packages tab of this page, in the order you pick them. If none are selected, packages with a night here in their stay plan are shown.</p>
        <EntityPicker
          items={packages.map((p: any) => ({ id: p.id, title: p.title, subtitle: p.duration, image: p.cover_image_url || p.image_url }))}
          value={packageIds}
          onChange={setPackageIds}
          emptyText="No tour packages yet."
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Attached Hotels &amp; Resorts</h3>
        <p className="text-xs text-gray-500">If none are selected, all hotels whose area is this destination are shown.</p>
        <EntityPicker
          items={hotels.map((h: any) => ({ id: h.id, title: h.name, subtitle: h.location, image: h.cover_image_url }))}
          value={hotelIds}
          onChange={setHotelIds}
          emptyText="No hotels yet."
        />
      </div>

      {/* Images */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Media</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
          <p className="text-xs text-gray-500 mb-4">This image will be used as the hero banner and the highlights placeholder image. Replaces the default gradient.</p>
          <ImageUpload 
            defaultImage={imageUrl} 
            onUpload={setImageUrl} 
            folder="destination-pages" 
            bucket="vizag-tours"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-coral hover:bg-coral/90 text-white px-8 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 font-medium shadow-sm"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
