'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function savePageSeo(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const data = {
    meta_title: formData.get('meta_title') as string || null,
    meta_description: formData.get('meta_description') as string || null,
    meta_keywords: formData.get('meta_keywords') as string || null,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('page_seo')
    .update(data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/seo')
  // We don't revalidate everything here, but ideally we revalidate the specific path
  
  return { success: true }
}
