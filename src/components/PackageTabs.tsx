'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, X, MapPin, Clock, Calendar, Star, Bed } from 'lucide-react'

export default function PackageTabs({ pkg }: { pkg: any }) {
  const [activeTab, setActiveTab] = useState('summary')

  // Sort itinerary days and stops
  const itineraryDays = pkg.package_itinerary_days?.sort((a: any, b: any) => a.day_number - b.day_number) || []
  
  // Sort hotels
  const hotels = pkg.package_hotels || []

  return (
    <div className="mt-12">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100/80 p-1.5 rounded-full overflow-x-auto hide-scrollbar max-w-full border border-gray-200/50">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-bold whitespace-nowrap rounded-full transition-all duration-300 ${
              activeTab === 'summary' 
                ? 'bg-white text-teal shadow-sm' 
                : 'text-charcoal/60 hover:text-charcoal hover:bg-white/50'
            }`}
          >
            Trip Summary
          </button>
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-bold whitespace-nowrap rounded-full transition-all duration-300 ${
              activeTab === 'itinerary' 
                ? 'bg-white text-teal shadow-sm' 
                : 'text-charcoal/60 hover:text-charcoal hover:bg-white/50'
            }`}
          >
            Itinerary
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {/* 1. Trip Summary Tab */}
        {activeTab === 'summary' && (
          <div className="space-y-10 animate-fade-in">
            {/* Overview */}
            {pkg.description && (
              <div className="prose prose-lg prose-charcoal max-w-none">
                <p className="text-charcoal/80 leading-relaxed">{pkg.description}</p>
              </div>
            )}

            {/* Quick Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pkg.transportation && (
                <div className="bg-sand/30 p-4 rounded-xl border border-charcoal/5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-teal shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-charcoal/50 uppercase">Transportation</div>
                    <div className="font-medium text-charcoal">{pkg.transportation}</div>
                  </div>
                </div>
              )}
              {pkg.meals_included && (
                <div className="bg-sand/30 p-4 rounded-xl border border-charcoal/5 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-coral shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-charcoal/50 uppercase">Meals Included</div>
                    <div className="font-medium text-charcoal">{pkg.meals_included}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-sand/30 p-6 sm:p-8 rounded-[24px] border border-charcoal/5">
              <div>
                <h4 className="font-heading text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal">
                    <Check size={14} />
                  </div>
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {pkg.includes?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-charcoal/80">
                      <Check size={16} className="text-teal mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-coral/20 flex items-center justify-center text-coral">
                    <X size={14} />
                  </div>
                  What's Excluded
                </h4>
                <ul className="space-y-3">
                  {pkg.excludes?.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-charcoal/80">
                      <X size={16} className="text-coral mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Notes */}
            {pkg.important_notes && pkg.important_notes.length > 0 && (
              <div className="bg-blue-50/50 p-6 rounded-[24px] border border-blue-100">
                <h4 className="font-heading text-lg font-bold text-blue-900 mb-4">Important Notes</h4>
                <ul className="space-y-2">
                  {pkg.important_notes.map((note: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-800/80">
                      <span className="text-blue-500 font-black mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 2. Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div className="space-y-8 animate-fade-in">
            {itineraryDays.length > 0 ? (
              <div className="relative border-l-2 border-charcoal/10 ml-4 md:ml-6 space-y-12 pb-8">
                {itineraryDays.map((day: any) => {
                  const stops = day.package_itinerary_stops?.sort((a: any, b: any) => a.display_order - b.display_order) || []
                  
                  return (
                    <div key={day.id} className="relative pl-8 md:pl-12">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-teal shadow-[0_0_0_4px_white]" />
                      
                      {/* Day Header */}
                      <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-teal/10 text-teal text-xs font-bold rounded-full mb-2 border border-teal/20 uppercase tracking-widest">
                          Day {day.day_number}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-charcoal">
                          {day.day_summary_headline}
                        </h3>
                      </div>
                      
                      {/* Stops */}
                      {stops.length > 0 && (
                        <div className="space-y-4">
                          {stops.map((stop: any, idx: number) => (
                            <div key={stop.id} className="bg-white p-5 rounded-2xl border border-charcoal/5 shadow-sm relative">
                              <h4 className="font-bold text-charcoal text-base mb-1">{stop.place_name}</h4>
                              {stop.description && (
                                <p className="text-sm text-charcoal/60 leading-relaxed">{stop.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-charcoal/50 text-center py-12">Detailed itinerary is not available for this package.</p>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
