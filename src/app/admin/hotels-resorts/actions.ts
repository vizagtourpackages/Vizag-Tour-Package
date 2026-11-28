'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { normalizeArea } from '@/lib/areas'

export async function deleteHotelResort(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('hotels_resorts').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/', 'layout')
  revalidatePath('/admin/hotels-resorts')
  revalidatePath('/hotels-and-resorts')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('hotels_resorts').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/', 'layout')
  revalidatePath('/admin/hotels-resorts')
  revalidatePath('/')
}

export async function saveHotelResort(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  
  // Parse highlights and amenities from JSON strings (since they are arrays of tags)
  let highlights = []
  let amenities = []
  let galleryImages = []
  let nearbyPlaces = null
  let roomTypes = []
  
  try {
    const highlightsData = formData.get('highlights') as string
    if (highlightsData) highlights = JSON.parse(highlightsData)
      
    const amenitiesData = formData.get('amenities') as string
    if (amenitiesData) amenities = JSON.parse(amenitiesData)
      
    const galleryImagesData = formData.get('gallery_images') as string
    if (galleryImagesData) galleryImages = JSON.parse(galleryImagesData).filter(Boolean)
      
    const nearbyPlacesData = formData.get('nearby_places') as string
    if (nearbyPlacesData) nearbyPlaces = JSON.parse(nearbyPlacesData)
      
    const roomTypesData = formData.get('room_types') as string
    if (roomTypesData) roomTypes = JSON.parse(roomTypesData)
  } catch (e) {
    console.error("Error parsing JSON arrays from form data", e)
  }
  
  // an enabled accommodation type needs a price; check before anything is written
  const unpriced = roomTypes.find((rt: any) => rt.is_available && !(parseFloat(rt.price) > 0))
  if (unpriced) return { error: `Enter a price per night for ${unpriced.room_type}, or untick it.` }

  const area = normalizeArea(formData.get('area') as string)

  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    tagline: formData.get('tagline') as string,
    description: formData.get('description') as string,
    content: formData.get('content') as string,
    category: formData.get('category') as string,
    location: formData.get('location') as string,
    latitude: formData.get('latitude') ? parseFloat(formData.get('latitude') as string) : null,
    longitude: formData.get('longitude') ? parseFloat(formData.get('longitude') as string) : null,
    price_per_night: formData.get('price_per_night') ? parseFloat(formData.get('price_per_night') as string) : null,
    price_label: formData.get('price_label') as string,
    no_of_persons: formData.get('no_of_persons') as string,
    whatsapp_link: formData.get('whatsapp_link') as string,
    rating: formData.get('rating') ? parseFloat(formData.get('rating') as string) : null,
    reviews: formData.get('reviews') ? parseInt(formData.get('reviews') as string) : 0,
    cover_image_url: formData.get('cover_image_url') as string,
    meta_title: formData.get('meta_title') as string,
    meta_description: formData.get('meta_description') as string,
    meta_keywords: formData.get('meta_keywords') as string,
    og_image_url: formData.get('og_image_url') as string,
    is_published: formData.get('is_published') === 'true',
    show_on_home: formData.get('show_on_home') === 'true',
    show_on_resorts_page: formData.get('show_on_resorts_page') === 'true',
    home_order: formData.get('home_order') ? parseInt(formData.get('home_order') as string) : 0,
    area,
    // legacy flags mirror the area so older queries keep working
    show_in_araku: area === 'araku-valley',
    show_in_lambasingi: area === 'lambasingi',
    show_in_vanjangi: area === 'vanjangi',
    gallery_images: galleryImages,
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
    if (deleteError) return { error: `Hotel saved, but room types could not be updated: ${deleteError.message}` }
  }
  
  // Then insert the new ones
  if (resortId && roomTypes.length > 0) {
    const roomTypesToInsert = roomTypes
      .filter((rt: any) => rt.room_type && (rt.is_available || rt.price !== '' ))
      .map((rt: any) => ({
        resort_id: resortId,
        room_type: rt.room_type,
        price: parseFloat(rt.price) || 0,
        has_ac: /non[^a-z]*a[^a-z]*c/i.test(rt.room_type) ? false : rt.has_ac ?? /ac/i.test(rt.room_type),
        is_available: rt.is_available,
        images: rt.images || []
      }))
    if (roomTypesToInsert.length > 0) {
      const { error: insertError } = await supabase.from('resort_room_types').insert(roomTypesToInsert)
      if (insertError) return { error: `Hotel saved, but room types could not be saved: ${insertError.message}` }
    }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/hotels-resorts')
  revalidatePath('/hotels-and-resorts')
  revalidatePath('/')
  return { success: true }
}
