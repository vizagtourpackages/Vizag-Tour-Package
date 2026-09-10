import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  Shield,
} from "lucide-react";
import { siteInfo, navLinks } from "@/data/siteInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-coral/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Footer */}
      <div className="container-max section-padding !pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center group-hover:bg-coral transition-colors duration-500">
                <span className="text-charcoal font-black text-xl group-hover:text-white transition-colors">V</span>
              </div>
              <div>
                <span className="font-heading font-bold text-xl block leading-tight tracking-tight">
                  Vizag Tour
                </span>
                <span className="text-xs text-white/50 font-medium tracking-widest uppercase">Packages</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium">
              {siteInfo.intro.slice(0, 150)}...
            </p>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-teal" />
              <span className="text-xs text-white/50 font-bold tracking-wide uppercase">
                100% Secure • 1000+ Travelers
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.filter(link => link.href).slice(0, 6).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href!}
                    className="text-white/60 text-sm font-medium hover:text-coral transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal-light group-hover:bg-coral transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Packages */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 tracking-tight">Popular Packages</h3>
            <ul className="space-y-3">
              {[
                { label: "One Day Vizag Tour", href: "/tour-packages" },
                { label: "Vizag City Tour (1N/2D)", href: "/tour-packages" },
                { label: "Vizag - Araku Package", href: "/tour-packages" },
                { label: "Araku Valley Trip", href: "/araku-valley" },
                { label: "Lambasingi Getaway", href: "/lambasingi" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm font-medium hover:text-coral transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-charcoal-light group-hover:bg-coral transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 tracking-tight">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-coral/20 transition-colors">
                  <MapPin size={14} className="text-white/60 group-hover:text-coral transition-colors" />
                </div>
                <span className="text-white/60 text-sm font-medium mt-1 leading-relaxed">{siteInfo.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteInfo.whatsapp}`}
                  className="flex items-center gap-3 text-white/60 text-sm font-medium group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-coral/20 transition-colors">
                    <Phone size={14} className="text-white/60 group-hover:text-coral transition-colors" />
                  </div>
                  <span className="group-hover:text-coral transition-colors">{siteInfo.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="flex items-center gap-3 text-white/60 text-sm font-medium group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-coral/20 transition-colors">
                    <Mail size={14} className="text-white/60 group-hover:text-coral transition-colors" />
                  </div>
                  <span className="group-hover:text-coral transition-colors">{siteInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 text-sm font-medium group"
                >
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center shrink-0 group-hover:bg-teal/30 transition-colors">
                    <MessageCircle size={14} className="text-teal group-hover:text-teal-light transition-colors" />
                  </div>
                  <span className="text-teal group-hover:text-teal-light transition-colors">Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs sm:text-sm font-medium text-center sm:text-left tracking-wide">
            © {currentYear} Vizag Tour Packages. All rights reserved.
          </p>
          <p className="text-white/40 text-xs sm:text-sm font-medium flex items-center gap-1.5 tracking-wide">
            Made with <Heart size={14} className="text-coral fill-coral animate-pulse-soft" /> in
            Visakhapatnam
          </p>
        </div>
      </div>
    </footer>
  );
}
