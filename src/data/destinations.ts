export interface Destination {
  id: string;
  name: string;
  description: string;
  category: string;
  imageGradient: string;
  price?: string;
  distance?: string;
  duration?: string;
}

export const topPlaces: Destination[] = [
  {
    id: "vizag-local-temples",
    name: "Vizag Local Temples",
    description:
      "Simhachalam, Kanaka Maha Lakshmi, Sampath Vinayagar, ISKCON, Kailasagiri, TTD & Kali Temple",
    category: "Pilgrimage",
    imageGradient: "from-amber-400 to-orange-600",
    price: "₹3,000",
    distance: "100 km",
    duration: "10 hours",
  },
  {
    id: "annavaram",
    name: "Annavaram",
    description:
      "Sri Veera Venkata Satyanarayana Swamy Temple is a Hindu-Vaishnavite temple located in Annavaram",
    category: "Pilgrimage",
    imageGradient: "from-rose-400 to-pink-600",
    price: "₹4,500",
    distance: "260 km",
    duration: "8–9 hours",
  },
  {
    id: "srikakulam",
    name: "Srikakulam",
    description:
      "Srikakulam is known for its temples, with the Srikurmam Temple and Arasavalli Sun God Temple",
    category: "Pilgrimage",
    imageGradient: "from-teal-400 to-emerald-600",
    price: "₹4,500",
    distance: "260 km",
    duration: "8–9 hours",
  },
  {
    id: "vijayawada",
    name: "Vijayawada",
    description:
      "Situated in the heart of the Vijayawada city, Kanaka Durga temple is located on the Indrakeeladri hill, on the banks of the River Krishna.",
    category: "Pilgrimage",
    imageGradient: "from-blue-400 to-indigo-600",
    price: "₹11,500",
    distance: "750 km",
    duration: "14–16 hours",
  },
  {
    id: "tirupati",
    name: "Tirupati",
    description:
      "Tirumala is the richest pilgrimage centre in the world",
    category: "Pilgrimage",
    imageGradient: "from-yellow-400 to-amber-600",
    price: "₹24,000",
    distance: "1600 km",
    duration: "36 hours",
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
