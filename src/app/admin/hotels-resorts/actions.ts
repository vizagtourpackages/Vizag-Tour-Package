'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteHotelResort(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('hotels_resorts').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hotels-resorts')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('hotels_resorts').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/hotels-resorts')
  revalidatePath('/')
}

export async function saveHotelResort(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  
  // Parse highlights and amenities from JSON strings (since they are arrays of tags)
  let highlights = []
  let amenities = []
  let nearbyPlaces = null
  let roomTypes = []
  
  try {
    const highlightsData = formData.get('highlights') as string
    if (highlightsData) highlights = JSON.parse(highlightsData)
      
    const amenitiesData = formData.get('amenities') as string
    if (amenitiesData) amenities = JSON.parse(amenitiesData)
      
    const nearbyPlacesData = formData.get('nearby_places') as string
    if (nearbyPlacesData) nearbyPlaces = JSON.parse(nearbyPlacesData)
      
    const roomTypesData = formData.get('room_types') as string
    if (roomTypesData) roomTypes = JSON.parse(roomTypesData)
  } catch (e) {
    console.error("Error parsing JSON arrays from form data", e)
  }
  
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    tagline: formData.get('tagline') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    location: formData.get('location') as string,
    latitude: formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : null,
    longitude: formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : null,
    price_per_night: formData.get('price_per_night') ? parseFloat(formData.get('price_per_night') as string) : null,
    whatsapp_link: formData.get('whatsapp_link') as string,
    rating: formData.get('rating') ? parseFloat(formData.get('rating') as string) : null,
    reviews: formData.get('reviews') ? parseInt(formData.get('reviews') as string) : 0,
    cover_image_url: formData.get('cover_image_url') as string,
    meta_title: formData.get('meta_title') as string,
    meta_description: formData.get('meta_description') as string,
    meta_keywords: formData.get('meta_keywords') as string,
    og_image_url: formData.get('og_image_url') as string,
    is_published: formData.get('is_published') === 'true',
    highlights,
    amenities,
    nearby_places: nearbyPlaces
  }

  let resortId = id

  if (id === 'new') {
    const { data: insertedData, error } = await supabase.from('hotels_resorts').insert([data]).select('id').single()
    if (error) {
      if (error.code === '23505') return { error: 'A resort with this slug already exists. Please modify the slug to make it unique.' }
      return { error: error.message }
    }
    resortId = insertedData.id
  } else {
    const { error } = await supabase.from('hotels_resorts').update(data).eq('id', id)
    if (error) {
      if (error.code === '23505') return { error: 'A resort with this slug already exists. Please modify the slug to make it unique.' }
      return { error: error.message }
    }
  }

  // Handle Room Types
  // First delete existing ones
  if (resortId && id !== 'new') {
    const { error: deleteError } = await supabase.from('resort_room_types').delete().eq('resort_id', resortId)
    if (deleteError) console.error("Error deleting old room types", deleteError)
  }
  
  // Then insert the new ones
  if (resortId && roomTypes.length > 0) {
    const roomTypesToInsert = roomTypes.map((rt: any) => ({
      resort_id: resortId,
      room_type: rt.room_type,
      price: parseFloat(rt.price),
      has_ac: rt.has_ac,
      is_available: rt.is_available
    }))
    const { error: insertError } = await supabase.from('resort_room_types').insert(roomTypesToInsert)
    if (insertError) console.error("Error inserting room types", insertError)
  }

  revalidatePath('/admin/hotels-resorts')
  revalidatePath('/')
  return { success: true }
}
