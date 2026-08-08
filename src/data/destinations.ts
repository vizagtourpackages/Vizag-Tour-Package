export interface Destination {
  id: string;
  name: string;
  description: string;
  category: string;
  imageGradient: string;
}

export const topPlaces: Destination[] = [
  {
    id: "rushikonda-beach",
    name: "Rushikonda Beach",
    description:
      "Blue Flag certified eco-friendly beach; paramotoring, speed boating, scuba diving in the Bay of Bengal.",
    category: "Beach",
    imageGradient: "from-cyan-400 to-blue-600",
  },
  {
    id: "sagar-nagar-viewpoint",
    name: "Sagar Nagar Viewpoint",
    description:
      "Roadside spot with panoramic hill and beach views, great for sunset photography.",
    category: "Viewpoint",
    imageGradient: "from-orange-300 to-rose-500",
  },
  {
    id: "zoo-park",
    name: "Zoo Park (Indira Gandhi Zoological Park)",
    description:
      "Elevated views over India's largest east coast zoo with diverse wildlife.",
    category: "Wildlife",
    imageGradient: "from-green-400 to-emerald-600",
  },
  {
    id: "simhachalam-temple",
    name: "Simhachalam Temple",
    description:
      "11th-century Varaha Narasimha Swamy temple on a scenic hill; known for 'Giri Pradakshina'.",
    category: "Temple",
    imageGradient: "from-amber-400 to-orange-600",
  },
  {
    id: "tenneti-park",
    name: "Tenneti Park",
    description:
      "Panoramic beach views along Beach Road; iconic abandoned MV Maa ship being developed into a restaurant.",
    category: "Park",
    imageGradient: "from-sky-400 to-indigo-500",
  },
  {
    id: "kailasagiri",
    name: "Kailasagiri Hills",
    description:
      "Hilltop views, glass skywalk bridge, zip line, cycling, toy train — a must-visit hilltop park.",
    category: "Hill Station",
    imageGradient: "from-teal-400 to-green-600",
  },
  {
    id: "vuda-park",
    name: "Vuda Park",
    description:
      "Urban green space popular for skating, playgrounds, and family recreation.",
    category: "Park",
    imageGradient: "from-lime-400 to-green-500",
  },
  {
    id: "aircraft-museum",
    name: "Aircraft Museum",
    description:
      "Open-air collection of decommissioned IAF aircraft and helicopters.",
    category: "Museum",
    imageGradient: "from-slate-400 to-zinc-600",
  },
  {
    id: "submarine-museum",
    name: "Submarine Museum (INS Kursura)",
    description:
      "Preserved 1969 Soviet Foxtrot-class submarine, 1971 Indo-Pak war veteran, museum since 2002.",
    category: "Museum",
    imageGradient: "from-blue-500 to-slate-700",
  },
  {
    id: "rk-beach",
    name: "R.K. Beach",
    description:
      "Vizag's oldest and most popular shoreline; hosts festivals and city events year-round.",
    category: "Beach",
    imageGradient: "from-sky-300 to-blue-500",
  },
  {
    id: "thotlakonda",
    name: "Thotlakonda Sanctuary",
    description:
      "Protected forest, biodiversity hotspot with leopards, deer, wild boars, and rare reptiles.",
    category: "Wildlife",
    imageGradient: "from-emerald-500 to-green-700",
  },
  {
    id: "vizag-port",
    name: "Vizag Port and Harbour",
    description:
      "India's largest, busiest port by cargo volume; scenic harbour cruise tours available.",
    category: "Landmark",
    imageGradient: "from-indigo-400 to-blue-700",
  },
  {
    id: "dolphins-nose",
    name: "Dolphin's Nose",
    description:
      "358m rocky headland with historic lighthouse; 360° views of city, port, and Yarada Beach.",
    category: "Viewpoint",
    imageGradient: "from-teal-500 to-cyan-700",
  },
  {
    id: "yarada-beach",
    name: "Yarada Beach",
    description:
      "Secluded, peaceful golden-sand beach surrounded by hills (swimming risky due to currents).",
    category: "Beach",
    imageGradient: "from-yellow-300 to-amber-500",
  },
  {
    id: "ross-hill-church",
    name: "Ross Hill Church",
    description:
      "Circa 1867, houses Christian, Hindu & Muslim worship spaces on one hilltop — a symbol of unity.",
    category: "Heritage",
    imageGradient: "from-rose-400 to-pink-600",
  },
  {
    id: "bheemili-beach",
    name: "Bheemili Beach",
    description:
      "One of Vizag's oldest beaches, Dutch-era cemetery, new promenade, and fishing harbour.",
    category: "Beach",
    imageGradient: "from-cyan-300 to-teal-500",
  },
];

