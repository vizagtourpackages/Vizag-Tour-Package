import { Metadata } from "next";
import DestinationView from "@/components/DestinationView";
import { destinationDetails } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Araku Valley Tour Packages",
  description: destinationDetails["araku-valley"].description,
};

export default function ArakuValleyPage() {
  return <DestinationView slug="araku-valley" />;
}
