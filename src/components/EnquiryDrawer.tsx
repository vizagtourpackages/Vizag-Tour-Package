"use client";

import { useState } from "react";
import { Send, CheckCircle2, ArrowRight, Plus, Minus } from "lucide-react";

export default function EnquiryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  return (
    <>
      {/* Side Tab Button */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[200]">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-coral text-white font-bold uppercase text-xs tracking-widest py-3 px-2 rounded-r-xl shadow-float hover:bg-coral-light hover:pr-4 transition-all duration-300 flex items-center justify-center border border-coral/20"
          style={{ writingMode: "vertical-rl" }}
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
        className={`fixed top-0 left-0 h-full w-[90vw] md:w-[500px] bg-charcoal text-white z-[250] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-white tracking-tight">
              Customize Your <span className="text-coral">Dream Tour</span>
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <p className="text-white/60 mb-8 font-medium leading-relaxed text-sm">
            Tell us your preferences and our travel experts will design a personalized itinerary just for you.
          </p>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Enquiry submitted! We will contact you soon."); setIsOpen(false); }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-sm font-medium"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block">Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest block">Travel Dates</label>
              <input
                type="text"
                placeholder="E.g., Mid December or Specific Dates"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all text-sm font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block">Adults</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2 h-[48px]">
                  <button 
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-white text-sm">{adults}</span>
                  <button 
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block">Children</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2 h-[48px]">
                  <button 
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral hover:text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-white text-sm">{children}</span>
                  <button 
                    type="button"
                    onClick={() => setChildren(children + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-coral hover:text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest block">Destinations of Interest</label>
              <div className="flex flex-wrap gap-2">
                {["Vizag Local", "Araku Valley", "Vanajangi", "Lambasingi", "Tarabu Waterfalls"].map(
                  (dest) => (
                    <label
                      key={dest}
                      className="cursor-pointer group flex items-center relative"
                    >
                      <input type="checkbox" className="peer sr-only" />
                      <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 peer-checked:bg-coral peer-checked:border-coral peer-checked:text-white transition-all duration-300 hover:bg-white/10">
                        {dest}
                      </div>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest block">Special Requirements</label>
              <textarea
                rows={3}
                placeholder="Any specific hotel preferences, dietary requirements, or places you must visit?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-coral/50 transition-all resize-none text-sm font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full btn-coral !py-4 flex items-center justify-center gap-2 mt-4"
            >
              Get Custom Quote <Send size={18} />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-6 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-teal" />
              <span className="text-xs font-bold text-white/60 tracking-widest uppercase">Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-teal" />
              <span className="text-xs font-bold text-white/60 tracking-widest uppercase">Best Prices</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
