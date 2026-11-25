'use client';

import { useState, useMemo } from 'react';
import HotelCard from '@/components/HotelCard';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterSheet, { FilterGroup, OptionPill } from '@/components/FilterSheet';
import { AREAS, DEFAULT_AREA, normalizeArea, areaLabel, type AreaId } from '@/lib/areas';

export default function ResortListClient({ initialHotels }: { initialHotels: any[] }) {
  const [category, setCategory] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [showFilters, setShowFilters] = useState(false);
  const [area, setArea] = useState<AreaId>(DEFAULT_AREA); // Vizag is the default switch
  const clearAll = () => { setCategory('All'); setMinRating(0); setMaxPrice(20000); };

  // Extract unique categories
  const inArea = useMemo(() => initialHotels.filter(h => normalizeArea(h.area) === area), [initialHotels, area]);
  const counts = useMemo(() => Object.fromEntries(AREAS.map(a => [a.id, initialHotels.filter(h => normalizeArea(h.area) === a.id).length])), [initialHotels]);
  const categories = ['All', ...Array.from(new Set(inArea.map(h => h.type)))];

  const filteredHotels = useMemo(() => {
    return inArea.filter((hotel) => {
      // Category filter
      if (category !== 'All' && hotel.type !== category) return false;
      
      // Rating filter
      if (hotel.rating < minRating) return false;

      // Price filter (extract numbers from '₹8,500' format)
      const priceVal = parseInt(hotel.price.replace(/[^0-9]/g, '')) || 0;
      if (priceVal > maxPrice) return false;

      return true;
    });
  }, [inArea, category, minRating, maxPrice]);

  const activeCount = (category !== 'All' ? 1 : 0) + (minRating > 0 ? 1 : 0) + (maxPrice < 20000 ? 1 : 0);

  return (
    <div>
      {/* Area switch: Vizag (default) · Araku Valley · Lambasingi · Vanjangi */}
      <div role="tablist" aria-label="Choose a place" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0">
        {AREAS.map((a) => {
          const on = a.id === area;
          return (
            <button
              key={a.id}
              role="tab"
              aria-selected={on}
              onClick={() => { setArea(a.id); setCategory('All'); }}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.97] ${
                on ? 'border-transparent bg-sunset text-white shadow-glow' : 'border-ocean/15 bg-white text-ocean/75 hover:border-ocean/40'
              }`}
            >
              {a.label}
              <span className={`rounded-full px-2 py-0.5 text-[0.68rem] font-bold ${on ? 'bg-white/25 text-white' : 'bg-ocean/8 text-ocean/55'}`}>{counts[a.id]}</span>
            </button>
          );
        })}
      </div>

    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile: button opens a full-screen filter view */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowFilters(true)}
          className="flex w-full items-center justify-between rounded-full border border-ocean/15 bg-white px-5 py-3.5 text-sm font-semibold text-ocean shadow-sm active:scale-[0.99]"
        >
          <span className="flex items-center gap-2.5"><SlidersHorizontal size={17} className="text-coral" /> Filters</span>
          <span className="flex items-center gap-2 text-ocean/50">
            {activeCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1.5 text-[0.7rem] font-bold text-white">{activeCount}</span>}
            {filteredHotels.length} properties
          </span>
        </button>
      </div>

      <FilterSheet
        open={showFilters}
        onClose={() => setShowFilters(false)}
        onClear={clearAll}
        resultCount={filteredHotels.length}
        resultLabel={filteredHotels.length === 1 ? 'property' : 'properties'}
      >
        <FilterGroup title="Category">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <OptionPill key={cat} active={category === cat} onClick={() => setCategory(cat)}>{cat}</OptionPill>
            ))}
          </div>
        </FilterGroup>
        <FilterGroup title="Rating">
          <div className="flex flex-wrap gap-2">
            {[0, 3, 4, 4.5].map((r) => (
              <OptionPill key={r} active={minRating === r} onClick={() => setMinRating(r)}>{r === 0 ? 'Any rating' : `${r}+ stars`}</OptionPill>
            ))}
          </div>
        </FilterGroup>
        <FilterGroup title="Max price per night">
          <div className="mb-3 font-heading text-2xl text-ocean">₹{maxPrice.toLocaleString()}</div>
          <input type="range" min="1000" max="30000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} className="w-full accent-coral" />
          <div className="mt-1 flex justify-between text-xs text-charcoal/50"><span>₹1K</span><span>₹30K+</span></div>
        </FilterGroup>
      </FilterSheet>

      {/* Filters Sidebar */}
      <div className="hidden lg:block lg:w-1/4 shrink-0">
        <div className="bg-white rounded-[24px] border border-[#E8DDD4] p-6 sticky top-28 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-[#332A20]">Filters</h3>
          </div>

          <div className="space-y-8">
            {/* Category */}
            <div>
              <h4 className="font-bold text-[#332A20] mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category"
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                      className="text-[#2D6A4F] focus:ring-[#2D6A4F] cursor-pointer"
                    />
                    <span className="text-[#6B5744] text-[15px]">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-bold text-[#332A20] mb-3">Rating</h4>
              <div className="space-y-2">
                {[0, 3, 4, 4.5].map((rating) => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="text-[#2D6A4F] focus:ring-[#2D6A4F] cursor-pointer"
                    />
                    <span className="text-[#6B5744] text-[15px]">
                      {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex justify-between mb-3">
                <h4 className="font-bold text-[#332A20]">Max Price</h4>
                <span className="text-[#2D6A4F] font-bold text-sm">₹{maxPrice.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="30000" 
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-[#2D6A4F]"
              />
              <div className="flex justify-between text-xs text-[#6B5744]/60 mt-1">
                <span>₹1K</span>
                <span>₹30K+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="lg:w-3/4">
        <div className="mb-4 text-[#6B5744] font-medium text-sm">
          Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'property' : 'properties'} in {areaLabel(area)}
        </div>
        
        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-[24px] border border-[#E8DDD4] shadow-sm">
            <h3 className="text-xl font-bold text-[#332A20] mb-2">No properties found</h3>
            <p className="text-[#6B5744]">Try adjusting your filters to see more results.</p>
            <button 
              onClick={() => {
                setCategory('All');
                setMinRating(0);
                setMaxPrice(20000);
              }}
              className="mt-6 text-[#2D6A4F] font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
