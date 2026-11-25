'use client'

import { useState, useTransition } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { changePassword, saveSettings } from '@/app/admin/settings/actions'
import ImageUpload from './ImageUpload'
import EntityPicker from './EntityPicker'

const card = 'bg-white rounded-xl shadow-sm border border-gray-100 p-6'
const input = 'w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none'
const label = 'block text-sm font-medium text-gray-700 mb-1'

function SaveBar({ pending, saved, error, text = 'Save changes' }: { pending: boolean; saved: boolean; error: string; text?: string }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button type="submit" disabled={pending} className="px-5 py-2.5 bg-charcoal text-white font-bold rounded-lg hover:bg-charcoal/90 disabled:opacity-50 inline-flex items-center gap-2">
        {pending && <Loader2 size={16} className="animate-spin" />} {text}
      </button>
      {saved && <span className="text-sm font-medium text-emerald-700 inline-flex items-center gap-1"><Check size={16} /> Saved</span>}
      {error && <span className="text-sm font-medium text-red-600">{error}</span>}
    </div>
  )
}

/** Generic "save these keys" hook used by each panel. */
function useSave() {
  const [pending, start] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const run = (values: Record<string, string>) => {
    setSaved(false)
    setError('')
    start(async () => {
      const res = await saveSettings(values)
      if (res.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
      } else setError(res.error || 'Could not save')
    })
  }
  return { pending, saved, error, run }
}

// ------------------------------------------------------------------ contact + social
export function ContactPanel({ initial }: { initial: Record<string, string> }) {
  const [v, setV] = useState(initial)
  const { pending, saved, error, run } = useSave()
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value })
  return (
    <form onSubmit={e => { e.preventDefault(); run(v) }} className={card + ' space-y-4'}>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Contact information</h2>
        <p className="text-sm text-gray-500 mt-1">Shown in the footer, contact page and wherever the site links to call, email or WhatsApp.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className={label}>Phone (calls)</label><input className={input} value={v.contact_phone} onChange={set('contact_phone')} placeholder="+917780739851" /></div>
        <div><label className={label}>WhatsApp number</label><input className={input} value={v.contact_whatsapp} onChange={set('contact_whatsapp')} placeholder="+917780739851" /><p className="text-xs text-gray-500 mt-1">With country code. All WhatsApp buttons use this number.</p></div>
        <div><label className={label}>Email</label><input type="email" className={input} value={v.contact_email} onChange={set('contact_email')} /></div>
        <div><label className={label}>Landline</label><input className={input} value={v.contact_landline} onChange={set('contact_landline')} /></div>
      </div>
      <div><label className={label}>Address</label><textarea rows={2} className={input} value={v.contact_address} onChange={set('contact_address')} /></div>
      <SaveBar pending={pending} saved={saved} error={error} />
    </form>
  )
}

export function SocialPanel({ initial }: { initial: Record<string, string> }) {
  const [v, setV] = useState(initial)
  const { pending, saved, error, run } = useSave()
  const fields: [string, string, string][] = [
    ['social_facebook', 'Facebook', 'https://facebook.com/yourpage'],
    ['social_instagram', 'Instagram', 'https://instagram.com/yourhandle'],
    ['social_youtube', 'YouTube', 'https://youtube.com/@yourchannel'],
    ['social_x', 'X (Twitter)', 'https://x.com/yourhandle'],
    ['social_linkedin', 'LinkedIn', 'https://linkedin.com/company/yourcompany'],
  ]
  return (
    <form onSubmit={e => { e.preventDefault(); run(v) }} className={card + ' space-y-4'}>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Social media</h2>
        <p className="text-sm text-gray-500 mt-1">Icons appear in the footer, right after the description. Leave a field empty to hide that icon.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([k, name, ph]) => (
          <div key={k}><label className={label}>{name}</label><input type="url" className={input} value={v[k]} onChange={e => setV({ ...v, [k]: e.target.value })} placeholder={ph} /></div>
        ))}
      </div>
      <SaveBar pending={pending} saved={saved} error={error} />
    </form>
  )
}

