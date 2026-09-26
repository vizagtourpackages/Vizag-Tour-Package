'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleSetting(key: string, value: string) {
  const supabase = await createClient()
  
  // Upsert the setting
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value })
    
  if (error) throw new Error(error.message)
  
  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/admin/settings')
}
