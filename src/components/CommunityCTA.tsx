import { Users, Mail, BellRing } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";

export default function CommunityCTA() {
  return (
    <section className="py-10 md:py-24 mb-8 sm:mb-12 bg-ocean relative overflow-hidden sm:rounded-3xl sm:mx-4 lg:max-w-[1200px] lg:mx-auto">
      {/* Abstract Background Design */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>

      <div className="container-max relative z-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider mb-6 bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <Users size={16} />
            <span>Connect With Us</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white font-heading mb-4">
            Join Our Travel Community
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Get exclusive access to road condition alerts, travel tips, seasonal discounts, and hidden gems in Vizag.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto px-2 sm:px-0">
            {/* Email Input Alternative */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-charcoal/40">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-0 text-charcoal placeholder:text-charcoal/40 focus:ring-4 focus:ring-teal/30 shadow-lg outline-none transition-all"
              />
            </div>
            
            <button className="w-full sm:w-auto px-8 py-4 bg-coral text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(58,134,255,0.3)] hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap">
              <BellRing size={20} />
              Subscribe
            </button>
          </div>
          
          <div className="mt-8 text-white/60 text-sm">
            Prefer WhatsApp? <a href={siteInfo.whatsappLink} className="text-white font-semibold hover:text-teal underline underline-offset-4 transition-colors">Join our broadcast list here</a>
          </div>
        </div>
      </div>
    </section>
  );
}
