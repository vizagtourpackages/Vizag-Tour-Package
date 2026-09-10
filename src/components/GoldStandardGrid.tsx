import { ShieldCheck, BadgeCheck, MapPin, Headset, Wallet, ZapOff, Clock, Sparkles, FileText, MessageCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";

const reasons = [
  {
    icon: <ShieldCheck size={24} />,
    title: "100% Safety Shield",
    description: "Panic SOS button enabled cabs with live security monitoring.",
    color: "text-ocean bg-ocean/10",
  },
  {
    icon: <BadgeCheck size={24} />,
    title: "Verified Local Chauffeurs",
    description: "Police-verified, polite local drivers with 5+ years experience.",
    color: "text-teal bg-teal/10",
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
    color: "text-ocean bg-ocean/10",
  },
  {
    icon: <Wallet size={24} />,
    title: "Fixed Transparent Fare",
    description: "All-inclusive fares covering driver allowance, tolls, and fuel.",
    color: "text-teal bg-teal/10",
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
    color: "text-ocean bg-ocean/10",
  },
  {
    icon: <Sparkles size={24} />,
    title: "Sanitized Luxury Fleet",
    description: "Deep sanitized interiors with fresh seat covers & tissue box.",
    color: "text-teal bg-teal/10",
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
    color: "text-ocean bg-ocean/10",
  },
];

export default function GoldStandardGrid() {
  return (
    <section className="section-padding bg-sand-light">
      <div className="container-max">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold text-ocean bg-ocean/10 border border-ocean/20 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            The Vizag Tour Packages Gold Standard
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
            10 Reasons We Are <span className="text-ocean">#1 in Vizag</span>
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-sm md:text-base">
            Built for reliability, tourist comfort, and absolute peace of mind on coastal highways & Araku ghat roads.
          </p>
        </div>

        <div className="grid grid-rows-2 grid-flow-col sm:grid-rows-none sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="w-[260px] sm:w-auto snap-start bg-white p-6 rounded-2xl border border-gray-100 hover:border-ocean/30 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col h-full group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${reason.color}`}>
                {reason.icon}
              </div>
              <h3 className="font-bold text-charcoal text-base mb-2 group-hover:text-ocean transition-colors">
                {reason.title}
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed mt-auto">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
