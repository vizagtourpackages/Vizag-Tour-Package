'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveNote(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const isNew = id === 'new'
  
  const data: any = {
    is_active: formData.get('is_active') === 'on',
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }
  if (formData.has('title')) data.title = formData.get('title')
  if (formData.has('description')) data.description = formData.get('description')

  if (isNew) {
    await supabase.from('travel_notes').insert([data])
  } else {
    await supabase.from('travel_notes').update(data).eq('id', id)
  }
  revalidatePath('/admin/travels/notes')
  redirect('/admin/travels/notes')
}

export async function deleteNote(id: string) {
  const supabase = await createClient()
  await supabase.from('travel_notes').delete().eq('id', id)
  revalidatePath('/admin/travels/notes')
}

export async function toggleNote(id: string, is_active: boolean) {
  const supabase = await createClient()
  await supabase.from('travel_notes').update({ is_active }).eq('id', id)
  revalidatePath('/admin/travels/notes')
}
