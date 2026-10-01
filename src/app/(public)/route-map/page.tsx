import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";
import { MapPin, Navigation } from "lucide-react";

export const metadata: Metadata = {
  title: "Route Map & Distances",
  description: "Explore the route map and distances between Vizag, Araku, Lambasingi, and Vanjangi.",
};

const routes = [
  {
    from: "Visakhapatnam (Vizag)",
    to: "Araku Valley",
    distance: "115 km",
    time: "3.5 hours",
    via: "Pendurthi - Kothavalasa - S.Kota - Anantagiri",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    from: "Visakhapatnam (Vizag)",
    to: "Lambasingi",
    distance: "107 km",
    time: "3 hours",
    via: "Anakapalle - Narsipatnam - Chintapalli Road",
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    from: "Visakhapatnam (Vizag)",
    to: "Vanjangi",
    distance: "130 km",
    time: "4 hours",
    via: "Pendurthi - Kothavalasa - Devarapalli - Paderu",
    gradient: "from-purple-400 to-violet-600",
  },
  {
    from: "Araku Valley",
    to: "Lambasingi",
    distance: "90 km",
    time: "2.5 hours",
    via: "Paderu - Chintapalli",
    gradient: "from-teal-400 to-cyan-600",
  },
];

export default function RouteMapPage() {
  return (
    <div className="bg-white min-h-screen pt-8 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Route Map & Distances"
            subtitle="Plan your journey with our comprehensive distance guide for major tourist circuits around Vizag."
          />
        </ScrollReveal>

        {/* Route Details */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full min-w-0">
            {routes.map((route, idx) => (
              <div key={idx} className="bg-white rounded-[32px] flex flex-col overflow-hidden min-w-0 shadow-card hover:shadow-card-hover border border-charcoal/5 transition-all duration-500 hover:-translate-y-1 relative">
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${route.gradient}`} />
                <div className="p-6 sm:p-10 w-full flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-3 mb-8 min-w-0">
                    <div className="font-bold text-charcoal text-lg sm:text-xl tracking-tight break-words min-w-0 flex-1">{route.from}</div>
                    <div className="flex-[2] min-w-[30px] h-[2px] bg-sand border-t-2 border-dotted border-charcoal/20 relative mx-4">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-3 h-3 rounded-full bg-coral ring-4 ring-coral/20"></div>
                    </div>
                    <div className="font-bold text-charcoal text-lg sm:text-xl tracking-tight break-words min-w-0 flex-1 text-right">{route.to}</div>
                  </div>

                  <div className="space-y-4 mb-8 min-w-0 bg-sand/30 p-6 rounded-[20px] border border-charcoal/5 grid grid-cols-2 gap-4">
                    <div className="flex flex-col justify-center text-sm gap-1 items-start">
                      <span className="text-charcoal/50 font-bold uppercase tracking-widest text-[10px] shrink-0">Distance</span>
                      <span className="font-bold text-charcoal text-lg sm:text-xl">{route.distance}</span>
                    </div>
                    <div className="flex flex-col justify-center text-sm gap-1 items-end">
                      <span className="text-charcoal/50 font-bold uppercase tracking-widest text-[10px] shrink-0">Est. Time</span>
                      <span className="font-bold text-teal text-lg sm:text-xl">{route.time}</span>
                    </div>
                  </div>

                  <div className="mt-auto min-w-0">
                    <span className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold block mb-2">Route / Via</span>
                    <p className="text-base sm:text-lg text-charcoal/80 font-medium break-words leading-snug">{route.via}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
