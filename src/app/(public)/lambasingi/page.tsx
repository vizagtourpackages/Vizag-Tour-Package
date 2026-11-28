import DestinationView from "@/components/DestinationView";
import { destinationMetadata } from "@/lib/destinations";

export const generateMetadata = () => destinationMetadata("lambasingi");

export default function LambasingiPage() {
  return <DestinationView slug="lambasingi" />;
}
