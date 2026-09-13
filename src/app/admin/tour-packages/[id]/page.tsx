import { createClient } from '@/lib/supabase/server'
import TourPackageForm from '@/components/admin/TourPackageForm'
import { notFound } from 'next/navigation'

export default async function EditTourPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === 'new'
  let initialData = null
  let initialDays = []
  let initialHotels = []

  if (!isNew) {
    const supabase = await createClient()
    const { data, error } = await supabase.from('tour_packages').select('*').eq('id', resolvedParams.id).single()
    if (error || !data) return notFound()
    initialData = data

    // Fetch Days and Stops
    const { data: daysData } = await supabase
      .from('package_itinerary_days')
      .select('*, stops:package_itinerary_stops(*)')
      .eq('package_id', resolvedParams.id)
      .order('day_number', { ascending: true })
    
    if (daysData) {
      // Ensure stops are ordered
      initialDays = daysData.map((d: any) => ({
        ...d,
        stops: d.stops.sort((a: any, b: any) => a.display_order - b.display_order)
      }))
    }

    // Fetch Hotels
    const { data: hotelsData } = await supabase
      .from('package_hotels')
      .select('*')
      .eq('package_id', resolvedParams.id)
      .order('created_at', { ascending: true })

    if (hotelsData) {
      initialHotels = hotelsData
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">{isNew ? 'Add New Tour Package' : 'Edit Tour Package'}</h2>
      </div>
      <TourPackageForm initialData={initialData} id={resolvedParams.id} initialDays={initialDays} initialHotels={initialHotels} />
    </div>
  )
}
