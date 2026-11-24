import { Metadata } from "next";
import DestinationView from "@/components/DestinationView";
import { destinationDetails } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Lambasingi Tour Packages",
  description: destinationDetails["lambasingi"].description,
};

export default function LambasingiPage() {
  return <DestinationView slug="lambasingi" />;
}
