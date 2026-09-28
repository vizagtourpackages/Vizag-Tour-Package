"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { siteInfo } from "@/data/siteInfo";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen pb-24 pt-8">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Contact Us"
            subtitle="Have a question or ready to book? We're here to help you plan the perfect Vizag trip."
          />
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Contact Info & Map */}
          <div className="lg:w-1/2 space-y-8">
            {/* Info Cards */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 min-w-0">
                <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 min-w-0 group">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-4 text-charcoal shadow-sm border border-charcoal/5 group-hover:bg-ocean group-hover:text-white transition-colors duration-500">
                    <Phone size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-charcoal mb-2 tracking-tight">Call Us</h3>
                  <div className="space-y-1 min-w-0">
                    <a href={`tel:${siteInfo.whatsapp}`} className="block text-charcoal/60 font-medium hover:text-ocean transition-colors break-words text-base">
                      +91 {siteInfo.whatsapp.replace('+91', '')}
                    </a>
                    <a href={`tel:${siteInfo.landline}`} className="block text-charcoal/60 font-medium hover:text-ocean transition-colors break-words text-base">
                      {siteInfo.landline}
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 min-w-0 group">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-4 text-charcoal shadow-sm border border-charcoal/5 group-hover:bg-green-500 group-hover:text-white transition-colors duration-500">
                    <MessageCircle size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-charcoal mb-2 tracking-tight">WhatsApp</h3>
                  <a href={siteInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-charcoal/60 font-medium hover:text-green-500 transition-colors block break-words text-base">
                    Chat with us directly
                  </a>
                </div>

                <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 min-w-0 group">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-4 text-charcoal shadow-sm border border-charcoal/5 group-hover:bg-coral group-hover:text-white transition-colors duration-500">
                    <Mail size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-charcoal mb-2 tracking-tight">Email</h3>
                  <a href={`mailto:${siteInfo.email}`} className="text-charcoal/60 font-medium hover:text-coral transition-colors break-all block text-base">
                    {siteInfo.email}
                  </a>
                </div>

                <div className="bg-white rounded-[24px] p-5 sm:p-6 border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 min-w-0 group">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-4 text-charcoal shadow-sm border border-charcoal/5 group-hover:bg-teal group-hover:text-white transition-colors duration-500">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-charcoal mb-2 tracking-tight">Office Address</h3>
                  <p className="text-charcoal/60 font-medium break-words text-sm leading-relaxed">
                    {siteInfo.address}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Map */}
            <ScrollReveal delay={0.4}>
              <div className="bg-sand rounded-[40px] shadow-card border border-charcoal/5 h-64 relative overflow-hidden flex items-center justify-center min-w-0 group hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                <iframe 
                  src="https://maps.google.com/maps?q=AEST+-+Araku+Eco+stays+%26+Travels+-+Vizag,+13-134%2F1,+opposite+Union+Bank,+Mahalaxmi+Nagar,+Pendurthi,+Visakhapatnam,+Andhra+Pradesh+531173&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                ></iframe>
                
                {/* External link overlay button */}
                <a 
                  href="https://maps.app.goo.gl/wuxLcPwa3MZ6hJfp8?g_st=ic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-sm font-bold text-charcoal hover:text-ocean hover:bg-white transition-colors border border-charcoal/5 flex items-center gap-2 z-10"
                  aria-label="Open in Google Maps"
                >
                  <MapPin size={16} />
                  <span>Open in Maps</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 min-w-0">
            <ScrollReveal delay={0.3}>
              <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-charcoal/5 shadow-card relative overflow-hidden min-w-0">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <h3 className="text-2xl font-heading font-bold text-charcoal mb-6 tracking-tight relative z-10">Send us a Message</h3>

                {status === "success" ? (
                  <div className="text-center py-16 relative z-10">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h4 className="font-heading font-black text-3xl text-charcoal mb-4 tracking-tight">Message Sent!</h4>
                    <p className="text-charcoal/60 font-medium text-lg max-w-sm mx-auto">We&apos;ll get back to you as soon as possible with all the details.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 min-w-0 relative z-10">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-[16px] border border-charcoal/5 focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all outline-none bg-sand/30 text-charcoal font-medium text-base placeholder:text-charcoal/30"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-0">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full px-4 py-3 rounded-[16px] border border-charcoal/5 focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all outline-none bg-sand/30 text-charcoal font-medium text-base placeholder:text-charcoal/30"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          className="w-full px-4 py-3 rounded-[16px] border border-charcoal/5 focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all outline-none bg-sand/30 text-charcoal font-medium text-base placeholder:text-charcoal/30"
                          placeholder="+91 9876543210"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-2">Subject</label>
                      <select
                        id="subject"
                        required
                        className="w-full px-4 py-3 rounded-[16px] border border-charcoal/5 focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all outline-none bg-sand/30 text-charcoal font-medium text-base appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-charcoal/30">Select a subject...</option>
                        <option value="tour">Tour Package Inquiry</option>
                        <option value="hotel">Hotel Booking</option>
                        <option value="cab">Cab Booking</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-charcoal/50 uppercase tracking-widest mb-2">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-[16px] border border-charcoal/5 focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all outline-none bg-sand/30 text-charcoal font-medium text-base resize-none placeholder:text-charcoal/30"
                        placeholder="Tell us about your trip..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-primary w-full bg-coral hover:bg-[#e86644] text-white shadow-[0_8px_20px_rgba(255,107,107,0.3)] hover:-translate-y-1 transition-all duration-300 py-4 text-lg"
                    >
                      {status === "submitting" ? "Sending..." : (
                        <div className="flex items-center justify-center gap-3">
                          <Send size={20} />
                          <span>Send Message</span>
                        </div>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
