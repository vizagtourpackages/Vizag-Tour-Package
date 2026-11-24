import { Metadata } from "next";
import DestinationView from "@/components/DestinationView";
import { destinationDetails } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Vanjangi Tour Packages",
  description: destinationDetails["vanjangi"].description,
};

export default function VanjangiPage() {
  return <DestinationView slug="vanjangi" />;
}
