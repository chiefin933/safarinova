// SafariNova Travels — Destinations Page
// Design: Horizon Ivory — filterable grid with category pills and search

import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { Search, MapPin, Star, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations, categories } from "@/lib/data";

export default function Destinations() {
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const initialCategory = params.get("category") || "all";
  const initialQ = params.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState("any");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setActiveCategory(params.get("category") || "all");
    setQuery(params.get("q") || "");
  }, [searchStr]);

  const filtered = destinations
    .filter((d) => {
      const matchCat = activeCategory === "all" || d.category.includes(activeCategory);
      const matchQ = !query || d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()) ||
        d.description.toLowerCase().includes(query.toLowerCase());
      const matchPrice = maxPrice === "any" ||
        (maxPrice === "budget" && d.price < 2000) ||
        (maxPrice === "mid" && d.price >= 2000 && d.price < 4000) ||
        (maxPrice === "luxury" && d.price >= 4000);
      return matchCat && matchQ && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Page header */}
      <div className="relative bg-[#1C4A2A] pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-serengeti-Px6NaQbRFaYQMBpe5be5Yq.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#B5622A]" />
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Explore the World</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white mb-4">
            Our Destinations
          </h1>
          <p className="font-body text-white/70 max-w-xl leading-relaxed">
            From the iconic plains of the Maasai Mara to the spice-scented streets of Zanzibar — discover Africa and beyond with SafariNova.
          </p>
        </div>
      </div>

      {/* Search & filter bar */}
      <div className="bg-white border-b border-[#E8DFD0] sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
              <Input
                placeholder="Search destinations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 font-ui text-sm border-[#E8DFD0] bg-[#FAF7F2] h-10"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A]">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={() => setActiveCategory("all")}
                className={`font-ui text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                  activeCategory === "all"
                    ? "bg-[#1C4A2A] text-white border-[#1C4A2A]"
                    : "bg-transparent text-[#1A1A1A]/60 border-[#E8DFD0] hover:border-[#1C4A2A] hover:text-[#1C4A2A]"
                }`}
              >
                All
              </button>
              {categories.slice(1).map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`font-ui text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                    activeCategory === id
                      ? "bg-[#1C4A2A] text-white border-[#1C4A2A]"
                      : "bg-transparent text-[#1A1A1A]/60 border-[#E8DFD0] hover:border-[#1C4A2A] hover:text-[#1C4A2A]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sort & filters */}
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="font-ui text-xs border-[#E8DFD0] bg-[#FAF7F2] h-10 w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="font-ui text-xs border-[#E8DFD0] h-10"
              >
                <SlidersHorizontal size={14} className="mr-1.5" />
                Filters
              </Button>
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#E8DFD0] flex flex-wrap gap-4 items-center"
            >
              <div className="flex items-center gap-3">
                <label className="font-ui text-xs text-[#1A1A1A]/60 uppercase tracking-wider">Budget</label>
                <Select value={maxPrice} onValueChange={setMaxPrice}>
                  <SelectTrigger className="font-ui text-xs border-[#E8DFD0] bg-[#FAF7F2] h-9 w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="budget">Under $2,000</SelectItem>
                    <SelectItem value="mid">$2,000 – $4,000</SelectItem>
                    <SelectItem value="luxury">$4,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(activeCategory !== "all" || query || maxPrice !== "any") && (
                <button
                  onClick={() => { setActiveCategory("all"); setQuery(""); setMaxPrice("any"); }}
                  className="font-ui text-xs text-[#B5622A] hover:text-[#9a5224] flex items-center gap-1"
                >
                  <X size={12} /> Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="font-ui text-sm text-[#1A1A1A]/60">
            Showing <span className="font-semibold text-[#1A1A1A]">{filtered.length}</span> destination{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="font-display text-6xl text-[#E8DFD0] mb-4">🌍</div>
            <h3 className="font-display text-2xl text-[#1A1A1A]/40 mb-2">No destinations found</h3>
            <p className="font-ui text-sm text-[#1A1A1A]/30">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={`/destinations/${dest.slug}`}>
                  <div className="group cursor-pointer card-lift bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DFD0]">
                    <div className="relative h-64 overflow-hidden">
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
                          <span className="font-ui text-xs text-white/80 ml-1">{dest.rating} ({dest.reviewCount} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#1C4A2A] transition-colors">
                            {dest.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin size={12} className="text-[#B5622A]" />
                            <span className="font-ui text-xs text-[#1A1A1A]/60">{dest.country} · {dest.region}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-ui text-xs text-[#1A1A1A]/50">From</div>
                          <div className="font-display text-2xl font-semibold text-[#1C4A2A]">${dest.price.toLocaleString()}</div>
                          <div className="font-ui text-xs text-[#1A1A1A]/40">per person</div>
                        </div>
                      </div>
                      <p className="font-body text-sm text-[#1A1A1A]/60 leading-relaxed line-clamp-2 mb-4">
                        {dest.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#F0EBE3]">
                        <span className="font-ui text-xs text-[#1A1A1A]/50">{dest.duration}</span>
                        <span className="font-ui text-sm text-[#1C4A2A] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Package <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
