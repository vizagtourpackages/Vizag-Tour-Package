import { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import StatsCounter from "@/components/StatsCounter";
import PlaceholderImage from "@/components/PlaceholderImage";
import { siteInfo, stats } from "@/data/siteInfo";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Vizag Tour Packages, your trusted travel partner in Visakhapatnam.",
};

const values = [
  {
    title: "Customer First",
    description: "Your comfort, safety, and satisfaction are at the core of everything we do.",
  },
  {
    title: "Local Expertise",
    description: "Our in-depth knowledge of Vizag ensures you experience the authentic beauty of the region.",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs. We provide clear, upfront pricing for all our tour packages.",
  },
  {
    title: "Quality Service",
    description: "From well-maintained vehicles to handpicked hotels, we don't compromise on quality.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Hero */}
      <section className="pb-10 mt-[-8px] pt-7 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <PlaceholderImage
            gradient="from-ocean-dark to-charcoal"
            alt="Vizag Landscape"
            className="w-full h-full"
          />
        </div>
        <div className="container-max relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-white mb-6">About Us</h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Your trusted travel partner for exploring the City of Destiny and beyond.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-heading text-charcoal mb-6">Our Story</h2>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  Welcome to <strong>{siteInfo.name}</strong>. Based in Visakhapatnam, we are a passionate team of local travel experts dedicated to showcasing the unparalleled beauty of the Eastern Ghats and the Bay of Bengal coastline.
                </p>
                <p>
                  Over the past {stats[0].value} years, we have grown from a small local transport provider to a full-fledged destination management company. We specialize in curating personalized travel experiences, ranging from relaxing beach holidays and spiritual temple tours to adventurous hill station treks in Araku, Lambasingi, and Vanjangi.
                </p>
                <p>
                  Our mission is simple: to make travel in and around Vizag accessible, safe, comfortable, and memorable for everyone. We take pride in our well-maintained fleet of vehicles, our network of quality accommodations, and our commitment to customer satisfaction.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-ocean/20 to-coral/20 rounded-3xl transform rotate-3"></div>
              <PlaceholderImage
                gradient="from-teal-400 to-ocean-600"
                alt="Our Team"
                className="w-full aspect-square sm:aspect-video lg:aspect-[4/3] rounded-2xl shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Why Choose Us */}
      <section className="section-padding bg-sand-light">
        <div className="container-max">
          <SectionHeading
            title="Why Choose Us"
            subtitle="What sets us apart as Vizag's premier tour operator."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-sand">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-ocean/10 rounded-xl flex items-center justify-center text-ocean">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal">{value.title}</h3>
                </div>
                <p className="text-charcoal-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
