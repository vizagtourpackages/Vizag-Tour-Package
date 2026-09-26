'use client'

import { useState, useTransition } from 'react'
import { toggleSetting } from '@/app/admin/settings/actions'

interface SettingToggleProps {
  settingKey: string
  initialValue: boolean
}

export default function SettingToggle({ settingKey, initialValue }: SettingToggleProps) {
  const [isPending, startTransition] = useTransition()
  const [isOn, setIsOn] = useState(initialValue)

  const handleToggle = () => {
    const newValue = !isOn
    setIsOn(newValue) // Optimistic update
    
    startTransition(async () => {
      try {
        await toggleSetting(settingKey, newValue ? 'true' : 'false')
      } catch (error) {
        // Revert on error
        setIsOn(!newValue)
        console.error('Failed to toggle setting', error)
      }
    })
  }

  return (
    <button 
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex h-6 w-12 items-center flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 ${isOn ? 'bg-teal' : 'bg-gray-200'} ${isPending ? 'opacity-70' : ''}`}
      role="switch"
      aria-checked={isOn}
    >
      <span className="sr-only">Toggle setting</span>
      <span 
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        style={{ transform: isOn ? 'translateX(1.5rem)' : 'translateX(0)' }}
      />
    </button>
  )
}
