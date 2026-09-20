'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function ResortGallery({
  images,
  hotel
}: {
  images: string[];
  hotel: any;
}) {
  const [activeImage, setActiveImage] = useState(images[0] || '/placeholder.jpg');

  // Only use the images provided by the admin
  const displayImages = images && images.length > 0 ? images : ['/placeholder.jpg'];

  return (
    <div className="w-full px-4 md:px-0">
      {/* Mobile Hero (Padded) */}
      <div className="md:hidden relative w-full h-[50vh] min-h-[400px] rounded-[24px] overflow-hidden mt-4 shadow-sm">
        <Image fill src={activeImage} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/90 via-[#1C1C1E]/30 to-transparent pointer-events-none"></div>

        {/* Top floating buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
          <Link href="/hotels-and-resorts" className="flex items-center gap-2 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10 shadow-sm transition-colors hover:bg-black/60">
            <ArrowLeft size={16} />
            Back to Resorts
          </Link>
        </div>

        {/* Bottom left info overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 pointer-events-none">
          <div>
            <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block shadow-sm">
              {hotel.category || hotel.type || 'Resorts'}
            </span>
            <h1 className="text-3xl font-bold text-white leading-tight mb-1">{hotel.name}</h1>
            {hotel.tagline && <p className="text-white text-sm font-medium opacity-90">{hotel.tagline}</p>}
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery (Mobile Only) */}
      {displayImages.length > 1 && (
        <div className="md:hidden flex overflow-x-auto gap-4 py-4 hide-scrollbar mb-4 snap-x snap-mandatory px-1">
          {displayImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(img)}
              style={{ width: '80px', height: '80px' }}
              className={`relative shrink-0 snap-center rounded-[16px] overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-y-1 ${activeImage === img ? 'border-emerald-600' : 'border-[#E8DDD4] hover:border-emerald-300'}`}
            >
              <Image fill src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Desktop Hero & Vertical Gallery */}
      <div className="hidden md:flex gap-4 h-[500px] mt-8 mb-8 relative">
        {/* Back Button */}
        <Link href="/hotels-and-resorts" className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10 shadow-sm transition-colors hover:bg-black/60">
          <ArrowLeft size={16} /> Back to Resorts
        </Link>

        {/* Main Cover Image */}
        <div className="relative rounded-[24px] overflow-hidden group h-full flex-1">
          <Image fill src={activeImage} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/90 via-[#1C1C1E]/30 to-transparent pointer-events-none"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 pointer-events-none">
            <div>
              <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 inline-block shadow-sm">
                {hotel.category || hotel.type || 'Resorts'}
              </span>
              <h1 className="text-4xl font-bold text-white leading-tight mb-2 tracking-tight">{hotel.name}</h1>
              {hotel.tagline && <p className="text-white text-lg font-medium opacity-90">{hotel.tagline}</p>}
            </div>
          </div>
        </div>

        {/* Right Side Vertical Scrollable Gallery (only if multiple images) */}
        {displayImages.length > 1 && (
          <div
            style={{ width: '80px', minWidth: '80px' }}
            className="shrink-0 flex flex-col gap-3 h-full overflow-y-auto hide-scrollbar pr-1 pb-1"
          >
            {displayImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(img)}
                style={{ height: '85px', minHeight: '85px' }}
                className={`relative w-full shrink-0 rounded-[16px] overflow-hidden shadow-sm cursor-pointer transition-all hover:-translate-x-1 ${activeImage === img ? 'border-emerald-600' : 'border-[#E8DDD4] hover:border-emerald-300'}`}
              >
                <Image fill src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
