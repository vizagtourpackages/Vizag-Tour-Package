import DestinationView from "@/components/DestinationView";
import { destinationMetadata } from "@/lib/destinations";

export const generateMetadata = () => destinationMetadata("maredumilli");

export default function MaredumilliPage() {
  return <DestinationView slug="maredumilli" />;
}
