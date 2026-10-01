'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Bold, Italic, Underline, Link as LinkIcon, Heading2, Heading3, List, ListOrdered, Image as ImageIcon, LayoutGrid, X, Loader2, MousePointerClick } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [showImageRowModal, setShowImageRowModal] = useState(false)
  const [uploading, setUploading] = useState(false)

  const savedRangeRef = useRef<Range | null>(null)

  // Initialize content only once
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, []) // Empty dependency array means this only runs once on mount

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const saveSelection = () => {
    // Insert a hidden marker right where the cursor is blinking
    document.execCommand('insertHTML', false, '<span id="rich-text-cursor-marker"></span>')
  }

  const restoreSelection = () => {
    editorRef.current?.focus()
    const marker = document.getElementById('rich-text-cursor-marker')
    if (marker) {
      const selection = window.getSelection()
      if (selection) {
        const range = document.createRange()
        // Select the marker itself so the next insertHTML overwrites it cleanly
        range.selectNode(marker)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  const cleanupMarker = () => {
    const marker = document.getElementById('rich-text-cursor-marker')
    if (marker) {
      marker.remove()
      handleInput()
    }
  }

  const execCommand = (command: string, value: string | undefined = undefined) => {
    restoreSelection()
    document.execCommand(command, false, value)
    handleInput()
    editorRef.current?.focus()
  }

  const handleLink = () => {
    saveSelection()
    const url = prompt('Enter link URL:')
    if (url) {
      restoreSelection()
      document.execCommand('createLink', false, url)
      handleInput()
    } else {
      cleanupMarker()
    }
  }

  const handleAddButton = () => {
    saveSelection()
    const text = prompt('Enter button text (e.g., Book Now):')
    if (!text) {
      cleanupMarker()
      return
    }
    const url = prompt('Enter button link URL:')
    if (!url) {
      cleanupMarker()
      return
    }
    restoreSelection()
    const btnHtml = `&nbsp;<a href="${url}" class="inline-block bg-teal text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-teal-dark hover:shadow-lg transition-all my-4 text-center no-underline cursor-pointer">${text}</a>&nbsp;`
    document.execCommand('insertHTML', false, btnHtml)
    handleInput()
  }

  const uploadFile = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `blog/${fileName}`

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: filePath, contentType: file.type }),
    })

    if (!res.ok) throw new Error('Failed to get upload URL')
    const { uploadUrl, fileUrl } = await res.json()

    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    })

    if (!uploadRes.ok) throw new Error('Failed to upload image')
    return fileUrl
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      cleanupMarker()
      return
    }
    try {
      setUploading(true)
      const url = await uploadFile(e.target.files[0])
      restoreSelection()
      const imgHtml = `<img src="${url}" alt="Uploaded image" class="rounded-xl my-4 max-w-full h-auto" />`
      document.execCommand('insertHTML', false, imgHtml)
      handleInput()
    } catch (err: any) {
      alert(err.message)
      cleanupMarker()
    } finally {
      setUploading(false)
      if (e.target) e.target.value = ''
    }
  }

  return (
    <div className="border rounded-xl bg-white overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap items-center gap-1">
        <ToolbarButton icon={<Bold size={16} />} onClick={() => execCommand('bold')} tooltip="Bold" />
        <ToolbarButton icon={<Italic size={16} />} onClick={() => execCommand('italic')} tooltip="Italic" />
        <ToolbarButton icon={<Underline size={16} />} onClick={() => execCommand('underline')} tooltip="Underline" />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton icon={<LinkIcon size={16} />} onClick={handleLink} tooltip="Link" />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton icon={<Heading2 size={16} />} onClick={() => execCommand('formatBlock', 'H2')} tooltip="Heading 2" />
        <ToolbarButton icon={<Heading3 size={16} />} onClick={() => execCommand('formatBlock', 'H3')} tooltip="Heading 3" />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <ToolbarButton icon={<List size={16} />} onClick={() => execCommand('insertUnorderedList')} tooltip="Bullet List" />
        <ToolbarButton icon={<ListOrdered size={16} />} onClick={() => execCommand('insertOrderedList')} tooltip="Numbered List" />
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        {/* Single Image Upload */}
        <label 
          onMouseDown={(e) => e.preventDefault()}
          className="p-2 hover:bg-gray-200 rounded cursor-pointer transition-colors relative group" 
          title="Insert Image" 
          onClick={saveSelection}
        >
          {uploading ? <Loader2 size={16} className="animate-spin text-teal" /> : <ImageIcon size={16} />}
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
        </label>

        {/* Image Row Button */}
        <button 
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            saveSelection()
            setShowImageRowModal(true)
          }}
          className="p-2 hover:bg-gray-200 rounded cursor-pointer transition-colors flex items-center gap-1.5 text-sm font-medium text-gray-700"
          title="Insert Image Row"
        >
          <LayoutGrid size={16} /> Image Row
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Add CTA Button */}
        <button 
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleAddButton}
          className="p-2 hover:bg-gray-200 rounded cursor-pointer transition-colors flex items-center gap-1.5 text-sm font-medium text-gray-700"
          title="Insert Call to Action Button"
        >
          <MousePointerClick size={16} /> Add Button
        </button>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        className="p-4 min-h-[300px] max-h-[800px] overflow-y-auto resize-y prose prose-charcoal max-w-none focus:outline-none"
        contentEditable
        onInput={handleInput}
        onBlur={() => {
          handleInput()
          saveSelection()
        }}
        suppressContentEditableWarning
        placeholder={placeholder}
      />

      {/* Image Row Modal */}
      {showImageRowModal && (
        <ImageRowModal 
          onClose={() => {
            cleanupMarker()
            setShowImageRowModal(false)
          }}
          onInsert={(html) => {
            restoreSelection()
            document.execCommand('insertHTML', false, html)
            handleInput()
            setShowImageRowModal(false)
          }}
          uploadFile={uploadFile}
        />
      )}
    </div>
  )
}

