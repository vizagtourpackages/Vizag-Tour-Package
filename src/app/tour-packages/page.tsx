"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import {
  allPackages,
  dayOptions,
  accommodationOptions,
  vehicleOptions,
} from "@/data/packages";

export default function TourPackagesPage() {
  const [filters, setFilters] = useState({
    category: "",
    duration: "",
    accommodation: "",
    vehicle: "",
  });

  // Basic client-side filtering
  const filteredPackages = allPackages.filter((pkg) => {
    if (filters.category && pkg.category !== filters.category) return false;
    if (filters.duration && !pkg.duration.toLowerCase().includes(filters.duration.toLowerCase())) return false;
    return true;
  });

  const categories = [
    { value: "", label: "All Packages" },
    { value: "trending", label: "Trending" },
    { value: "one-day", label: "One Day Tours" },
    { value: "pilgrimage", label: "Pilgrimage" },
  ];

  return (
    <div className="bg-warm-white min-h-screen pb-24 pt-5">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Explore Our Tour Packages"
          subtitle="From quick day trips to immersive multi-day adventures, find the perfect Vizag itinerary."
        />

        {/* Categories Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto hide-scrollbar w-auto max-w-full pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setFilters({ ...filters, category: cat.value })}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors shrink-0 ${filters.category === cat.value
                ? "bg-ocean text-white"
                : "bg-white text-charcoal border border-sand hover:border-ocean/50"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="mb-8 flex flex-row gap-3 sm:gap-4 items-center overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 w-auto max-w-full">
          <select
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
            className="min-w-[140px] sm:min-w-[150px] flex-1 px-3 sm:px-4 py-3 rounded-xl border border-sand focus:border-ocean outline-none bg-white text-charcoal shrink-0 text-sm sm:text-base"
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
            className="min-w-[170px] sm:min-w-[190px] flex-1 px-3 sm:px-4 py-3 rounded-xl border border-sand focus:border-ocean outline-none bg-white text-charcoal shrink-0 text-sm sm:text-base"
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
            className="min-w-[140px] sm:min-w-[150px] flex-1 px-3 sm:px-4 py-3 rounded-xl border border-sand focus:border-ocean outline-none bg-white text-charcoal shrink-0 text-sm sm:text-base"
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
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-white border border-sand text-charcoal hover:border-ocean hover:text-ocean transition-colors"
            aria-label="Clear Filters"
            title="Clear Filters"
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Active Filters Summary */}
        {(filters.category || filters.duration || filters.accommodation || filters.vehicle) && (
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <span className="text-sm text-charcoal-light">Active Filters:</span>
            <button
              onClick={() => setFilters({ category: "", duration: "", accommodation: "", vehicle: "" })}
              className="flex items-center gap-1 text-xs bg-rose-100 text-rose-600 px-2.5 py-1 rounded-md hover:bg-rose-200 transition-colors"
            >
              Clear All <X size={12} />
            </button>
          </div>
        )}

        {/* Package Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full min-w-0">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-sand">
            <div className="inline-flex w-16 h-16 bg-sand-light rounded-full items-center justify-center mb-4">
              <Filter size={24} className="text-charcoal-light" />
            </div>
            <h3 className="text-xl font-heading text-charcoal mb-2">No packages found</h3>
            <p className="text-charcoal-light">Try adjusting your filters to see more results.</p>
            <button
              onClick={() => setFilters({ category: "", duration: "", accommodation: "", vehicle: "" })}
              className="mt-6 btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
