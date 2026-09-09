export interface Hotel {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  image: string;
  amenities: string[];
}

export const hotels: Hotel[] = [
  {
    id: "novotel",
    name: "Novotel Visakhapatnam Varun Beach",
    type: "Luxury Resort",
    rating: 4.8,
    reviews: 1240,
    location: "RK Beach Road, Vizag",
    price: "₹8,500",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    amenities: ["Sea View", "Pool", "Spa", "Free WiFi"],
  },
  {
    id: "the-park",
    name: "The Park Visakhapatnam",
    type: "Premium Hotel",
    rating: 4.6,
    reviews: 950,
    location: "Beach Road, Vizag",
    price: "₹6,200",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
    amenities: ["Private Beach", "Bar", "Gym", "Breakfast"],
  },
  {
    id: "araku-haritha",
    name: "Haritha Valley Resort",
    type: "Nature Resort",
    rating: 4.2,
    reviews: 820,
    location: "Araku Valley",
    price: "₹3,500",
    image: "https://images.unsplash.com/photo-1542314831-c53cd3814c54?auto=format&fit=crop&q=80&w=800",
    amenities: ["Valley View", "Restaurant", "Campfire", "Parking"],
  },
  {
    id: "lambasingi-eco",
    name: "Eco Stay Lambasingi",
    type: "Eco Camp",
    rating: 4.5,
    reviews: 340,
    location: "Lambasingi",
    price: "₹2,500",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800",
    amenities: ["Tents", "Bonfire", "Trekking", "Meals Included"],
  },
  {
    id: "dolphins-nose",
    name: "Dolphin Hotel",
    type: "Business Hotel",
    rating: 4.4,
    reviews: 1100,
    location: "Daba Gardens, Vizag",
    price: "₹4,000",
    image: "https://images.unsplash.com/photo-1551882547-ff40c0d589d9?auto=format&fit=crop&q=80&w=800",
    amenities: ["City Center", "Restaurant", "Conference", "WiFi"],
  },
  {
    id: "bheemili-resort",
    name: "The Bheemili Resort",
    type: "Beach Resort",
    rating: 4.7,
    reviews: 670,
    location: "Bheemunipatnam",
    price: "₹7,000",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
    amenities: ["Beachfront", "Ayurveda Spa", "Pool", "Bar"],
  }
];
