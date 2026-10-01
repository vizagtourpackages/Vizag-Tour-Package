"use client";

import { useState } from "react";
import { MapPin, Navigation, Clock, Sun, Sunrise, Moon, CloudSun, Sunset, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const itineraryDays = [
  {
    day: "Day 1",
    theme: "City of Destiny - Beaches & Culture",
    description: "Explore the coastal beauty and rich heritage of Visakhapatnam city.",
    locations: [
      {
        time: "09:00 AM",
        name: "Simhachalam Temple",
        type: "Pilgrimage",
        icon: <Sun size={16} />,
        desc: "Start your trip with blessings at this ancient 11th-century hill shrine.",
      },
      {
        time: "12:00 PM",
        name: "Kailasagiri Hill Park",
        type: "Viewpoint",
        icon: <CloudSun size={16} />,
        desc: "Take the ropeway up for panoramic views of the city and the Bay of Bengal.",
      },
      {
        time: "03:30 PM",
        name: "Rushikonda Beach",
        type: "Beach",
        icon: <Sun size={16} />,
        desc: "Enjoy water sports or relax on the golden sands of Vizag's cleanest beach.",
      },
      {
        time: "06:00 PM",
        name: "RK Beach & Submarine Museum",
        type: "Heritage",
        icon: <Sunset size={16} />,
        desc: "Stroll along the lively beach road and explore the INS Kursura Submarine.",
      },
    ],
  },
  {
    day: "Day 2",
    theme: "Journey to the Eastern Ghats",
    description: "A scenic drive into the mountains, exploring caves and coffee plantations.",
    locations: [
      {
        time: "07:00 AM",
        name: "Depart for Araku",
        type: "Drive",
        icon: <Navigation size={16} />,
        desc: "Enjoy the misty ghat road drive spanning 115 km through dense forests.",
      },
      {
        time: "10:30 AM",
        name: "Borra Caves",
        type: "Adventure",
        icon: <Sun size={16} />,
        desc: "Explore million-year-old limestone stalactite and stalagmite formations.",
      },
      {
        time: "01:00 PM",
        name: "Araku Valley",
        type: "Nature",
        icon: <Sun size={16} />,
        desc: "Visit the Tribal Museum, Padmapuram Gardens, and vast coffee plantations.",
      },
      {
        time: "04:30 PM",
        name: "Chaparai Water Cascades",
        type: "Nature",
        icon: <Sunset size={16} />,
        desc: "Relax by the scenic water cascades surrounded by lush greenery.",
      },
    ],
  },
  {
    day: "Day 3",
    theme: "The Cloud Paradise",
    description: "An early morning adventure to experience sub-zero temperatures and clouds.",
    locations: [
      {
        time: "04:00 AM",
        name: "Vanjangi Sunrise Trek",
        type: "Adventure",
        icon: <Sunrise size={16} />,
        desc: "A moderate trek to witness the breathtaking sea of clouds at sunrise.",
      },
      {
        time: "11:00 AM",
        name: "Lambasingi",
        type: "Hill Station",
        icon: <CloudSun size={16} />,
        desc: "Visit the 'Kashmir of Andhra' and explore apple/strawberry farms.",
      },
      {
        time: "02:00 PM",
        name: "Kothapalli Waterfalls",
        type: "Nature",
        icon: <Sun size={16} />,
        desc: "A hidden gem waterfall nestled deep within the Chintapalli forests.",
      },
      {
        time: "06:00 PM",
        name: "Return to Vizag",
        type: "Drive",
        icon: <Moon size={16} />,
        desc: "Safe journey back to the city with beautiful sunset highway views.",
      },
    ],
  },
];

export default function ItineraryPage() {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});

  const toggleDay = (dayIdx: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayIdx]: !prev[dayIdx]
    }));
  };

  return (
    <div className="bg-sand-light min-h-screen pt-4 pb-16">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="The Ultimate 3-Day Vizag Itinerary"
          subtitle="Follow our expertly crafted route map covering the best beaches, temples, and hill stations in the region."
        />

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto space-y-12 mt-8">
          {itineraryDays.map((day, dayIdx) => {
            const isExpanded = expandedDays[dayIdx];
            const visibleLocations = isExpanded ? day.locations : day.locations.slice(0, 2);
            const hiddenCount = day.locations.length - 2;

            return (
              <div key={dayIdx} className="relative">
                <div className="mb-6 md:text-center">
                  <span className="inline-block bg-ocean text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-sm">
                    {day.day}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-black text-charcoal mb-1">{day.theme}</h2>
                  <p className="text-charcoal/60 text-sm sm:text-base">{day.description}</p>
                </div>

                <div className="relative border-l-2 border-ocean/20 md:border-l-0 ml-4 md:ml-0">
                  {/* Desktop Center Line */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-charcoal/10 -translate-x-1/2"></div>

                  <div className="space-y-6 md:space-y-8">
                    {visibleLocations.map((loc, locIdx) => {
                      const isEven = locIdx % 2 === 0;
                      return (
                        <div key={locIdx} className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 pl-6 md:pl-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                          
                          {/* Timeline Node */}
                          <div className="absolute left-[-5px] md:left-1/2 top-5 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-2.5 h-2.5 bg-ocean rounded-full shadow-[0_0_0_4px_rgba(11,79,108,0.1)] z-10"></div>

                          {/* Content Card */}
                          <div className={`w-full md:w-1/2 ${isEven ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-ocean/20 transition-all duration-300 group">
                              <div className={`flex items-center gap-2 mb-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                                <span className="flex items-center gap-1 text-coral font-bold text-[10px] sm:text-xs bg-coral/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                  <Clock size={12} /> {loc.time}
                                </span>
                                <span className="text-gray-400 text-[10px] sm:text-xs font-semibold uppercase flex items-center gap-1">
                                  {loc.icon} {loc.type}
                                </span>
                              </div>

                              <h3 className="text-lg font-bold text-charcoal mb-1 group-hover:text-ocean transition-colors">{loc.name}</h3>
                              <p className="text-charcoal/60 text-xs sm:text-sm leading-snug">{loc.desc}</p>
                            </div>
                          </div>

                          {/* Empty Space for Desktop layout balance */}
                          <div className="hidden md:block w-1/2"></div>
                        </div>
                      );
                    })}

                    {hiddenCount > 0 && (
                      <div className="relative flex justify-center mt-6 pl-6 md:pl-0 z-20">
                        <button 
                          onClick={() => toggleDay(dayIdx)}
                          className="bg-white border border-gray-200 shadow-sm text-charcoal text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-50 hover:text-ocean transition-colors"
                        >
                          {isExpanded ? (
                            <>View less <ChevronUp size={14} /></>
                          ) : (
                            <>View remaining {hiddenCount} places <ChevronDown size={14} /></>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-charcoal p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden max-w-3xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-ocean rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mb-3 relative z-10">Ready to follow this itinerary?</h2>
            <p className="text-white/70 mb-6 text-sm sm:text-base max-w-xl mx-auto relative z-10">
              Customize this 3-day plan according to your preferences. Book a dedicated cab with us and enjoy a hassle-free vacation.
            </p>
            <Link href="/tour-packages" className="btn-primary py-2.5 px-6 text-sm relative z-10 border-0 shadow-lg shadow-coral/30 hover:-translate-y-1 transition-transform inline-flex items-center gap-2">
              Customize Your Trip <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
