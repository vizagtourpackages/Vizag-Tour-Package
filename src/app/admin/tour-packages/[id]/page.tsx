import { createClient } from '@/lib/supabase/server'
import TourPackageForm from '@/components/admin/TourPackageForm'
import { notFound } from 'next/navigation'

export default async function EditTourPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === 'new'
  let initialData = null

  if (!isNew) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('tour_packages').select('*').eq('id', resolvedParams.id).single()
    if (error || !data) return notFound()
    initialData = data
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{isNew ? 'Add New Tour Package' : 'Edit Tour Package'}</h2>
      </div>
      <TourPackageForm initialData={initialData} id={resolvedParams.id} />
    </div>
  )
}
