'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveTrustPoint(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const isNew = id === 'new'
  
  const data: any = {
    is_active: formData.get('is_active') === 'on',
    display_order: parseInt(formData.get('display_order') as string) || 0,
  }
  if (formData.has('label')) data.label = formData.get('label')
  if (formData.has('icon')) data.icon = formData.get('icon')

  if (isNew) {
    await supabase.from('travel_trust_points').insert([data])
  } else {
    await supabase.from('travel_trust_points').update(data).eq('id', id)
  }
  revalidatePath('/admin/travels/trust-points')
  redirect('/admin/travels/trust-points')
}

export async function deleteTrustPoint(id: string) {
  const supabase = await createClient()
  await supabase.from('travel_trust_points').delete().eq('id', id)
  revalidatePath('/admin/travels/trust-points')
}

export async function toggleTrustPoint(id: string, is_active: boolean) {
  const supabase = await createClient()
  await supabase.from('travel_trust_points').update({ is_active }).eq('id', id)
  revalidatePath('/admin/travels/trust-points')
}
