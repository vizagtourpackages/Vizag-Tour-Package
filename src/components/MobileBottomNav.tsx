"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Phone, Search, User, X, MapPin, Mail, MessageCircle } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col p-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search packages, destinations..." 
                className="w-full bg-gray-100 rounded-full py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-ocean/50"
                autoFocus
              />
            </div>
            <button onClick={() => setIsSearchOpen(false)} className="p-2 text-gray-500">
              <X size={24} />
            </button>
          </div>
          <div className="text-center text-gray-500 mt-10">
            <p>Search functionality coming soon!</p>
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

      {/* Floating Bottom Nav (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-[150]">
        <div className="bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/40 rounded-[32px] flex items-center justify-between px-2 py-2">
          {/* Home */}
          <Link href="/" className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${pathname === '/' ? 'bg-white/80 shadow-sm scale-105' : 'hover:bg-white/40'}`}>
            <Home size={24} className={pathname === '/' ? 'text-coral' : 'text-charcoal/80'} strokeWidth={pathname === '/' ? 2.5 : 2} />
          </Link>

          {/* WhatsApp */}
          <a href={siteInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="relative flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/40 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
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
