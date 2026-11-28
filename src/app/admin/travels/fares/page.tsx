import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { readFares } from '@/lib/fares'
import TravelTabs from '@/components/admin/TravelTabs'
import FareTableEditor from '@/components/admin/FareTableEditor'

export const metadata = { title: 'Fare Table - Admin' }

export default async function FaresPage() {
  const supabase = await createClient()
  const [{ data: vehicles }, rows] = await Promise.all([
    supabase.from('travels').select('id, model, pax, is_published').order('display_order', { ascending: true }),
    readFares(supabase),
  ])
  const fleet = (vehicles || []).filter(v => v.is_published)

  return (
    <div className="max-w-6xl mx-auto pb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Fare Table</h2>
        <p className="mt-1 text-gray-500">
          Fares shown on the Travels page. Add a journey, then enter a price for each vehicle that can do it.
        </p>
      </div>
      <TravelTabs active="fares" />
      {fleet.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          Publish a vehicle first. <Link href="/admin/travels/new" className="font-semibold text-teal underline">Add a vehicle</Link>
        </p>
      ) : (
        <FareTableEditor vehicles={fleet} initialRows={rows} />
      )}
    </div>
  )
}
