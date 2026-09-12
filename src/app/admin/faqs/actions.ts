'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteFaq(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faqs')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('faqs').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/faqs')
  revalidatePath('/')
}

export async function saveFaq(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string

  const data = {
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    category: formData.get('category') as string,
    is_published: formData.get('is_published') === 'true',
  }

  if (id === 'new') {
    const { error } = await supabase.from('faqs').insert([data])
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('faqs').update(data).eq('id', id)
    if (error) throw new Error(error.message)
  }

  revalidatePath('/admin/faqs')
  revalidatePath('/')
  redirect('/admin/faqs')
}
