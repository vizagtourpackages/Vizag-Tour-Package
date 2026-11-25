'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { readingMinutes, slugify } from '@/lib/content'

function refresh(slug?: string) {
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/blog/rss.xml')
  revalidatePath('/sitemap.xml')
  revalidatePath('/')
  if (slug) revalidatePath(`/blog/${slug}`)
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
  refresh()
}

export async function toggleBlogPublish(id: string, is_published: boolean) {
  const supabase = await createClient()
  const patch: Record<string, any> = { is_published, updated_at: new Date().toISOString() }
  if (is_published) {
    const { data } = await supabase.from('blog_posts').select('published_at').eq('id', id).maybeSingle()
    if (!data?.published_at) patch.published_at = new Date().toISOString()
  }
  const { error } = await supabase.from('blog_posts').update(patch).eq('id', id)
  if (error) throw new Error(error.message)
  refresh()
}

export async function toggleBlogFeatured(id: string, is_featured: boolean) {
  const supabase = await createClient()
  // only one featured post at a time
  if (is_featured) await supabase.from('blog_posts').update({ is_featured: false }).eq('is_featured', true)
  const { error } = await supabase.from('blog_posts').update({ is_featured }).eq('id', id)
  if (error) throw new Error(error.message)
  refresh()
}

export async function saveBlogPost(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const isNew = id === 'new'

  const title = ((formData.get('title') as string) || '').trim()
  if (!title) return { error: 'Please enter a title.' }
  const slug = slugify((formData.get('slug') as string) || title)
  if (!slug) return { error: 'Please enter a valid URL slug.' }

  const content = (formData.get('content') as string) || ''
  const tags = ((formData.get('tags') as string) || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  const isPublished = formData.get('is_published') === 'true'

  // datetime-local gives "YYYY-MM-DDTHH:mm" in the admin's local time; store as ISO
  const rawDate = (formData.get('published_at') as string) || ''
  let publishedAt: string | null = rawDate ? new Date(rawDate).toISOString() : null
  if (isPublished && !publishedAt) publishedAt = new Date().toISOString()

  const nz = (k: string) => ((formData.get(k) as string) || '').trim() || null

  const data = {
    title,
    slug,
    excerpt: nz('excerpt'),
    content,
    cover_image_url: nz('cover_image_url'),
    cover_alt: nz('cover_alt'),
    author_name: nz('author_name') || 'Vizag Tour Packages',
    category: nz('category'),
    tags,
    reading_minutes: readingMinutes(content),
    is_published: isPublished,
    is_featured: formData.get('is_featured') === 'true',
    published_at: publishedAt,
    meta_title: nz('meta_title'),
    meta_description: nz('meta_description'),
    meta_keywords: nz('meta_keywords'),
    og_image_url: nz('og_image_url'),
    canonical_url: nz('canonical_url'),
    noindex: formData.get('noindex') === 'true',
    updated_at: new Date().toISOString(),
  }

  if (data.is_featured) await supabase.from('blog_posts').update({ is_featured: false }).eq('is_featured', true)

  const res = isNew
    ? await supabase.from('blog_posts').insert([data])
    : await supabase.from('blog_posts').update(data).eq('id', id)

  if (res.error) {
    if (res.error.code === '23505') return { error: 'Another post already uses this URL slug. Please change the slug.' }
    return { error: res.error.message }
  }

  refresh(slug)
  redirect('/admin/blog')
}
