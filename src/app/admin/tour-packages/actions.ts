'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteTourPackage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('tour_packages').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/tour-packages')
  revalidatePath('/')
}

export async function togglePublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('tour_packages').update({ is_published }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/tour-packages')
  revalidatePath('/')
}

export async function saveTourPackage(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    description: formData.get('description') as string,
    price: parseInt(formData.get('price') as string),
    price_label: formData.get('price_label') as string,
    duration: formData.get('duration') as string,
    people: formData.get('people') as string,
    badge: formData.get('badge') as string,
    category: formData.get('category') as string,
    image_url: formData.get('image_url') as string,
    is_published: formData.get('is_published') === 'true',
    highlights: (formData.get('highlights') as string).split('\n').filter(Boolean),
    includes: (formData.get('includes') as string).split('\n').filter(Boolean),
    excludes: (formData.get('excludes') as string).split('\n').filter(Boolean),
  }

  if (id === 'new') {
    const { error } = await supabase.from('tour_packages').insert([data])
    if (error) {
      if (error.code === '23505') throw new Error('A package with this slug already exists. Please modify the slug to make it unique.')
      throw new Error(error.message)
    }
  } else {
    const { error } = await supabase.from('tour_packages').update(data).eq('id', id)
    if (error) {
      if (error.code === '23505') throw new Error('A package with this slug already exists. Please modify the slug to make it unique.')
      throw new Error(error.message)
    }
  }

  revalidatePath('/admin/tour-packages')
  revalidatePath('/')
  redirect('/admin/tour-packages')
}
