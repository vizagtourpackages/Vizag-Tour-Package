import Link from "next/link";
import { Star } from "lucide-react";
import PackageBookingButton from "@/components/PackageBookingButton";
import CustomEnquiryButton from "@/components/booking/CustomEnquiryButton";

export default function PackageBookingSidebar({ 
  pkg, 
  originalPrice, 
  discountPercent 
}: { 
  pkg: any; 
  originalPrice: number | null; 
  discountPercent: number; 
}) {
  return (
    <div className="bg-white border border-charcoal/10 shadow-xl rounded-[24px] p-5 sm:p-6 flex flex-col gap-5">
      {/* Pricing Block */}
      <div className="text-center space-y-1">
        {originalPrice && discountPercent > 0 && (
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-lg text-charcoal/40 line-through font-bold">
              ₹{originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Save {discountPercent}%
            </span>
          </div>
        )}
        <div className="text-4xl font-heading font-black tracking-tight text-charcoal">
          ₹{pkg.price.toLocaleString('en-IN')}
        </div>
        <div className="text-charcoal/60 font-bold text-sm uppercase tracking-wider">
          {pkg.price_label || 'Per Couple'}
        </div>
      </div>

      <div className="h-px bg-charcoal/10 w-full" />

      {/* Book Now Block */}
      <div className="space-y-3">
        <PackageBookingButton pkg={pkg} />
        <div className="text-center text-[10px] text-charcoal/50">
          By booking you agree to our <Link href="/terms" className="underline hover:text-teal">Terms & Conditions</Link>
        </div>
      </div>
      
      <div className="h-px bg-charcoal/10 w-full" />

      {/* Key Details */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-sm">
          <span className="text-charcoal/60 font-medium">Duration</span>
          <span className="font-bold text-charcoal text-right">{pkg.duration}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-charcoal/60 font-medium">Type</span>
          <span className="font-bold text-charcoal text-right">{pkg.setting || pkg.type || 'Private Tour'}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-charcoal/60 font-medium">Price for</span>
          <span className="font-bold text-charcoal text-right">{pkg.price_label || 'Per Couple'}</span>
        </div>
        <div className="flex justify-between items-start text-sm">
          <span className="text-charcoal/60 font-medium">Pickup</span>
          <span className="font-bold text-charcoal text-right max-w-[150px]">{pkg.pickup_location || 'Visakhapatnam (Vizag)'}</span>
        </div>
      </div>

      <div className="h-px bg-charcoal/10 w-full" />

      {/* Rating Block */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black font-heading text-charcoal">{pkg.rating || '4.9'}</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={18} className="fill-amber-500 text-amber-500" />
            ))}
          </div>
        </div>
        <span className="text-xs font-bold text-charcoal/50 uppercase tracking-widest">
          {(pkg.review_count || 124).toLocaleString('en-IN')} Verified Reviews
        </span>
      </div>

      <div className="h-px bg-charcoal/10 w-full" />

      {/* Enquire Button */}
      <CustomEnquiryButton />
    </div>
  );
}
