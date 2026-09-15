import { createClient } from '@/lib/supabase/server'
import UpdatesOffersForm from '@/components/admin/UpdatesOffersForm'
import { notFound } from 'next/navigation'

export default async function EditUpdateOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let initialData = null
  
  if (id !== 'new') {
    const supabase = await createClient()
    const { data } = await supabase.from('latest_updates_offers').select('*').eq('id', id).single()
    if (!data) notFound()
    initialData = data
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">
          {id === 'new' ? 'Add Item' : 'Edit Item'}
        </h1>
      </div>
      
      <UpdatesOffersForm id={id} initialData={initialData} />
    </div>
  )
}
