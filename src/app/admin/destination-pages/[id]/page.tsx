import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import DestinationPageForm from '@/components/admin/DestinationPageForm'

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()

  const { data: page } = await supabase
    .from('destination_pages')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!page) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Destination Page: {page.name}</h1>
        <p className="text-gray-500 mt-1">Update the content, highlights, and images for this destination.</p>
      </div>

      <DestinationPageForm initialData={page} />
    </div>
  )
}
