'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateDestinationPage(id: string, formData: FormData) {
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
  }

  const { error } = await supabase
    .from('destination_pages')
    .update(data)
    .eq('id', id)

  if (error) {
    console.error('Error updating destination page:', error)
    throw new Error('Failed to update destination page')
  }

  revalidatePath('/admin/destination-pages')
  revalidatePath(`/${id}`)
  redirect('/admin/destination-pages')
}
