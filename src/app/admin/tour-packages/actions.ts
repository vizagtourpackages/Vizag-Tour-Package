'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { sortByDisplayOrder } from '@/lib/content'
import { toggleSetting } from '@/app/admin/settings/actions'

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
    full_overview_content: formData.get('full_overview_content') as string,
    price: formData.get('price') ? parseInt(formData.get('price') as string) : null,
    price_label: formData.get('price_label') as string,
    original_price: formData.get('original_price') ? parseInt(formData.get('original_price') as string) : null,
    duration: formData.get('duration') as string,
    type: formData.get('type') as string,
    setting: formData.get('setting') as string,
    rating: formData.get('rating') ? parseFloat(formData.get('rating') as string) : null,
    review_count: formData.get('review_count') ? parseInt(formData.get('review_count') as string) : null,
    badge: formData.get('badge') as string,
    
    // Arrays
    destination_tags: parseJSON('destination_tags'),
    pickup_location: formData.get('pickup_location') as string,
    drop_location: formData.get('drop_location') as string,
    important_notes: parseJSON('important_notes'),
    includes: parseJSON('includes'),
    excludes: parseJSON('excludes'),
    highlights: parseJSON('highlights'),
    rate_plans: parseJSON('rate_plans'),
    
    cover_image_url: formData.get('cover_image_url') as string,
    transportation: formData.get('transportation') as string,
    meals_included: formData.get('meals_included') as string,
    
    meta_title: formData.get('meta_title') as string,
    meta_description: formData.get('meta_description') as string,
    meta_keywords: formData.get('meta_keywords') as string,
    
    is_published: formData.get('is_published') === 'true',
    show_on_home: formData.get('show_on_home') === 'true',
    show_on_packages_page: formData.get('show_on_packages_page') === 'true',
    home_order: formData.get('home_order') ? parseInt(formData.get('home_order') as string) : 0,
    display_order: formData.get('display_order') ? parseInt(formData.get('display_order') as string) : 0,
    resort_ids: parseJSON('resort_ids'),
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
  revalidatePath('/packages/[slug]', 'page')
  revalidatePath('/')
  
  return { success: true }
}

export async function moveTourPackage(id: string, direction: 'up' | 'down') {
  const supabase = await createClient()
  const { data: raw } = await supabase
    .from('tour_packages')
    .select('id, display_order, created_at')
    .order('created_at', { ascending: false })
  if (!raw) return
  const data = sortByDisplayOrder(raw)
  const idx = data.findIndex(p => p.id === id)
  const swapWith = direction === 'up' ? idx - 1 : idx + 1
  if (idx < 0 || swapWith < 0 || swapWith >= data.length) return
  const ordered = [...data]
  ;[ordered[idx], ordered[swapWith]] = [ordered[swapWith], ordered[idx]]
  // Re-number sequentially so ties never cause ambiguity
  for (let i = 0; i < ordered.length; i++) {
    if (ordered[i].display_order !== i + 1) {
      await supabase.from('tour_packages').update({ display_order: i + 1 }).eq('id', ordered[i].id)
    }
  }
  revalidatePath('/admin/tour-packages')
  revalidatePath('/tour-packages')
  revalidatePath('/')
}

export async function toggleFeatured(id: string, show_on_home: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('tour_packages').update({ show_on_home }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/tour-packages')
  revalidatePath('/')
}

/** Pick which package is featured on the home hero. Clicking the current one clears it. */
export async function setHeroPackage(id: string, currentlyHero: boolean) {
  await toggleSetting('hero_package_id', currentlyHero ? '' : id)
  revalidatePath('/admin/tour-packages')
  revalidatePath('/')
}
