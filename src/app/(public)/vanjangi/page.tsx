import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { CheckCircle2, Clock, MapPin, Mountain } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import PlaceholderImage from "@/components/PlaceholderImage";
import { destinationDetails } from "@/data/destinations";
import { allPackages } from "@/data/packages";
import { siteInfo } from "@/data/siteInfo";

export const metadata: Metadata = {
  title: "Vanjangi Tour Packages",
  description: destinationDetails["vanjangi"].description,
};

export default function VanjangiPage() {
  const dest = destinationDetails["vanjangi"];
  const relatedPackages = allPackages.filter(
    (pkg) => pkg.title.toLowerCase().includes("vanjangi") || pkg.highlights.some(h => h.toLowerCase().includes("vanjangi"))
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Destination Hero */}
      <section className="relative -mt-[72px] pt-[104px] pb-12 lg:pb-16 overflow-hidden rounded-b-[40px] shadow-sm">
        <div className="absolute inset-0 bg-charcoal">
          <PlaceholderImage
            gradient={dest.imageGradient}
            alt={dest.name}
            className="w-full h-full opacity-60 mix-blend-overlay"
            overlay
          />
        </div>
        <div className="container-max relative z-10 text-center px-4 mt-8">
          <ScrollReveal>
            <span className="inline-flex badge bg-white/10 text-white backdrop-blur-md border border-white/20 mb-8 px-5 py-2.5 font-bold tracking-widest text-[10px] uppercase shadow-sm">
              {dest.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-4 leading-[1.1] tracking-tight drop-shadow-sm">
              Explore {dest.name}
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
              {dest.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Info Strip */}
      <div className="relative z-20 -mt-10 mb-10 px-4 sm:px-6 lg:px-8">
        <div className="container-max">
          <div className="bg-white rounded-[24px] shadow-card border border-charcoal/5 p-2 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-around divide-y sm:divide-y-0 sm:divide-x divide-charcoal/5 py-4">
              <div className="flex flex-col items-center py-4 sm:py-2 px-4 text-center group">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center mb-2 group-hover:bg-coral group-hover:text-white transition-colors text-charcoal duration-500 shadow-sm border border-charcoal/5">
                  <MapPin size={20} />
                </div>
                <span className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold mb-1">Distance</span>
                <span className="text-charcoal font-bold text-base tracking-tight">{dest.distance}</span>
              </div>
              <div className="flex flex-col items-center py-4 sm:py-2 px-4 text-center group">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center mb-2 group-hover:bg-teal group-hover:text-white transition-colors text-charcoal duration-500 shadow-sm border border-charcoal/5">
                  <Mountain size={20} />
                </div>
                <span className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold mb-1">Elevation</span>
                <span className="text-charcoal font-bold text-base tracking-tight">{dest.elevation}</span>
              </div>
              <div className="flex flex-col items-center py-4 sm:py-2 px-4 text-center group">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center mb-2 group-hover:bg-ocean group-hover:text-white transition-colors text-charcoal duration-500 shadow-sm border border-charcoal/5">
                  <Clock size={20} />
                </div>
                <span className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold mb-1">Best Time</span>
                <span className="text-charcoal font-bold text-base tracking-tight">{dest.bestTimeToVisit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="lg:w-1/2 w-full">
              <ScrollReveal direction="right">
                <PlaceholderImage
                  gradient={dest.imageGradient}
                  alt={`${dest.name} Highlights`}
                  className="w-full aspect-[4/3] rounded-[40px] shadow-card border border-charcoal/5"
                />
              </ScrollReveal>
            </div>
            <div className="lg:w-1/2 w-full">
              <ScrollReveal direction="left">
                <SectionHeading
                  title="Top Attractions & Highlights"
                  centered={false}
                />
                <ul className="space-y-4 mt-6">
                  {dest.highlights.map((highlight, idx) => {
                    const [title, desc] = highlight.split("—");
                    return (
                      <li key={idx} className="flex gap-5 group">
                        <div className="mt-1 shrink-0">
                          <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                            <CheckCircle2 size={18} />
                          </div>
                        </div>
                        <div>
                          <strong className="text-charcoal text-lg block mb-1 font-heading tracking-tight leading-tight">{title.trim()}</strong>
                          <span className="text-charcoal/60 text-sm font-medium leading-relaxed block">{desc?.trim()}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="section-padding bg-warm-white relative overflow-hidden rounded-[40px] mx-4 sm:mx-6 lg:mx-8 mb-12 shadow-sm border border-charcoal/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container-max relative z-10">
          <SectionHeading
            title={`Tour Packages featuring ${dest.name}`}
            subtitle="Choose from our specially crafted itineraries to experience the best of this destination."
          />
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal text-center px-4 relative overflow-hidden rounded-[40px] mx-4 sm:mx-6 lg:mx-8 mb-12 shadow-card">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <ScrollReveal>
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white mb-4 tracking-tight leading-[1.1]">
              Ready to visit <span className="text-coral">{dest.name}</span>?
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-8 font-medium leading-relaxed">
              Contact our experts to customize your itinerary and book your trip today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={siteInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-primary bg-coral hover:bg-coral/90 text-white shadow-[0_8px_20px_rgba(255,107,107,0.3)] hover:-translate-y-1 transition-all duration-300">
                Plan on WhatsApp
              </a>
              <a href={`tel:${siteInfo.whatsapp}`} className="btn-secondary !border-white/20 !text-white hover:!bg-white hover:!text-charcoal shadow-sm hover:-translate-y-1 transition-all duration-300">
                Call Us Now
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
