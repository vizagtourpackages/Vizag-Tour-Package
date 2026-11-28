'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { isDestinationSlug } from '@/lib/destinations'

export async function updateDestinationPage(id: string, formData: FormData): Promise<{ success?: boolean; error?: string }> {
  if (!isDestinationSlug(id)) return { error: 'Unknown destination page.' }
  const supabase = await createClient()

  // Parse highlights (textarea split by newlines)
  const highlightsRaw = formData.get('highlights') as string
  const highlights = highlightsRaw ? highlightsRaw.split('\n').map(h => h.trim()).filter(Boolean) : []

  const data = {
    name: formData.get('name') as string,
    tagline: formData.get('tagline') as string,
    description: formData.get('description') as string,
    highlights: highlights,
    best_time_to_visit: formData.get('best_time_to_visit') as string,
    distance: formData.get('distance') as string,
    elevation: formData.get('elevation') as string,
    image_url: formData.get('image_url') as string,
    content: formData.get('content') as string,
    package_ids: JSON.parse((formData.get('package_ids') as string) || '[]'),
    hotel_ids: JSON.parse((formData.get('hotel_ids') as string) || '[]'),
  }

  // update the saved page, or create it on the first save
  const { data: updated, error } = await supabase.from('destination_pages').update(data).eq('id', id).select('id')
  if (error) return { error: error.message }
  if (!updated?.length) {
    const { error: insertError } = await supabase.from('destination_pages').insert([{ id, ...data }])
    if (insertError) return { error: insertError.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/destination-pages')
  revalidatePath(`/${id}`)
  return { success: true }
}
