export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  year: number | string;
  imageGradient: string;
  imageUrl?: string;
}

export const events: Event[] = [
  {
    id: "e1",
    title: "OG Tour with S. Thaman — Vizag",
    description:
      "Experience the electrifying live concert by renowned music director S. Thaman in Vizag. A must-attend event for music lovers.",
    category: "Concert",
    year: 2026,
    imageGradient: "from-purple-500 to-pink-600",
  },
  {
    id: "e2",
    title: "Yacht Tourism in Vizag",
    description:
      "Mini cruise & yacht tourism initiative by AP Government, connecting Vizag to Bheemunipatnam and Vizianagaram along the coast.",
    category: "Tourism",
    year: 2026,
    imageGradient: "from-blue-400 to-cyan-600",
  },
  {
    id: "e3",
    title: "Inorbit Mall Vizag Opens",
    description:
      "South India's 2nd largest mall opens in Vizag featuring premium brands, international dining, gaming zones, and entertainment.",
    category: "Shopping",
    year: 2026,
    imageGradient: "from-rose-400 to-orange-500",
  },
  {
    id: "e4",
    title: "Goa-Style Beach Shacks in Vizag",
    description:
      "Pilot project bringing Goa-style beachfront bars and restaurants to Vizag's coastline, open 10am–8pm daily.",
    category: "Dining",
    year: 2026,
    imageGradient: "from-amber-400 to-yellow-500",
  },
  {
    id: "e5",
    title: "Wonderla Entertainment Park",
    description:
      "Proposed 50-acre Wonderla amusement park with thrill rides, water park, and family entertainment coming to Vizag.",
    category: "Theme Park",
    year: 2026,
    imageGradient: "from-red-400 to-rose-600",
  },
  {
    id: "e6",
    title: "Vizag's Port Promenade",
    description:
      "New scenic promenade near the International Cruise Terminal offering stunning harbour views and waterfront dining.",
    category: "Landmark",
    year: 2026,
    imageGradient: "from-teal-400 to-blue-600",
  },
];
