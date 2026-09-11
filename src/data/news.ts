import { NewsPromoData } from "@/components/NewsPromoCard";

export const newsData: NewsPromoData[] = [
  {
    id: "news-1",
    type: "News",
    title: "New Vande Bharat Express to Vizag Starts This Month",
    description: "Travel to Visakhapatnam is getting faster! The new high-speed train connects major hubs directly to Vizag, cutting travel time by 3 hours. Plan your weekend getaway now with our exclusive station-pickup packages.",
    date: "SEP 10, 2026",
    imageUrl: "https://images.unsplash.com/photo-1496850471190-6ce3a1c8b321?auto=format&fit=crop&q=80&w=800",
    linkText: "Read the Full Article",
    href: "/news/vande-bharat-express",
  },
  {
    id: "news-2",
    type: "News",
    title: "Araku Balloon Festival Dates Announced for Winter",
    description: "The highly anticipated Araku Hot Air Balloon Festival is returning this winter. Book your mountain stays and transportation early as accommodations in the valley sell out months in advance.",
    date: "AUG 28, 2026",
    imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=800",
    linkText: "View Event Details",
    href: "/news/araku-balloon-festival",
  }
];

export const promotionsData: NewsPromoData[] = [
  {
    id: "promo-1",
    type: "Promotion",
    title: "Monsoon Magic: 20% Off All Araku Valley Packages",
    description: "Experience the lush greenery and majestic waterfalls of Araku during the monsoon. Book any 2-day or 3-day Araku package before the end of the month to receive an instant 20% discount on your entire trip.",
    date: "LIMITED TIME OFFER",
    imageUrl: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?auto=format&fit=crop&q=80&w=800",
    linkText: "Claim This Offer",
    href: "/tour-packages/araku-monsoon",
  },
  {
    id: "promo-2",
    type: "Promotion",
    title: "Free Airport Transfer with Premium Hotel Bookings",
    description: "Book a stay of 3 nights or more at our partner beachfront luxury resorts in Vizag, and enjoy complimentary airport or railway station pickup and drop-off in our sanitized luxury AC fleet.",
    date: "VALID UNTIL DEC 2026",
    imageUrl: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=800",
    linkText: "Explore Partner Hotels",
    href: "/hotels-and-resorts",
  }
];
