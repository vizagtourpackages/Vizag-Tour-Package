export interface Vehicle {
  id: string;
  type: string;
  capacity: string;
  description: string;
  icon: "Car" | "Truck" | "Bus";
  imageGradient: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    type: "Sedans",
    capacity: "4-seater",
    description:
      "Perfect for couples and compact travel to hill stations. Comfortable and fuel-efficient for shorter trips.",
    icon: "Car",
    imageGradient: "from-slate-400 to-zinc-600",
  },
  {
    id: "v2",
    type: "SUVs",
    capacity: "6–7 seater",
    description:
      "Ideal for hill stations and long journeys. Spacious with enough room for luggage and comfortable seating for families.",
    icon: "Truck",
    imageGradient: "from-blue-400 to-indigo-600",
  },
  {
    id: "v3",
    type: "Tempo Travellers",
    capacity: "12–19 seater",
    description:
      "Perfect for group tour packages and corporate events. Ample space for large groups with push-back seats.",
    icon: "Bus",
    imageGradient: "from-emerald-400 to-teal-600",
  },
];
