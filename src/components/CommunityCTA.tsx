import { Users, Mail, BellRing } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";
import ScrollReveal from "@/components/ScrollReveal";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function CommunityCTA() {
  return (
    <section className="py-12 md:py-24 mb-12 sm:mb-16 bg-charcoal relative overflow-hidden sm:rounded-[40px] sm:mx-4 lg:max-w-[1200px] lg:mx-auto shadow-card">
      {/* Abstract Background Design */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="container-max relative z-10 px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-white/80 font-bold text-xs uppercase tracking-widest mb-8 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 shadow-sm">
              <Users size={16} className="text-teal" />
              <span>Connect With Us</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-heading mb-6 tracking-tight leading-[1.1]">
              Join Our Travel Community
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              Get exclusive access to road condition alerts, travel tips, seasonal discounts, and hidden gems in Vizag.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto px-2 sm:px-0">
              {/* Email Input Alternative */}
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-charcoal/40">
                  <Mail size={20} />
                </div>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full pl-14 pr-5 py-4 rounded-[16px] bg-white border-0 text-charcoal font-medium placeholder:text-charcoal/40 focus:ring-4 focus:ring-teal/30 shadow-lg outline-none transition-all"
                />
              </div>
              
              <button className="w-full sm:w-auto px-8 py-4 bg-coral text-white font-bold rounded-[16px] shadow-sm hover:bg-[#e86644] hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-2 whitespace-nowrap tracking-wide">
                <BellRing size={20} />
                Subscribe
              </button>
            </div>
            
            <div className="mt-8 text-white/40 text-sm font-medium">
              Prefer WhatsApp? <a href={siteInfo.whatsappLink} className="text-white/60 hover:text-teal underline underline-offset-4 transition-colors">Join our broadcast list here</a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
