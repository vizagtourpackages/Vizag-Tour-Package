import { Shield, BadgeCheck } from "lucide-react";

export default function MobileTrustBanner() {
  return (
    <div className="md:hidden px-4 mt-6 mb-2">
      <div className="border border-emerald-200 rounded-2xl bg-white p-3 py-4 shadow-sm">
        <div className="flex items-start justify-between gap-2 overflow-x-auto scrollbar-hide snap-x">
          
          {/* GST Registered */}
          <div className="flex flex-col items-center text-center shrink-0 snap-center min-w-[75px]">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border-[3px] border-emerald-50 flex items-center justify-center mb-2">
              <div className="w-full h-full rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <Shield size={16} className="fill-transparent" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-charcoal leading-tight">GST Registered</span>
            <span className="text-[10px] text-charcoal/60 mt-0.5">100% Compliant</span>
          </div>

          {/* Verified */}
          <div className="flex flex-col items-center text-center shrink-0 snap-center min-w-[75px]">
            <div className="w-10 h-10 rounded-full bg-blue-50 border-[3px] border-blue-50 flex items-center justify-center mb-2">
              <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white">
                <BadgeCheck size={18} />
              </div>
            </div>
            <span className="text-[11px] font-bold text-charcoal leading-tight">Verified</span>
            <span className="text-[10px] text-charcoal/60 mt-0.5">Google Verified</span>
          </div>

          {/* 6+ Years */}
          <div className="flex flex-col items-center text-center shrink-0 snap-center min-w-[75px]">
            <div className="w-10 h-10 rounded-full bg-amber-50 border-[3px] border-amber-50 flex items-center justify-center mb-2">
              <div className="w-full h-full rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm">
                6+
              </div>
            </div>
            <span className="text-[11px] font-bold text-charcoal leading-tight">6+ Years</span>
            <span className="text-[10px] text-charcoal/60 mt-0.5">Since 2020</span>
          </div>

          {/* 4.9 Rating */}
          <div className="flex flex-col items-center text-center shrink-0 snap-center min-w-[75px]">
            <div className="w-10 h-10 rounded-full bg-yellow-50/50 border-[3px] border-yellow-50 flex items-center justify-center mb-2 bg-white">
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <span className="text-[11px] font-bold text-charcoal leading-tight">4.9 Rating</span>
            <span className="text-[10px] text-charcoal/60 mt-0.5">700+ Reviews</span>
          </div>

        </div>
      </div>
    </div>
  );
}
