'use client'

import { useState, useTransition } from 'react'
import { toggleSetting } from '@/app/admin/settings/actions'

interface SettingInputProps {
  settingKey: string
  initialValue: string
  placeholder?: string
}

export default function SettingInput({ settingKey, initialValue, placeholder }: SettingInputProps) {
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(initialValue)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(false)
    startTransition(async () => {
      try {
        await toggleSetting(settingKey, value)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } catch (error) {
        console.error('Failed to save setting', error)
      }
    })
  }

  return (
    <div className="flex gap-2 w-full mt-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none"
      />
      <button
        onClick={handleSave}
        disabled={isPending || value === initialValue && !saved}
        className="px-4 py-2 bg-charcoal text-white font-bold rounded-lg hover:bg-charcoal/90 disabled:opacity-50 transition-colors"
      >
        {isPending ? 'Saving...' : saved ? 'Saved!' : 'Save'}
      </button>
    </div>
  )
}
