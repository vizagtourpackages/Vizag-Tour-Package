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
      <div className="flex justify-center mb-8 w-full">
        <div className="bg-gray-100 p-1 sm:p-1.5 rounded-xl sm:rounded-[20px] flex w-full sm:w-auto gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-2 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-2xl text-[11px] sm:text-sm font-bold tracking-wide transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 flex-1 sm:flex-none ${
              activeTab === 'overview'
                ? 'bg-charcoal text-white shadow-md'
                : 'text-gray-500 hover:text-charcoal hover:bg-gray-200'
            }`}
          >
            <Map className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            Overview
          </button>
          
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-2 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-2xl text-[11px] sm:text-sm font-bold tracking-wide transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 flex-1 sm:flex-none ${
              activeTab === 'packages'
                ? 'bg-teal text-white shadow-md'
                : 'text-gray-500 hover:text-charcoal hover:bg-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="text-center leading-tight">Tour Packages</span>
          </button>
          
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-2 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-2xl text-[11px] sm:text-sm font-bold tracking-wide transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 flex-1 sm:flex-none ${
              activeTab === 'hotels'
                ? 'bg-coral text-white shadow-md'
                : 'text-gray-500 hover:text-charcoal hover:bg-gray-200'
            }`}
          >
            <BedDouble className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="text-center leading-tight">Hotels & Resorts</span>
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
