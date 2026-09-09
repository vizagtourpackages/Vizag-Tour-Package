import { Metadata } from "next";
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
    <div className="bg-warm-white min-h-screen pt-5 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Route Map & Distances"
          subtitle="Plan your journey with our comprehensive distance guide for major tourist circuits around Vizag."
        />

        {/* Map Placeholder */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-card border border-sand">
          <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-white flex items-center justify-center p-8">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230c7b93\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
            <div className="text-center z-10">
              <MapPin size={48} className="text-coral mx-auto mb-4" />
              <h3 className="text-2xl font-heading text-charcoal mb-2">Interactive Map</h3>
              <p className="text-charcoal-light">Visual route map illustration will be displayed here.</p>
            </div>
          </div>
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full min-w-0">
          {routes.map((route, idx) => (
            <div key={idx} className="card-base flex flex-col sm:flex-row bg-white overflow-hidden min-w-0">
              <div className="sm:w-1/3 shrink-0">
                <PlaceholderImage
                  gradient={route.gradient}
                  alt={`${route.from} to ${route.to}`}
                  className="h-48 sm:h-full w-full"
                  icon={<Navigation size={32} />}
                />
              </div>
              <div className="p-5 sm:p-6 sm:w-2/3 flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 min-w-0">
                  <div className="font-semibold text-charcoal text-sm sm:text-base break-words min-w-0">{route.from}</div>
                  <div className="flex-1 min-w-[20px] h-px bg-sand border-t border-dashed border-charcoal/20 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 rounded-full bg-coral"></div>
                  </div>
                  <div className="font-semibold text-charcoal text-sm sm:text-base break-words min-w-0 text-right">{route.to}</div>
                </div>

                <div className="space-y-2 mb-4 min-w-0">
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-charcoal-light shrink-0">Distance</span>
                    <span className="font-medium text-charcoal text-right">{route.distance}</span>
                  </div>
                  <div className="flex justify-between text-sm gap-2">
                    <span className="text-charcoal-light shrink-0">Est. Time</span>
                    <span className="font-medium text-charcoal text-right">{route.time}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-sand min-w-0">
                  <span className="text-xs text-charcoal-light uppercase tracking-wider font-semibold block mb-1">Route / Via</span>
                  <p className="text-sm text-charcoal font-medium break-words">{route.via}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
