'use client'

import { useState } from 'react'
import TermsModal from './TermsModal'

export default function TermsButton({ category, label = "Terms & Conditions", className = "underline hover:text-teal cursor-pointer" }: { category: string, label?: string, className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <span onClick={() => setIsOpen(true)} className={className}>
        {label}
      </span>
      <TermsModal 
        category={category} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title={`${category.charAt(0).toUpperCase() + category.slice(1)} Terms & Conditions`}
      />
    </>
  )
}
