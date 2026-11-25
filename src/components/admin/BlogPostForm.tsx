'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'
import { saveBlogPost } from '@/app/admin/blog/actions'
import ImageUpload from './ImageUpload'
import RichTextField from './RichTextField'
import { readingMinutes, slugify, stripHtml } from '@/lib/content'

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://vizagtourpackages.com').replace(/\/$/, '')

const box = 'bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100'
const input = 'w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none'
const lab = 'block text-sm font-medium text-gray-700 mb-1'

/** "2026-11-25T14:30" in local time for <input type="datetime-local"> */
function toLocalInput(iso?: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

function Counter({ value, ideal, max }: { value: number; ideal: [number, number]; max: number }) {
  const ok = value >= ideal[0] && value <= ideal[1]
  const over = value > max
  return (
    <span className={`text-xs font-medium ${over ? 'text-red-600' : ok ? 'text-emerald-600' : 'text-gray-400'}`}>
      {value} / {ideal[1]} characters
    </span>
  )
}

export default function BlogPostForm({ initialData, id, categories = [] }: { initialData?: any; id: string; categories?: string[] }) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [slugEdited, setSlugEdited] = useState(!!initialData?.slug)
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [cover, setCover] = useState(initialData?.cover_image_url || '')
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '')
  const [metaDesc, setMetaDesc] = useState(initialData?.meta_description || '')
  const [published, setPublished] = useState(initialData ? !!initialData.is_published : false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const effTitle = metaTitle || title
  const effDesc = metaDesc || excerpt || stripHtml(content).slice(0, 160)
  const words = useMemo(() => stripHtml(content).split(/\s+/).filter(Boolean).length, [content])
  const headings = useMemo(() => (content.match(/<h[23][\s>]/gi) || []).length, [content])
  const images = useMemo(() => (content.match(/<img\s/gi) || []).length, [content])

  // simple on-page SEO checklist
  const checks = [
    { ok: title.length >= 20 && title.length <= 70, text: 'Title is 20–70 characters' },
    { ok: !!slug && slug.length <= 75, text: 'Short, readable URL slug' },
    { ok: effDesc.length >= 70 && effDesc.length <= 160, text: 'Meta description is 70–160 characters' },
    { ok: words >= 400, text: `At least 400 words (now ${words})` },
    { ok: headings >= 2, text: 'Uses 2+ headings (H2 / H3) – they build the table of contents' },
    { ok: !!cover, text: 'Has a cover image' },
    { ok: images >= 1 || !!cover, text: 'Includes images' },
  ]

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    fd.set('id', id)
    fd.set('cover_image_url', cover)
    try {
      const res = await saveBlogPost(fd)
      if (res?.error) {
        setError(res.error)
        setLoading(false)
      }
    } catch (err: any) {
      // redirect() throws NEXT_REDIRECT on success – not an error
      if (!String(err?.message || '').includes('NEXT_REDIRECT')) {
        setError(err?.message || 'Could not save the post.')
        setLoading(false)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* ---- Content ---- */}
      <div className={box + ' space-y-5'}>
        <h3 className="text-lg font-bold text-gray-900 border-b pb-3">Post</h3>
        <div>
          <label className={lab}>Title *</label>
          <input
            name="title"
            required
            value={title}
            onChange={e => { setTitle(e.target.value); if (!slugEdited) setSlug(slugify(e.target.value)) }}
            className={input + ' text-lg font-semibold'}
            placeholder="e.g. 15 Best Places to Visit in Vizag in 2026"
          />
        </div>
        <div>
          <label className={lab}>URL slug *</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 shrink-0">/blog/</span>
            <input name="slug" required value={slug} onChange={e => { setSlug(slugify(e.target.value)); setSlugEdited(true) }} className={input} />
          </div>
        </div>
        <div>
          <div className="flex justify-between"><label className={lab}>Excerpt (shown on cards and under the title)</label><Counter value={excerpt.length} ideal={[70, 160]} max={200} /></div>
          <textarea name="excerpt" rows={2} value={excerpt} onChange={e => setExcerpt(e.target.value)} className={input} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={lab}>Category</label>
            <input name="category" list="blog-categories" defaultValue={initialData?.category || ''} className={input} placeholder="e.g. Travel tips" />
            <datalist id="blog-categories">{categories.map(c => <option key={c} value={c} />)}</datalist>
          </div>
          <div>
            <label className={lab}>Author</label>
            <input name="author_name" defaultValue={initialData?.author_name || 'Vizag Tour Packages'} className={input} />
          </div>
        </div>
        <div>
          <label className={lab}>Tags (comma separated)</label>
          <input name="tags" defaultValue={(initialData?.tags || []).join(', ')} className={input} placeholder="araku, beaches, itinerary" />
        </div>
        <RichTextField
          name="content"
          label="Article"
          defaultValue={initialData?.content}
          hint="Use Heading 2 / Heading 3 for sections (they become the table of contents). Add images and buttons from the toolbar."
          onValueChange={setContent}
        />
      </div>

      {/* ---- Cover ---- */}
      <div className={box + ' space-y-4'}>
        <h3 className="text-lg font-bold text-gray-900 border-b pb-3">Cover image</h3>
        <div className="max-w-md"><ImageUpload bucket="site-images" folder="blog" defaultImage={cover} onUpload={setCover} /></div>
        <div>
          <label className={lab}>Image description (alt text – helps SEO and accessibility)</label>
          <input name="cover_alt" defaultValue={initialData?.cover_alt || ''} className={input} placeholder="e.g. Rushikonda beach at sunrise" />
        </div>
      </div>

      {/* ---- SEO ---- */}
      <div className={box + ' space-y-5'}>
        <h3 className="text-lg font-bold text-gray-900 border-b pb-3">SEO</h3>

        {/* Google-style preview */}
        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Search result preview</p>
          <p className="text-xs text-gray-600 truncate">{SITE}/blog/{slug || 'your-post'}</p>
          <p className="text-[1.15rem] leading-snug text-blue-700 mt-0.5 line-clamp-1">{effTitle || 'Post title'}</p>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{effDesc || 'The description shown under the title in search results.'}</p>
        </div>

        <div>
          <div className="flex justify-between"><label className={lab}>SEO title (defaults to the post title)</label><Counter value={effTitle.length} ideal={[30, 60]} max={70} /></div>
          <input name="meta_title" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className={input} />
        </div>
        <div>
          <div className="flex justify-between"><label className={lab}>Meta description (defaults to the excerpt)</label><Counter value={effDesc.length} ideal={[70, 160]} max={170} /></div>
          <textarea name="meta_description" rows={2} value={metaDesc} onChange={e => setMetaDesc(e.target.value)} className={input} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={lab}>Focus keywords (comma separated)</label><input name="meta_keywords" defaultValue={initialData?.meta_keywords || ''} className={input} /></div>
          <div><label className={lab}>Canonical URL (optional)</label><input name="canonical_url" defaultValue={initialData?.canonical_url || ''} className={input} placeholder="Leave empty unless this post is a copy" /></div>
        </div>
        <div>
          <label className={lab}>Social share image (optional – defaults to the cover image)</label>
          <input name="og_image_url" defaultValue={initialData?.og_image_url || ''} className={input} placeholder="https://…" />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="noindex" value="true" defaultChecked={!!initialData?.noindex} className="w-5 h-5 rounded border-gray-300" />
          <span className="text-sm text-gray-700">Hide this post from search engines (noindex)</span>
        </label>

        {/* checklist */}
        <div className="rounded-lg border p-4">
          <p className="text-sm font-bold text-gray-800 mb-2">SEO checklist <span className="font-normal text-gray-400">· ~{readingMinutes(content)} min read</span></p>
          <ul className="space-y-1.5">
            {checks.map(c => (
              <li key={c.text} className={`flex items-start gap-2 text-sm ${c.ok ? 'text-emerald-700' : 'text-amber-700'}`}>
                {c.ok ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <AlertTriangle size={16} className="mt-0.5 shrink-0" />} {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Publishing ---- */}
      <div className={box + ' space-y-4'}>
        <h3 className="text-lg font-bold text-gray-900 border-b pb-3">Publishing</h3>
        <div className="max-w-md space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" value="true" checked={published} onChange={e => setPublished(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-teal focus:ring-teal" />
            <span className="font-medium text-gray-800">Published</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_featured" value="true" defaultChecked={!!initialData?.is_featured} className="w-5 h-5 rounded border-gray-300 text-teal focus:ring-teal" />
            <span className="font-medium text-gray-800">Featured post (big card at the top of the blog)</span>
          </label>
          <div>
            <label className={lab}>Publish date &amp; time</label>
            <input type="datetime-local" name="published_at" defaultValue={toLocalInput(initialData?.published_at)} className={input} />
            <p className="text-xs text-gray-500 mt-1">Leave empty to publish now. A future date schedules the post — it appears automatically at that time.</p>
          </div>
        </div>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</div>}

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-3 sticky bottom-4 z-20">
        <Link href="/admin/blog" className="px-6 py-2.5 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</Link>
        <button type="submit" disabled={loading} className="px-8 py-2.5 bg-charcoal text-white rounded-lg font-bold hover:bg-charcoal/90 disabled:opacity-50 inline-flex items-center gap-2">
          {loading && <Loader2 size={16} className="animate-spin" />} {id === 'new' ? 'Create post' : 'Save post'}
        </button>
      </div>
    </form>
  )
}
