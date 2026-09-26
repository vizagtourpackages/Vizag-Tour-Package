'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deletePromoBanner(id: string) {
  const supabase = await createClient()
  
  // Note: promo_banner_images has ON DELETE CASCADE in SQL, so images will be deleted automatically from DB.
  const { error } = await supabase.from('promo_banner').delete().eq('id', id)
  
  if (error) throw new Error('Failed to delete promo banner')
  revalidatePath('/admin/promo-banner')
  revalidatePath('/')
}

export async function togglePublishPromoBanner(id: string, is_active: boolean) {
  const supabase = await createClient()
  
  // Optional: If we only want 1 active banner at a time, we could set all others to false here
  if (is_active) {
    await supabase.from('promo_banner').update({ is_active: false }).neq('id', id)
  }

  const { error } = await supabase.from('promo_banner').update({ is_active }).eq('id', id)
  
  if (error) throw new Error('Failed to update status')
  revalidatePath('/admin/promo-banner')
  revalidatePath('/')
}

export async function savePromoBanner(formData: FormData, images: string[], id?: string) {
  const supabase = await createClient()
  
  const rawDate = formData.get('offer_end_datetime') as string
  const offer_end_datetime = rawDate ? new Date(rawDate).toISOString() : null
  
  const data = {
    badge_text: formData.get('badge_text') as string,
    headline: formData.get('headline') as string,
    description: formData.get('description') as string,
    offer_end_datetime,
    cta_text: formData.get('cta_text') as string,
    cta_link: formData.get('cta_link') as string,
    is_active: formData.get('is_active') === 'on'
  }

  let bannerId = id

  if (id) {
    const { error } = await supabase.from('promo_banner').update(data).eq('id', id)
    if (error) throw new Error('Failed to update banner')
  } else {
    const { data: newBanner, error } = await supabase.from('promo_banner').insert([data]).select().single()
    if (error) throw new Error('Failed to create banner')
    bannerId = newBanner.id
  }

  // Handle images
  // For simplicity, we delete existing and re-insert to preserve the new order
  if (bannerId) {
    await supabase.from('promo_banner_images').delete().eq('banner_id', bannerId)
    
    if (images.length > 0) {
      const imageRecords = images.map((url, idx) => ({
        banner_id: bannerId,
        image_url: url,
        display_order: idx
      }))
      await supabase.from('promo_banner_images').insert(imageRecords)
    }
  }

  revalidatePath('/admin/promo-banner')
  revalidatePath('/')
  redirect('/admin/promo-banner')
}
