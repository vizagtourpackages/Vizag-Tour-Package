import { createClient } from '@/lib/supabase/server'
import SeoForm from '@/components/admin/SeoForm'

export const metadata = {
  title: 'Global SEO Settings - Admin',
}

export default async function SeoSettingsPage() {
  const supabase = await createClient()
  
  // Try to fetch page_seo; this will fail if the user hasn't run the SQL script yet
  const { data: pages, error } = await supabase
    .from('page_seo')
    .select('*')
    .order('page_slug', { ascending: true })

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Global SEO Settings</h1>
        <p className="text-gray-500 mt-2">Manage the Meta Title, Description, and Keywords for primary pages.</p>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100">
          <h3 className="font-bold text-lg mb-2">Database Table Missing</h3>
          <p>The <code>page_seo</code> table does not exist in Supabase. Please run the provided SQL setup script in your Supabase SQL Editor.</p>
          <pre className="mt-4 p-4 bg-red-100/50 rounded-lg text-sm overflow-x-auto">
            {error.message}
          </pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pages?.map((page) => (
            <SeoForm key={page.id} page={page} />
          ))}
          {(!pages || pages.length === 0) && (
            <div className="col-span-full p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
              No SEO pages configured. Please run the SQL setup script to insert default pages.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
