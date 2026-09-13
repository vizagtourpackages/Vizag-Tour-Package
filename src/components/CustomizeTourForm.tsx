"use client";

import { useState } from "react";
import { CheckCircle2, Send, Loader2, Plus, Minus } from "lucide-react";
import {
  dayOptions,
  accommodationOptions,
  vehicleOptions,
} from "@/data/packages";

export default function CustomizeTourForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      // Reset form after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-card text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="font-heading text-2xl text-charcoal mb-3">
          Request Received!
        </h3>
        <p className="text-charcoal-light max-w-md mx-auto">
          Thank you for choosing Vizag Tour Packages. Our travel expert will
          contact you shortly with a customized itinerary and quote.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-card border border-charcoal/5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2 tracking-tight">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all outline-none text-charcoal font-medium bg-sand/50"
              placeholder="John Doe"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-charcoal mb-2 tracking-tight">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all outline-none text-charcoal font-medium bg-sand/50"
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-2 tracking-tight">
              Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all outline-none text-charcoal font-medium bg-sand/50"
              placeholder="john@example.com"
            />
          </div>

          {/* Days */}
          <div className="sm:col-span-2">
            <label htmlFor="days" className="block text-sm font-bold text-charcoal mb-2 tracking-tight">
              Number of Days
            </label>
            <select
              id="days"
              className="w-full px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all outline-none text-charcoal font-medium bg-sand/50 appearance-none"
            >
              <option value="">Select duration</option>
              {dayOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Adults */}
          <div>
            <label className="block text-sm font-bold text-charcoal mb-2 tracking-tight">
              Adults
            </label>
            <div className="flex items-center justify-between px-5 py-3 rounded-[16px] border border-charcoal/10 bg-sand/50 h-[58px]">
              <button 
                type="button"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-teal hover:text-white transition-colors border border-charcoal/5 shadow-sm"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-charcoal">{adults}</span>
              <button 
                type="button"
                onClick={() => setAdults(adults + 1)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-teal hover:text-white transition-colors border border-charcoal/5 shadow-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Children */}
          <div>
            <label className="block text-sm font-bold text-charcoal mb-2 tracking-tight">
              Children (under 12)
            </label>
            <div className="flex items-center justify-between px-5 py-3 rounded-[16px] border border-charcoal/10 bg-sand/50 h-[58px]">
              <button 
                type="button"
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-teal hover:text-white transition-colors border border-charcoal/5 shadow-sm"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-charcoal">{children}</span>
              <button 
                type="button"
                onClick={() => setChildren(children + 1)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-teal hover:text-white transition-colors border border-charcoal/5 shadow-sm"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Accommodation */}
          <div>
            <label htmlFor="accommodation" className="block text-sm font-bold text-charcoal mb-2 tracking-tight">
              Accommodation Type
            </label>
            <select
              id="accommodation"
              className="w-full px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all outline-none text-charcoal font-medium bg-sand/50 appearance-none"
            >
              <option value="">Select accommodation</option>
              {accommodationOptions.map((acc) => (
                <option key={acc} value={acc}>
                  {acc}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle */}
          <div className="sm:col-span-2">
            <label htmlFor="vehicle" className="block text-sm font-bold text-charcoal mb-2 tracking-tight">
              Vehicle Type
            </label>
            <select
              id="vehicle"
              className="w-full px-5 py-4 rounded-[16px] border border-charcoal/10 focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all outline-none text-charcoal font-medium bg-sand/50 appearance-none"
            >
              <option value="">Select vehicle</option>
              {vehicleOptions.map((vehicle) => (
                <option key={vehicle} value={vehicle}>
                  {vehicle}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full mt-6 bg-teal hover:bg-teal-dark"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Submitting Request...
            </>
          ) : (
            <>
              <Send size={20} />
              Get Custom Quote
            </>
          )}
        </button>
        <p className="text-center text-xs font-medium text-charcoal/50 mt-4">
          No payment required. We will contact you with the best available prices.
        </p>
      </form>
    </div>
  );
}
