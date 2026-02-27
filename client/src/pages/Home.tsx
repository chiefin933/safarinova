// SafariNova Travels — Home Page
// Design: Horizon Ivory — Warm Minimalist Safari
// Hero: Full-bleed image with animated text, search bar
// Sections: Stats, Featured Destinations, Why Choose Us, Testimonials, Blog, Newsletter

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Search, MapPin, Calendar, Users, ChevronRight, Star,
  Shield, Award, Headphones, Globe, ArrowRight, Play,
  Binoculars, Waves, Mountain, Heart, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations, testimonials, blogPosts, stats } from "@/lib/data";
import { toast } from "sonner";

// Animated counter hook
function useCountUp(target: string, inView: boolean) {
  const [count, setCount] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ""));
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const duration = 2000;
    const step = duration / num;
    const timer = setInterval(() => {
      start += Math.ceil(num / 60);
      if (start >= num) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start + (target.includes("+") ? "+" : target.includes("★") ? "★" : ""));
      }
    }, step > 50 ? 50 : step);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="font-display text-4xl lg:text-5xl font-semibold text-[#1C4A2A] mb-1">{count}</div>
      <div className="font-ui text-sm text-[#1A1A1A]/60 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

function DestinationCard({ dest, index }: { dest: typeof destinations[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/destinations/${dest.slug}`}>
        <div className="group cursor-pointer card-lift bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD0]">
          <div className="relative h-56 overflow-hidden">
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {dest.category.slice(0, 2).map((cat) => (
                <span key={cat} className="font-ui text-[10px] uppercase tracking-wider bg-[#B5622A] text-white px-2.5 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className={i < Math.floor(dest.rating) ? "fill-[#D4A853] text-[#D4A853]" : "text-white/40"} />
                ))}
                <span className="font-ui text-xs text-white/80 ml-1">{dest.rating} ({dest.reviewCount})</span>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#1A1A1A] group-hover:text-[#1C4A2A] transition-colors">
                  {dest.name}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={12} className="text-[#B5622A]" />
                  <span className="font-ui text-xs text-[#1A1A1A]/60">{dest.country}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-ui text-xs text-[#1A1A1A]/50">From</div>
                <div className="font-display text-xl font-semibold text-[#1C4A2A]">${dest.price.toLocaleString()}</div>
              </div>
            </div>
            <p className="font-body text-sm text-[#1A1A1A]/60 leading-relaxed line-clamp-2 mb-4">
              {dest.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-ui text-xs text-[#1A1A1A]/50">{dest.duration}</span>
              <span className="font-ui text-xs text-[#1C4A2A] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ChevronRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-7 border border-[#E8DFD0] shadow-sm"
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="fill-[#D4A853] text-[#D4A853]" />
        ))}
      </div>
      <p className="font-body text-sm text-[#1A1A1A]/70 leading-relaxed mb-6 italic">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-[#E8DFD0]"
        />
        <div>
          <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{testimonial.name}</div>
          <div className="font-ui text-xs text-[#1A1A1A]/50">{testimonial.location} · {testimonial.destination}</div>
        </div>
      </div>
    </motion.div>
  );
}

const categories = [
  { id: "Safari", label: "Safari", icon: Binoculars },
  { id: "Beach", label: "Beach", icon: Waves },
  { id: "Adventure", label: "Adventure", icon: Mountain },
  { id: "Luxury", label: "Luxury", icon: Star },
  { id: "Honeymoon", label: "Honeymoon", icon: Heart },
  { id: "Wildlife", label: "Wildlife", icon: Camera },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDuration, setSearchDuration] = useState("");
  const [searchGuests, setSearchGuests] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [heroLoaded, setHeroLoaded] = useState(false);

  const featuredDests = destinations.filter((d) => d.featured);
  const filteredDests = activeCategory === "all"
    ? featuredDests
    : featuredDests.filter((d) => d.category.includes(activeCategory));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/destinations?q=${searchQuery}`;
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success("Welcome to SafariNova! Your first exclusive deal is on its way.");
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/hero-bg-Jn57dbNzddqP9HcKteEpRA.webp"
            alt="African savanna at golden hour"
            className={`w-full h-full object-cover transition-opacity duration-1000 ${heroLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22/%3E%3C/svg%3E')]" />

        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-[#B5622A]" />
              <span className="font-ui text-xs uppercase tracking-[0.3em] text-[#B5622A]">
                Premium African Travel
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6"
            >
              Africa Awaits.
              <br />
              <span className="italic font-light text-[#F5D78E]">Your Story</span>
              <br />
              Begins Here.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-body text-lg text-white/80 leading-relaxed mb-10 max-w-xl"
            >
              From the thundering herds of the Serengeti to the pristine shores of Zanzibar — SafariNova crafts premium travel experiences that transform perspectives.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <Link href="/destinations">
                <Button className="bg-[#B5622A] hover:bg-[#9a5224] text-white border-0 font-ui text-sm px-8 h-12 rounded-full">
                  Explore Destinations
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <button
                onClick={() => toast.info("Video tour coming soon!")}
                className="flex items-center gap-3 text-white font-ui text-sm hover:text-[#F5D78E] transition-colors"
              >
                <div className="w-11 h-11 rounded-full border-2 border-white/50 flex items-center justify-center hover:border-[#F5D78E] transition-colors">
                  <Play size={14} className="ml-0.5" />
                </div>
                Watch Our Story
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, text: "IATA Certified" },
                { icon: Award, text: "Best Safari Agency 2025" },
                { icon: Star, text: "4.9★ on TripAdvisor" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/70">
                  <Icon size={14} className="text-[#B5622A]" />
                  <span className="font-ui text-xs">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div className="container mx-auto px-6">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-t-2xl shadow-2xl border border-[#E8DFD0] border-b-0 p-5 lg:p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="font-ui text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1.5 block">
                    Where to?
                  </label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                    <Input
                      placeholder="Destination, country, or experience..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 font-ui text-sm border-[#E8DFD0] bg-[#FAF7F2] h-11 focus:border-[#1C4A2A]"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-ui text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1.5 block">
                    Duration
                  </label>
                  <Select value={searchDuration} onValueChange={setSearchDuration}>
                    <SelectTrigger className="font-ui text-sm border-[#E8DFD0] bg-[#FAF7F2] h-11">
                      <Calendar size={14} className="text-[#1A1A1A]/40 mr-2" />
                      <SelectValue placeholder="Any duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">1–5 Days</SelectItem>
                      <SelectItem value="medium">6–10 Days</SelectItem>
                      <SelectItem value="long">11+ Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="font-ui text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 mb-1.5 block">
                    Travellers
                  </label>
                  <div className="flex gap-2">
                    <Select value={searchGuests} onValueChange={setSearchGuests}>
                      <SelectTrigger className="font-ui text-sm border-[#E8DFD0] bg-[#FAF7F2] h-11 flex-1">
                        <Users size={14} className="text-[#1A1A1A]/40 mr-2" />
                        <SelectValue placeholder="Guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3-4">3–4 People</SelectItem>
                        <SelectItem value="5+">5+ People</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="submit"
                      className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui text-sm h-11 px-5"
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section className="bg-white py-16 border-b border-[#E8DFD0]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED DESTINATIONS ─── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#B5622A]" />
                <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Curated Experiences</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1A1A1A]">
                Featured Destinations
              </h2>
            </div>
            <Link href="/destinations">
              <Button variant="outline" className="font-ui text-sm border-[#1C4A2A] text-[#1C4A2A] hover:bg-[#1C4A2A] hover:text-white transition-all">
                All Destinations
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={`font-ui text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                activeCategory === "all"
                  ? "bg-[#1C4A2A] text-white border-[#1C4A2A]"
                  : "bg-transparent text-[#1A1A1A]/60 border-[#E8DFD0] hover:border-[#1C4A2A] hover:text-[#1C4A2A]"
              }`}
            >
              All
            </button>
            {categories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-1.5 font-ui text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                  activeCategory === id
                    ? "bg-[#1C4A2A] text-white border-[#1C4A2A]"
                    : "bg-transparent text-[#1A1A1A]/60 border-[#E8DFD0] hover:border-[#1C4A2A] hover:text-[#1C4A2A]"
                }`}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>

          {/* Destination grid */}
          {filteredDests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDests.map((dest, i) => (
                <DestinationCard key={dest.id} dest={dest} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[#1A1A1A]/40 font-ui">
              No featured destinations in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="bg-[#1C4A2A] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#B5622A] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#B5622A]" />
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Our Promise</span>
              <div className="h-px w-8 bg-[#B5622A]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white">
              Why Choose SafariNova?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: "Local Expertise",
                desc: "Born and based in Nairobi, our team has deep, first-hand knowledge of every destination we offer.",
              },
              {
                icon: Shield,
                title: "Fully Protected",
                desc: "IATA certified and fully bonded. Your payments are protected and your trip is guaranteed.",
              },
              {
                icon: Award,
                title: "Award-Winning",
                desc: "Recognised as East Africa's Best Safari Agency 2025 by the African Travel & Tourism Association.",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Our team is available around the clock during your trip. You're never alone in the wild.",
              },
            ].map(({ icon: Icon, title, desc }, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  key={title}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#B5622A]/20 border border-[#B5622A]/30 flex items-center justify-center mx-auto mb-5">
                    <Icon size={24} className="text-[#B5622A]" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-3">{title}</h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#B5622A]" />
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Traveller Stories</span>
              <div className="h-px w-8 bg-[#B5622A]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1A1A1A]">
              What Our Travellers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ─── */}
      <section className="py-20 lg:py-24 bg-white border-t border-[#E8DFD0]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#B5622A]" />
                <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Travel Insights</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1A1A1A]">
                From the Blog
              </h2>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="font-ui text-sm border-[#1C4A2A] text-[#1C4A2A] hover:bg-[#1C4A2A] hover:text-white">
                All Articles <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  key={post.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group cursor-pointer card-lift">
                      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="font-ui text-[10px] uppercase tracking-wider bg-white/90 text-[#1C4A2A] px-2.5 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="font-ui text-xs text-[#1A1A1A]/50 mb-2">{post.date} · {post.readTime}</div>
                      <h3 className="font-display text-lg font-semibold text-[#1A1A1A] group-hover:text-[#1C4A2A] transition-colors leading-snug mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm text-[#1A1A1A]/60 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#E8DFD0]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#B5622A]" />
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Stay Inspired</span>
              <div className="h-px w-8 bg-[#B5622A]" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-4">
              Never Miss an Adventure
            </h2>
            <p className="font-body text-[#1A1A1A]/60 mb-8 leading-relaxed">
              Join 12,000+ travellers receiving exclusive deals, destination guides, and insider tips from our Nairobi team — delivered monthly.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="font-ui text-sm border-[#E8DFD0] bg-white h-12 flex-1 focus:border-[#1C4A2A]"
              />
              <Button
                type="submit"
                className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui text-sm h-12 px-7 shrink-0"
              >
                Subscribe
              </Button>
            </form>
            <p className="font-ui text-xs text-[#1A1A1A]/40 mt-3">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
