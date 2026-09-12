'use client'

import { useState } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  bucket: string
  folder: string
  onUpload: (url: string) => void
  defaultImage?: string
}

export default function ImageUpload({ bucket, folder, onUpload, defaultImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage || null)

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      // Request presigned URL from our API
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: filePath,
          contentType: file.type,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to get upload URL')
      }

      const { uploadUrl, fileUrl } = await res.json()

      // Upload file directly to R2 using the presigned URL
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!uploadRes.ok) {
        throw new Error('Failed to upload image to storage')
      }
      
      setPreviewUrl(fileUrl)
      onUpload(fileUrl)
      
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setPreviewUrl(null)
    onUpload('')
  }

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={removeImage}
              className="bg-white text-red-500 p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
            {uploading ? (
              <>
                <Loader2 size={32} className="animate-spin mb-3 text-teal" />
                <p className="text-sm font-semibold">Uploading...</p>
              </>
            ) : (
              <>
                <Upload size={32} className="mb-3 text-gray-400" />
                <p className="text-sm font-semibold mb-1">Click to upload image</p>
                <p className="text-xs text-gray-400">SVG, PNG, JPG or WEBP</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  )
}
