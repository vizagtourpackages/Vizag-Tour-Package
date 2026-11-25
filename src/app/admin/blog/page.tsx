import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Check, X, Star, ExternalLink, Clock } from 'lucide-react'
import { deleteBlogPost, toggleBlogFeatured, toggleBlogPublish } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'
import { formatDate } from '@/lib/format'

export const metadata = { title: 'Blog - Admin' }

export default async function BlogAdminPage() {
  const supabase = await createClient()
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, category, is_published, is_featured, published_at, created_at, reading_minutes')
    .order('created_at', { ascending: false })

  const now = Date.now()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Blog</h2>
          <p className="mt-1 text-gray-500">Write articles with images, headings and full SEO controls. Use the star to feature one post at the top of the blog.</p>
        </div>
        <Link href="/admin/blog/new" className="bg-charcoal hover:bg-charcoal/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Plus size={18} /> New post
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          The blog table is not available yet ({error.message}). Run the latest SQL migration in Supabase, then refresh.
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((p) => {
              const scheduled = p.is_published && p.published_at && new Date(p.published_at).getTime() > now
              return (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <form action={toggleBlogFeatured.bind(null, p.id, !p.is_featured)}>
                        <button type="submit" title={p.is_featured ? 'Featured – click to remove' : 'Feature this post'} className="p-1 rounded hover:bg-amber-50">
                          <Star size={18} className={p.is_featured ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                        </button>
                      </form>
                      <div>
                        {p.title}
                        <div className="text-xs font-normal text-gray-400">/blog/{p.slug}{p.reading_minutes ? ` · ${p.reading_minutes} min` : ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{p.category || '—'}</td>
                  <td className="p-4 text-gray-600">{formatDate(p.published_at || p.created_at)}</td>
                  <td className="p-4 text-center">
                    <form action={toggleBlogPublish.bind(null, p.id, !p.is_published)}>
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          scheduled ? 'bg-amber-100 text-amber-700' : p.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {scheduled ? <Clock size={12} /> : p.is_published ? <Check size={12} /> : <X size={12} />}
                        {scheduled ? 'Scheduled' : p.is_published ? 'Published' : 'Draft'}
                      </button>
                    </form>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {p.is_published && !scheduled && (
                        <Link href={`/blog/${p.slug}`} target="_blank" className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg" title="View on site">
                          <ExternalLink size={18} />
                        </Link>
                      )}
                      <Link href={`/admin/blog/${p.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </Link>
                      <form action={deleteBlogPost.bind(null, p.id)}>
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              )
            })}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No posts yet. Click &quot;New post&quot; to write your first article.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
