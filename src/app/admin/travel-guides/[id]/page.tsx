import { createClient } from '@/lib/supabase/server'
import TravelGuideForm from '@/components/admin/TravelGuideForm'
import { notFound } from 'next/navigation'

export default async function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === 'new'
  let initialData = null

  if (!isNew) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('travel_guides').select('*').eq('id', resolvedParams.id).single()
    if (error || !data) return notFound()
    initialData = data
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{isNew ? 'Add New Travel Guide' : 'Edit Travel Guide'}</h2>
      </div>
      <TravelGuideForm initialData={initialData} id={resolvedParams.id} />
    </div>
  )
}
