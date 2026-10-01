import { createClient } from '@/lib/supabase/server'
import TermsForm from '@/components/admin/TermsForm'

export const metadata = {
  title: 'Terms & Conditions - Admin',
}

export default async function TermsSettingsPage() {
  const supabase = await createClient()
  
  // Try to fetch terms_and_conditions; this will fail if the user hasn't run the SQL script yet
  const { data: terms, error } = await supabase
    .from('terms_and_conditions')
    .select('*')
    .order('category', { ascending: true })

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
        <p className="text-gray-500 mt-2">Manage the Terms & Conditions text for different sections of the website.</p>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100">
          <h3 className="font-bold text-lg mb-2">Database Table Missing</h3>
          <p>The <code>terms_and_conditions</code> table does not exist in Supabase. Please run the provided SQL setup script in your Supabase SQL Editor.</p>
          <pre className="mt-4 p-4 bg-red-100/50 rounded-lg text-sm overflow-x-auto">
            {error.message}
          </pre>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {terms?.map((term) => (
            <TermsForm key={term.id} category={term} />
          ))}
          {(!terms || terms.length === 0) && (
            <div className="col-span-full p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
              No Terms categories configured. Please run the SQL setup script to insert default categories.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
