'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, BedDouble } from 'lucide-react';

interface DestinationTabsProps {
  packagesContent: React.ReactNode;
  hotelsContent: React.ReactNode;
}

const TABS = [
  { id: 'packages', label: 'Tour Packages', icon: MapPin },
  { id: 'hotels', label: 'Hotels & Resorts', icon: BedDouble },
] as const;

export default function DestinationTabs({ packagesContent, hotelsContent }: DestinationTabsProps) {
  const [activeTab, setActiveTab] = useState<'packages' | 'hotels'>('packages');

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8 w-full">
        <div className="bg-white p-1.5 rounded-full flex gap-1 shadow-card border border-charcoal/5" role="tablist">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(id)}
                className={`relative px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2 transition-[color,transform] duration-150 active:scale-[0.97] ${active ? 'text-white' : 'text-charcoal/60 hover:text-charcoal'}`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 rounded-full bg-sunset shadow-glow transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${active ? 'opacity-100' : 'opacity-0'}`}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={16} />
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Enter-only fade/rise; no exit wait so switching never feels delayed */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        {activeTab === 'packages' ? packagesContent : hotelsContent}
      </motion.div>
    </div>
  );
}
