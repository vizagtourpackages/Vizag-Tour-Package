import SectionHeading from "@/components/SectionHeading";
import HotelCard from "@/components/HotelCard";
import { hotels } from "@/data/hotels";

export default function HotelsPage() {
  return (
    <div className="bg-warm-white min-h-screen pb-24 pt-5">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Book Hotels & Resorts in Vizag"
          subtitle="Find the right stay for your journey—from budget-friendly hotels and family stays to premium resorts and beachfront properties across Vizag and nearby destinations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}
