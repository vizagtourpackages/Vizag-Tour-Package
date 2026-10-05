'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, FileText, CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import ReactMarkdown from 'react-markdown'
import { siteInfo } from '@/data/siteInfo'

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
        <div className="flex items-start justify-between px-6 py-5 bg-teal text-white shrink-0">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-heading">
              <CheckCircle2 size={20} className="text-white/90" />
              <h2 className="text-lg font-bold">{siteInfo.name || "Vizag Tour Packages"}</h2>
            </div>
            <p className="text-sm text-white/80 font-medium ml-7">{title}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
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
            <div className="text-gray-700">
              <ReactMarkdown
                components={{
                  ul: ({ node, ...props }) => <ul className="space-y-4" {...props} />,
                  li: ({ node, ...props }) => (
                    <li className="bg-white border border-gray-200 border-l-4 border-l-teal rounded-xl shadow-sm p-4 text-sm md:text-base flex flex-col gap-1" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="leading-relaxed" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-gray-900 text-base mb-1 block" {...props} />,
                  h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-900 mb-3" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-gray-900 mb-2" {...props} />,
                }}
              >
                {content 
                  ? content.split('\n')
                      .filter(line => line.trim().length > 0)
                      .map(line => line.trim().startsWith('-') || line.trim().startsWith('*') ? line : `- ${line}`)
                      .join('\n')
                  : ''}
              </ReactMarkdown>
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
