'use client';

import { useState } from 'react';
import { Map, MapPin, BedDouble } from 'lucide-react';

interface DestinationTabsProps {
  overviewContent: React.ReactNode;
  packagesContent: React.ReactNode;
  hotelsContent: React.ReactNode;
}

export default function DestinationTabs({
  overviewContent,
  packagesContent,
  hotelsContent,
}: DestinationTabsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'hotels'>('overview');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1.5 rounded-[20px] flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-charcoal text-white shadow-md'
                : 'text-gray-500 hover:text-charcoal hover:bg-gray-200'
            }`}
          >
            <Map size={18} />
            Overview
          </button>
          
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-6 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'packages'
                ? 'bg-teal text-white shadow-md'
                : 'text-gray-500 hover:text-charcoal hover:bg-gray-200'
            }`}
          >
            <MapPin size={18} />
            Tour Packages
          </button>
          
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-6 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'hotels'
                ? 'bg-coral text-white shadow-md'
                : 'text-gray-500 hover:text-charcoal hover:bg-gray-200'
            }`}
          >
            <BedDouble size={18} />
            Hotels & Resorts
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8 transition-all duration-500">
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {overviewContent}
          </div>
        )}
        
        {activeTab === 'packages' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {packagesContent}
          </div>
        )}

        {activeTab === 'hotels' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {hotelsContent}
          </div>
        )}
      </div>
    </div>
  );
}
