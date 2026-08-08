export interface Package {
  id: string;
  title: string;
  price: number;
  priceLabel: string;
  duration: string;
  people: string;
  badge?: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  category: "trending" | "one-day" | "pilgrimage" | "multi-day";
  imageGradient: string;
}

export const trendingPackages: Package[] = [
  {
    id: "one-day-vizag",
    title: "One Day Vizag Tour Package",
    price: 2999,
    priceLabel: "₹2,999",
    duration: "1 Day",
    people: "4 People",
    badge: "Best Seller",
    highlights: [
      "Beaches",
      "Hill Stations",
      "Temples",
      "Heritage Sites",
      "Museums",
    ],
    includes: ["Transportation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Entry tickets & Activities", "Driver food"],
    category: "trending",
    imageGradient: "from-sky-400 to-teal-500",
  },
  {
    id: "1n2d-vizag-city",
    title: "1N/2D Vizag City Tour Package",
    price: 9999,
    priceLabel: "₹9,999",
    duration: "2 Days",
    people: "2 People",
    badge: "Popular",
    highlights: [
      "Beaches",
      "Hill Stations",
      "Temples",
      "Heritage Sites",
      "Museums",
    ],
    includes: ["Transportation", "Accommodation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Entry tickets & Activities", "Driver food"],
    category: "trending",
    imageGradient: "from-emerald-400 to-cyan-500",
  },
  {
    id: "1n2d-vizag-araku",
    title: "1N/2D Vizag Local - Araku Package",
    price: 11999,
    priceLabel: "₹11,999",
    duration: "2 Days",
    people: "2 People",
    badge: "Trending",
    highlights: [
      "Beaches",
      "Hill Stations",
      "Temples",
      "Heritage Sites",
      "Museums",
      "Borra Caves",
      "Araku Local Sightseeing",
    ],
    includes: ["Transportation", "Accommodation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Entry tickets & Activities", "Driver food"],
    category: "trending",
    imageGradient: "from-orange-400 to-rose-500",
  },
];

export const oneDayPackages: Package[] = [
  {
    id: "vizag-one-day",
    title: "Vizag One Day Tour Package",
    price: 2999,
    priceLabel: "₹2,999",
    duration: "1 Day",
    people: "4 People",
    highlights: ["City Tour", "Beaches", "Temples", "Museums"],
    includes: ["Transportation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Entry tickets & Activities"],
    category: "one-day",
    imageGradient: "from-blue-400 to-indigo-500",
  },
  {
    id: "araku-one-day",
    title: "Araku One Day Tour Package",
    price: 3499,
    priceLabel: "₹3,499",
    duration: "1 Day",
    people: "4 People",
    highlights: ["Borra Caves", "Coffee Plantations", "Tribal Museum", "Scenic Valley"],
    includes: ["Transportation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Entry tickets & Activities"],
    category: "one-day",
    imageGradient: "from-green-400 to-emerald-500",
  },
  {
    id: "vanjangi-one-day",
    title: "Vanjangi One Day Tour Package",
    price: 3999,
    priceLabel: "₹3,999",
    duration: "1 Day",
    people: "4 People",
    highlights: ["Cloud Views", "Trekking", "Sunrise Point", "Hill Station"],
    includes: ["Transportation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Entry tickets & Activities"],
    category: "one-day",
    imageGradient: "from-violet-400 to-purple-500",
  },
  {
    id: "lambasingi-one-day",
    title: "Lambasingi One Day Tour Package",
    price: 3999,
    priceLabel: "₹3,999",
    duration: "1 Day",
    people: "4 People",
    highlights: ["Fog Views", "Coffee Plantations", "Waterfalls", "Hill Station"],
    includes: ["Transportation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Entry tickets & Activities"],
    category: "one-day",
    imageGradient: "from-teal-400 to-cyan-500",
  },
];

export const pilgrimagePackages: Package[] = [
  {
    id: "vizag-pilgrimage",
    title: "Vizag Local Pilgrimage Tour",
    price: 2499,
    priceLabel: "₹2,499",
    duration: "1 Day",
    people: "4 People",
    badge: "Spiritual",
    highlights: [
      "Sri Sampath Vinayaka Temple",
      "Shri Kanaka Maha Lakshmi Temple",
      "ISKCON Temple",
      "Sri Venkateswara Swamy TTD Temple",
      "Simhachalam Temple",
    ],
    includes: ["Transportation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Temple donations"],
    category: "pilgrimage",
    imageGradient: "from-amber-400 to-orange-500",
  },
  {
    id: "annavaram-pilgrimage",
    title: "Annavaram Satyanarayana Swamy Temple Tour",
    price: 3999,
    priceLabel: "₹3,999",
    duration: "1 Day",
    people: "4 People",
    highlights: [
      "Sri Veera Venkata Sathyanarayana Swamy Vari Devasthanam",
    ],
    includes: ["Transportation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Temple donations"],
    category: "pilgrimage",
    imageGradient: "from-yellow-400 to-amber-500",
  },
  {
    id: "arasavalli-pilgrimage",
    title: "Vizag to Arasavalli, Srikurmam, Srimukhalingam Tour",
    price: 4999,
    priceLabel: "₹4,999",
    duration: "1 Day",
    people: "4 People",
    highlights: [
      "Sri Suryanarayana Swamy Temple",
      "Sri Kurmanatha Swamy Temple",
      "Shri Mukhalingeshwara Swamy Temple",
    ],
    includes: ["Transportation", "Tolls", "Parking Fee"],
    excludes: ["Meals", "Temple donations"],
    category: "pilgrimage",
    imageGradient: "from-rose-400 to-pink-500",
  },
];

export const pilgrimageLinks = [
  { title: "Tirumala Tirupati Pilgrimage Package", href: "/contact" },
  { title: "Vijayawada Kanaka Durgamma Temple Pilgrimage Package", href: "/contact" },
  { title: "Vizag to Talupulamma Lova Pilgrimage Package", href: "/contact" },
  { title: "Vizag to Ramanarayanam Temple Pilgrimage Trip", href: "/contact" },
];

export const allPackages: Package[] = [
  ...trendingPackages,
  ...oneDayPackages,
  ...pilgrimagePackages,
];

export const dayOptions = [
  "One Day",
  "1N/2D",
  "2N/3D",
  "3N/4D",
  "4N/5D",
  "5N/6D",
] as const;

export const accommodationOptions = [
  "Standard AC",
  "Premium AC",
  "Premium AC (Inc Breakfast)",
] as const;

export const vehicleOptions = [
  "Sedan/Hatchback (4+1)",
  "Mini SUV Ertiga (6+1)",
  "SUV Kia Carens",
  "Innova",
  "Innova Crysta",
  "Tempo",
  "Urbania",
  "Mini Bus",
  "Bus",
] as const;
