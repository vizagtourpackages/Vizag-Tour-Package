'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  Inbox,
  ChevronDown,
  ChevronRight,
  Car
} from 'lucide-react';

const mainNavigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Tour Packages', href: '/admin/tour-packages', icon: Map },
  { name: 'Hotels & Resorts', href: '/admin/hotels-resorts', icon: Building2 },
  { name: 'Travels', href: '/admin/travels', icon: Car },
  { name: 'Top Destinations', href: '/admin/top-destinations', icon: MapPin },
  { name: 'Places to Visit', href: '/admin/places-to-visit', icon: Navigation },
  { name: 'Hill Stations', href: '/admin/hill-stations', icon: Mountain },
  { name: 'Travel Guides', href: '/admin/travel-guides', icon: BookOpen },
  { name: 'Upcoming Events', href: '/admin/upcoming-events', icon: Calendar },
  { name: 'Updates & Offers', href: '/admin/updates-offers', icon: Megaphone },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
];

export default function SidebarNav({ 
  pkgCount, 
  resCount, 
  cabCount, 
  totalPending 
}: { 
  pkgCount: number, 
  resCount: number, 
  cabCount: number, 
  totalPending: number 
}) {
  const pathname = usePathname();
  const isBookingsActive = pathname.startsWith('/admin/bookings');
  const [isBookingsOpen, setIsBookingsOpen] = useState(isBookingsActive);

  return (
    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
      {/* Dashboard is always first */}
      <Link
        href="/admin"
        className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${pathname === '/admin' ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
      >
        <div className="flex items-center">
          <LayoutDashboard className={`w-5 h-5 mr-3 transition-colors ${pathname === '/admin' ? 'text-coral' : 'text-white/50 group-hover:text-coral'}`} />
          Dashboard
        </div>
      </Link>

      {/* Bookings Accordion */}
      <div className="space-y-1">
        <button
          onClick={() => setIsBookingsOpen(!isBookingsOpen)}
          className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${isBookingsActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
        >
          <div className="flex items-center">
            <Inbox className={`w-5 h-5 mr-3 transition-colors ${isBookingsActive ? 'text-coral' : 'text-white/50 group-hover:text-coral'}`} />
            Bookings
            {totalPending > 0 && (
              <span className="ml-2 bg-coral text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{totalPending}</span>
            )}
          </div>
          {isBookingsOpen ? <ChevronDown className="w-4 h-4 text-white/50" /> : <ChevronRight className="w-4 h-4 text-white/50" />}
        </button>

        {isBookingsOpen && (
          <div className="pl-11 pr-3 py-1 space-y-1">
            <Link href="/admin/bookings/packages" className={`flex items-center justify-between py-2 px-3 text-sm rounded-lg transition-colors ${pathname === '/admin/bookings/packages' ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <span className="flex items-center gap-2"><Map className="w-4 h-4 text-white/40" /> Packages</span>
              {pkgCount > 0 && <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{pkgCount}</span>}
            </Link>
            <Link href="/admin/bookings/resorts" className={`flex items-center justify-between py-2 px-3 text-sm rounded-lg transition-colors ${pathname === '/admin/bookings/resorts' ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-white/40" /> Resorts</span>
              {resCount > 0 && <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{resCount}</span>}
            </Link>
            <Link href="/admin/bookings/cabs" className={`flex items-center justify-between py-2 px-3 text-sm rounded-lg transition-colors ${pathname === '/admin/bookings/cabs' ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <span className="flex items-center gap-2"><Car className="w-4 h-4 text-white/40" /> Travels (Cabs)</span>
              {cabCount > 0 && <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{cabCount}</span>}
            </Link>
          </div>
        )}
      </div>

      {/* Rest of Navigation */}
      {mainNavigation.filter(n => n.name !== 'Dashboard').map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
          >
            <div className="flex items-center">
              <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-coral' : 'text-white/50 group-hover:text-coral'}`} />
              {item.name}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
