// SafariNova Travels — Blog Page
// Design: Horizon Ivory — editorial layout with featured post and grid

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, ArrowRight, Clock, User, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/data";

const allCategories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function Blog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = blogPosts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#1C4A2A] pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#B5622A]" />
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Travel Insights</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white mb-4">The SafariNova Blog</h1>
          <p className="font-body text-white/70 max-w-xl leading-relaxed">
            Expert guides, destination deep-dives, packing lists, and insider tips from our team of passionate travellers in Nairobi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search & filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
            <Input
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 font-ui text-sm border-[#E8DFD0] bg-white h-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-ui text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${
                  activeCategory === cat
                    ? "bg-[#1C4A2A] text-white border-[#1C4A2A]"
                    : "bg-transparent text-[#1A1A1A]/60 border-[#E8DFD0] hover:border-[#1C4A2A] hover:text-[#1C4A2A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#1A1A1A]/40 font-ui">No articles found.</div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <Link href={`/blog/${featured.slug}`}>
                  <div className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden shadow-sm card-lift">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="font-ui text-[10px] uppercase tracking-wider bg-[#B5622A] text-white px-3 py-1.5 rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <span className="font-ui text-xs uppercase tracking-wider text-[#B5622A] mb-3">{featured.category}</span>
                      <h2 className="font-display text-3xl lg:text-4xl font-semibold text-[#1A1A1A] group-hover:text-[#1C4A2A] transition-colors leading-snug mb-4">
                        {featured.title}
                      </h2>
                      <p className="font-body text-[#1A1A1A]/60 leading-relaxed mb-6">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <img src={featured.authorAvatar} alt={featured.author} className="w-7 h-7 rounded-full object-cover" />
                          <span className="font-ui text-xs text-[#1A1A1A]/60">{featured.author}</span>
                        </div>
                        <span className="font-ui text-xs text-[#1A1A1A]/40">{featured.date}</span>
                        <span className="font-ui text-xs text-[#1A1A1A]/40">{featured.readTime}</span>
                      </div>
                      <span className="font-ui text-sm text-[#1C4A2A] font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="group cursor-pointer bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden card-lift">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="font-ui text-[10px] uppercase tracking-wider bg-white/90 text-[#1C4A2A] px-2.5 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3 text-[#1A1A1A]/40">
                            <span className="font-ui text-xs">{post.date}</span>
                            <span>·</span>
                            <span className="font-ui text-xs">{post.readTime}</span>
                          </div>
                          <h3 className="font-display text-xl font-semibold text-[#1A1A1A] group-hover:text-[#1C4A2A] transition-colors leading-snug mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="font-body text-sm text-[#1A1A1A]/60 leading-relaxed line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-2">
                            <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-ui text-xs text-[#1A1A1A]/50">{post.author}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
