import { siteInfo } from "@/data/siteInfo";

const DEFAULT_NUMBER = siteInfo.whatsapp; // overridden by the number set in admin Settings

/**
 * WhatsApp click-to-chat URL with an optional pre-filled message.
 * Uses the universal wa.me link, which opens the app on iPhone/Android and WhatsApp Web on desktop.
 */
export function waUrl(message?: string, number: string = DEFAULT_NUMBER): string {
  const digits = (number || DEFAULT_NUMBER).replace(/\D/g, "");
  return message ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/${digits}`;
}

/** Ready-made messages so no WhatsApp button ever opens an empty chat. */
export const waMessages = {
  general: "Hi Vizag Tour Packages! I'd like to plan a trip. Could you please help me with options and prices?",
  packages: "Hi! I'm looking at your Vizag tour packages. Could you suggest the best package for me?",
  hotels: "Hi! I'd like help choosing and booking a hotel or resort in Vizag / Araku. Could you share options and prices?",
  travels: "Hi! I need a cab / tempo traveller booking. Could you share availability and fixed rates?",
  fixedPrices: "Hi! I'd like to book a trip with fixed prices and verified drivers. Please share the available options.",
  destination: (name: string) => `Hi! I'd like to plan a trip to ${name}. Could you share packages, stays and prices?`,
  package: (title: string) => `Hi! I'm interested in the "${title}" package. Could you share the details and availability?`,
  vehicle: (model: string) => `Hi! I'd like to book the ${model}. Could you share availability and the rate?`,
  hotel: (name: string) => `Hi! I'd like to book a stay at ${name}. Could you share room availability and prices?`,
};
