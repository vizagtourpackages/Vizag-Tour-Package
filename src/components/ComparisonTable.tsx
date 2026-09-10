import { Check, X } from "lucide-react";
import SectionHeading from "./SectionHeading";

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
    <section className="section-padding bg-sand-light">
      <div className="container-max max-w-5xl mx-auto">
        <SectionHeading
          title="How We Compare Head-to-Head"
          subtitle="See why thousands of travelers choose us over standard aggregators for their Vizag trips."
        />

        <div className="mt-8 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="min-w-[500px] md:min-w-[800px] w-full rounded-3xl overflow-hidden shadow-xl border-2 border-ocean/20 bg-white">
            <table className="w-full text-left border-collapse">
              {/* Colored Table Header */}
              <thead>
                <tr className="bg-ocean text-white">
                  <th className="py-3 px-3 md:py-6 md:px-8 font-heading text-sm md:text-lg font-bold border-r border-white/20 w-1/3">
                    Feature Comparison
                  </th>
                  <th className="py-3 px-3 md:py-6 md:px-8 text-center border-r border-white/20 w-1/3 bg-ocean-light">
                    <div className="flex flex-col items-center md:gap-1">
                      <span className="font-heading text-sm md:text-xl font-black text-white">Vizag Tour Packages</span>
                      <span className="text-[10px] md:text-xs text-teal-100 uppercase tracking-widest font-bold">The Gold Standard</span>
                    </div>
                  </th>
                  <th className="py-3 px-3 md:py-6 md:px-8 text-center w-1/3 bg-charcoal/80">
                    <div className="flex flex-col items-center md:gap-1">
                      <span className="font-heading text-sm md:text-lg font-bold text-white/90">Other Aggregators</span>
                      <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest">Standard Cabs</span>
                    </div>
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-sand-light transition-colors group">
                    {/* Feature Column */}
                    <td className="py-3 px-3 md:py-5 md:px-8 font-semibold text-xs md:text-base text-charcoal/80 border-r border-gray-200 bg-white group-hover:bg-sand-light transition-colors">
                      {row.feature}
                    </td>
                    
                    {/* Our Advantage Column (Colored Background) */}
                    <td className="py-3 px-3 md:py-5 md:px-8 border-r border-gray-200 bg-teal/5 group-hover:bg-teal/10 transition-colors">
                      <div className="flex items-center justify-center gap-2 md:gap-3">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-teal flex items-center justify-center shrink-0 shadow-md">
                          <Check size={12} className="text-white md:w-3.5 md:h-3.5" strokeWidth={3} />
                        </div>
                        <span className="font-bold text-xs md:text-base text-teal-dark">{row.us}</span>
                      </div>
                    </td>
                    
                    {/* Others Column */}
                    <td className="py-3 px-3 md:py-5 md:px-8 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-center gap-2 md:gap-3">
                        <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <X size={12} className="text-red-500 md:w-3.5 md:h-3.5" strokeWidth={3} />
                        </div>
                        <span className="font-medium text-xs md:text-base text-charcoal/50">{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
