import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit2, Check, X, ArrowUp, ArrowDown, Star, ImagePlay } from 'lucide-react'
import { deleteTourPackage, togglePublish, moveTourPackage, toggleFeatured, setHeroPackage } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'
import { sortByDisplayOrder } from '@/lib/content'

export default async function TourPackagesPage() {
  const supabase = await createClient()
  const { data: rawPackages } = await supabase.from('tour_packages').select('*').order('created_at', { ascending: false })

  const { data: heroSetting } = await supabase.from('site_settings').select('value').eq('key', 'hero_package_id').maybeSingle()
  const heroId = heroSetting?.value || ''

  // Sorted in JS so this works before the display_order column exists
  const packages = rawPackages ? sortByDisplayOrder(rawPackages) : rawPackages

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tour Packages</h2>
          <p className="mt-1 text-gray-500">Manage all your tour packages. Use the arrows to set the order, the star to feature a package on the home page, and the picture icon to show it as the home hero package.</p>
        </div>
        <Link 
          href="/admin/tour-packages/new" 
          className="bg-charcoal hover:bg-charcoal/90 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus size={18} />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <th className="p-4 w-24">Order</th>
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages?.map((pkg, idx) => (
              <tr key={pkg.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <span className="w-6 text-sm font-bold text-gray-400">{idx + 1}</span>
                    <form action={moveTourPackage.bind(null, pkg.id, 'up')}>
                      <button type="submit" disabled={idx === 0} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30" aria-label="Move up"><ArrowUp size={16} /></button>
                    </form>
                    <form action={moveTourPackage.bind(null, pkg.id, 'down')}>
                      <button type="submit" disabled={idx === (packages?.length || 0) - 1} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30" aria-label="Move down"><ArrowDown size={16} /></button>
                    </form>
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-900">
                  <div className="flex items-center gap-2">
                    <form action={toggleFeatured.bind(null, pkg.id, !pkg.show_on_home)}>
                      <button type="submit" title={pkg.show_on_home ? 'Featured on home – click to remove' : 'Click to feature on home'} className="p-1 rounded hover:bg-amber-50">
                        <Star size={18} className={pkg.show_on_home ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                      </button>
                    </form>
                    <form action={setHeroPackage.bind(null, pkg.id, heroId === pkg.id)}>
                      <button
                        type="submit"
                        title={heroId === pkg.id ? 'Shown in the home hero – click to remove' : 'Show this package in the home hero'}
                        className={`p-1 rounded ${heroId === pkg.id ? 'bg-coral/10' : 'hover:bg-gray-100'}`}
                      >
                        <ImagePlay size={18} className={heroId === pkg.id ? 'text-coral' : 'text-gray-300'} />
                      </button>
                    </form>
                    {pkg.title}
                    {heroId === pkg.id && <span className="ml-1 rounded-full bg-coral/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-coral">Hero</span>}
                  </div>
                </td>
                <td className="p-4 text-gray-600">₹{pkg.price}</td>
                <td className="p-4 text-gray-600 capitalize">{pkg.category}</td>
                <td className="p-4 text-center">
                  <form action={togglePublish.bind(null, pkg.id, !pkg.is_published)}>
                    <button type="submit" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${pkg.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {pkg.is_published ? <Check size={12} /> : <X size={12} />}
                      {pkg.is_published ? 'Published' : 'Draft'}
                    </button>
                  </form>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/tour-packages/${pkg.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </Link>
                    <form action={deleteTourPackage.bind(null, pkg.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!packages || packages.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No tour packages found. Click "Add New" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
