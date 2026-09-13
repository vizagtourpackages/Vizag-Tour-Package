'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteTourPackage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tour_packages').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/tour-packages')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('tour_packages').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/tour-packages')
  revalidatePath('/')
}

export async function saveTourPackage(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const isNew = id === 'new'

  // Parse arrays
  const parseJSON = (key: string) => {
    const val = formData.get(key)
    return val ? JSON.parse(val as string) : []
  }

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    overview_description: formData.get('overview_description') as string,
    price: formData.get('price') ? parseInt(formData.get('price') as string) : null,
    mrp: formData.get('mrp') ? parseInt(formData.get('mrp') as string) : null,
    price_label: formData.get('price_label') as string,
    duration: formData.get('duration') as string,
    type: formData.get('type') as string,
    setting: formData.get('setting') as string,
    rating: formData.get('rating') ? parseFloat(formData.get('rating') as string) : null,
    review_count: formData.get('review_count') ? parseInt(formData.get('review_count') as string) : null,
    badge: formData.get('badge') as string,
    
    // Arrays
    destination_tags: parseJSON('destination_tags'),
    important_notes: parseJSON('important_notes'),
    includes: parseJSON('includes'),
    excludes: parseJSON('excludes'),
    highlights: parseJSON('highlights'),
    
    cover_image_url: formData.get('cover_image_url') as string,
    transportation: formData.get('transportation') as string,
    meals_included: formData.get('meals_included') as string,
    
    meta_title: formData.get('meta_title') as string,
    meta_description: formData.get('meta_description') as string,
    meta_keywords: formData.get('meta_keywords') as string,
    
    is_published: formData.get('is_published') === 'true',
  }

  let packageId = id;

  if (isNew) {
    const { data: inserted, error } = await supabase.from('tour_packages').insert([data]).select('id').single()
    if (error) {
      if (error.code === '23505') return { error: 'A package with this slug already exists. Please modify the slug to make it unique.' }
      return { error: error.message }
    }
    packageId = inserted.id
  } else {
    const { error } = await supabase.from('tour_packages').update(data).eq('id', id)
    if (error) {
      if (error.code === '23505') return { error: 'A package with this slug already exists. Please modify the slug to make it unique.' }
      return { error: error.message }
    }
    
    // Clean up old nested relationships if updating
    await supabase.from('package_itinerary_days').delete().eq('package_id', packageId)
    await supabase.from('package_hotels').delete().eq('package_id', packageId)
  }

  // Insert Nested Entities
  
  // 1. Days & Stops
  const days = parseJSON('days')
  for (const day of days) {
    const { data: insertedDay, error: dayError } = await supabase.from('package_itinerary_days').insert([{
      package_id: packageId,
      day_number: day.day_number,
      day_summary_headline: day.day_summary_headline,
    }]).select('id').single()

    if (!dayError && insertedDay && day.stops?.length > 0) {
      const stopsData = day.stops.map((stop: any) => ({
        day_id: insertedDay.id,
        place_name: stop.place_name,
        description: stop.description,
        display_order: stop.display_order,
      }))
      await supabase.from('package_itinerary_stops').insert(stopsData)
    }
  }

  // 2. Hotels
  const hotels = parseJSON('hotels')
  if (hotels.length > 0) {
    const hotelsData = hotels.map((h: any) => ({
      package_id: packageId,
      day_label: h.day_label,
      hotel_name: h.hotel_name,
      location_name: h.location_name,
      latitude: h.latitude ? parseFloat(h.latitude) : null,
      longitude: h.longitude ? parseFloat(h.longitude) : null,
      star_category: h.star_category,
      room_type: h.room_type,
      check_in_time: h.check_in_time,
      check_out_time: h.check_out_time,
      hotel_image_url: h.hotel_image_url,
      amenities: h.amenities || []
    }))
    await supabase.from('package_hotels').insert(hotelsData)
  }

  revalidatePath('/admin/tour-packages')
  revalidatePath('/tour-packages')
  revalidatePath('/')
  
  return { success: true }
}