export interface DestinationDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  distance: string;
  elevation?: string;
  imageGradient: string;
}

export const destinationDetails: Record<string, DestinationDetail> = {
  "araku-valley": {
    id: "araku-valley",
    name: "Araku Valley",
    tagline: "The Jewel of Andhra Pradesh",
    description:
      "Nestled at an elevation of 910 meters in the Eastern Ghats, Araku Valley is a stunning hill station known for its lush green landscapes, coffee plantations, tribal culture, and the magnificent Borra Caves. The valley offers a perfect blend of natural beauty and cultural richness, making it one of the most sought-after destinations near Vizag.",
    highlights: [
      "Borra Caves — million-year-old stalactite & stalagmite formations",
      "Araku Tribal Museum — showcasing Dhimsa dance and tribal heritage",
      "Coffee Plantations — taste authentic Araku valley coffee",
      "Chaparai Waterfalls — scenic waterfall surrounded by dense forests",
      "Padmapuram Gardens — beautiful topiary garden with hanging cottages",
      "Galikonda Viewpoint — panoramic views of the valley",
      "Anantagiri Hills — misty hills on the route to Araku",
    ],
    bestTimeToVisit: "October to March",
    distance: "115 km from Vizag (3.5 hours)",
    elevation: "910 meters",
    imageGradient: "from-green-400 to-emerald-600",
  },
  lambasingi: {
    id: "lambasingi",
    name: "Lambasingi",
    tagline: "The Kashmir of Andhra Pradesh",
    description:
      "Lambasingi, often called the 'Kashmir of Andhra Pradesh,' is the coldest place in the state with temperatures dropping to as low as 0°C during winter. This tiny village in the Chintapalli mandal of Visakhapatnam district offers breathtaking views of fog-covered valleys, lush green coffee plantations, and an escape from the tropical heat of Vizag.",
    highlights: [
      "Sub-zero temperatures in winter — experience frost in South India",
      "Kothapalli Waterfalls — stunning waterfall in dense forest",
      "Coffee & Pepper Plantations — explore aromatic plantations",
      "Sunrise & Fog Views — mesmerizing sea of clouds at dawn",
      "Thajangi Reservoir — serene waterbody surrounded by hills",
      "Night camping & stargazing — minimal light pollution",
    ],
    bestTimeToVisit: "November to February",
    distance: "107 km from Vizag (3 hours)",
    elevation: "1,000 meters",
    imageGradient: "from-blue-300 to-indigo-600",
  },
  vanjangi: {
    id: "vanjangi",
    name: "Vanjangi",
    tagline: "The Cloud Paradise of Vizag",
    description:
      "Vanjangi is a hidden gem in the Eastern Ghats, famous for its stunning sea of clouds visible at sunrise. This remote hilltop near Paderu offers an unmatched trekking experience through tribal villages, dense forests, and misty hilltops. It's the perfect destination for adventure seekers and nature photographers looking for an offbeat experience near Vizag.",
    highlights: [
      "Sea of Clouds — spectacular sunrise views above the cloud line",
      "Trekking trails — moderate to challenging hill treks",
      "Tribal villages — experience authentic tribal hospitality",
      "Camping under the stars — pristine camping spots",
      "Photography paradise — dramatic landscapes at golden hour",
      "Unspoiled nature — minimal commercialization",
    ],
    bestTimeToVisit: "September to February",
    distance: "130 km from Vizag (4 hours)",
    elevation: "1,100 meters",
    imageGradient: "from-purple-400 to-violet-600",
  },
};
