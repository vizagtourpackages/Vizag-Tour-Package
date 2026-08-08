"use client";

import { useState } from "react";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import {
  dayOptions,
  accommodationOptions,
  vehicleOptions,
} from "@/data/packages";

export default function CustomizeTourForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-sand">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none text-charcoal"
              placeholder="John Doe"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none text-charcoal"
              placeholder="+91 98765 43210"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none text-charcoal"
              placeholder="john@example.com"
            />
          </div>

          {/* Days */}
          <div>
            <label htmlFor="days" className="block text-sm font-medium text-charcoal mb-2">
              Number of Days
            </label>
            <select
              id="days"
              className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none text-charcoal bg-white"
            >
              <option value="">Select duration</option>
              {dayOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Accommodation */}
          <div>
            <label htmlFor="accommodation" className="block text-sm font-medium text-charcoal mb-2">
              Accommodation Type
            </label>
            <select
              id="accommodation"
              className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none text-charcoal bg-white"
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
            <label htmlFor="vehicle" className="block text-sm font-medium text-charcoal mb-2">
              Vehicle Type
            </label>
            <select
              id="vehicle"
              className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none text-charcoal bg-white"
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
          className="btn-primary w-full mt-4"
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
        <p className="text-center text-xs text-charcoal-light/60 mt-4">
          No payment required. We will contact you with the best available prices.
        </p>
      </form>
    </div>
  );
}
