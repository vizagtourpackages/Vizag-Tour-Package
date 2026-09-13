"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import { dayOptions, accommodationOptions, vehicleOptions } from "@/data/packages";

export default function TourPackagesClient({ initialPackages }: { initialPackages: any[] }) {
  const [filters, setFilters] = useState({
    category: "",
    duration: "",
    accommodation: "",
    vehicle: "",
  });

  // Basic client-side filtering
  const filteredPackages = initialPackages.filter((pkg) => {
    // Note: The new schema doesn't use the legacy category, but we can filter by badge or type if needed.
    // For now we map category to the generic 'category' prop we pass from the DB.
    if (filters.category && pkg.category !== filters.category && pkg.badge?.toLowerCase() !== filters.category) return false;
    if (filters.duration && !pkg.duration?.toLowerCase().includes(filters.duration.toLowerCase())) return false;
    return true;
  });

  const categories = [
    { value: "", label: "All Packages" },
    { value: "trending", label: "Trending" },
    { value: "one-day", label: "One Day Tours" },
    { value: "pilgrimage", label: "Pilgrimage" },
  ];

  return (
    <div className="bg-white min-h-screen pb-24 pt-8">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Explore Our Tour Packages"
            subtitle="From quick day trips to immersive multi-day adventures, find the perfect Vizag itinerary."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Categories Tabs */}
          <div className="mb-8 flex gap-3 overflow-x-auto hide-scrollbar w-auto max-w-full pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setFilters({ ...filters, category: cat.value })}
                className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 shrink-0 border ${filters.category === cat.value
                  ? "bg-charcoal text-white border-charcoal shadow-md"
                  : "bg-white text-charcoal/80 border-charcoal/10 hover:border-teal hover:text-teal"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div className="mb-10 flex flex-row gap-4 items-center overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 w-auto max-w-full">
            <select
              value={filters.duration}
              onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
              className="min-w-[160px] flex-1 px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none bg-sand/50 text-charcoal font-medium shrink-0 text-sm sm:text-base appearance-none transition-all duration-300"
            >
              <option value="">Any Duration</option>
              {dayOptions.map((day) => (
                <option key={day} value={day.split(" ")[0]}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={filters.accommodation}
              onChange={(e) =>
                setFilters({ ...filters, accommodation: e.target.value })
              }
              className="min-w-[200px] flex-1 px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none bg-sand/50 text-charcoal font-medium shrink-0 text-sm sm:text-base appearance-none transition-all duration-300"
            >
              <option value="">Any Accommodation</option>
              {accommodationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <select
              value={filters.vehicle}
              onChange={(e) => setFilters({ ...filters, vehicle: e.target.value })}
              className="min-w-[160px] flex-1 px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none bg-sand/50 text-charcoal font-medium shrink-0 text-sm sm:text-base appearance-none transition-all duration-300"
            >
              <option value="">Any Vehicle</option>
              {vehicleOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              onClick={() => setFilters({ category: filters.category, duration: "", accommodation: "", vehicle: "" })}
              className="w-14 h-14 shrink-0 flex items-center justify-center rounded-[16px] bg-white border border-charcoal/10 text-charcoal/50 hover:border-coral hover:text-coral hover:bg-coral/5 transition-all duration-300 shadow-sm"
              aria-label="Clear Filters"
              title="Clear Filters"
            >
              <Filter size={24} />
            </button>
          </div>

          {/* Active Filters Summary */}
          {(filters.category || filters.duration || filters.accommodation || filters.vehicle) && (
            <div className="flex items-center gap-3 mb-10 flex-wrap">
              <span className="text-sm font-bold text-charcoal/50 uppercase tracking-widest">Active Filters:</span>
              <button
                onClick={() => setFilters({ category: "", duration: "", accommodation: "", vehicle: "" })}
                className="flex items-center gap-2 text-xs font-bold bg-coral/10 text-coral border border-coral/20 px-3 py-1.5 rounded-full hover:bg-coral/20 transition-colors uppercase tracking-wider"
              >
                Clear All <X size={14} />
              </button>
            </div>
          )}
        </ScrollReveal>

        {/* Package Grid */}
        <ScrollReveal delay={0.4}>
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-w-0">
              {filteredPackages.map((pkg) => (
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
                onClick={() => setFilters({ category: "", duration: "", accommodation: "", vehicle: "" })}
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
