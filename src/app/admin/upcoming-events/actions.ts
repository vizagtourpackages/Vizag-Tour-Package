'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteEvent(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('upcoming_events').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/upcoming-events')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('upcoming_events').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/upcoming-events')
  revalidatePath('/')
}

export async function saveEvent(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    date: formData.get('date') as string,
    image_url: formData.get('image_url') as string,
    is_published: formData.get('is_published') === 'true',
  }

  if (id === 'new') {
    const { error } = await supabase.from('upcoming_events').insert([data])
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('upcoming_events').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/upcoming-events')
  revalidatePath('/')
  redirect('/admin/upcoming-events')
}
