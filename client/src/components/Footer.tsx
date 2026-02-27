// SafariNova Travels — Footer Component
// Design: Horizon Ivory — dark forest green background, warm ivory text

import { Link } from "wouter";
import { Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed! Welcome to the SafariNova community.");
    setEmail("");
  };

  return (
    <footer className="bg-[#1C4A2A] text-[#FAF7F2]">
      {/* Main footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#B5622A] flex items-center justify-center">
                <Globe size={20} className="text-white" />
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-white leading-none">SafariNova</div>
                <div className="font-ui text-[10px] uppercase tracking-[0.2em] text-[#B5622A] mt-0.5">Travels</div>
              </div>
            </div>
            <p className="font-body text-sm text-[#FAF7F2]/70 leading-relaxed mb-6">
              Premium African and global travel experiences, curated by experts in Nairobi. We craft journeys that transform perspectives and create memories that last a lifetime.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-[#B5622A] hover:bg-[#B5622A]/20 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-ui text-xs uppercase tracking-[0.2em] text-[#B5622A] mb-5">Destinations</h4>
            <ul className="space-y-3">
              {[
                { href: "/destinations/maasai-mara-safari", label: "Maasai Mara, Kenya" },
                { href: "/destinations/zanzibar-beach-escape", label: "Zanzibar, Tanzania" },
                { href: "/destinations/kilimanjaro-trek", label: "Mount Kilimanjaro" },
                { href: "/destinations/victoria-falls-adventure", label: "Victoria Falls" },
                { href: "/destinations/gorilla-trekking-uganda", label: "Gorilla Trekking, Uganda" },
                { href: "/destinations/cape-town-luxury", label: "Cape Town, South Africa" },
                { href: "/destinations", label: "All Destinations →" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="font-ui text-sm text-[#FAF7F2]/70 hover:text-white transition-colors">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-ui text-xs uppercase tracking-[0.2em] text-[#B5622A] mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About SafariNova" },
                { href: "/blog", label: "Travel Blog" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact Us" },
                { href: "/dashboard", label: "My Account" },
                { href: "/admin", label: "Admin Portal" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="font-ui text-sm text-[#FAF7F2]/70 hover:text-white transition-colors">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-ui text-xs uppercase tracking-[0.2em] text-[#B5622A] mb-5">Get in Touch</h4>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#B5622A] mt-0.5 shrink-0" />
                <span className="font-ui text-sm text-[#FAF7F2]/70">
                  Westlands Business Park, Nairobi, Kenya
                </span>
              </li>
              <li>
                <a href="tel:+254700000000" className="flex items-center gap-3 font-ui text-sm text-[#FAF7F2]/70 hover:text-white transition-colors">
                  <Phone size={14} className="text-[#B5622A] shrink-0" />
                  +254 700 000 000
                </a>
              </li>
              <li>
                <a href="mailto:hello@safarinova.com" className="flex items-center gap-3 font-ui text-sm text-[#FAF7F2]/70 hover:text-white transition-colors">
                  <Mail size={14} className="text-[#B5622A] shrink-0" />
                  hello@safarinova.com
                </a>
              </li>
            </ul>

            <h4 className="font-ui text-xs uppercase tracking-[0.2em] text-[#B5622A] mb-3">Newsletter</h4>
            <p className="font-ui text-xs text-[#FAF7F2]/60 mb-3">
              Exclusive deals, travel inspiration, and insider guides.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 font-ui text-sm h-9 focus:border-[#B5622A]"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-[#B5622A] hover:bg-[#9a5224] text-white border-0 h-9 px-3 shrink-0"
              >
                <ArrowRight size={14} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-ui text-xs text-[#FAF7F2]/50">
            © {new Date().getFullYear()} SafariNova Travels. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="font-ui text-xs text-[#FAF7F2]/50 hover:text-white/80 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
