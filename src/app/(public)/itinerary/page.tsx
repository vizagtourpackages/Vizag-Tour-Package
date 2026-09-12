import { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { MapPin, Navigation, Clock, Sun, Sunrise, Moon, CloudSun, Sunset, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Vizag Interactive Itinerary & Route Map",
  description: "Plan your ultimate Vizag trip with our interactive daily itinerary spanning beaches, temples, and the Araku Valley.",
};

const itineraryDays = [
  {
    day: "Day 1",
    theme: "City of Destiny - Beaches & Culture",
    description: "Explore the coastal beauty and rich heritage of Visakhapatnam city.",
    locations: [
      {
        time: "09:00 AM",
        name: "Simhachalam Temple",
        type: "Pilgrimage",
        icon: <Sun size={20} />,
        desc: "Start your trip with blessings at this ancient 11th-century hill shrine.",
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "12:00 PM",
        name: "Kailasagiri Hill Park",
        type: "Viewpoint",
        icon: <CloudSun size={20} />,
        desc: "Take the ropeway up for panoramic views of the city and the Bay of Bengal.",
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "03:30 PM",
        name: "Rushikonda Beach",
        type: "Beach",
        icon: <Sun size={20} />,
        desc: "Enjoy water sports or relax on the golden sands of Vizag's cleanest beach.",
        image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "06:00 PM",
        name: "RK Beach & Submarine Museum",
        type: "Heritage",
        icon: <Sunset size={20} />,
        desc: "Stroll along the lively beach road and explore the INS Kursura Submarine.",
        image: "https://images.unsplash.com/photo-1541888069502-d1d49e1e233d?auto=format&fit=crop&q=80&w=400",
      },
    ],
  },
  {
    day: "Day 2",
    theme: "Journey to the Eastern Ghats",
    description: "A scenic drive into the mountains, exploring caves and coffee plantations.",
    locations: [
      {
        time: "07:00 AM",
        name: "Depart for Araku",
        type: "Drive",
        icon: <Navigation size={20} />,
        desc: "Enjoy the misty ghat road drive spanning 115 km through dense forests.",
        image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "10:30 AM",
        name: "Borra Caves",
        type: "Adventure",
        icon: <Sun size={20} />,
        desc: "Explore million-year-old limestone stalactite and stalagmite formations.",
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "01:00 PM",
        name: "Araku Valley",
        type: "Nature",
        icon: <Sun size={20} />,
        desc: "Visit the Tribal Museum, Padmapuram Gardens, and vast coffee plantations.",
        image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "04:30 PM",
        name: "Chaparai Water Cascades",
        type: "Nature",
        icon: <Sunset size={20} />,
        desc: "Relax by the scenic water cascades surrounded by lush greenery.",
        image: "https://images.unsplash.com/photo-1541888069502-d1d49e1e233d?auto=format&fit=crop&q=80&w=400",
      },
    ],
  },
  {
    day: "Day 3",
    theme: "The Cloud Paradise",
    description: "An early morning adventure to experience sub-zero temperatures and clouds.",
    locations: [
      {
        time: "04:00 AM",
        name: "Vanjangi Sunrise Trek",
        type: "Adventure",
        icon: <Sunrise size={20} />,
        desc: "A moderate trek to witness the breathtaking sea of clouds at sunrise.",
        image: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "11:00 AM",
        name: "Lambasingi",
        type: "Hill Station",
        icon: <CloudSun size={20} />,
        desc: "Visit the 'Kashmir of Andhra' and explore apple/strawberry farms.",
        image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "02:00 PM",
        name: "Kothapalli Waterfalls",
        type: "Nature",
        icon: <Sun size={20} />,
        desc: "A hidden gem waterfall nestled deep within the Chintapalli forests.",
        image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=400",
      },
      {
        time: "06:00 PM",
        name: "Return to Vizag",
        type: "Drive",
        icon: <Moon size={20} />,
        desc: "Safe journey back to the city with beautiful sunset highway views.",
        image: "https://images.unsplash.com/photo-1541888069502-d1d49e1e233d?auto=format&fit=crop&q=80&w=400",
      },
    ],
  },
];

export default function ItineraryPage() {
  return (
    <div className="bg-sand-light min-h-screen pt-5 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="The Ultimate 3-Day Vizag Itinerary"
          subtitle="Follow our expertly crafted route map covering the best beaches, temples, and hill stations in the region."
        />

        {/* Visual Map Banner */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-card border border-gray-100 bg-white relative">
          <div className="absolute inset-0 bg-ocean/5 pointer-events-none"></div>
          <div className="relative aspect-[16/9] lg:aspect-[21/9] flex items-center justify-center p-8">
            <div className="text-center z-10 max-w-lg">
              <MapPin size={48} className="text-ocean mx-auto mb-6 drop-shadow-md" />
              <h3 className="text-2xl sm:text-4xl font-black font-heading text-charcoal mb-4">Interactive Route Explorer</h3>
              <p className="text-charcoal/60 mb-6">Plan your stops logically to maximize sightseeing and minimize driving time.</p>
              <div className="inline-flex items-center gap-2 text-xs font-bold bg-teal/10 text-teal px-4 py-2 rounded-full uppercase tracking-wider">
                <Navigation size={14} /> Total Distance: ~450 KM
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-5xl mx-auto space-y-16">
          {itineraryDays.map((day, dayIdx) => (
            <div key={dayIdx} className="relative">
              <div className="mb-8 md:text-center">
                <span className="inline-block bg-ocean text-white font-bold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-md">
                  {day.day}
                </span>
                <h2 className="text-3xl font-heading font-black text-charcoal mb-2">{day.theme}</h2>
                <p className="text-charcoal/60">{day.description}</p>
              </div>

              <div className="relative border-l-2 border-ocean/20 md:border-l-0 ml-4 md:ml-0">
                {/* Desktop Center Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-ocean/20 via-teal/20 to-ocean/20 -translate-x-1/2 rounded-full"></div>

                <div className="space-y-8 md:space-y-12">
                  {day.locations.map((loc, locIdx) => {
                    const isEven = locIdx % 2 === 0;
                    return (
                      <div key={locIdx} className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 pl-8 md:pl-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                        
                        {/* Timeline Node */}
                        <div className="absolute left-[-5px] md:left-1/2 top-6 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 w-3 h-3 bg-ocean rounded-full shadow-[0_0_0_6px_rgba(11,79,108,0.1)] z-10"></div>

                        {/* Content Card */}
                        <div className={`w-full md:w-1/2 ${isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover hover:border-ocean/30 transition-all duration-300 group">
                            <div className={`flex items-center gap-3 mb-4 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                              <span className="flex items-center gap-1.5 text-coral font-bold text-xs bg-coral/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                <Clock size={14} /> {loc.time}
                              </span>
                              <span className="text-gray-400 text-xs font-semibold uppercase">{loc.type}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-ocean transition-colors">{loc.name}</h3>
                            <p className="text-charcoal/60 text-sm leading-relaxed mb-5">{loc.desc}</p>
                            
                            <div className="w-full h-32 rounded-xl overflow-hidden relative bg-gray-100">
                              {/* Using generic placeholders for the UI since actual images weren't provided */}
                              <div className="absolute inset-0 bg-ocean/5 flex items-center justify-center">
                                {loc.icon}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Empty Space for Desktop layout balance */}
                        <div className="hidden md:block w-1/2"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-charcoal p-10 sm:p-16 rounded-3xl shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-ocean rounded-full blur-[80px] opacity-40"></div>
            <h2 className="text-3xl font-heading font-black text-white mb-4 relative z-10">Ready to follow this itinerary?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto relative z-10">
              Customize this 3-day plan according to your preferences. Book a dedicated cab with us and enjoy a hassle-free vacation.
            </p>
            <Link href="/tour-packages" className="btn-primary relative z-10 border-0 shadow-lg shadow-coral/30 hover:-translate-y-1 transition-transform">
              Customize Your Trip <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
