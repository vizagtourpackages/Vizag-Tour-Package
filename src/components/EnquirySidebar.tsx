"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { submitCustomEnquiry } from "@/app/actions/booking";
import { FormError, FormSuccess, PhoneInput, Stepper, SubmitButton, TextArea, TextInput } from "@/components/forms/Fields";
import { useSite } from "@/components/SiteProvider";
import { formatDate } from '@/lib/format'

/**
 * Enquiry form used on destination / hotel / temple / guide pages.
 * Saves the enquiry to the database, then opens WhatsApp with the details pre-filled.
 */
export function EnquiryForm({ context, compact = false }: { context: string; compact?: boolean }) {
  const { openWhatsApp } = useSite();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await submitCustomEnquiry({
      name: name.trim(),
      phone,
      start_date: date,
      end_date: date,
      adults: guests,
      children: 0,
      destinations: [context],
      special_requirements: `[${context}] ${message}`.trim(),
    });
    if (!res.success) {
      setLoading(false);
      setError("Could not send your enquiry. Please try again.");
      return;
    }

    const text = `Hi! I'd like to enquire about ${context}.
Name: ${name.trim()}
Mobile: +91 ${phone}
Travel date: ${formatDate(date)}
Guests: ${guests}${message ? `\nMessage: ${message}` : ""}`;
    setDone(text);
    setLoading(false);
    openWhatsApp(text);
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
        <FormSuccess whatsappMessage={done} />
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <FormError message={error} />
      <TextInput label="Your name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
      <PhoneInput required label="Mobile number" value={phone} onChange={setPhone} />
      <TextInput label="Travel date" required type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
      <Stepper label="Guests" required min={1} max={40} value={guests} onChange={setGuests} />
      {!compact && <TextArea label="Message" hint="optional" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything we should know?" />}
      <SubmitButton loading={loading}>Get free quote</SubmitButton>
    </form>
  );
}

/**
 * Page layout with a sticky enquiry sidebar on desktop and a floating button + bottom sheet on mobile.
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
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_350px]">
        <div className="min-w-0">{children}</div>

        {/* Desktop sidebar */}
        <aside className="sticky top-24 mt-12 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[28px] border border-coral/15 bg-white shadow-float"
          >
            <div className="bg-sunset px-6 py-5 text-white">
              <p className="text-[0.66rem] font-bold uppercase tracking-widest text-white/80">Plan your trip</p>
              <h3 className="font-heading text-xl leading-tight">Enquire about {context}</h3>
            </div>
            <div className="thin-scroll max-h-[calc(100vh-14rem)] [max-height:calc(100dvh-14rem)] overflow-y-auto p-5">
              <EnquiryForm context={context} />
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Mobile floating trigger */}
      <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-[150] lg:hidden">
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
              className="fixed inset-0 z-[250] bg-ocean/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-label={`Enquire about ${context}`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="thin-scroll fixed inset-x-0 bottom-0 z-[260] max-h-[92vh] overflow-y-auto rounded-t-[26px] bg-white px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3 [max-height:92dvh] lg:hidden"
            >
              <div aria-hidden className="mx-auto mb-3 h-1 w-10 rounded-full bg-ocean/15" />
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="font-heading text-[1.35rem] leading-tight text-ocean">Enquire about {context}</h3>
                <button onClick={() => setOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ocean/6 text-ocean" aria-label="Close">
                  <X size={19} />
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
