import { createClient } from '@/lib/supabase/server'
import HillStationForm from '@/components/admin/HillStationForm'
import { notFound } from 'next/navigation'

export default async function EditHillStationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let initialData = null
  
  if (id !== 'new') {
    const supabase = await createClient()
    const { data } = await supabase.from('hill_station_escapes').select('*').eq('id', id).single()
    if (!data) notFound()
    initialData = data
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">
          {id === 'new' ? 'Add Hill Station' : 'Edit Hill Station'}
        </h1>
      </div>
      
      <HillStationForm id={id} initialData={initialData} />
    </div>
  )
}
