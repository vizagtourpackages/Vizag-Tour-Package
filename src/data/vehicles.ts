export interface Vehicle {
  id: string;
  model: string;
  pricePerKm: string;
  pax: number;
  amenities: string[];
  image: string;
  minKmNote: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "new-baleno",
    model: "New Baleno",
    pricePerKm: "₹14",
    pax: 4,
    amenities: ["AC", "Music System"],
    image: "/images/fleet/swift-dzire.jpg", // Using placeholder image from existing swift dzire
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "swift-dzire",
    model: "Swift Dzire",
    pricePerKm: "₹14",
    pax: 4,
    amenities: ["AC", "Music System"],
    image: "/images/fleet/swift-dzire.jpg",
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "toyota-glanza",
    model: "Toyota Glanza",
    pricePerKm: "₹14",
    pax: 4,
    amenities: ["AC", "Music System"],
    image: "/images/fleet/toyota-glanza.jpg",
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "ertiga",
    model: "Ertiga",
    pricePerKm: "₹18",
    pax: 6,
    amenities: ["AC", "Music System"],
    image: "/images/fleet/ertiga.jpg",
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "kia-carens",
    model: "Kia Carens",
    pricePerKm: "₹18",
    pax: 6,
    amenities: ["AC", "Music System"],
    image: "/images/fleet/ertiga.jpg", // Using placeholder image from existing ertiga
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "innova",
    model: "Innova",
    pricePerKm: "₹18",
    pax: 7,
    amenities: ["AC", "Music System", "Bottle Water"],
    image: "/images/fleet/innova.jpg", // Using placeholder image from innova
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "innova-crysta",
    model: "Innova Crysta",
    pricePerKm: "₹20",
    pax: 7,
    amenities: ["AC", "Bottle Water"],
    image: "/images/fleet/innova.jpg",
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "tempo-traveller-12",
    model: "Tempo Traveller 12 Seater",
    pricePerKm: "₹25",
    pax: 12,
    amenities: ["AC", "Push-back Seats", "Music System"],
    image: "/images/fleet/tempo-traveller.jpg",
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "tempo-traveller-17",
    model: "Tempo Traveller 17 Seater",
    pricePerKm: "₹30",
    pax: 17,
    amenities: ["AC", "Push-back Seats", "Music System"],
    image: "/images/fleet/tempo-traveller.jpg", // Using placeholder
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "urbania-16",
    model: "Urbania 16+1",
    pricePerKm: "₹35",
    pax: 16,
    amenities: ["AC", "Push-back Seats", "Charging Points"],
    image: "/images/fleet/tempo-traveller.jpg", // Using placeholder
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
  {
    id: "bus-40",
    model: "Bus 40 Seater",
    pricePerKm: "₹65",
    pax: 40,
    amenities: ["AC", "Push-back Seats", "Music System", "Charging Points"],
    image: "/images/fleet/tempo-traveller.jpg", // Using placeholder
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
];
