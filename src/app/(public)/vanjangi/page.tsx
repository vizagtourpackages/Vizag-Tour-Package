import DestinationView from "@/components/DestinationView";
import { destinationMetadata } from "@/lib/destinations";

export const generateMetadata = () => destinationMetadata("vanjangi");

export default function VanjangiPage() {
  return <DestinationView slug="vanjangi" />;
}
