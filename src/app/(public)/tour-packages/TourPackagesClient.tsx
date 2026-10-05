"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, X, ArrowDownUp, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";

const DURATION_FILTERS = [
  "All",
  "Day Trip",
  "1N/2D",
  "2N/3D",
  "3N/4D",
  "4N/5D",
  "5N/6D",
];

const SORT_OPTIONS = [
  "Recommended",
  "Price: Low to High",
  "Price: High to Low",
  "Rating: High to Low",
];

export default function TourPackagesClient({ initialPackages }: { initialPackages: any[] }) {
  const [activeDuration, setActiveDuration] = useState("All");
  const [activeSort, setActiveSort] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter logic
  let processedPackages = [...initialPackages];

  if (activeDuration !== "All") {
    processedPackages = processedPackages.filter((pkg) => {
      if (!pkg.duration) return false;
      const d = pkg.duration.toLowerCase();
      
      if (activeDuration === "Day Trip") {
        return d.includes("1 day") || d.includes("1d") || d.includes("day trip") || (d.includes("day") && !d.includes("night"));
      }

      // Match "1N/2D" format against "1 Night / 2 Days" or similar
      const match = activeDuration.match(/(\d+)N\/(\d+)D/i);
      if (match) {
        const nights = match[1];
        const days = match[2];
        return d.includes(`${nights} night`) && d.includes(`${days} day`);
      }

      return d.includes(activeDuration.toLowerCase());
    });
  }

  // Sort logic
  if (activeSort === "Price: Low to High") {
    processedPackages.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (activeSort === "Price: High to Low") {
    processedPackages.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (activeSort === "Rating: High to Low") {
    processedPackages.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }
  // Recommended keeps original order (or you could sort by a 'home_order' / 'is_recommended' flag)

  return (
    <div className="bg-warm-white min-h-screen pb-24 pt-8">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Vizag Tour Packages & Itineraries"
            subtitle="Explore the best Vizag tour packages to Araku Valley, Vanjangi and Lambasingi with perfect itineraries, comfortable vehicles, hotels and resorts."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Filters & Sort Row */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 w-full md:w-auto">
              <button 
                className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                aria-label="Filter"
              >
                <Filter size={18} />
              </button>
              
              {DURATION_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveDuration(filter)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 shrink-0 border ${
                    activeDuration === filter
                      ? "bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#2D6A4F] hover:text-[#2D6A4F]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0 w-full md:w-auto" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full md:w-auto flex items-center justify-between gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ArrowDownUp size={16} className="text-gray-500" />
                  Sort: {activeSort}
                </div>
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-[240px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setActiveSort(opt);
                        setIsSortOpen(false);
                      }}
                      className="w-full text-left px-5 py-3 text-sm font-semibold hover:bg-gray-50 flex items-center justify-between group"
                    >
                      <span className={activeSort === opt ? "text-[#2D6A4F]" : "text-gray-700 group-hover:text-gray-900"}>
                        {opt}
                      </span>
                      {activeSort === opt ? (
                        <Check size={16} className="text-[#2D6A4F]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-gray-400"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Package Grid */}
        <ScrollReveal delay={0.4}>
          {processedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-w-0">
              {processedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[40px] border border-charcoal/5 shadow-card">
              <div className="inline-flex w-20 h-20 bg-sand rounded-full items-center justify-center mb-6 shadow-sm border border-charcoal/5">
                <Filter size={32} className="text-charcoal/40" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-charcoal mb-4 tracking-tight">No packages found</h3>
              <p className="text-charcoal/60 font-medium text-lg">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => { setActiveDuration("All"); setActiveSort("Recommended"); }}
                className="mt-8 btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
