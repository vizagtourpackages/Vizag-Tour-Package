import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "How It Works | Vizag Tour Packages",
  description: "Learn how easy it is to book your ride or tour package with us in 4 simple steps.",
};

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Hero Header */}
      <div className="bg-charcoal text-white pt-[104px] pb-16 rounded-b-[32px] mb-8 shadow-sm -mt-[72px]">
        <div className="container-max text-center">
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl mb-4 tracking-tight drop-shadow-sm">How It Works</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base font-medium">
            Booking your dream vacation or a quick ride shouldn&apos;t be complicated. We&apos;ve made it simple and straightforward.
          </p>
        </div>
      </div>

      <section className="section-padding bg-sand-light relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
        
        <div className="container-max relative z-10">
          <SectionHeading
            title="Book Your Ride in 4 Easy Steps"
            subtitle="Follow these simple steps to start your journey with us."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: "1",
                title: "Search & Choose",
                description: "Browse our fleet or tour packages and select what perfectly fits your travel needs.",
              },
              {
                step: "2",
                title: "Book & Confirm",
                description: "Provide your travel details and confirm your booking instantly through our platform.",
              },
              {
                step: "3",
                title: "Enjoy Your Ride",
                description: "Experience a comfortable, safe, and premium journey with our professional chauffeurs.",
              },
              {
                step: "4",
                title: "Rate & Review",
                description: "Share your amazing experience to help us serve you even better next time.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-[24px] p-6 border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center">
                {/* Large faded number in background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-sand-light group-hover:text-ocean/5 transition-colors duration-500 leading-none select-none z-0">
                  {item.step}
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean to-coral flex items-center justify-center text-white font-bold text-xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed text-xs sm:text-sm font-medium">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/tour-packages" className="btn-primary">
              Explore Packages <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
