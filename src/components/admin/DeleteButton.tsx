'use client'

import { Trash2 } from 'lucide-react'

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
      onClick={(e) => {
        if (!confirm('Are you sure you want to delete this item?')) {
          e.preventDefault()
        }
      }}
    >
      <Trash2 size={18} />
    </button>
  )
}
