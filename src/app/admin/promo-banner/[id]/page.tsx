import { createClient } from '@/lib/supabase/server'
import PromoBannerForm from '@/components/admin/PromoBannerForm'
import { notFound } from 'next/navigation'

export default async function EditPromoBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let initialData = null
  let initialImages: {image_url: string}[] = []
  
  if (id !== 'new') {
    const supabase = await createClient()
    const { data } = await supabase.from('promo_banner').select('*').eq('id', id).single()
    if (!data) notFound()
    initialData = data

    const { data: images } = await supabase.from('promo_banner_images').select('image_url').eq('banner_id', id).order('display_order', { ascending: true })
    if (images) {
      initialImages = images
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">
          {id === 'new' ? 'Add Promo Banner' : 'Edit Promo Banner'}
        </h1>
      </div>
      
      <PromoBannerForm id={id} initialData={initialData} initialImages={initialImages} />
    </div>
  )
}
