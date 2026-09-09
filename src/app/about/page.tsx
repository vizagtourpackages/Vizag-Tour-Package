import { Metadata } from "next";
import PlaceholderImage from "@/components/PlaceholderImage";
import { siteInfo, stats } from "@/data/siteInfo";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Vizag Tour Packages, your trusted travel partner in Visakhapatnam.",
};

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

      {/* Why Choose Us (From Home Page) */}
      <section className="section-padding bg-white">
        <div className="container-max">
          {/* Badge + Heading */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold text-ocean bg-ocean/10 border border-ocean/20 px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-3">Your Trusted Travel Partner</h2>
            <p className="text-charcoal/60 max-w-2xl mx-auto">
              With years of experience serving Visakhapatnam, we&apos;ve built our reputation on reliability, safety, and customer satisfaction.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { value: "5+", label: "Years Experience", icon: "🏆" },
              { value: "10,000+", label: "Happy Customers", icon: "👥" },
              { value: "50+", label: "Professional Drivers", icon: "🛡️" },
              { value: "24/7", label: "Customer Support", icon: "📞" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-sand-light rounded-2xl p-6 text-center border border-gray-100">
                <div className="w-14 h-14 rounded-xl bg-ocean/10 flex items-center justify-center mx-auto mb-3 text-2xl">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-charcoal mb-1">{stat.value}</div>
                <div className="text-xs font-medium text-charcoal/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              {
                title: "Local Expertise",
                description: "5+ years of dedicated service in Visakhapatnam with deep knowledge of local routes and hidden gems.",
                icon: "📍",
              },
              {
                title: "Safety First",
                description: "All drivers are thoroughly verified with clean driving records. Regular vehicle maintenance ensures your safety.",
                icon: "🛡️",
              },
              {
                title: "Transparent Pricing",
                description: "Clear, upfront pricing with no hidden charges. What you see is what you pay — always.",
                icon: "💳",
              },
              {
                title: "24/7 Availability",
                description: "Round-the-clock service for all your transportation needs. We're here whenever you need us.",
                icon: "⏰",
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-sand-light rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-ocean/10 flex items-center justify-center shrink-0 text-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-1">{feature.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-sand-light rounded-2xl p-8 text-center border border-gray-100">
            <h3 className="font-heading text-xl sm:text-2xl text-charcoal mb-2">Ready to Experience the Difference?</h3>
            <p className="text-charcoal/60 text-sm mb-5 max-w-lg mx-auto">
              Join thousands of satisfied customers who trust us for their transportation needs.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="/contact" className="btn-primary">Book Online</a>
              <span className="text-charcoal/50 text-sm">or call <a href="tel:+919966363662" className="font-semibold text-charcoal hover:text-ocean transition-colors">+91 9966363662</a></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
