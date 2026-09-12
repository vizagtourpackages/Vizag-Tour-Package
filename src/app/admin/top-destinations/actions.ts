'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteTopDestination(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('top_destinations').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/top-destinations')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('top_destinations').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/top-destinations')
  revalidatePath('/')
}

export async function saveTopDestination(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string

  const data = {
    name: formData.get('name') as string,
    location: formData.get('location') as string,
    price: formData.get('price') as string,
    description: formData.get('description') as string,
    distance_km: formData.get('distance_km') as string,
    duration: formData.get('duration') as string,
    image_url: formData.get('image_url') as string,
    is_published: formData.get('is_published') === 'true',
  }

  if (id === 'new') {
    const { error } = await supabase.from('top_destinations').insert([data])
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('top_destinations').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/top-destinations')
  revalidatePath('/')
  redirect('/admin/top-destinations')
}
