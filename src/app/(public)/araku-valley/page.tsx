import DestinationView from "@/components/DestinationView";
import { destinationMetadata } from "@/lib/destinations";

export const generateMetadata = () => destinationMetadata("araku-valley");

export default function ArakuValleyPage() {
  return <DestinationView slug="araku-valley" />;
}
