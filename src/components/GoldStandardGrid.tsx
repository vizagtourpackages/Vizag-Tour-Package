import { ShieldCheck, BadgeCheck, MapPin, Headset, Wallet, ZapOff, Clock, Sparkles, FileText, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const reasons = [
  {
    icon: <ShieldCheck size={24} />,
    title: "Safe & Secure",
    description: "Live trip monitoring.",
    color: "text-teal bg-teal/10",
  },
  {
    icon: <BadgeCheck size={24} />,
    title: "Trusted Drivers",
    description: "Experienced, verified & professional chauffeurs.",
    color: "text-charcoal bg-charcoal/5",
  },
  {
    icon: <MapPin size={24} />,
    title: "Live Trip Tracking",
    description: "Share your live location with family.",
    color: "text-coral bg-coral/10",
  },
  {
    icon: <Headset size={24} />,
    title: "24/7 Support",
    description: "Round-the-clock customer assistance.",
    color: "text-teal bg-teal/10",
  },
  {
    icon: <Wallet size={24} />,
    title: "Transparent Pricing",
    description: "Clear fares with no hidden charges.",
    color: "text-charcoal bg-charcoal/5",
  },
  {
    icon: <ZapOff size={24} />,
    title: "No Surge Charges",
    description: "No unexpected peak-time or night fees.",
    color: "text-coral bg-coral/10",
  },
  {
    icon: <Clock size={24} />,
    title: "On-Time Pickup",
    description: "Drivers arrive before your scheduled time.",
    color: "text-teal bg-teal/10",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Clean & Comfortable",
    description: "Well-maintained and sanitized vehicles.",
    color: "text-charcoal bg-charcoal/5",
  },
  {
    icon: <FileText size={24} />,
    title: "GST Billing",
    description: "Easy GST invoices for business travel.",
    color: "text-coral bg-coral/10",
  },
  {
    icon: <MessageCircle size={24} />,
    title: "Instant Booking",
    description: "Quick confirmation through WhatsApp.",
    color: "text-teal bg-teal/10",
  },
];

export default function GoldStandardGrid() {
  return (
    <section className="section-padding bg-warm-white relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sand rounded-full blur-[120px] opacity-60 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-coral/5 rounded-full blur-[100px]" />

      <div className="container-max relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <ScrollReveal delay={0}>
            <span className="inline-block badge border border-charcoal/10 text-charcoal/70 bg-white mb-8 tracking-widest px-4 py-1.5 shadow-sm">
              🌟 THE VIZAG TOUR PACKAGES GOLD STANDARD
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-3xl lg:text-5xl font-heading font-bold text-charcoal mb-6 leading-[1.1] tracking-tight">
              10 Reasons to Choose Us for <span className="text-coral">Your Vizag Trip</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-1xl sm:text-xl text-charcoal/60 max-w-2xl mx-auto font-medium leading-relaxed">
              From Vizag city sightseeing to the scenic hills of Araku, Vanjangi and Lambasingi, we make your complete travel experience simple, comfortable and memorable.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="flex gap-4 overflow-x-auto pb-4 sm:pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="min-w-[220px] max-w-[220px] sm:min-w-[240px] sm:max-w-[240px] snap-start bg-white p-5 rounded-[20px] border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group flex-shrink-0"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 ${reason.color}`}>
                  {reason.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-charcoal mb-2 group-hover:text-coral transition-colors tracking-tight leading-tight">
                  {reason.title}
                </h3>
                <p className="text-charcoal/60 text-xs font-medium leading-relaxed mt-auto">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
