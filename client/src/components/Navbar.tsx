// SafariNova Travels — Navbar Component
// Design: Horizon Ivory — transparent on hero, frosted on scroll
// Fonts: Cormorant Garamond (brand), Outfit (nav links)

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { href: "/destinations?category=Safari", label: "Safari" },
      { href: "/destinations?category=Beach", label: "Beach & Islands" },
      { href: "/destinations?category=Adventure", label: "Adventure" },
      { href: "/destinations?category=Luxury", label: "Luxury" },
      { href: "/destinations?category=Honeymoon", label: "Honeymoon" },
    ],
  },
  { href: "/blog", label: "Travel Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isHome = location === "/";
  const isTransparent = isHome && !scrolled;

  return (
    <>
      {/* Top bar */}
      <div className={`hidden lg:block transition-all duration-300 ${isTransparent ? "bg-transparent" : "bg-[#1C4A2A]"}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-2 text-xs font-ui">
            <div className="flex items-center gap-6 text-white/80">
              <a href="tel:+254700000000" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone size={12} />
                +254 700 000 000
              </a>
              <a href="mailto:hello@safarinova.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={12} />
                hello@safarinova.com
              </a>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <span className="flex items-center gap-1.5">
                <Globe size={12} />
                Nairobi, Kenya
              </span>
              <span>|</span>
              <span>Mon–Fri: 8am–6pm EAT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isTransparent
            ? "bg-transparent lg:top-[34px]"
            : "nav-frosted shadow-sm border-b border-[#E8DFD0] lg:top-0"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 group">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  isTransparent ? "bg-white/20 border border-white/40" : "bg-[#1C4A2A]"
                }`}>
                  <Globe size={18} className={isTransparent ? "text-white" : "text-[#FAF7F2]"} />
                </div>
                <div>
                  <div className={`font-display text-xl font-semibold leading-none tracking-tight transition-colors ${
                    isTransparent ? "text-white" : "text-[#1C4A2A]"
                  }`}>
                    SafariNova
                  </div>
                  <div className={`font-ui text-[10px] uppercase tracking-[0.2em] leading-none mt-0.5 transition-colors ${
                    isTransparent ? "text-white/70" : "text-[#B5622A]"
                  }`}>
                    Travels
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 font-ui text-sm font-medium rounded-md transition-colors ${
                        isTransparent
                          ? "text-white/90 hover:text-white hover:bg-white/10"
                          : "text-[#1A1A1A] hover:text-[#1C4A2A] hover:bg-[#E8DFD0]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-[#E8DFD0] overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link key={child.href} href={child.href}>
                              <div className="px-4 py-3 font-ui text-sm text-[#1A1A1A] hover:bg-[#FAF7F2] hover:text-[#1C4A2A] transition-colors border-b border-[#F0EBE3] last:border-0">
                                {child.label}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={link.href} href={link.href}>
                    <div
                      className={`px-4 py-2 font-ui text-sm font-medium rounded-md transition-colors ${
                        location === link.href
                          ? isTransparent
                            ? "text-white bg-white/15"
                            : "text-[#1C4A2A] bg-[#E8DFD0]"
                          : isTransparent
                          ? "text-white/90 hover:text-white hover:bg-white/10"
                          : "text-[#1A1A1A] hover:text-[#1C4A2A] hover:bg-[#E8DFD0]"
                      }`}
                    >
                      {link.label}
                    </div>
                  </Link>
                )
              )}
            </div>

            {/* CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`font-ui text-sm ${
                    isTransparent
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-[#1A1A1A] hover:text-[#1C4A2A]"
                  }`}
                >
                  My Trips
                </Button>
              </Link>
              <Link href="/destinations">
                <Button
                  size="sm"
                  className="font-ui text-sm bg-[#B5622A] hover:bg-[#9a5224] text-white border-0 px-5"
                >
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                isTransparent ? "text-white hover:bg-white/10" : "text-[#1A1A1A] hover:bg-[#E8DFD0]"
              }`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-[#E8DFD0] overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 space-y-1">
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <div className="px-3 py-2 font-ui text-sm font-semibold text-[#1C4A2A] uppercase tracking-wider">
                        {link.label}
                      </div>
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <div className="px-6 py-2 font-ui text-sm text-[#1A1A1A] hover:text-[#1C4A2A] hover:bg-[#FAF7F2] rounded-md transition-colors">
                            {child.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link key={link.href} href={link.href}>
                      <div className="px-3 py-2.5 font-ui text-sm font-medium text-[#1A1A1A] hover:text-[#1C4A2A] hover:bg-[#FAF7F2] rounded-md transition-colors">
                        {link.label}
                      </div>
                    </Link>
                  )
                )}
                <div className="pt-3 pb-1 border-t border-[#E8DFD0] flex gap-3">
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full font-ui text-sm border-[#1C4A2A] text-[#1C4A2A]">
                      My Trips
                    </Button>
                  </Link>
                  <Link href="/destinations" className="flex-1">
                    <Button size="sm" className="w-full font-ui text-sm bg-[#B5622A] hover:bg-[#9a5224] text-white border-0">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
