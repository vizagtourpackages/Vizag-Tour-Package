'use client'

import { useState } from 'react'
import { saveTourPackage } from '@/app/admin/tour-packages/actions'
import ImageUpload from './ImageUpload'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, X, Trash2 } from 'lucide-react'

export default function TourPackageForm({ initialData, id, initialDays = [], initialHotels = [] }: { initialData?: any, id: string, initialDays?: any[], initialHotels?: any[] }) {
  const [imageUrl, setImageUrl] = useState(initialData?.cover_image_url || initialData?.image_url || '')
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData?.slug)
  
  const [overviewDescription, setOverviewDescription] = useState(initialData?.overview_description || initialData?.description || '')
  
  // Basic arrays
  const [importantNotes, setImportantNotes] = useState<string[]>(initialData?.important_notes || [])
  const [noteInput, setNoteInput] = useState('')
  
  const [includes, setIncludes] = useState<string[]>(initialData?.includes || [])
  const [includeInput, setIncludeInput] = useState('')
  
  const [excludes, setExcludes] = useState<string[]>(initialData?.excludes || [])
  const [excludeInput, setExcludeInput] = useState('')
  
  const [highlights, setHighlights] = useState<string[]>(initialData?.highlights || [])
  const [highlightInput, setHighlightInput] = useState('')

  const [destinationTags, setDestinationTags] = useState<string[]>(initialData?.destination_tags || [])
  const [destinationInput, setDestinationInput] = useState('')

  // Nested structures
  const [days, setDays] = useState<any[]>(initialDays.length > 0 ? initialDays : [])
  const [hotels, setHotels] = useState<any[]>(initialHotels.length > 0 ? initialHotels : [])

  // SEO Defaults
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '')
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '')
  const effectiveMetaTitle = metaTitle || title
  const effectiveMetaDescription = metaDescription || overviewDescription

  const router = useRouter()

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

  // Generic Array Add/Remove
  const addToArray = (setter: any, arr: string[], input: string, setInput: any) => {
    if (input.trim() && !arr.includes(input.trim())) {
      setter([...arr, input.trim()])
      setInput('')
    }
  }
  const removeFromArray = (setter: any, arr: string[], idx: number) => {
    setter(arr.filter((_, i) => i !== idx))
  }

  // Days Logic
  const addDay = () => {
    setDays([...days, {
      id: `temp-${Date.now()}`,
      day_number: days.length + 1,
      day_summary_headline: '',
      stops: []
    }])
  }
  
  const updateDay = (dayIndex: number, field: string, value: any) => {
    const newDays = [...days]
    newDays[dayIndex][field] = value
    setDays(newDays)
  }

  const removeDay = (dayIndex: number) => {
    setDays(days.filter((_, i) => i !== dayIndex).map((d, i) => ({...d, day_number: i + 1})))
  }

  const addStop = (dayIndex: number) => {
    const newDays = [...days]
    newDays[dayIndex].stops.push({
      id: `temp-stop-${Date.now()}`,
      place_name: '',
      description: '',
      display_order: newDays[dayIndex].stops.length + 1
    })
    setDays(newDays)
  }

  const updateStop = (dayIndex: number, stopIndex: number, field: string, value: any) => {
    const newDays = [...days]
    newDays[dayIndex].stops[stopIndex][field] = value
    setDays(newDays)
  }

  const removeStop = (dayIndex: number, stopIndex: number) => {
    const newDays = [...days]
    newDays[dayIndex].stops = newDays[dayIndex].stops.filter((_: any, i: number) => i !== stopIndex)
      .map((s: any, i: number) => ({...s, display_order: i + 1}))
    setDays(newDays)
  }

  // Hotels Logic
  const addHotel = () => {
    setHotels([...hotels, {
      id: `temp-hotel-${Date.now()}`,
      day_label: '',
      hotel_name: '',
      location_name: '',
      latitude: '',
      longitude: '',
      star_category: '3 Star',
      room_type: '',
      check_in_time: '12:00 PM',
      check_out_time: '10:00 AM',
      hotel_image_url: '',
      amenities: []
    }])
  }

  const updateHotel = (hotelIndex: number, field: string, value: any) => {
    const newHotels = [...hotels]
    newHotels[hotelIndex][field] = value
    setHotels(newHotels)
  }

  const removeHotel = (hotelIndex: number) => {
    setHotels(hotels.filter((_, i) => i !== hotelIndex))
  }

  // Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    formData.append('id', id)
    formData.append('cover_image_url', imageUrl)
    
    // Arrays
    formData.append('important_notes', JSON.stringify(importantNotes))
    formData.append('includes', JSON.stringify(includes))
    formData.append('excludes', JSON.stringify(excludes))
    formData.append('highlights', JSON.stringify(highlights))
    formData.append('destination_tags', JSON.stringify(destinationTags))
    
    // Nested Data
    formData.append('days', JSON.stringify(days))
    formData.append('hotels', JSON.stringify(hotels))
    
    try {
      const result = await saveTourPackage(formData)
      if (result?.error) {
        alert(result.error)
        setLoading(false)
      } else {
        router.push('/admin/tour-packages')
      }
    } catch (err: any) {
      alert(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-6xl pb-24">
      
      {/* 1. Basic Info */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Package Title *</label>
            <input type="text" name="title" value={title} onChange={handleTitleChange} required className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Slug *</label>
            <input type="text" name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setIsSlugManuallyEdited(true) }} required className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹) *</label>
            <input type="number" name="price" defaultValue={initialData?.price} required className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">MRP (₹)</label>
            <input type="number" name="mrp" defaultValue={initialData?.mrp} className="w-full p-3 border rounded-lg bg-gray-50" placeholder="Strikethrough price" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Price Label</label>
            <input type="text" name="price_label" defaultValue={initialData?.price_label || 'per person'} className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Duration *</label>
            <input type="text" name="duration" defaultValue={initialData?.duration} placeholder="e.g. 2 Nights / 3 Days" required className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
            <select name="type" defaultValue={initialData?.type || initialData?.category || '1D'} className="w-full p-3 border rounded-lg bg-gray-50">
              <option value="1D">1D</option>
              <option value="2D/1N">2D/1N</option>
              <option value="3D/2N">3D/2N</option>
              <option value="4D/3N">4D/3N</option>
              <option value="5D/4N">5D/4N</option>
              <option value="6D/5N">6D/5N</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Setting</label>
            <select name="setting" defaultValue={initialData?.setting || 'Private'} className="w-full p-3 border rounded-lg bg-gray-50">
              <option value="Private">Private</option>
              <option value="Group">Group</option>
              <option value="Semi-Private">Semi-Private</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
            <input type="number" step="0.1" max="5" name="rating" defaultValue={initialData?.rating || 4.5} className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Review Count</label>
            <input type="number" name="review_count" defaultValue={initialData?.review_count || 10} className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Badge</label>
            <input type="text" name="badge" defaultValue={initialData?.badge} placeholder="e.g. Best Seller" className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>

          <div className="lg:col-span-3">
            <label className="block text-sm font-bold text-gray-700 mb-2">Destinations (Tags)</label>
            <div className="flex gap-2 mb-3 flex-wrap">
              {destinationTags.map((tag, idx) => (
                <span key={idx} className="bg-teal/10 text-teal px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border border-teal/20">
                  {tag}
                  <button type="button" onClick={() => removeFromArray(setDestinationTags, destinationTags, idx)} className="hover:text-red-500 ml-1"><X size={14} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={destinationInput} 
                onChange={e => setDestinationInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToArray(setDestinationTags, destinationTags, destinationInput, setDestinationInput))}
                placeholder="e.g. Araku Valley" 
                className="flex-1 p-3 border rounded-lg bg-gray-50" 
              />
              <button type="button" onClick={() => addToArray(setDestinationTags, destinationTags, destinationInput, setDestinationInput)} className="px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300">Add</button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image (R2 Upload) *</label>
            <ImageUpload bucket="site-images" folder="tour-packages" defaultImage={imageUrl} onUpload={setImageUrl} />
          </div>
        </div>
      </div>

      {/* 2. Package Overview */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6">Package Overview Description</h3>
        <textarea 
          name="overview_description" 
          value={overviewDescription}
          onChange={e => setOverviewDescription(e.target.value)}
          placeholder="Enter a 50-word overview of the package..." 
          rows={4} 
          className="w-full p-3 border rounded-lg bg-gray-50" 
        />
      </div>

      {/* 3. Important Notes & Transports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6">Important Notes</h3>
          <div className="space-y-2 mb-4">
            {importantNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <span className="mt-0.5">🚙</span>
                <span className="flex-1 text-sm">{note.replace('🚙 ', '')}</span>
                <button type="button" onClick={() => removeFromArray(setImportantNotes, importantNotes, idx)} className="text-gray-400 hover:text-red-500"><X size={16}/></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={noteInput} 
              onChange={e => setNoteInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToArray(setImportantNotes, importantNotes, `🚙 ${noteInput}`, setNoteInput))}
              placeholder="e.g. Borra Caves entry ticket is extra." 
              className="flex-1 p-3 border rounded-lg bg-gray-50 text-sm" 
            />
            <button type="button" onClick={() => addToArray(setImportantNotes, importantNotes, `🚙 ${noteInput}`, setNoteInput)} className="px-4 py-2 bg-gray-200 rounded-lg font-bold text-sm hover:bg-gray-300">Add</button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div>
            <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6">Transportation</h3>
            <input type="text" name="transportation" defaultValue={initialData?.transportation} placeholder="e.g. Sedan or Hatchback" className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6">Meals Included</h3>
            <select name="meals_included" defaultValue={initialData?.meals_included || 'Breakfast'} className="w-full p-3 border rounded-lg bg-gray-50">
              <option value="None">None</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Breakfast & Dinner">Breakfast & Dinner</option>
              <option value="All Meals">All Meals</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Itinerary Timeline */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <h3 className="text-xl font-heading font-bold">Itinerary Timeline</h3>
          <button type="button" onClick={addDay} className="flex items-center gap-1 px-4 py-2 bg-teal/10 text-teal rounded-lg font-bold text-sm hover:bg-teal/20 transition-colors">
            <Plus size={16} /> Add Day
          </button>
        </div>

        {days.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No itinerary days added yet.</p>
            <button type="button" onClick={addDay} className="btn-secondary">Add First Day</button>
          </div>
        ) : (
          <div className="space-y-8">
            {days.map((day, dIdx) => (
              <div key={dIdx} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
                <div className="absolute top-4 right-4">
                  <button type="button" onClick={() => removeDay(dIdx)} className="text-gray-400 hover:text-red-500 p-2"><Trash2 size={18}/></button>
                </div>
                
                <div className="mb-6 max-w-xl">
                  <label className="block text-xs font-bold text-teal uppercase tracking-wider mb-2">Day {day.day_number}</label>
                  <input 
                    type="text" 
                    value={day.day_summary_headline}
                    onChange={(e) => updateDay(dIdx, 'day_summary_headline', e.target.value)}
                    placeholder="Day Summary Headline (e.g. Arrival in Vizag)" 
                    className="w-full p-3 border rounded-lg font-bold text-lg"
                  />
                </div>

                <div className="pl-4 border-l-2 border-gray-200 space-y-4">
                  {day.stops.map((stop: any, sIdx: number) => (
                    <div key={sIdx} className="bg-white p-4 rounded-lg border border-gray-200 relative shadow-sm">
                      <button type="button" onClick={() => removeStop(dIdx, sIdx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={16}/></button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mr-8">
                        <div className="md:col-span-1">
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Place / Stop</label>
                          <input type="text" value={stop.place_name} onChange={e => updateStop(dIdx, sIdx, 'place_name', e.target.value)} className="w-full p-2 border rounded-md text-sm" placeholder="e.g. RK Beach" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                          <textarea value={stop.description} onChange={e => updateStop(dIdx, sIdx, 'description', e.target.value)} rows={2} className="w-full p-2 border rounded-md text-sm" placeholder="Brief description of activity..." />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => addStop(dIdx)} className="flex items-center gap-1 text-sm font-bold text-charcoal hover:text-teal transition-colors py-2">
                    <Plus size={16}/> Add Stop
                  </button>
                </div>
              </div>
            ))}
            
            <button type="button" onClick={addDay} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2">
              <Plus size={18}/> Add New Day Block
            </button>
          </div>
        )}
      </div>

      {/* 5. Package Hotels */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <h3 className="text-xl font-heading font-bold">Package Hotels</h3>
          <button type="button" onClick={addHotel} className="flex items-center gap-1 px-4 py-2 bg-coral/10 text-coral rounded-lg font-bold text-sm hover:bg-coral/20 transition-colors">
            <Plus size={16} /> Add Hotel
          </button>
        </div>
        
        {hotels.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No hotels added to this package yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {hotels.map((hotel, hIdx) => (
              <div key={hIdx} className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative">
                <button type="button" onClick={() => removeHotel(hIdx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm"><Trash2 size={16}/> Delete</button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                  <div className="lg:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Day Label</label>
                    <input type="text" value={hotel.day_label} onChange={e => updateHotel(hIdx, 'day_label', e.target.value)} placeholder="e.g. Day 1 & 2 (Vizag)" className="w-full p-2 border rounded-md text-sm" />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hotel Name</label>
                    <input type="text" value={hotel.hotel_name} onChange={e => updateHotel(hIdx, 'hotel_name', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                    <select value={hotel.star_category} onChange={e => updateHotel(hIdx, 'star_category', e.target.value)} className="w-full p-2 border rounded-md text-sm">
                      <option value="3 Star">3 Star</option>
                      <option value="4 Star">4 Star</option>
                      <option value="5 Star">5 Star</option>
                      <option value="Resort">Resort</option>
                      <option value="Budget">Budget</option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location Name</label>
                    <input type="text" value={hotel.location_name} onChange={e => updateHotel(hIdx, 'location_name', e.target.value)} placeholder="e.g. RK Beach, Vizag" className="w-full p-2 border rounded-md text-sm" />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lat (Optional)</label>
                    <input type="text" value={hotel.latitude} onChange={e => updateHotel(hIdx, 'latitude', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Lng (Optional)</label>
                    <input type="text" value={hotel.longitude} onChange={e => updateHotel(hIdx, 'longitude', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                  </div>

                  <div className="lg:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Room Type</label>
                    <input type="text" value={hotel.room_type} onChange={e => updateHotel(hIdx, 'room_type', e.target.value)} placeholder="e.g. AC Deluxe" className="w-full p-2 border rounded-md text-sm" />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Check In</label>
                    <input type="text" value={hotel.check_in_time} onChange={e => updateHotel(hIdx, 'check_in_time', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Check Out</label>
                    <input type="text" value={hotel.check_out_time} onChange={e => updateHotel(hIdx, 'check_out_time', e.target.value)} className="w-full p-2 border rounded-md text-sm" />
                  </div>
                </div>

                <div className="mt-4">
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Amenities (Comma separated)</label>
                   <input type="text" value={hotel.amenities?.join(', ')} onChange={e => updateHotel(hIdx, 'amenities', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} placeholder="Pool, WiFi, Sea View" className="w-full p-2 border rounded-md text-sm" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Includes / Excludes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6 text-teal">Includes</h3>
          <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
            {includes.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-teal/5 text-teal p-3 rounded-lg border border-teal/10">
                <span className="flex-1 text-sm font-medium">{item}</span>
                <button type="button" onClick={() => removeFromArray(setIncludes, includes, idx)} className="hover:text-red-500"><X size={16}/></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={includeInput} 
              onChange={e => setIncludeInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToArray(setIncludes, includes, includeInput, setIncludeInput))}
              placeholder="e.g. Daily Breakfast" 
              className="flex-1 p-3 border rounded-lg bg-gray-50 text-sm" 
            />
            <button type="button" onClick={() => addToArray(setIncludes, includes, includeInput, setIncludeInput)} className="px-4 py-2 bg-gray-200 rounded-lg font-bold text-sm hover:bg-gray-300">Add</button>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6 text-coral">Excludes</h3>
          <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
            {excludes.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-coral/5 text-coral p-3 rounded-lg border border-coral/10">
                <span className="flex-1 text-sm font-medium">{item}</span>
                <button type="button" onClick={() => removeFromArray(setExcludes, excludes, idx)} className="hover:text-red-500"><X size={16}/></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={excludeInput} 
              onChange={e => setExcludeInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToArray(setExcludes, excludes, excludeInput, setExcludeInput))}
              placeholder="e.g. Flight Tickets" 
              className="flex-1 p-3 border rounded-lg bg-gray-50 text-sm" 
            />
            <button type="button" onClick={() => addToArray(setExcludes, excludes, excludeInput, setExcludeInput)} className="px-4 py-2 bg-gray-200 rounded-lg font-bold text-sm hover:bg-gray-300">Add</button>
          </div>
        </div>
      </div>

      {/* 7. Highlights / Summary */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-heading font-bold border-b border-gray-100 pb-4 mb-6">Trip Summary Details (Highlights)</h3>
        <div className="flex gap-2 mb-4 flex-wrap">
          {highlights.map((h, idx) => (
            <span key={idx} className="bg-charcoal text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              {h}
              <button type="button" onClick={() => removeFromArray(setHighlights, highlights, idx)} className="hover:text-coral"><X size={14} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 max-w-md">
          <input 
            type="text" 
            value={highlightInput} 
            onChange={e => setHighlightInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addToArray(setHighlights, highlights, highlightInput, setHighlightInput))}
            placeholder="e.g. Borra Caves" 
            className="flex-1 p-3 border rounded-lg bg-gray-50" 
          />
          <button type="button" onClick={() => addToArray(setHighlights, highlights, highlightInput, setHighlightInput)} className="px-4 py-2 bg-gray-200 rounded-lg font-bold hover:bg-gray-300">Add</button>
        </div>
      </div>

      {/* 8. SEO */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-teal">
        <h3 className="text-xl font-heading font-bold mb-6">SEO & Meta Data</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Meta Title</label>
              <span className={`text-xs ${effectiveMetaTitle.length > 60 ? 'text-coral' : 'text-gray-400'}`}>{effectiveMetaTitle.length} / 60</span>
            </div>
            <input type="text" name="meta_title" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder={title || 'Leave blank to use package title'} className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">Meta Description</label>
              <span className={`text-xs ${effectiveMetaDescription.length > 160 ? 'text-coral' : 'text-gray-400'}`}>{effectiveMetaDescription.length} / 160</span>
            </div>
            <textarea name="meta_description" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} placeholder={overviewDescription || 'Leave blank to use overview description'} rows={3} className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Meta Keywords</label>
            <input type="text" name="meta_keywords" defaultValue={initialData?.meta_keywords} placeholder="vizag tours, araku package, etc." className="w-full p-3 border rounded-lg bg-gray-50" />
          </div>
        </div>
      </div>

      {/* Publish & Submit */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-6 z-20">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="is_published" value="true" defaultChecked={initialData ? initialData.is_published : true} className="w-6 h-6 rounded border-gray-300 text-teal focus:ring-teal" />
          <span className="font-bold text-gray-700">Publish this package</span>
        </label>
        
        <div className="flex gap-4 w-full sm:w-auto">
          <Link href="/admin/tour-packages" className="flex-1 sm:flex-none text-center px-6 py-3 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="flex-1 sm:flex-none px-8 py-3 bg-charcoal text-white rounded-lg font-bold hover:bg-charcoal/90 transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : (id === 'new' ? 'Create Package' : 'Update Package')}
          </button>
        </div>
      </div>
    </form>
  )
}
