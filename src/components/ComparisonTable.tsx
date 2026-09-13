import { Check, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";

const comparisonData = [
  {
    feature: "Driver Cancellation Rate",
    us: "0% Guaranteed (No Cancellations)",
    others: "High Cancellation Risk",
  },
  {
    feature: "Pricing & Surge",
    us: "100% Fixed Rates (Zero Surge)",
    others: "2x to 3x Surge Charges",
  },
  {
    feature: "Ghat Road Safety",
    us: "Mountain-Experienced Chauffeurs",
    others: "Random/Unexperienced Drivers",
  },
  {
    feature: "Luggage & Waiting",
    us: "Free Waiting & Luggage Assist",
    others: "Per-Minute Wait Penalties",
  },
  {
    feature: "Vehicle Quality",
    us: "100% Sanitized AC Fleet",
    others: "Inconsistent Condition",
  },
  {
    feature: "Customer Support",
    us: "Instant Human Helpline",
    others: "Automated Chatbots",
  },
];

export default function ComparisonTable() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-max max-w-5xl mx-auto">
        <SectionHeading
          title="Travel Better. Travel with Confidence."
          subtitle="See how our commitment to safety, comfort, transparency, and customer service sets us apart."
        />

        <ScrollReveal delay={0.2}>
          <div className="mt-8 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="min-w-[500px] md:min-w-[800px] w-full rounded-[32px] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500 border border-charcoal/5 bg-white">
              <table className="w-full text-left border-collapse">
                {/* Colored Table Header */}
                <thead>
                  <tr className="bg-charcoal text-white">
                    <th className="py-4 px-4 md:py-6 md:px-8 font-heading text-sm md:text-xl font-bold border-r border-white/10 w-1/3">
                      Feature Comparison
                    </th>
                    <th className="py-4 px-4 md:py-6 md:px-8 text-center border-r border-white/10 w-1/3 bg-teal">
                      <div className="flex flex-col items-center md:gap-1">
                        <span className="font-heading text-sm md:text-2xl font-black text-white tracking-tight">Vizag Tour Packages</span>
                        <span className="text-[10px] md:text-xs text-teal-dark bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest font-bold mt-1.5 shadow-sm">The Gold Standard</span>
                      </div>
                    </th>
                    <th className="py-4 px-4 md:py-6 md:px-8 text-center w-1/3 bg-sand text-charcoal">
                      <div className="flex flex-col items-center md:gap-1">
                        <span className="font-heading text-sm md:text-xl font-bold text-charcoal/90">Other Aggregators</span>
                        <span className="text-[10px] md:text-xs text-charcoal/50 uppercase tracking-widest mt-1.5">Standard Cabs</span>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-charcoal/5">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-sand transition-colors group">
                      {/* Feature Column */}
                      <td className="py-4 px-4 md:py-6 md:px-8 font-bold text-xs md:text-base text-charcoal/80 border-r border-charcoal/5 bg-white group-hover:bg-sand transition-colors tracking-tight">
                        {row.feature}
                      </td>

                      {/* Our Advantage Column (Colored Background) */}
                      <td className="py-4 px-4 md:py-6 md:px-8 border-r border-charcoal/5 bg-teal/5 group-hover:bg-teal/10 transition-colors">
                        <div className="flex items-center justify-center gap-2 md:gap-3">
                          <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-teal flex items-center justify-center shrink-0 shadow-sm">
                            <Check size={14} className="text-white md:w-5 md:h-5" strokeWidth={3} />
                          </div>
                          <span className="font-bold text-xs md:text-lg text-teal-dark tracking-tight leading-tight">{row.us}</span>
                        </div>
                      </td>

                      {/* Others Column */}
                      <td className="py-4 px-4 md:py-6 md:px-8 bg-charcoal/5 group-hover:bg-charcoal/10 transition-colors">
                        <div className="flex items-center justify-center gap-2 md:gap-3">
                          <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-coral/20 flex items-center justify-center shrink-0">
                            <X size={12} className="text-coral md:w-4 md:h-4" strokeWidth={3} />
                          </div>
                          <span className="font-medium text-xs md:text-base text-charcoal/60 leading-tight">{row.others}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
