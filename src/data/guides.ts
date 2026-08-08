export interface Guide {
  id: string;
  title: string;
  category: string;
  highlights: string[];
  imageGradient: string;
}

export const guides: Guide[] = [
  {
    id: "g1",
    title: "Things to Do in Rushikonda 2026",
    category: "Adventure",
    highlights: [
      "Paragliding & Parascending",
      "Speed Boating",
      "Scuba Diving",
      "Helicopter Rides",
      "Horse Riding",
    ],
    imageGradient: "from-sky-400 to-blue-600",
  },
  {
    id: "g2",
    title: "Vizag Tourism Guide 2026",
    category: "Sightseeing",
    highlights: [
      "Glass Bridge",
      "Maaya World",
      "Kondakarla Ava",
      "Seethapalam Beach",
      "Revupolavaram Beach",
    ],
    imageGradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "g3",
    title: "One Day Vizag Sightseeing — Perfect Travel Plan",
    category: "Planning",
    highlights: [
      "Beaches",
      "Hills",
      "Museums",
      "Temples",
      "Parks",
      "Adventures",
      "Sanctuary",
      "Studios",
    ],
    imageGradient: "from-violet-400 to-purple-600",
  },
  {
    id: "g4",
    title: "Best Offbeat Destinations in Vizag",
    category: "Offbeat",
    highlights: [
      "Old Gangavaram Port",
      "Divis Bridge",
      "Kondakarla",
      "Seethapalem Beach",
      "Megadhri Gedda",
    ],
    imageGradient: "from-orange-400 to-red-500",
  },
  {
    id: "g5",
    title: "15 Best Places to Visit & Things to Do in Vizag",
    category: "Top List",
    highlights: [
      "Glass Bridge",
      "Maaya World",
      "Rushikonda",
      "Simhachalam",
      "Erra Matti Dibbalu",
      "Harbour",
    ],
    imageGradient: "from-pink-400 to-rose-600",
  },
  {
    id: "g6",
    title: "Viswanadh Sports Club Vizag",
    category: "Entertainment",
    highlights: [
      "Ultimate Theme Park",
      "Water Park",
      "Snow Station",
      "Go-Karting",
      "Zipline Park",
      "Trampoline Zone",
    ],
    imageGradient: "from-indigo-400 to-blue-600",
  },
];
