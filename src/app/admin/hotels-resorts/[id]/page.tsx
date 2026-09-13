import { createClient } from '@/lib/supabase/server'
import HotelResortForm from '@/components/admin/HotelResortForm'
import { notFound } from 'next/navigation'

export default async function EditHotelResortPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === 'new'
  let initialData = null
  let initialRoomTypes = []

  if (!isNew) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('hotels_resorts').select('*').eq('id', resolvedParams.id).single()
    if (error || !data) return notFound()
    initialData = data
    
    const { data: rtData } = await supabase.from('resort_room_types').select('*').eq('resort_id', resolvedParams.id)
    if (rtData) initialRoomTypes = rtData
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{isNew ? 'Add New Hotel & Resort' : 'Edit Hotel & Resort'}</h2>
      </div>
      <HotelResortForm initialData={initialData} id={resolvedParams.id} initialRoomTypes={initialRoomTypes} />
    </div>
  )
}
