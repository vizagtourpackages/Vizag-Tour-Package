"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { siteInfo } from "@/data/siteInfo";

const faqs = [
  {
    q: "How do I book a tour package or cab with you?",
    a: `You can book online through our platform, send a WhatsApp message to ${siteInfo.whatsapp}, or call our 24/7 helpline. Zero advance deposit required for standard bookings!`,
  },
  {
    q: "Are highway tolls and driver allowances included in tour packages?",
    a: "Yes! All sightseeing packages (Araku, Lambasingi, Borra Caves) and outstation flat rates are 100% all-inclusive with driver allowance, fuel, and highway tolls.",
  },
  {
    q: "Are drivers police-verified and experienced in Araku ghat roads?",
    a: "Yes. Every chauffeur undergoes background verification and possesses a minimum of 5+ years of mountain ghat road driving experience for maximum family safety.",
  },
  {
    q: "What is your cancellation and refund policy?",
    a: "We offer 100% free cancellation up to 2 hours prior to scheduled pickup. Zero cancellation penalties or surprise charges.",
  },
  {
    q: "Do you offer pickup from Visakhapatnam Airport (VTZ)?",
    a: "Yes, our drivers monitor real-time flight status and will wait at arrival gates with a personalized name card.",
  },
  {
    q: "Can I hire a driver for my personal luxury car?",
    a: 'Yes! We provide certified "Chauffeur on Demand" services for city travel or outstation drives in your personal vehicle at affordable daily rates.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-warm-white">
      <div className="container-max max-w-4xl mx-auto">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Clear answers to common questions about bookings, tour inclusions, and safety policies."
        />

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-ocean/5 border-ocean/30 shadow-md"
                    : "bg-white border-gray-100 hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-charcoal focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                        isOpen
                          ? "bg-ocean text-white border-ocean"
                          : "bg-ocean/10 text-ocean border-ocean/20"
                      }`}
                    >
                      <HelpCircle size={16} />
                    </span>
                    <span className="font-heading tracking-wide">{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-ocean" : "text-gray-400"
                    }`}
                  />
                </button>
                
                <div
                  className={`px-5 md:px-16 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-2 border-t border-gray-100/50 text-sm md:text-base text-charcoal/70 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 max-w-2xl mx-auto text-center p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-charcoal font-heading">Have a custom query or large group?</h4>
            <p className="text-sm text-charcoal/60 mt-1">Our 24/7 human desk is standing by.</p>
          </div>
          <a href={`tel:${siteInfo.whatsapp.replace(/\D/g, '')}`} className="btn-primary shrink-0 whitespace-nowrap">
            Call Support Now
          </a>
        </div>
      </div>
    </section>
  );
}
