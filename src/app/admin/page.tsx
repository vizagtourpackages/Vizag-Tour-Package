import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // We can fetch quick stats here later. For now, show a welcome screen.
  
  const sections = [
    { name: 'Tour Packages', href: '/admin/tour-packages', desc: 'Manage your tour itineraries and pricing' },
    { name: 'Hotels & Resorts', href: '/admin/hotels-resorts', desc: 'Update partner hotels and accommodations' },
    { name: 'Top Destinations', href: '/admin/top-destinations', desc: 'Edit popular tourist spots in Vizag' },
    { name: 'Places to Visit', href: '/admin/places-to-visit', desc: 'Manage specific locations and attractions' },
    { name: 'Hill Stations', href: '/admin/hill-stations', desc: 'Curate Araku and Lambasingi content' },
    { name: 'Travel Guides', href: '/admin/travel-guides', desc: 'Write helpful tips and checklists' },
    { name: 'Upcoming Events', href: '/admin/upcoming-events', desc: 'Post festivals and seasonal activities' },
    { name: 'Updates & Offers', href: '/admin/updates-offers', desc: 'Announce news and special promotions' },
    { name: 'FAQs', href: '/admin/faqs', desc: 'Manage frequently asked questions' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h2>
        <p className="mt-2 text-gray-600">Select a section below to manage your website's content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="block p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">{section.name}</h3>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-coral/10 transition-colors">
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-coral transition-colors" />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
