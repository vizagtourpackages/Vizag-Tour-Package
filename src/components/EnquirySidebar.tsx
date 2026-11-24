"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle, Send, X } from "lucide-react";
import { submitCustomEnquiry } from "@/app/actions/booking";

export function EnquiryForm({ context, onDone }: { context: string; onDone?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    setError("");
    const res = await submitCustomEnquiry({
      name: fd.get("name"),
      phone: fd.get("phone"),
      start_date: fd.get("start_date"),
      end_date: fd.get("start_date"),
      adults: Number(fd.get("adults")) || 2,
      children: 0,
      destinations: [context],
      special_requirements: `[${context}] ${fd.get("message") || ""}`.trim(),
    });
    setLoading(false);
    if (res.success) {
      setSent(true);
      onDone?.();
    } else {
      setError("Could not send your enquiry. Please try again.");
    }
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-10 text-center"
      >
        <CheckCircle2 className="mx-auto text-teal mb-3" size={44} />
        <h4 className="font-heading font-bold text-lg text-charcoal">Thank you!</h4>
        <p className="text-sm text-charcoal/60 mt-1">Our travel expert will call you shortly.</p>
      </motion.div>
    );
  }

  const input =
    "w-full rounded-xl border border-charcoal/10 bg-white px-3.5 py-2.5 text-sm font-medium text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral transition-all";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" required placeholder="Your name" className={input} />
      <input name="phone" required type="tel" pattern="[0-9]{10}" title="10 digit mobile number" placeholder="Mobile number" className={input} />
      <div className="grid grid-cols-2 gap-3">
        <input name="start_date" required type="date" min={today} className={input} />
        <input name="adults" type="number" min={1} defaultValue={2} className={input} aria-label="Guests" />
      </div>
      <textarea name="message" rows={2} placeholder="Anything we should know?" className={`${input} resize-none`} />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="btn-coral w-full !py-3 text-sm disabled:opacity-60">
        {loading ? <Loader2 size={16} className="animate-spin" /> : (<>Get Free Quote <Send size={15} /></>)}
      </button>
      <p className="text-[10px] text-center text-charcoal/40 font-medium">No spam. We reply within a few hours.</p>
    </form>
  );
}

/**
 * Page layout with a sticky enquiry sidebar on desktop and a floating button + bottom sheet on mobile.
 * Place around the main content of a destination / hotel / package page.
 */
export default function EnquirySidebar({
  context,
  children,
}: {
  context: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start">
        <div className="min-w-0">{children}</div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block sticky top-24 mt-12">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] border border-coral/15 bg-white shadow-float overflow-hidden"
          >
            <div className="bg-sunset px-6 py-5 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Plan your trip</p>
              <h3 className="font-heading font-black text-xl leading-tight">Enquire about {context}</h3>
            </div>
            <div className="p-5">
              <EnquiryForm context={context} />
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Mobile floating trigger */}
      <div className="lg:hidden fixed right-4 bottom-24 z-[150]">
        <button onClick={() => setOpen(true)} className="btn-coral !px-5 !py-3 text-sm shadow-float">
          <MessageCircle size={18} /> Enquire
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 z-[250] bg-ocean/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              data-lenis-prevent className="lg:hidden fixed bottom-0 inset-x-0 z-[260] rounded-t-[28px] bg-white p-5 pb-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-black text-lg text-charcoal">Enquire about {context}</h3>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-sand flex items-center justify-center" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <EnquiryForm context={context} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