function ToolbarButton({ icon, onClick, tooltip }: { icon: React.ReactNode, onClick: () => void, tooltip: string }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="p-2 hover:bg-gray-200 rounded transition-colors text-gray-700"
      title={tooltip}
    >
      {icon}
    </button>
  )
}

function ImageRowModal({ onClose, onInsert, uploadFile }: { onClose: () => void, onInsert: (html: string) => void, uploadFile: (file: File) => Promise<string> }) {
  const [columns, setColumns] = useState(2)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const handleMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    try {
      setUploading(true)
      const newImages = [...images]
      for (let i = 0; i < e.target.files.length; i++) {
        const url = await uploadFile(e.target.files[i])
        newImages.push(url)
      }
      setImages(newImages)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleInsert = () => {
    if (images.length === 0) return
    const gridCols = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'
    const html = `
      <div class="grid ${gridCols} gap-4 my-6">
        ${images.map(url => `
          <div class="aspect-square relative overflow-hidden rounded-xl bg-gray-100" style="aspect-ratio: 1/1; position: relative;">
            <img src="${url}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; margin: 0;" alt="Grid image" />
          </div>
        `).join('')}
      </div>
    `
    onInsert(html)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold text-lg">Insert Image Row</h3>
          <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Columns (Images per row)</label>
            <div className="flex gap-2">
              {[2, 3, 4].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setColumns(num)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-colors ${columns === num ? 'bg-teal text-white border-teal' : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'}`}
                >
                  {num} Columns
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 min-h-[120px]">
              {uploading ? (
                <div className="flex flex-col items-center text-gray-500">
                  <Loader2 className="animate-spin mb-2 text-teal" size={24} />
                  <span className="text-sm">Uploading images...</span>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center text-gray-500 hover:text-teal transition-colors">
                  <ImageIcon size={32} className="mb-2" />
                  <span className="text-sm font-medium">Click to upload multiple images</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleMultipleUpload} />
                </label>
              )}
            </div>
            
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="aspect-square relative rounded-lg overflow-hidden border">
                    <img src={img} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 bg-white rounded-full p-0.5 text-red-500 shadow"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
          <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg font-medium border bg-white hover:bg-gray-50">Cancel</button>
          <button type="button" onClick={handleInsert} disabled={images.length === 0 || uploading} className="px-5 py-2 rounded-lg font-medium bg-teal text-white hover:bg-teal-dark disabled:opacity-50">
            Insert Images
          </button>
        </div>
      </div>
    </div>
  )
}
