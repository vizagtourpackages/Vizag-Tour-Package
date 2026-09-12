import Link from 'next/link';
import { 
  LayoutDashboard, 
  Map, 
  Building2, 
  MapPin, 
  Navigation, 
  Mountain, 
  BookOpen, 
  Calendar, 
  Megaphone, 
  HelpCircle,
  LogOut 
} from 'lucide-react';
import { logout } from '@/app/login/actions';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Tour Packages', href: '/admin/tour-packages', icon: Map },
  { name: 'Hotels & Resorts', href: '/admin/hotels-resorts', icon: Building2 },
  { name: 'Top Destinations', href: '/admin/top-destinations', icon: MapPin },
  { name: 'Places to Visit', href: '/admin/places-to-visit', icon: Navigation },
  { name: 'Hill Stations', href: '/admin/hill-stations', icon: Mountain },
  { name: 'Travel Guides', href: '/admin/travel-guides', icon: BookOpen },
  { name: 'Upcoming Events', href: '/admin/upcoming-events', icon: Calendar },
  { name: 'Updates & Offers', href: '/admin/updates-offers', icon: Megaphone },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-coral flex items-center justify-center mr-3">
            <span className="font-black text-white">V</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Admin Panel</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors group"
              >
                <Icon className="w-5 h-5 mr-3 text-white/50 group-hover:text-coral transition-colors" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-colors group"
            >
              <LogOut className="w-5 h-5 mr-3 text-white/50 group-hover:text-red-400 transition-colors" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-w-0 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shrink-0 sticky top-0 z-40">
          <h1 className="text-xl font-bold text-gray-900">Content Management System</h1>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
