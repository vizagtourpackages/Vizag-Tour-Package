"use client";

import { useBooking } from "./booking/BookingContext";
import { useSite } from "./SiteProvider";
import { waMessages } from "@/lib/whatsapp";

/** End-of-article call to action: plan a custom trip or ask on WhatsApp. */
export default function BlogCta({ title }: { title: string }) {
  const { openBooking } = useBooking();
  const { wa } = useSite();
  return (
    <div className="grain relative overflow-hidden rounded-[28px] bg-ocean-gradient px-6 py-9 text-center text-white sm:px-10">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blob text-coral/30" />
      <div className="relative">
        <h2 className="font-heading text-[clamp(1.5rem,3.4vw,2.2rem)] leading-[1.12]">
          Inspired? Let&apos;s plan <span className="italic text-sunset">your trip.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-white/70">Tell us your dates and group size — we&apos;ll put together the stay, vehicle and itinerary.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => openBooking("package", { title: `Custom trip (from blog: ${title})`, isCustomEnquiry: true })} className="btn-coral">Plan my trip</button>
          <a
            href={wa(`${waMessages.general} I was reading: "${title}".`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/30 px-7 py-3 text-[0.95rem] font-semibold text-white transition-[background-color,color,transform] duration-200 hover:bg-white hover:text-ocean active:scale-[0.97]"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
