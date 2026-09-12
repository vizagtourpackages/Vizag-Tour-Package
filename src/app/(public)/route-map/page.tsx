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

        {/* Map Placeholder */}
        <ScrollReveal delay={0.2}>
          <div className="mb-16 rounded-[40px] overflow-hidden shadow-card border border-charcoal/5 bg-sand relative group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none transition-transform duration-1000 group-hover:scale-110" />
            <div className="relative aspect-[16/9] lg:aspect-[21/9] flex items-center justify-center p-8 z-10 backdrop-blur-sm">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230c7b93\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
              <div className="text-center z-10">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-charcoal/5 group-hover:bg-coral group-hover:text-white transition-colors duration-500 text-charcoal">
                  <MapPin size={40} />
                </div>
                <h3 className="text-3xl font-heading font-black text-charcoal mb-4 tracking-tight">Interactive Map</h3>
                <p className="text-charcoal/60 font-medium text-lg max-w-sm mx-auto">Visual route map illustration will be displayed here.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Route Details */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full min-w-0">
            {routes.map((route, idx) => (
              <div key={idx} className="bg-white rounded-[32px] flex flex-col sm:flex-row overflow-hidden min-w-0 shadow-card hover:shadow-card-hover border border-charcoal/5 transition-all duration-500 hover:-translate-y-1">
                <div className="sm:w-[40%] shrink-0 p-4">
                  <PlaceholderImage
                    gradient={route.gradient}
                    alt={`${route.from} to ${route.to}`}
                    className="h-56 sm:h-full w-full rounded-[24px] shadow-sm"
                    icon={<Navigation size={32} />}
                  />
                </div>
                <div className="p-6 sm:p-8 sm:w-[60%] flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-3 mb-6 min-w-0">
                    <div className="font-bold text-charcoal text-base sm:text-lg tracking-tight break-words min-w-0 flex-1">{route.from}</div>
                    <div className="flex-[0.5] min-w-[30px] h-[2px] bg-sand border-t-2 border-dotted border-charcoal/20 relative mx-2">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-3 h-3 rounded-full bg-coral ring-4 ring-coral/20"></div>
                    </div>
                    <div className="font-bold text-charcoal text-base sm:text-lg tracking-tight break-words min-w-0 flex-1 text-right">{route.to}</div>
                  </div>

                  <div className="space-y-3 mb-6 min-w-0 bg-sand/30 p-4 rounded-[16px] border border-charcoal/5">
                    <div className="flex justify-between text-sm gap-2 items-center">
                      <span className="text-charcoal/50 font-bold uppercase tracking-widest text-[10px] shrink-0">Distance</span>
                      <span className="font-bold text-charcoal text-right text-base">{route.distance}</span>
                    </div>
                    <div className="flex justify-between text-sm gap-2 items-center">
                      <span className="text-charcoal/50 font-bold uppercase tracking-widest text-[10px] shrink-0">Est. Time</span>
                      <span className="font-bold text-teal text-right text-base">{route.time}</span>
                    </div>
                  </div>

                  <div className="mt-auto min-w-0">
                    <span className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold block mb-2">Route / Via</span>
                    <p className="text-base text-charcoal/80 font-medium break-words leading-snug">{route.via}</p>
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
