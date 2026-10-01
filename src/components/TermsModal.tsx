'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, FileText } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ReactMarkdown from 'react-markdown'

interface TermsModalProps {
  category: 'travels' | 'packages' | 'resorts' | 'footer' | string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function TermsModal({ category, isOpen, onClose, title = "Terms & Conditions" }: TermsModalProps) {
  const [mounted, setMounted] = useState(false)
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const fetchTerms = async () => {
        setLoading(true)
        setError(null)
        try {
          const supabase = createClient()
          const { data, error } = await supabase
            .from('terms_and_conditions')
            .select('content')
            .eq('category', category)
            .single()
            
          if (error) throw error
          setContent(data?.content || 'No terms and conditions have been specified for this category yet.')
        } catch (err: any) {
          setError('Failed to load terms and conditions.')
        } finally {
          setLoading(false)
        }
      }
      
      fetchTerms()
    }
  }, [isOpen, category])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <div className="w-8 h-8 border-2 border-teal/30 border-t-teal rounded-full animate-spin mb-4" />
              <p>Loading terms...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : (
            <div className="prose prose-sm md:prose-base prose-teal max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-teal">
              <ReactMarkdown>{content || ''}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="btn-primary !py-2.5 !px-6"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
