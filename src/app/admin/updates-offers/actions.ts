'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteUpdateOffer(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('latest_updates_offers').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/updates-offers')
  revalidatePath('/')
  return { success: true }
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('latest_updates_offers').update({ is_published }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/updates-offers')
  revalidatePath('/')
  return { success: true }
}

export async function saveUpdateOffer(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string

  const data = {
    type: formData.get('type') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    badge_text: formData.get('badge_text') as string,
    date: formData.get('date') as string,
    image_url: formData.get('image_url') as string,
    link_text: formData.get('link_text') as string,
    href: formData.get('href') as string,
    is_published: formData.get('is_published') === 'true',
  }

  if (id === 'new') {
    const { error } = await supabase.from('latest_updates_offers').insert([data])
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('latest_updates_offers').update(data).eq('id', id)
    if (error) return { error: error.message }
  }

  revalidatePath('/admin/updates-offers')
  revalidatePath('/')
  return { success: true }
}
