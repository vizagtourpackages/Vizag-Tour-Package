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
    id: "swift-dzire",
    model: "Swift Dzire",
    pricePerKm: "₹14",
    pax: 4,
    amenities: ["AC", "Music System"],
    image: "/images/fleet/swift-dzire.jpg",
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
    id: "toyota-glanza",
    model: "Toyota Glanza",
    pricePerKm: "₹14",
    pax: 4,
    amenities: ["AC", "Music System"],
    image: "/images/fleet/toyota-glanza.jpg",
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
    id: "tempo-traveller",
    model: "Tempo Traveller",
    pricePerKm: "₹25",
    pax: 12,
    amenities: ["AC", "Push-back Seats"],
    image: "/images/fleet/tempo-traveller.jpg",
    minKmNote: "Applies for min 300 km during outstation round trip",
  },
];
