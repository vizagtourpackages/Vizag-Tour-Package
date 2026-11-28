'use client'

import { useState } from 'react'
import { Loader2, Plus, X } from 'lucide-react'
import { compressImage } from '@/lib/compressImage'

async function uploadOne(original: File, folder: string): Promise<string> {
  const file = await compressImage(original)
  const ext = file.name.split('.').pop()
  const filePath = `${folder}/${Math.random().toString(36).substring(2, 15)}.${ext}`
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: filePath, contentType: file.type }),
  })
  if (!res.ok) throw new Error('Failed to get upload URL')
  const { uploadUrl, fileUrl } = await res.json()
  const up = await fetch(uploadUrl, { method: 'PUT', body: file, headers: { 'Content-Type': file.type } })
  if (!up.ok) throw new Error('Failed to upload image')
  return fileUrl
}

/** Upload several images at once; shows thumbnails with remove buttons. */
export default function MultiImageUpload({
  folder,
  value,
  onChange,
}: {
  folder: string
  value: string[]
  onChange: (urls: string[]) => void
}) {
  const [uploading, setUploading] = useState(false)

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    e.target.value = ''
    if (!files.length) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const f of files) urls.push(await uploadOne(f, folder))
      onChange([...value, ...urls])
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {value.map((url, i) => (
        <div key={url + i} className="relative w-24 h-24 rounded-lg overflow-hidden border bg-gray-50 group">
          <img src={url} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <label className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 hover:border-coral hover:bg-coral/5 flex flex-col items-center justify-center text-xs text-gray-500 cursor-pointer transition-colors">
        {uploading ? <Loader2 size={20} className="animate-spin text-coral" /> : <Plus size={20} />}
        <span className="mt-1">{uploading ? 'Uploading' : 'Add images'}</span>
        <input type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} disabled={uploading} />
      </label>
    </div>
  )
}
