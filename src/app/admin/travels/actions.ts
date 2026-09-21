'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteTravel(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('travels').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/travels')
  revalidatePath('/travels')
  revalidatePath('/')
}

export async function togglePublishTravel(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('travels').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/travels')
  revalidatePath('/travels')
  revalidatePath('/')
}

export async function saveTravel(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const isNew = id === 'new'

  const data = {
    model: formData.get('model') as string,
    price_per_km: formData.get('price_per_km') as string,
    pax: formData.get('pax') ? parseInt(formData.get('pax') as string) : 0,
    image: formData.get('image') as string,
    min_km_note: formData.get('min_km_note') as string,
    is_published: formData.get('is_published') === 'true',
    display_order: formData.get('display_order') ? parseInt(formData.get('display_order') as string) : 0,
    amenities: formData.get('amenities') ? JSON.parse(formData.get('amenities') as string) : [],
  }

  if (isNew) {
    const { error } = await supabase.from('travels').insert([data])
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('travels').update(data).eq('id', id)
    if (error) return { error: error.message }
  }

  revalidatePath('/admin/travels')
  revalidatePath('/travels')
  revalidatePath('/')
  
  return { success: true }
}
