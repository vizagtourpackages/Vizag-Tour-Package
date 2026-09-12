'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteGuide(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('travel_guides').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/travel-guides')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('travel_guides').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/travel-guides')
  revalidatePath('/')
}

export async function saveGuide(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  
  const highlightsRaw = formData.get('highlights') as string
  const highlights = highlightsRaw ? highlightsRaw.split('\n').map(item => item.trim()).filter(Boolean) : []

  const data = {
    title: formData.get('title') as string,
    category: formData.get('category') as string,
    highlights: highlights,
    image_url: formData.get('image_url') as string,
    is_published: formData.get('is_published') === 'true',
  }

  if (id === 'new') {
    const { error } = await supabase.from('travel_guides').insert([data])
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('travel_guides').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/travel-guides')
  revalidatePath('/')
  redirect('/admin/travel-guides')
}
