import { Car, Truck, Bus } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import type { Vehicle } from "@/data/vehicles";

const iconMap = {
  Car,
  Truck,
  Bus,
};

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const Icon = iconMap[vehicle.icon];

  return (
    <div className="card-base group overflow-hidden bg-white">
      <div className="relative overflow-hidden">
        <PlaceholderImage
          gradient={vehicle.imageGradient}
          alt={vehicle.type}
          className="h-48 w-full transform transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute -bottom-6 right-6 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300">
          <Icon size={24} className="text-ocean" />
        </div>
      </div>
      
      <div className="p-5 sm:p-6 pt-7 sm:pt-8 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
          <h3 className="font-heading text-lg sm:text-xl text-charcoal break-words min-w-0">{vehicle.type}</h3>
          <span className="text-xs sm:text-sm font-semibold text-ocean bg-ocean/10 px-2.5 py-1 rounded-md shrink-0">
            {vehicle.capacity}
          </span>
        </div>
        <p className="text-sm text-charcoal-light/70 leading-relaxed break-words">
          {vehicle.description}
        </p>
      </div>
    </div>
  );
}
