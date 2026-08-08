import { Metadata } from "next";
import { CheckCircle2, Clock, MapPin, Mountain } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PackageCard from "@/components/PackageCard";
import PlaceholderImage from "@/components/PlaceholderImage";
import { destinationDetails } from "@/data/destinations";
import { allPackages } from "@/data/packages";
import { siteInfo } from "@/data/siteInfo";

export const metadata: Metadata = {
  title: "Araku Valley Tour Packages",
  description: destinationDetails["araku-valley"].description,
};

export default function ArakuValleyPage() {
  const dest = destinationDetails["araku-valley"];
  const relatedPackages = allPackages.filter(
    (pkg) => pkg.title.toLowerCase().includes("araku") || pkg.highlights.some(h => h.toLowerCase().includes("araku"))
  );

  return (
    <div className="bg-warm-white min-h-screen">
      {/* Destination Hero */}
      <section className="relative mt-[-8px] pt-5 pb-10 lg:pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-charcoal">
          <PlaceholderImage
            gradient={dest.imageGradient}
            alt={dest.name}
            className="w-full h-full opacity-60"
            overlay
          />
        </div>
        <div className="container-max relative z-10 text-center px-4">
          <span className="badge bg-white/20 text-white backdrop-blur-md border border-white/30 mb-6">
            {dest.tagline}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading text-white mb-6 leading-tight">
            Explore {dest.name}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {dest.description}
          </p>
        </div>
      </section>

      {/* Info Strip */}
      <div className="bg-white border-b border-sand">
        <div className="container-max">
          <div className="flex flex-col sm:flex-row justify-around divide-y sm:divide-y-0 sm:divide-x divide-sand py-6">
            <div className="flex flex-col items-center py-3 sm:py-0 px-4 text-center">
              <MapPin className="text-ocean mb-2" />
              <span className="text-sm text-charcoal-light uppercase tracking-wider font-semibold mb-1">Distance</span>
              <span className="text-charcoal font-medium">{dest.distance}</span>
            </div>
            <div className="flex flex-col items-center py-3 sm:py-0 px-4 text-center">
              <Mountain className="text-ocean mb-2" />
              <span className="text-sm text-charcoal-light uppercase tracking-wider font-semibold mb-1">Elevation</span>
              <span className="text-charcoal font-medium">{dest.elevation}</span>
            </div>
            <div className="flex flex-col items-center py-3 sm:py-0 px-4 text-center">
              <Clock className="text-ocean mb-2" />
              <span className="text-sm text-charcoal-light uppercase tracking-wider font-semibold mb-1">Best Time</span>
              <span className="text-charcoal font-medium">{dest.bestTimeToVisit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <PlaceholderImage
                gradient={dest.imageGradient}
                alt={`${dest.name} Highlights`}
                className="w-full aspect-[4/3] rounded-2xl shadow-xl"
              />
            </div>
            <div className="lg:w-1/2">
              <SectionHeading
                title="Top Attractions & Highlights"
                centered={false}
              />
              <ul className="space-y-4">
                {dest.highlights.map((highlight, idx) => {
                  const [title, desc] = highlight.split("—");
                  return (
                    <li key={idx} className="flex gap-4">
                      <div className="mt-1 shrink-0">
                        <CheckCircle2 className="text-teal" size={24} />
                      </div>
                      <div>
                        <strong className="text-charcoal text-lg block mb-1">{title.trim()}</strong>
                        <span className="text-charcoal-light">{desc?.trim()}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="section-padding bg-sand-light">
        <div className="container-max">
          <SectionHeading
            title={`Tour Packages featuring ${dest.name}`}
            subtitle="Choose from our specially crafted itineraries to experience the best of this destination."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-heading text-white mb-6">Ready to visit {dest.name}?</h2>
          <p className="text-white/70 mb-8">Contact our experts to customize your itinerary and book your trip today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={siteInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              Plan on WhatsApp
            </a>
            <a href={`tel:${siteInfo.whatsapp}`} className="btn-secondary !border-white/20 !text-white hover:!bg-white hover:!text-charcoal">
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
