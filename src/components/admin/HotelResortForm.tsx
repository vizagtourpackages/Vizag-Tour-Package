'use client'

import { useState } from 'react'
import { saveHotelResort } from '@/app/admin/hotels-resorts/actions'
import { fetchNearbyPlaces } from '@/app/admin/hotels-resorts/mapbox-actions'
import ImageUpload from './ImageUpload'
import AccommodationTypesEditor from './AccommodationTypesEditor'
import RichTextField from './RichTextField'
import Link from 'next/link'
import { AREAS, normalizeArea } from '@/lib/areas'
import { useRouter } from 'next/navigation'
import { Plus, X, MapPin, Loader2 } from 'lucide-react'

export default function HotelResortForm({ initialData, id, initialRoomTypes = [] }: { initialData?: any, id: string, initialRoomTypes?: any[] }) {
  const [imageUrl, setImageUrl] = useState(initialData?.cover_image_url || '')
  const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.gallery_images || [])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(initialData?.name || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData?.slug)
  const [description, setDescription] = useState(initialData?.description || '')

  // Highlights Tags
  const [highlights, setHighlights] = useState<string[]>(initialData?.highlights || [])
  const [highlightInput, setHighlightInput] = useState('')

  // Amenities Tags
  const [amenities, setAmenities] = useState<string[]>(initialData?.amenities || [])
  const [amenityInput, setAmenityInput] = useState('')

  // SEO
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '')
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '')

  // Mapbox & Location
  const [latitude, setLatitude] = useState(initialData?.latitude || '')
  const [longitude, setLongitude] = useState(initialData?.longitude || '')
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>(initialData?.nearby_places || [])
  const [fetchingPlaces, setFetchingPlaces] = useState(false)

  // Room Types
  const [roomTypes, setRoomTypes] = useState<any[]>(initialRoomTypes)

  // Defaults
  const effectiveMetaTitle = metaTitle || name
  const effectiveMetaDescription = metaDescription || description

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugManuallyEdited(true);
  };

  // Tags logic
  const addHighlight = () => {
    if (highlightInput.trim() && !highlights.includes(highlightInput.trim())) {
      setHighlights([...highlights, highlightInput.trim()])
      setHighlightInput('')
    }
  }

  const removeHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx))
  }

  const addAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()])
      setAmenityInput('')
    }
  }

  const removeAmenity = (idx: number) => {
    setAmenities(amenities.filter((_, i) => i !== idx))
  }

  // Mapbox Fetch
  const handleFetchPlaces = async () => {
    if (!latitude || !longitude) {
      alert("Please enter both Latitude and Longitude first.")
      return
    }
    
    setFetchingPlaces(true)
    try {
      const data = await fetchNearbyPlaces(parseFloat(latitude), parseFloat(longitude))
      if (data.success && data.places) {
        setNearbyPlaces(data.places)
        alert(`Successfully fetched ${data.places.length} top places within 20km!`)
      } else {
        alert(data.error || "Failed to fetch nearby places")
      }
    } catch (error: any) {
      alert(error.message || "An error occurred while fetching places")
    } finally {
      setFetchingPlaces(false)
    }
  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.append('id', id)
    formData.append('cover_image_url', imageUrl)
    formData.append('gallery_images', JSON.stringify(galleryImages))
    formData.append('highlights', JSON.stringify(highlights))
    formData.append('amenities', JSON.stringify(amenities))
    formData.append('nearby_places', JSON.stringify(nearbyPlaces))
    formData.append('room_types', JSON.stringify(roomTypes))
    
    try {
      const result = await saveHotelResort(formData)
      if (result?.error) {
        alert(result.error)
        setLoading(false)
      } else {
        router.push('/admin/hotels-resorts')
      }
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-24">
      
      {/* Main Form Box */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Resort Name *</label>
            <input type="text" name="name" value={name} onChange={handleNameChange} required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (auto-generated)</label>
            <input type="text" name="slug" value={slug} onChange={handleSlugChange} required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tagline</label>
            <input type="text" name="tagline" defaultValue={initialData?.tagline} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select name="category" defaultValue={initialData?.category || 'Resorts'} className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-teal focus:border-teal">
              <option value="Resorts">Resorts</option>
              <option value="Hotels">Hotels</option>
              <option value="Homestays">Homestays</option>
              <option value="Cottages">Cottages</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">No of Persons / Occupancy</label>
            <input type="text" name="no_of_persons" defaultValue={initialData?.no_of_persons} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" placeholder="e.g. 2 Adults, 1 Child" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
            <input type="text" name="location" defaultValue={initialData?.location} required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" placeholder="e.g. Araku Valley, AP" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Latitude</label>
            <input type="number" step="any" name="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Longitude</label>
            <input type="number" step="any" name="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price Per Night (₹)</label>
            <input type="number" name="price_per_night" defaultValue={initialData?.price_per_night} required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price Label</label>
            <input type="text" name="price_label" defaultValue={initialData?.price_label || 'per night'} required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" placeholder="e.g. per night, per couple" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Link</label>
            <input type="url" name="whatsapp_link" defaultValue={initialData?.whatsapp_link} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" placeholder="https://wa.me/..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (0-5)</label>
            <input type="number" step="0.1" max="5" min="0" name="rating" defaultValue={initialData?.rating} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Review Count</label>
            <input type="number" name="reviews" defaultValue={initialData?.reviews} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description (shown on cards)</label>
            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" />
          </div>

          <div className="md:col-span-2">
            <RichTextField name="content" label="Detailed Description" defaultValue={initialData?.content} hint="Shown on the hotel page. Supports headings, lists, links and multiple images." />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-widest text-xs">Cover Image</label>
            <ImageUpload 
              bucket="site-images" 
              folder="hotels" 
              defaultImage={imageUrl} 
              onUpload={setImageUrl} 
            />
          </div>

          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-gray-700">Gallery Images</label>
              <button 
                type="button" 
                onClick={() => setGalleryImages([...galleryImages, ''])}
                className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"
              >
                <Plus size={14} /> Add Image
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative group">
                  <ImageUpload 
                    bucket="site-images" 
                    folder="hotels/gallery" 
                    defaultImage={img} 
                    onUpload={(url) => {
                      const newArr = [...galleryImages];
                      newArr[idx] = url;
                      setGalleryImages(newArr);
                    }} 
                  />
                  <button 
                    type="button"
                    onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {galleryImages.length === 0 && (
                <div className="col-span-full text-center py-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-gray-500 text-sm">
                  Click 'Add Image' to start adding photos to the resort gallery.
                </div>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Highlights</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={highlightInput} 
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" 
                placeholder="e.g. Coffee plantation walks"
              />
              <button type="button" onClick={addHighlight} className="bg-orange-600 hover:bg-orange-700 text-white px-6 rounded-lg font-medium transition-colors">
                Add
              </button>
            </div>
            {highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200">
                    {h}
                    <button type="button" onClick={() => removeHighlight(i)} className="text-gray-400 hover:text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Amenities</label>
            <div className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={amenityInput} 
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal" 
                placeholder="e.g. Free WiFi"
              />
              <button type="button" onClick={addAmenity} className="bg-orange-600 hover:bg-orange-700 text-white px-6 rounded-lg font-medium transition-colors">
                Add
              </button>
            </div>
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {amenities.map((a, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200">
                    {a}
                    <button type="button" onClick={() => removeAmenity(i)} className="text-green-500 hover:text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEO & Meta Data */}
          <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
            <h4 className="font-bold text-gray-900">SEO & Meta Data</h4>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Title (defaults to resort name)</label>
              <input 
                type="text" 
                name="meta_title" 
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal bg-white" 
                placeholder={name}
              />
              <div className="text-xs text-gray-500 mt-1">{effectiveMetaTitle.length}/60 characters</div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Description (defaults to resort description)</label>
              <textarea 
                name="meta_description" 
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal bg-white" 
                placeholder={description.substring(0, 100) + (description.length > 100 ? '...' : '')}
              />
              <div className="text-xs text-gray-500 mt-1">{effectiveMetaDescription.length}/160 characters</div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Meta Keywords</label>
              <input type="text" name="meta_keywords" defaultValue={initialData?.meta_keywords} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal bg-white" placeholder="Best Resort in Araku, Premium Resort..." />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">OG Image URL (defaults to cover image)</label>
              <input type="text" name="og_image_url" defaultValue={initialData?.og_image_url} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal bg-white" placeholder="https://..." />
            </div>
          </div>

          {/* Publishing & Visibility */}
          <div className="md:col-span-2 pt-4 border-t border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4">Area &amp; Placement</h4>
            <div className="max-w-md space-y-6">
              {/* one place per hotel; Vizag is the default */}
              <fieldset>
                <legend className="text-sm font-semibold text-gray-700 mb-2">Which place is this hotel in?</legend>
                <div className="space-y-2.5">
                  {AREAS.map(a => (
                    <label key={a.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="area"
                        value={a.id}
                        defaultChecked={normalizeArea(initialData?.area ?? (initialData?.show_in_araku ? 'araku-valley' : initialData?.show_in_lambasingi ? 'lambasingi' : initialData?.show_in_vanjangi ? 'vanjangi' : 'vizag')) === a.id}
                        className="w-5 h-5 border-gray-300 text-teal focus:ring-teal"
                      />
                      <span className="font-medium text-gray-800">{a.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Used for the area switch on the Hotels page, the stay choices in packages, and the destination pages.</p>
              </fieldset>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="is_published" value="true" defaultChecked={initialData ? initialData.is_published : true} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="font-medium text-gray-800">Published</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="show_on_home" value="true" defaultChecked={initialData?.show_on_home || false} className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                  <span className="font-medium text-gray-800">Show on Home</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="show_on_resorts_page" value="true" defaultChecked={initialData ? initialData.show_on_resorts_page !== false : true} className="w-5 h-5 rounded border-gray-300 text-teal focus:ring-teal" />
                  <span className="font-medium text-gray-800">Show on Hotels Page</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Home Order (1 is first)</label>
                <input type="number" name="home_order" defaultValue={initialData?.home_order || 0} className="w-full p-2 border rounded-md" />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 pt-4 flex gap-4">
            <button type="submit" disabled={loading} className="px-8 py-3 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50 flex-1 md:flex-none">
              {loading ? 'Saving...' : 'Update Resort'}
            </button>
            <Link href="/admin/hotels-resorts" className="px-8 py-3 border border-gray-300 bg-white rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </Link>
          </div>

        </div>
      </div>

      {/* Mapbox Integration */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-2">Nearby Places API Integration</h4>
        <p className="text-sm text-gray-600 mb-4">Uses Mapbox API to find attractions, restaurants, beaches, etc. within 20km based on the Latitude/Longitude above.</p>
        
        <button 
          type="button" 
          onClick={handleFetchPlaces}
          disabled={fetchingPlaces}
          className="flex items-center gap-2 px-4 py-2 border border-emerald-700 text-emerald-700 bg-emerald-50 rounded-lg font-medium hover:bg-emerald-100 transition-colors"
        >
          {fetchingPlaces ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
          Fetch Nearby Places (Top 15 within 20km)
        </button>

        {nearbyPlaces && nearbyPlaces.length > 0 && (
          <div className="mt-6 border rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 font-semibold text-gray-600">Name</th>
                  <th className="p-3 font-semibold text-gray-600">Category</th>
                  <th className="p-3 font-semibold text-gray-600">Distance</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {nearbyPlaces.map((place: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">{place.name}</td>
                    <td className="p-3 text-gray-600 capitalize">{place.category}</td>
                    <td className="p-3 text-gray-600">{place.distance_km} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Accommodation Types */}
      <AccommodationTypesEditor value={roomTypes} onChange={setRoomTypes} />

    </form>
  )
}
