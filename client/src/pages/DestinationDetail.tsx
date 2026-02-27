// SafariNova Travels — Destination Detail Page
// Design: Horizon Ivory — full gallery, itinerary timeline, pricing tiers, reviews

import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Star, Users, Check, ChevronLeft,
  ChevronRight, Calendar, Shield, ArrowRight, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations, testimonials } from "@/lib/data";
import { toast } from "sonner";

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const dest = destinations.find((d) => d.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedTier, setSelectedTier] = useState(0);
  const [guests, setGuests] = useState(2);

  if (!dest) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h2 className="font-display text-3xl text-[#1A1A1A]/40 mb-4">Destination not found</h2>
          <Link href="/destinations">
            <Button className="bg-[#1C4A2A] text-white">Browse All Destinations</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedTestimonials = testimonials.filter((t) =>
    t.destination.toLowerCase().includes(dest.name.toLowerCase().split(" ")[0])
  );

  const totalPrice = dest.pricingTiers[selectedTier].price * guests;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero gallery */}
      <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <img
          src={dest.gallery[activeImage] || dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Gallery navigation */}
        {dest.gallery.length > 1 && (
          <>
            <button
              onClick={() => setActiveImage((prev) => (prev - 1 + dest.gallery.length) % dest.gallery.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActiveImage((prev) => (prev + 1) % dest.gallery.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {dest.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? "bg-white w-6" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 font-ui text-xs text-white/70">
              <Link href="/"><span className="hover:text-white transition-colors">Home</span></Link>
              <ChevronRight size={12} />
              <Link href="/destinations"><span className="hover:text-white transition-colors">Destinations</span></Link>
              <ChevronRight size={12} />
              <span className="text-white">{dest.name}</span>
            </div>
          </div>
        </div>

        {/* Hero info overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {dest.category.map((cat) => (
                    <span key={cat} className="font-ui text-[10px] uppercase tracking-wider bg-[#B5622A] text-white px-2.5 py-1 rounded-full">
                      {cat}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-4xl lg:text-6xl font-semibold text-white mb-2">
                  {dest.name}
                </h1>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-[#B5622A]" />
                    <span className="font-ui text-sm">{dest.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-[#B5622A]" />
                    <span className="font-ui text-sm">{dest.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < Math.floor(dest.rating) ? "fill-[#D4A853] text-[#D4A853]" : "text-white/40"} />
                    ))}
                    <span className="font-ui text-sm ml-1">{dest.rating} ({dest.reviewCount})</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => toast.success("Link copied to clipboard!")}
                className="flex items-center gap-2 text-white/70 hover:text-white font-ui text-sm transition-colors"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      {dest.gallery.length > 1 && (
        <div className="bg-white border-b border-[#E8DFD0]">
          <div className="container mx-auto px-6 py-3">
            <div className="flex gap-3 overflow-x-auto">
              {dest.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeImage ? "border-[#1C4A2A]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-[#F0EBE3] mb-8 p-1 rounded-xl">
                <TabsTrigger value="overview" className="font-ui text-sm data-[state=active]:bg-white data-[state=active]:text-[#1C4A2A] rounded-lg">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="itinerary" className="font-ui text-sm data-[state=active]:bg-white data-[state=active]:text-[#1C4A2A] rounded-lg">
                  Itinerary
                </TabsTrigger>
                <TabsTrigger value="included" className="font-ui text-sm data-[state=active]:bg-white data-[state=active]:text-[#1C4A2A] rounded-lg">
                  What's Included
                </TabsTrigger>
                <TabsTrigger value="reviews" className="font-ui text-sm data-[state=active]:bg-white data-[state=active]:text-[#1C4A2A] rounded-lg">
                  Reviews
                </TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-4">About This Experience</h2>
                  <p className="font-body text-[#1A1A1A]/70 leading-relaxed">{dest.longDescription}</p>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#1A1A1A] mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dest.highlights.map((h) => (
                      <div key={h} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#1C4A2A]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} className="text-[#1C4A2A]" />
                        </div>
                        <span className="font-ui text-sm text-[#1A1A1A]/70">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Itinerary */}
              <TabsContent value="itinerary">
                <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-8">Day-by-Day Itinerary</h2>
                <div className="space-y-0">
                  {dest.itinerary.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-6 pb-8 last:pb-0"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#1C4A2A] text-white flex items-center justify-center font-ui text-sm font-semibold shrink-0">
                          {day.day}
                        </div>
                        {i < dest.itinerary.length - 1 && (
                          <div className="w-px flex-1 bg-[#E8DFD0] mt-2" />
                        )}
                      </div>
                      <div className="pb-2">
                        <h4 className="font-display text-xl font-semibold text-[#1A1A1A] mb-2">{day.title}</h4>
                        <p className="font-body text-sm text-[#1A1A1A]/60 leading-relaxed">{day.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Included */}
              <TabsContent value="included">
                <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-8">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dest.included.map((item) => (
                    <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E8DFD0]">
                      <div className="w-8 h-8 rounded-full bg-[#1C4A2A]/10 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-[#1C4A2A]" />
                      </div>
                      <span className="font-ui text-sm text-[#1A1A1A]/80">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD0]">
                  <p className="font-ui text-xs text-[#1A1A1A]/50 leading-relaxed">
                    <strong className="text-[#1A1A1A]/70">Not included:</strong> International flights, travel insurance, personal expenses, tips and gratuities, visa fees, and any activities not listed above.
                  </p>
                </div>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews">
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="font-display text-6xl font-semibold text-[#1C4A2A]">{dest.rating}</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < Math.floor(dest.rating) ? "fill-[#D4A853] text-[#D4A853]" : "text-[#E8DFD0]"} />
                      ))}
                    </div>
                    <div className="font-ui text-xs text-[#1A1A1A]/50 mt-1">{dest.reviewCount} reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="font-ui text-xs text-[#1A1A1A]/50 w-4">{star}</span>
                          <div className="flex-1 h-2 bg-[#E8DFD0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#D4A853] rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="font-ui text-xs text-[#1A1A1A]/50 w-8">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {relatedTestimonials.length > 0 ? (
                  <div className="space-y-5">
                    {relatedTestimonials.map((t) => (
                      <div key={t.id} className="bg-white rounded-xl p-6 border border-[#E8DFD0]">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-[#D4A853] text-[#D4A853]" />
                          ))}
                        </div>
                        <p className="font-body text-sm text-[#1A1A1A]/70 italic mb-4">"{t.text}"</p>
                        <div className="flex items-center gap-3">
                          <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{t.name}</div>
                            <div className="font-ui text-xs text-[#1A1A1A]/50">{t.location} · {t.date}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#1A1A1A]/40 font-ui text-sm">
                    Be the first to review this destination!
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-[#E8DFD0] shadow-lg overflow-hidden">
                {/* Pricing tiers */}
                <div className="p-6 border-b border-[#E8DFD0]">
                  <h3 className="font-display text-xl font-semibold text-[#1A1A1A] mb-4">Choose Your Package</h3>
                  <div className="space-y-3">
                    {dest.pricingTiers.map((tier, i) => (
                      <button
                        key={tier.name}
                        onClick={() => setSelectedTier(i)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          selectedTier === i
                            ? "border-[#1C4A2A] bg-[#1C4A2A]/5"
                            : "border-[#E8DFD0] hover:border-[#1C4A2A]/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-ui text-sm font-semibold text-[#1A1A1A]">{tier.name}</span>
                          <span className="font-display text-lg font-semibold text-[#1C4A2A]">${tier.price.toLocaleString()}</span>
                        </div>
                        <div className="font-ui text-xs text-[#1A1A1A]/50">{tier.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tier features */}
                <div className="p-6 border-b border-[#E8DFD0]">
                  <h4 className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/50 mb-3">Included in {dest.pricingTiers[selectedTier].name}</h4>
                  <div className="space-y-2">
                    {dest.pricingTiers[selectedTier].features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Check size={13} className="text-[#1C4A2A] shrink-0" />
                        <span className="font-ui text-xs text-[#1A1A1A]/70">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guests & total */}
                <div className="p-6 border-b border-[#E8DFD0]">
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-ui text-sm text-[#1A1A1A]/70">Number of Guests</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-7 h-7 rounded-full border border-[#E8DFD0] flex items-center justify-center text-[#1A1A1A]/60 hover:border-[#1C4A2A] hover:text-[#1C4A2A] transition-colors"
                      >
                        −
                      </button>
                      <span className="font-ui text-sm font-semibold w-4 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(20, guests + 1))}
                        className="w-7 h-7 rounded-full border border-[#E8DFD0] flex items-center justify-center text-[#1A1A1A]/60 hover:border-[#1C4A2A] hover:text-[#1C4A2A] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-ui text-sm text-[#1A1A1A]/60">Total Estimate</span>
                    <span className="font-display text-2xl font-semibold text-[#1C4A2A]">${totalPrice.toLocaleString()}</span>
                  </div>
                  <p className="font-ui text-xs text-[#1A1A1A]/40 mt-1">Final price confirmed at booking</p>
                </div>

                {/* Book button */}
                <div className="p-6 space-y-3">
                  <Link href={`/book/${dest.slug}?tier=${selectedTier}&guests=${guests}`}>
                    <Button className="w-full bg-[#B5622A] hover:bg-[#9a5224] text-white border-0 font-ui text-sm h-12 rounded-xl">
                      Book This Package
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full font-ui text-sm border-[#1C4A2A] text-[#1C4A2A] hover:bg-[#1C4A2A] hover:text-white h-11 rounded-xl"
                    onClick={() => toast.success("Enquiry sent! Our team will contact you within 24 hours.")}
                  >
                    Send Enquiry
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-[#1A1A1A]/40">
                    <Shield size={12} />
                    <span className="font-ui text-xs">Secure booking · Free cancellation 90+ days</span>
                  </div>
                </div>
              </div>

              {/* Quick info */}
              <div className="mt-4 p-5 bg-white rounded-xl border border-[#E8DFD0]">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Clock, label: "Duration", value: dest.duration },
                    { icon: Users, label: "Group Size", value: "2–16 pax" },
                    { icon: Calendar, label: "Availability", value: "Year-round" },
                    { icon: MapPin, label: "Starts In", value: dest.country },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon size={12} className="text-[#B5622A]" />
                        <span className="font-ui text-[10px] uppercase tracking-wider text-[#1A1A1A]/50">{label}</span>
                      </div>
                      <span className="font-ui text-sm text-[#1A1A1A]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
