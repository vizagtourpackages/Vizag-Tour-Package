'use client';

import { useState, useMemo } from 'react';
import HotelCard from '@/components/HotelCard';
import { SlidersHorizontal, X } from 'lucide-react';

export default function ResortListClient({ initialHotels }: { initialHotels: any[] }) {
  const [category, setCategory] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(initialHotels.map(h => h.type)))];

  const filteredHotels = useMemo(() => {
    return initialHotels.filter((hotel) => {
      // Category filter
      if (category !== 'All' && hotel.type !== category) return false;
      
      // Rating filter
      if (hotel.rating < minRating) return false;

      // Price filter (extract numbers from '₹8,500' format)
      const priceVal = parseInt(hotel.price.replace(/[^0-9]/g, '')) || 0;
      if (priceVal > maxPrice) return false;

      return true;
    });
  }, [initialHotels, category, minRating, maxPrice]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 font-bold text-[#332A20] bg-white border border-[#E8DDD4] px-4 py-2 rounded-full shadow-sm"
        >
          <SlidersHorizontal size={18} /> Filters
        </button>
      </div>

      {/* Filters Sidebar */}
      <div className={`lg:w-1/4 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white rounded-[24px] border border-[#E8DDD4] p-6 sticky top-28 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-[#332A20]">Filters</h3>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="lg:hidden text-[#6B5744]">
                <X size={20} />
              </button>
            )}
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
          Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'property' : 'properties'}
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
  );
}
