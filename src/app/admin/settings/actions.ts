'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleSetting(key: string, value: string) {
  const supabase = await createClient()
  
  // Manual upsert to avoid schema constraint issues
  const { data: existing } = await supabase
    .from('site_settings')
    .select('id')
    .eq('key', key)
    .single()
    
  if (existing) {
    const { error } = await supabase
      .from('site_settings')
      .update({ value })
      .eq('id', existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from('site_settings')
      .insert({ key, value })
    if (error) throw new Error(error.message)
  }
  
  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/admin/settings')
}
