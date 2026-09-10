export const siteInfo = {
  name: "Vizag Tour Packages",
  tagline: "Explore Vizag — The City of Destiny",
  subtitle: "Your Complete Travel Partner",
  intro:
    "Discover the beauty of Visakhapatnam (Vizag) with hassle-free travel planning — curated tour packages, hotel bookings, and reliable travel services for family vacations, romantic getaways, and adventure holidays.",
  whatsapp: "+917780739851",
  whatsappLink: "https://wa.me/917780739851",
  landline: "0891 2213875",
  email: "arakuecostays@gmail.com",
  address: "13-134 Pendurthi, Visakhapatnam, 531173",
  googleReviews: {
    rating: 5,
    label: "EXCELLENT",
    count: 19,
  },
} as const;

export type NavLink = {
  label: string;
  href?: string;
  subLinks?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Tour Packages", href: "/tour-packages" },
  { label: "Hotels & Resorts", href: "/hotels-and-resorts" },
  { label: "Travels", href: "/travels" },
  { 
    label: "Destination", 
    subLinks: [
      { label: "Araku Valley", href: "/araku-valley" },
      { label: "Lambasingi Hills", href: "/lambasingi" },
      { label: "Vanjangi Hills", href: "/vanjangi" },
    ]
  },
  { label: "Route Map", href: "/route-map" },
  { label: "Itineraries", href: "/itinerary" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Destinations Covered" },
  { value: 200, suffix: "+", label: "Custom Tours" },
  { value: 1000, suffix: "+", label: "Happy Travelers" },
] as const;

export const heroCTAs = [
  {
    title: "Tour Packages",
    description: "Curated multi-day itineraries across Vizag & beyond",
    href: "/tour-packages",
    icon: "Map" as const,
  },
  {
    title: "Hotels & Resorts",
    description: "Handpicked stays from budget to luxury",
    href: "/hotels-and-resorts",
    icon: "Hotel" as const,
  },
  {
    title: "Travels",
    description: "Reliable vehicles for any group size",
    href: "/travels",
    icon: "Car" as const,
  },
] as const;