// ------------------------------------------------------------------ home hero
export function HeroPanel({ initial, packages }: { initial: Record<string, string>; packages: { id: string; title: string }[] }) {
  const [v, setV] = useState(initial)
  const { pending, saved, error, run } = useSave()
  return (
    <form onSubmit={e => { e.preventDefault(); run(v) }} className={card + ' space-y-6'}>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Home hero</h2>
        <p className="text-sm text-gray-500 mt-1">The large arch image shows a package with its description. The two smaller images can point anywhere you like.</p>
      </div>

      <div>
        <label className={label}>First (large) image – package</label>
        <select className={input} value={v.hero_package_id} onChange={e => setV({ ...v, hero_package_id: e.target.value })}>
          <option value="">Automatic (first featured package)</option>
          {packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </div>

      {(['2', '3'] as const).map(n => (
        <div key={n} className="rounded-lg border bg-gray-50 p-4">
          <h3 className="font-bold text-gray-800 mb-3">Image {n}</h3>
          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <ImageUpload key={v[`hero_image_${n}`] || `empty-${n}`} bucket="site-images" folder="hero" defaultImage={v[`hero_image_${n}`]} onUpload={url => setV(prev => ({ ...prev, [`hero_image_${n}`]: url }))} />
            <div>
              <label className={label}>Target URL</label>
              <input className={input} value={v[`hero_image_${n}_url`]} onChange={e => setV({ ...v, [`hero_image_${n}_url`]: e.target.value })} placeholder="/packages/my-package or https://…" />
              <p className="text-xs text-gray-500 mt-1">Where the image links to. Leave empty to link to Tour Packages.</p>
              {v[`hero_image_${n}`] && (
                <button type="button" onClick={() => setV({ ...v, [`hero_image_${n}`]: '', [`hero_image_${n}_url`]: '' })} className="mt-3 text-sm font-medium text-red-600 hover:underline">Remove image (use a package photo instead)</button>
              )}
            </div>
          </div>
        </div>
      ))}
      <SaveBar pending={pending} saved={saved} error={error} />
    </form>
  )
}

// ------------------------------------------------------------------ blog sidebar
export function BlogSidebarPanel({ initialIds, packages }: { initialIds: string[]; packages: { id: string; title: string; subtitle?: string; image?: string | null }[] }) {
  const [ids, setIds] = useState<string[]>(initialIds.slice(0, 5))
  const { pending, saved, error, run } = useSave()
  const onChange = (next: string[]) => {
    // keep selection order, max 5
    setIds(next.slice(0, 5))
  }
  return (
    <form onSubmit={e => { e.preventDefault(); run({ blog_sidebar_packages: JSON.stringify(ids) }) }} className={card + ' space-y-4'}>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Blog sidebar packages</h2>
        <p className="text-sm text-gray-500 mt-1">Choose up to 5 packages. They float in the right sidebar of every blog post as a list with image and starting price.</p>
      </div>
      <p className="text-sm font-semibold text-gray-700">{ids.length} / 5 selected{ids.length >= 5 && <span className="ml-2 font-normal text-amber-700">(limit reached – untick one to swap)</span>}</p>
      <EntityPicker items={packages} value={ids} onChange={onChange} emptyText="No packages yet." />
      <SaveBar pending={pending} saved={saved} error={error} />
    </form>
  )
}

// ------------------------------------------------------------------ security
export function SecurityPanel() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setMsg(null)
    if (next !== confirm) return setMsg({ ok: false, text: 'New password and confirmation do not match.' })
    start(async () => {
      const res = await changePassword(current, next)
      if (res.success) {
        setMsg({ ok: true, text: 'Password updated.' })
        setCurrent(''); setNext(''); setConfirm('')
      } else setMsg({ ok: false, text: res.error || 'Could not update password.' })
    })
  }

  return (
    <form onSubmit={submit} className={card + ' space-y-4'}>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Security</h2>
        <p className="text-sm text-gray-500 mt-1">Change the password for the account you are signed in with.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><label className={label}>Current password</label><input type="password" autoComplete="current-password" required className={input} value={current} onChange={e => setCurrent(e.target.value)} /></div>
        <div><label className={label}>New password</label><input type="password" autoComplete="new-password" required minLength={8} className={input} value={next} onChange={e => setNext(e.target.value)} /></div>
        <div><label className={label}>Confirm new password</label><input type="password" autoComplete="new-password" required minLength={8} className={input} value={confirm} onChange={e => setConfirm(e.target.value)} /></div>
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="px-5 py-2.5 bg-charcoal text-white font-bold rounded-lg hover:bg-charcoal/90 disabled:opacity-50 inline-flex items-center gap-2">
          {pending && <Loader2 size={16} className="animate-spin" />} Update password
        </button>
        {msg && <span className={`text-sm font-medium ${msg.ok ? 'text-emerald-700' : 'text-red-600'}`}>{msg.text}</span>}
      </div>
    </form>
  )
}
