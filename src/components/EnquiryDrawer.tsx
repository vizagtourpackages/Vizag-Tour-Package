"use client";

import { useState } from "react";
import { Send, CheckCircle2, ArrowRight, Plus, Minus, Loader2 } from "lucide-react";
import { submitCustomEnquiry } from "@/app/actions/booking";

export default function EnquiryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* Side Tab Button */}
      <div className="fixed right-0 top-32 z-[200]">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-coral text-white font-bold uppercase text-xs tracking-widest py-4 px-2 rounded-r-xl shadow-float hover:bg-coral-light hover:pl-4 transition-all duration-300 flex items-center justify-center border border-coral/20 pr-3"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Enquiry Now
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[250] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[90vw] md:w-[450px] bg-charcoal text-white z-[250] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-heading font-bold text-white tracking-tight">
              Customize Your <span className="text-coral">Dream Tour</span>
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <form className="space-y-4" onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const destinations = Array.from(e.currentTarget.querySelectorAll('input[type="checkbox"]:checked')).map((cb: any) => cb.value);
            
            const payload = {
              name: formData.get("name"),
              phone: formData.get("phone"),
              start_date: formData.get("start_date"),
              end_date: formData.get("end_date"),
              adults,
              children,
              destinations,
              special_requirements: formData.get("special_requirements")
            };

            setLoading(true);
            const res = await submitCustomEnquiry(payload);
            setLoading(false);
            
            if (res.success) {
              alert("Enquiry submitted! We will contact you soon.");
              setIsOpen(false);
            } else {
              alert("Failed to submit enquiry. Please try again.");
            }
          }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-sm font-medium"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Start Date</label>
                <input
                  name="start_date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-sm font-medium [color-scheme:dark]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">End Date</label>
                <input
                  name="end_date"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-sm font-medium [color-scheme:dark]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Adults</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-3 py-1 h-[38px]">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral hover:text-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-white text-sm">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Children</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-3 py-1 h-[38px]">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral hover:text-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-white text-sm">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Destinations of Interest</label>
              <div className="flex flex-wrap gap-1.5">
                {["Vizag Local", "Araku Valley", "Vanajangi", "Lambasingi", "Tarabu Waterfalls", "Others"].map(
                  (dest) => (
                    <label
                      key={dest}
                      className="cursor-pointer group flex items-center relative"
                    >
                      <input type="checkbox" value={dest} className="peer sr-only" />
                      <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-white/60 peer-checked:bg-coral peer-checked:border-coral peer-checked:text-white transition-all duration-300 hover:bg-white/10">
                        {dest}
                      </div>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">Special Requirements</label>
              <textarea
                name="special_requirements"
                rows={2}
                placeholder="Hotel preferences, dietary needs..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all resize-none text-sm font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-coral !py-3 flex items-center justify-center gap-2 mt-2 text-sm"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <>Get Custom Quote <Send size={16} /></>}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-6 border-t border-white/10 pt-4 pb-4">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-teal" />
              <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Quick Response</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-teal" />
              <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Best Prices</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
