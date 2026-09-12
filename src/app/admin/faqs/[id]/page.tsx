import { createClient } from '@/lib/supabase/server'
import FaqForm from '@/components/admin/FaqForm'
import { notFound } from 'next/navigation'

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === 'new'
  let initialData = null

  if (!isNew) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('faqs').select('*').eq('id', resolvedParams.id).single()
    if (error || !data) return notFound()
    initialData = data
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{isNew ? 'Add New FAQ' : 'Edit FAQ'}</h2>
      </div>
      <FaqForm initialData={initialData} id={resolvedParams.id} />
    </div>
  )
}
