export interface SafetyTip {
  id: string;
  title: string;
  description: string;
  icon: "AlertTriangle" | "Droplets" | "Sun" | "Users";
}

export const safetyTips: SafetyTip[] = [
  {
    id: "s1",
    title: "Avoid Swimming in Open Seas",
    description:
      "Strong undercurrents, sudden depth changes, and slippery rocks make many beaches unsafe for swimming. Always check local advisories.",
    icon: "AlertTriangle",
  },
  {
    id: "s2",
    title: "Carry Plenty of Water",
    description:
      "The Araku agency areas can have intense heat. Stay hydrated and carry enough water, especially during treks and outdoor excursions.",
    icon: "Droplets",
  },
  {
    id: "s3",
    title: "Start Early in the Morning",
    description:
      "Begin your sightseeing early to avoid peak afternoon heat and make the most of daylight hours for outdoor activities.",
    icon: "Sun",
  },
  {
    id: "s4",
    title: "Don't Go Solo to Remote Spots",
    description:
      "Locations like Kaparamajji, Tarabu Waterfalls, and Balluguda are remote. Always travel in groups and inform someone about your plans.",
    icon: "Users",
  },
];
