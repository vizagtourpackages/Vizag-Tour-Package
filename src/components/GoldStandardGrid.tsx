import { ShieldCheck, BadgeCheck, MapPin, Headset, Wallet, ZapOff, Clock, Sparkles, FileText, MessageCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const reasons = [
  {
    icon: <ShieldCheck size={24} />,
    title: "100% Safety Shield",
    description: "Panic SOS button enabled cabs with live security monitoring.",
    color: "text-teal bg-teal/10",
  },
  {
    icon: <BadgeCheck size={24} />,
    title: "Verified Local Chauffeurs",
    description: "Police-verified, polite local drivers with 5+ years experience.",
    color: "text-charcoal bg-charcoal/5",
  },
  {
    icon: <MapPin size={24} />,
    title: "Live GPS Location",
    description: "Live trip location link shared directly with family members.",
    color: "text-coral bg-coral/10",
  },
  {
    icon: <Headset size={24} />,
    title: "24/7 Helpline Desk",
    description: "Round-the-clock human call center in Vizag.",
    color: "text-teal bg-teal/10",
  },
  {
    icon: <Wallet size={24} />,
    title: "Fixed Transparent Fare",
    description: "All-inclusive fares covering driver allowance, tolls, and fuel.",
    color: "text-charcoal bg-charcoal/5",
  },
  {
    icon: <ZapOff size={24} />,
    title: "Zero Surge Fees",
    description: "No peak-hour surge multipliers or night surprise charges.",
    color: "text-coral bg-coral/10",
  },
  {
    icon: <Clock size={24} />,
    title: "15-Min Prior Pickup",
    description: "Chauffeur arrives 15 minutes ahead of scheduled time.",
    color: "text-teal bg-teal/10",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Sanitized Luxury Fleet",
    description: "Deep sanitized interiors with fresh seat covers & tissue box.",
    color: "text-charcoal bg-charcoal/5",
  },
  {
    icon: <FileText size={24} />,
    title: "Corporate GST Billing",
    description: "Instant GST invoice generation for business travelers.",
    color: "text-coral bg-coral/10",
  },
  {
    icon: <MessageCircle size={24} />,
    title: "Instant Confirmation",
    description: "Reserve cab in under 60s with WhatsApp confirmation.",
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-charcoal mb-6 leading-[1.1] tracking-tight">
              10 Reasons We Are <span className="text-coral">#1 in Vizag</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-charcoal/60 max-w-2xl mx-auto font-medium leading-relaxed">
              Built for reliability, tourist comfort, and absolute peace of mind on coastal highways & Araku ghat roads.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-rows-2 grid-flow-col sm:grid-rows-none sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="w-[280px] sm:w-auto snap-start bg-white p-8 rounded-[32px] border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 flex flex-col h-full group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${reason.color}`}>
                  {reason.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-charcoal mb-3 group-hover:text-coral transition-colors tracking-tight leading-tight">
                  {reason.title}
                </h3>
                <p className="text-charcoal/60 text-sm font-medium leading-relaxed mt-auto">
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
