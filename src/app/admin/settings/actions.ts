'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { SETTING_KEYS } from '@/lib/settings'

const ALLOWED = new Set<string>(Object.values(SETTING_KEYS))

async function upsertSettings(supabase: Awaited<ReturnType<typeof createClient>>, rows: { key: string; value: string }[]) {
  if (!rows.length) return
  // site_settings is keyed by `key`
  const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' })
  if (error) throw new Error(error.message)
}

function refresh() {
  revalidatePath('/', 'layout')
  revalidatePath('/admin/settings')
}

/** Single setting (used by the packages list "hero" toggle). */
export async function toggleSetting(key: string, value: string) {
  const supabase = await createClient()
  await upsertSettings(supabase, [{ key, value }])
  refresh()
}

/** Save several settings at once. Only known keys are accepted. */
export async function saveSettings(values: Record<string, string>): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) return { success: false, error: 'You are signed out. Please sign in again.' }

    await upsertSettings(
      supabase,
      Object.entries(values)
        .filter(([key]) => ALLOWED.has(key))
        .map(([key, raw]) => ({ key, value: (raw ?? '').toString().trim() }))
    )
    refresh()
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Could not save settings.' }
  }
}

/** Change the signed-in admin's password after re-checking the current one. */
export async function changePassword(current: string, next: string): Promise<{ success: boolean; error?: string }> {
  if (!next || next.length < 8) return { success: false, error: 'New password must be at least 8 characters.' }
  if (next === current) return { success: false, error: 'New password must be different from the current one.' }

  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  const email = auth.user?.email
  if (!email) return { success: false, error: 'You are signed out. Please sign in again.' }

  const verify = await supabase.auth.signInWithPassword({ email, password: current })
  if (verify.error) return { success: false, error: 'Current password is incorrect.' }

  const { error } = await supabase.auth.updateUser({ password: next })
  if (error) return { success: false, error: error.message }
  return { success: true }
}
