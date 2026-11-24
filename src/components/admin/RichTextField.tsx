'use client'

import { useState } from 'react'
import RichTextEditor from './RichTextEditor'

/** Rich text editor (with multi-image upload) that submits its HTML in a hidden form field. */
export default function RichTextField({
  name,
  label,
  defaultValue,
  placeholder,
  hint,
}: {
  name: string
  label: string
  defaultValue?: string | null
  placeholder?: string
  hint?: string
}) {
  const [value, setValue] = useState(defaultValue || '')
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-500 mb-2">{hint}</p>}
      <RichTextEditor value={value} onChange={setValue} placeholder={placeholder} />
      <input type="hidden" name={name} value={value} />
    </div>
  )
}
