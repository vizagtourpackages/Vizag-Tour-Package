'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteHillStation(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('hill_station_escapes').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/hill-stations')
  revalidatePath('/')
  return { success: true }
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('hill_station_escapes').update({ is_published }).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/hill-stations')
  revalidatePath('/')
  return { success: true }
}

export async function saveHillStation(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string

  const data = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    description: formData.get('description') as string,
    location: formData.get('location') as string,
    image_url: formData.get('image_url') as string,
    is_published: formData.get('is_published') === 'true',
  }

  if (id === 'new') {
    const { error } = await supabase.from('hill_station_escapes').insert([data])
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('hill_station_escapes').update(data).eq('id', id)
    if (error) return { error: error.message }
  }

  revalidatePath('/admin/hill-stations')
  revalidatePath('/')
  return { success: true }
}
