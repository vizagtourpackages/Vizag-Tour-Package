"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Phone, Search, User, X, MapPin, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";
import { allPackages } from "@/data/packages";
import { topPlaces, vizagPlaces } from "@/data/destinations";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const allDestinations = [...topPlaces, ...vizagPlaces];
  
  const searchResults = searchQuery.trim() === "" ? [] : [
    ...allPackages.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(p => ({ type: 'Package', title: p.title, link: `/tour-packages` })),
    ...allDestinations.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).map(d => ({ type: 'Destination', title: d.name, link: `/` }))
  ].slice(0, 8);

  return (
    <>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col p-4 animate-in fade-in slide-in-from-bottom-4 duration-200 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search packages, destinations..." 
                className="w-full bg-gray-100 rounded-full py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-ocean/50 text-charcoal"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="p-2 text-gray-500 hover:text-charcoal transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1">
            {searchQuery.trim() === "" ? (
              <div className="text-center text-gray-400 mt-10">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>Start typing to search for tours & places</p>
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="space-y-3">
                {searchResults.map((result, idx) => (
                  <li key={idx}>
                    <Link 
                      href={result.link} 
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-teal/5 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-teal uppercase tracking-widest mb-1">{result.type}</p>
                        <p className="text-charcoal font-bold">{result.title}</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-400 group-hover:text-teal transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 mt-10">
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profile Drawer Overlay */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 pb-8 animate-in slide-in-from-bottom-full duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean to-teal flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{siteInfo.name}</h3>
                  <p className="text-gray-500 text-xs">24/7 travel service in Visakhapatnam</p>
                </div>
              </div>
              <button 
                onClick={() => setIsProfileOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Phone</p>
                  <p className="text-gray-900 font-semibold">{siteInfo.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-gray-900 font-semibold">{siteInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Address</p>
                  <p className="text-gray-900 font-semibold leading-snug">{siteInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <a 
                href={`tel:${siteInfo.whatsapp}`}
                className="flex-1 bg-[#0D6EFD] hover:bg-[#0b5ed7] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone size={18} /> Call Now
              </a>
              <a 
                href={siteInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#1EBE5C] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Docked Bottom Nav (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white/95 backdrop-blur-xl border-t border-charcoal/10 shadow-[0_-8px_32px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Home */}
          <Link href="/" className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${pathname === '/' ? 'bg-charcoal/5 shadow-sm scale-105' : 'hover:bg-charcoal/5'}`}>
            <Home size={24} className={pathname === '/' ? 'text-coral' : 'text-charcoal/80'} strokeWidth={pathname === '/' ? 2.5 : 2} />
          </Link>

          {/* WhatsApp */}
          <a href={siteInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/40 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366" stroke="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Phone */}
          <a href={`tel:${siteInfo.whatsapp}`} className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/40 transition-all duration-300">
            <Phone size={24} className="text-charcoal/80" strokeWidth={2} />
          </a>

          {/* Search */}
          <button onClick={() => setIsSearchOpen(true)} className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/40 transition-all duration-300">
            <Search size={24} className="text-charcoal/80" strokeWidth={2} />
          </button>

          {/* Profile */}
          <button onClick={() => setIsProfileOpen(true)} className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/40 transition-all duration-300">
            <User size={24} className="text-charcoal/80" strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
}
