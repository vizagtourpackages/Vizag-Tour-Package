"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { navLinks, siteInfo } from "@/data/siteInfo";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${showSolid
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-charcoal/5 py-4"
          : "bg-transparent py-6"
          }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group" onClick={() => setIsOpen(false)}>
            <div className="w-12 h-12 rounded-[16px] bg-white flex items-center justify-center transition-colors duration-500 shadow-sm border border-charcoal/5 group-hover:bg-coral">
              <span className="text-charcoal font-black text-xl group-hover:text-white transition-colors">V</span>
            </div>
            <div className="hidden sm:block">
              <span className={`font-heading font-bold text-lg leading-tight block tracking-tight ${showSolid ? "text-charcoal" : "text-white"}`}>
                Vizag Tour Packages
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              link.subLinks ? (
                <div key={link.label} className="relative group">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-full text-[11px] font-bold tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${showSolid
                      ? "text-charcoal/80 hover:text-charcoal hover:bg-charcoal/5"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white rounded-[24px] shadow-card border border-charcoal/5 p-3 min-w-[240px]">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="block px-4 py-3 font-bold text-charcoal/80 hover:bg-sand hover:text-coral rounded-[12px] transition-colors"
                          style={{ fontSize: '12px' }}
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`px-3 py-2 rounded-full text-[11px] font-bold tracking-wide uppercase whitespace-nowrap transition-all duration-300 ${showSolid
                    ? "text-charcoal/80 hover:text-charcoal hover:bg-charcoal/5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.label}
                </Link>
              )
            ))}
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
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden flex flex-col shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-charcoal/5 bg-sand/30">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center shadow-sm border border-charcoal/5 group-hover:bg-coral transition-colors">
              <span className="text-charcoal font-black group-hover:text-white transition-colors">V</span>
            </div>
            <span className="font-heading font-bold text-lg text-charcoal tracking-tight">Vizag Tour</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-charcoal/5 hover:bg-sand transition-colors shadow-sm"
            aria-label="Close menu"
          >
            <X size={20} className="text-charcoal" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          {navLinks.map((link) => (
            link.subLinks ? (
              <div key={link.label} className="mb-2">
                <button
                  onClick={() => setExpandedMobileMenu(expandedMobileMenu === link.label ? null : link.label)}
                  className="w-full px-8 py-4 text-sm font-bold text-charcoal hover:bg-sand hover:text-coral rounded-[16px] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${expandedMobileMenu === link.label ? "rotate-180" : ""}`} />
                </button>
                <div className={`pl-8 pr-4 overflow-hidden transition-all duration-300 ${expandedMobileMenu === link.label ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-1 pb-2">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-3 text-sm font-bold text-charcoal/80 hover:text-coral hover:bg-sand rounded-[12px] transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="block px-8 py-4 mb-2 text-sm font-bold text-charcoal hover:bg-sand hover:text-coral rounded-[16px] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>
      </div>
    </>
  );
}
