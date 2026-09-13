import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import { siteInfo, stats } from "@/data/siteInfo";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about Vizag Tour Packages, your trusted travel partner in Visakhapatnam.",
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative -mt-[72px] pt-[104px] pb-16 lg:pb-24 overflow-hidden rounded-b-[40px] shadow-sm">
        <div className="absolute inset-0 bg-charcoal">
          <PlaceholderImage
            gradient="from-ocean-dark to-charcoal"
            alt="Vizag Landscape"
            className="w-full h-full opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="container-max relative z-10 text-center px-4 mt-8">
          <ScrollReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-4 leading-[1.1] tracking-tight drop-shadow-sm">
              About Us
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
              Your trusted travel partner for exploring the City of Destiny and beyond.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="lg:w-1/2 w-full">
              <ScrollReveal direction="right">
                <h2 className="text-3xl lg:text-4xl font-heading font-black text-charcoal mb-6 tracking-tight">Our Story</h2>
                <div className="space-y-4 text-charcoal/70 font-medium text-base leading-relaxed">
                  <p>
                    Welcome to <strong className="text-charcoal">{siteInfo.name}</strong>. Based in Visakhapatnam, we are a passionate team of local travel experts dedicated to showcasing the unparalleled beauty of the Eastern Ghats and the Bay of Bengal coastline.
                  </p>
                  <p>
                    Over the past <strong className="text-charcoal">{stats[0].value}</strong> years, we have grown from a small local transport provider to a full-fledged destination management company. We specialize in curating personalized travel experiences, ranging from relaxing beach holidays and spiritual temple tours to adventurous hill station treks in Araku, Lambasingi, and Vanjangi.
                  </p>
                  <p>
                    Our mission is simple: to make travel in and around Vizag accessible, safe, comfortable, and memorable for everyone. We take pride in our well-maintained fleet of vehicles, our network of quality accommodations, and our commitment to customer satisfaction.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:w-1/2 w-full relative">
              <ScrollReveal direction="left">
                <div className="absolute -inset-4 bg-teal/10 rounded-[40px] transform rotate-3 transition-transform duration-500 hover:rotate-6"></div>
                <PlaceholderImage
                  gradient="from-teal-400 to-ocean-600"
                  alt="Our Team"
                  className="w-full aspect-square sm:aspect-video lg:aspect-[4/3] rounded-[40px] shadow-card relative z-10 border border-charcoal/5"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-warm-white relative overflow-hidden rounded-[40px] mx-4 sm:mx-6 lg:mx-8 mb-12 shadow-sm border border-charcoal/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        <div className="container-max relative z-10">
          {/* Badge + Heading */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-flex badge bg-white/50 text-teal backdrop-blur-md border border-teal/20 mb-6 px-5 py-2.5 font-bold tracking-widest text-[10px] uppercase shadow-sm">
                Why Choose Us
              </span>
              <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-charcoal mb-6 tracking-tight">Your Trusted Travel Partner</h2>
              <p className="text-charcoal/60 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                With years of experience serving Visakhapatnam, we&apos;ve built our reputation on reliability, safety, and customer satisfaction.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Row */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {[
                { value: "5+", label: "Years Experience", icon: "🏆" },
                { value: "10,000+", label: "Happy Customers", icon: "👥" },
                { value: "50+", label: "Professional Drivers", icon: "🛡️" },
                { value: "24/7", label: "Customer Support", icon: "📞" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-[24px] p-6 text-center border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mx-auto mb-3 text-2xl shadow-sm border border-charcoal/5">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-charcoal mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-bold text-charcoal/50 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Feature Cards 2x2 */}
          <ScrollReveal delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
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
                <div key={idx} className="flex items-start gap-4 bg-white rounded-[24px] p-6 border border-charcoal/5 shadow-card hover:shadow-card-hover transition-all duration-500 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center shrink-0 text-xl shadow-sm border border-charcoal/5 group-hover:bg-coral transition-colors duration-500">
                    <span className="group-hover:scale-110 transition-transform duration-500">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-charcoal mb-1 tracking-tight">{feature.title}</h3>
                    <p className="text-sm text-charcoal/60 font-medium leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA Banner */}
          <ScrollReveal delay={0.6}>
            <div className="bg-charcoal rounded-[40px] p-10 sm:p-16 text-center border border-charcoal/5 shadow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-teal/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-coral/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="font-heading font-black text-3xl sm:text-5xl text-white mb-6 tracking-tight leading-[1.1]">Ready to Experience the Difference?</h3>
                <p className="text-white/70 text-lg sm:text-xl font-medium mb-10 leading-relaxed">
                  Join thousands of satisfied customers who trust us for their transportation needs.
                </p>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <a href="/contact" className="btn-primary bg-coral hover:bg-[#e86644] text-white shadow-[0_8px_20px_rgba(255,107,107,0.3)] hover:-translate-y-1 transition-all duration-300">Book Online</a>
                  <span className="text-white/60 font-medium">or call <a href={`tel:${siteInfo.whatsapp}`} className="font-bold text-white hover:text-teal transition-colors underline underline-offset-4">{siteInfo.whatsapp}</a></span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
