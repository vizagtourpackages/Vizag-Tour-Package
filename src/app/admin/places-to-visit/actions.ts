'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deletePlace(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('places_to_visit').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/places-to-visit')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('places_to_visit').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/places-to-visit')
  revalidatePath('/')
}

export async function savePlace(formData: FormData) {
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
    const { error } = await supabase.from('places_to_visit').insert([data])
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('places_to_visit').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/places-to-visit')
  revalidatePath('/')
  redirect('/admin/places-to-visit')
}
