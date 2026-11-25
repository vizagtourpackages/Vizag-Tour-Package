import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BlogPostForm from '@/components/admin/BlogPostForm'

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'
  const supabase = await createClient()

  let initialData = null
  if (!isNew) {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).maybeSingle()
    if (error || !data) return notFound()
    initialData = data
  }

  const { data: cats } = await supabase.from('blog_posts').select('category')
  const categories = Array.from(new Set((cats || []).map((c: any) => c.category).filter(Boolean))) as string[]

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{isNew ? 'New blog post' : 'Edit blog post'}</h2>
      </div>
      <BlogPostForm initialData={initialData} id={id} categories={categories} />
    </div>
  )
}
