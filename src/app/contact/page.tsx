"use client";

import { useState } from "react";
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
    <div className="bg-warm-white min-h-screen pb-24 pt-5">
      <div className="container-max">
        <SectionHeading
          title="Contact Us"
          subtitle="Have a question or ready to book? We're here to help you plan the perfect Vizag trip."
        />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Contact Info & Map */}
          <div className="lg:w-1/2 space-y-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 min-w-0">
              <div className="card-base p-5 sm:p-6 border border-sand min-w-0">
                <Phone className="text-ocean mb-4" size={28} />
                <h3 className="font-semibold text-charcoal mb-2">Call Us</h3>
                <div className="space-y-1 min-w-0">
                  <a href={`tel:${siteInfo.whatsapp}`} className="block text-charcoal-light hover:text-ocean transition-colors break-words">
                    +91 {siteInfo.whatsapp.replace('+91', '')}
                  </a>
                  <a href={`tel:${siteInfo.landline}`} className="block text-charcoal-light hover:text-ocean transition-colors break-words">
                    {siteInfo.landline}
                  </a>
                </div>
              </div>

              <div className="card-base p-5 sm:p-6 border border-sand min-w-0">
                <MessageCircle className="text-green-500 mb-4" size={28} />
                <h3 className="font-semibold text-charcoal mb-2">WhatsApp</h3>
                <a href={siteInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-charcoal-light hover:text-green-500 transition-colors block break-words">
                  Chat with us directly
                </a>
              </div>

              <div className="card-base p-5 sm:p-6 border border-sand min-w-0">
                <Mail className="text-coral mb-4" size={28} />
                <h3 className="font-semibold text-charcoal mb-2">Email</h3>
                <a href={`mailto:${siteInfo.email}`} className="text-charcoal-light hover:text-coral transition-colors break-all block">
                  {siteInfo.email}
                </a>
              </div>

              <div className="card-base p-5 sm:p-6 border border-sand min-w-0">
                <MapPin className="text-teal mb-4" size={28} />
                <h3 className="font-semibold text-charcoal mb-2">Office Address</h3>
                <p className="text-charcoal-light break-words">
                  {siteInfo.address}
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-2 rounded-2xl shadow-card border border-sand h-64 relative overflow-hidden flex items-center justify-center min-w-0">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230c7b93\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
              <div className="text-center z-10 relative">
                <MapPin size={32} className="text-charcoal mx-auto mb-2 opacity-50" />
                <p className="text-charcoal-light font-medium">Google Maps Embed Placeholder</p>
                <p className="text-sm text-charcoal-light/60">Requires network access</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-1/2 min-w-0">
            <div className="card-base p-5 sm:p-8 lg:p-10 border border-sand min-w-0">
              <h3 className="text-2xl font-heading text-charcoal mb-6">Send us a Message</h3>

              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h4 className="font-heading text-2xl text-charcoal mb-2">Message Sent!</h4>
                  <p className="text-charcoal-light">We&apos;ll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 min-w-0">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none bg-warm-white text-charcoal"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 min-w-0">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none bg-warm-white text-charcoal"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none bg-warm-white text-charcoal"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">Subject</label>
                    <select
                      id="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none bg-warm-white text-charcoal"
                    >
                      <option value="">Select a subject...</option>
                      <option value="tour">Tour Package Inquiry</option>
                      <option value="hotel">Hotel Booking</option>
                      <option value="transport">Vehicle Rental</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-sand focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all outline-none bg-warm-white text-charcoal resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full"
                  >
                    {status === "submitting" ? "Sending..." : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
