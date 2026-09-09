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
    <footer className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="container-max section-padding !pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean to-teal flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <span className="font-heading text-lg block leading-tight">
                  Vizag Tour
                </span>
                <span className="text-xs text-white/50">Packages</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {siteInfo.intro.slice(0, 150)}...
            </p>
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-green-400" />
              <span className="text-xs text-white/50">
                100% Secure Booking • Trusted by 1000+ Travelers
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {navLinks.filter(link => link.href).slice(0, 6).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href!}
                    className="text-white/60 text-sm hover:text-coral transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Packages */}
          <div>
            <h3 className="font-heading text-lg mb-4">Popular Packages</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/tour-packages"
                  className="text-white/60 text-sm hover:text-coral transition-colors"
                >
                  One Day Vizag Tour
                </Link>
              </li>
              <li>
                <Link
                  href="/tour-packages"
                  className="text-white/60 text-sm hover:text-coral transition-colors"
                >
                  Vizag City Tour (1N/2D)
                </Link>
              </li>
              <li>
                <Link
                  href="/tour-packages"
                  className="text-white/60 text-sm hover:text-coral transition-colors"
                >
                  Vizag - Araku Package
                </Link>
              </li>
              <li>
                <Link
                  href="/araku-valley"
                  className="text-white/60 text-sm hover:text-coral transition-colors"
                >
                  Araku Valley Trip
                </Link>
              </li>
              <li>
                <Link
                  href="/lambasingi"
                  className="text-white/60 text-sm hover:text-coral transition-colors"
                >
                  Lambasingi Getaway
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-coral mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">{siteInfo.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteInfo.whatsapp}`}
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-coral transition-colors"
                >
                  <Phone size={16} className="text-coral shrink-0" />
                  {siteInfo.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteInfo.landline}`}
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-coral transition-colors"
                >
                  <Phone size={16} className="text-coral shrink-0" />
                  {siteInfo.landline}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteInfo.email}`}
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-coral transition-colors"
                >
                  <Mail size={16} className="text-coral shrink-0" />
                  {siteInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 text-sm hover:text-green-400 transition-colors"
                >
                  <MessageCircle size={16} className="text-green-400 shrink-0" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {currentYear} Vizag Tour Packages. All rights reserved.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-coral fill-coral" /> in
            Visakhapatnam
          </p>
        </div>
      </div>
    </footer>
  );
}
