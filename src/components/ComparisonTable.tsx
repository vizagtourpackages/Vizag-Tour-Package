import { Check, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./Motion";
import { siteInfo } from "@/data/siteInfo";

const comparisonData = [
  { feature: "Driver cancellations", us: "0% — your ride is guaranteed", others: "High cancellation risk" },
  { feature: "Pricing & surge", us: "100% fixed rates, zero surge", others: "2x to 3x surge charges" },
  { feature: "Ghat road safety", us: "Mountain-experienced chauffeurs", others: "Random, unfamiliar drivers" },
  { feature: "Luggage & waiting", us: "Free waiting and luggage help", others: "Per-minute wait penalties" },
  { feature: "Vehicle quality", us: "Sanitised AC fleet, every trip", others: "Inconsistent condition" },
  { feature: "Customer support", us: "A real person on the helpline", others: "Automated chatbots" },
];

const proof = [
  { big: "0%", label: "cancellations" },
  { big: "₹0", label: "surge charges" },
  { big: "24/7", label: "human helpline" },
];

export default function ComparisonTable() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-max">
        <SectionHeading
          kicker="The difference"
          title="Travel Better. Travel with Confidence."
          subtitle="See how our commitment to safety, comfort, transparency and customer service sets us apart."
        />

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.3fr] lg:gap-8">
          {/* Promise panel */}
          <Reveal>
            <div className="grain relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] bg-ocean-gradient p-8 text-white sm:p-10">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-coral/35 blur-[80px]" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-teal/30 blur-[80px]" />

              <div className="relative">
                <p className="kicker !text-amber mb-5">Our promise</p>
                <h3 className="font-heading text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.1]">
                  Fixed fares. Verified drivers. <span className="italic text-sunset">Zero surprises.</span>
                </h3>
                <p className="mt-5 max-w-sm text-[0.98rem] leading-relaxed text-white/70">
                  Every trip is priced upfront and driven by someone who knows the ghat roads — so the only thing you plan for is the view.
                </p>
              </div>

              <div className="relative mt-10">
                <div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-6">
                  {proof.map((p) => (
                    <div key={p.label}>
                      <p className="font-heading text-[2rem] leading-none text-white">{p.big}</p>
                      <p className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-white/60">{p.label}</p>
                    </div>
                  ))}
                </div>
                <a href={siteInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-coral mt-8 w-full sm:w-auto">
                  Book with confidence
                </a>
              </div>
            </div>
          </Reveal>

          {/* Comparison rows */}
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[32px] border border-ocean/10 bg-white shadow-card">
              {/* column heads (desktop) */}
              <div className="hidden grid-cols-[0.9fr_1.1fr_1fr] items-center border-b border-ocean/10 bg-sand/60 px-8 py-5 md:grid">
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-charcoal/45">What matters</span>
                <span className="flex items-center gap-2 font-heading text-lg text-ocean">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-white"><Check size={14} strokeWidth={3} /></span>
                  Vizag Tour Packages
                </span>
                <span className="text-sm font-semibold text-charcoal/45">Typical aggregators</span>
              </div>

              <ul className="divide-y divide-ocean/8">
                {comparisonData.map((row) => (
                  <li key={row.feature} className="group grid gap-3 px-6 py-5 transition-colors duration-300 hover:bg-sand/40 sm:px-8 md:grid-cols-[0.9fr_1.1fr_1fr] md:items-center md:gap-6">
                    <p className="font-heading text-[1.12rem] text-ocean">{row.feature}</p>

                    <p className="flex items-start gap-3 text-[0.95rem] font-semibold leading-snug text-ocean">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-white transition-transform duration-300 group-hover:scale-110">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span>
                        <span className="mb-0.5 block text-[0.62rem] font-bold uppercase tracking-wider text-teal md:hidden">Us</span>
                        {row.us}
                      </span>
                    </p>

                    <p className="flex items-start gap-3 text-[0.9rem] leading-snug text-charcoal/50">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral/12 text-coral">
                        <X size={13} strokeWidth={3} />
                      </span>
                      <span>
                        <span className="mb-0.5 block text-[0.62rem] font-bold uppercase tracking-wider text-charcoal/40 md:hidden">Others</span>
                        {row.others}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
