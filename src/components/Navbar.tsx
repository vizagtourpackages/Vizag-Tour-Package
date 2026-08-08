"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { navLinks, siteInfo } from "@/data/siteInfo";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const showSolid = !isHome || scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          showSolid
            ? "glass shadow-nav py-2 bg-white"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean to-teal flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div className="hidden sm:block">
              <span className={`font-heading text-lg leading-tight block ${showSolid ? "text-charcoal" : "text-white"}`}>
                Vizag Tour
              </span>
              <span className={`text-xs leading-none ${showSolid ? "text-charcoal-light/60" : "text-white/70"}`}>
                Packages
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showSolid
                    ? "text-charcoal-light hover:text-ocean hover:bg-ocean/5"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${siteInfo.whatsapp}`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                showSolid
                  ? "text-charcoal-light hover:text-ocean"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone size={16} />
              <span className="hidden xl:inline">Call Us</span>
            </a>
            <a
              href={siteInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-2 !px-4 !text-sm !rounded-lg"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className={showSolid ? "text-charcoal" : "text-white"} />
            ) : (
              <Menu size={24} className={showSolid ? "text-charcoal" : "text-white"} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[100] transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-sand">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ocean to-teal flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span className="font-heading text-lg text-charcoal">Vizag Tour</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-sand-light transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-charcoal" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-6 py-3.5 text-charcoal-light font-medium hover:bg-ocean/5 hover:text-ocean transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sand space-y-3">
          <a
            href={`tel:${siteInfo.whatsapp}`}
            className="btn-secondary w-full !text-sm"
          >
            <Phone size={16} />
            Call: {siteInfo.whatsapp}
          </a>
          <a
            href={siteInfo.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full !text-sm"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
