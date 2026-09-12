"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronDown, HelpCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { siteInfo } from "@/data/siteInfo";

const defaultFaqs = [
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

export interface FaqItem {
  q: string;
  a: string;
  id?: string;
}

interface FAQAccordionProps {
  faqs?: FaqItem[];
}

export default function FAQAccordion({ faqs = defaultFaqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="section-padding bg-warm-white">
      <div className="container-max max-w-4xl mx-auto">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Clear answers to common questions about bookings, tour inclusions, and safety policies."
        />

        <div className="mt-10 space-y-4">
          {displayFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className={`rounded-[24px] border transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "bg-white border-charcoal/10 shadow-card"
                      : "bg-white border-charcoal/5 hover:border-charcoal/10 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base md:text-lg text-charcoal focus:outline-none tracking-tight"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 ${
                          isOpen
                            ? "bg-coral text-white border-coral"
                            : "bg-sand text-charcoal/60 border-charcoal/5"
                        }`}
                      >
                        <HelpCircle size={20} />
                      </span>
                      <span className="font-heading tracking-tight leading-tight">{faq.q}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-500 shrink-0 ${
                        isOpen ? "rotate-180 text-coral" : "text-charcoal/40"
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`px-5 sm:px-6 md:px-[88px] overflow-hidden transition-all duration-500 ${
                      isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pt-2 border-t border-charcoal/5 text-sm md:text-base text-charcoal/60 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-12 max-w-2xl mx-auto text-center p-8 sm:p-10 bg-white rounded-[32px] border border-charcoal/5 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-card-hover transition-shadow duration-500">
            <div className="text-center sm:text-left">
              <h4 className="text-xl font-bold text-charcoal font-heading tracking-tight">Have a custom query or large group?</h4>
              <p className="text-base text-charcoal/60 font-medium mt-1">Our 24/7 human desk is standing by.</p>
            </div>
            <a href={`tel:${siteInfo.whatsapp.replace(/\D/g, '')}`} className="btn-primary shrink-0 whitespace-nowrap bg-teal hover:bg-teal-dark w-full sm:w-auto">
              Call Support Now
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
