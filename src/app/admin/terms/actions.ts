'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveTerms(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const data = {
    content: formData.get('content') as string || null,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('terms_and_conditions')
    .update(data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/terms')
  revalidatePath('/', 'layout') // Revalidate everything as T&C can appear anywhere
  
  return { success: true }
}
