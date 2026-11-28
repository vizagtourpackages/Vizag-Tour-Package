'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { FARES_KEY, cleanFares, type FareRow } from '@/lib/fares'

export async function saveFares(rows: FareRow[]): Promise<{ success: boolean; error?: string; rows?: FareRow[] }> {
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return { success: false, error: 'You are signed out. Please sign in again.' }

  const clean = cleanFares(rows)
  const { error } = await supabase
    .from('site_settings')
    .upsert([{ key: FARES_KEY, value: JSON.stringify(clean) }], { onConflict: 'key' })
  if (error) return { success: false, error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/travels/fares')
  return { success: true, rows: clean }
}
