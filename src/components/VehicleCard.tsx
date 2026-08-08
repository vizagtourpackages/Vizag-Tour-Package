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
      
      <div className="p-6 pt-8">
        <div className="flex items-end justify-between mb-3">
          <h3 className="font-heading text-xl text-charcoal">{vehicle.type}</h3>
          <span className="text-sm font-semibold text-ocean bg-ocean/10 px-2 py-1 rounded-md">
            {vehicle.capacity}
          </span>
        </div>
        <p className="text-sm text-charcoal-light/70 leading-relaxed">
          {vehicle.description}
        </p>
      </div>
    </div>
  );
}
