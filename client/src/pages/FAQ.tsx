// SafariNova Travels — FAQ Page
// Design: Horizon Ivory — accordion grouped by category

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { faqs } from "@/lib/data";
import { Link } from "wouter";

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  const filtered = faqs.filter(
    (f) =>
      !query ||
      f.question.toLowerCase().includes(query.toLowerCase()) ||
      f.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#1C4A2A] pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#B5622A]" />
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Help Centre</span>
            <div className="h-px w-8 bg-[#B5622A]" />
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-white/70 leading-relaxed mb-8">
            Everything you need to know about booking with SafariNova. Can't find your answer? Our team is always happy to help.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
            <Input
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-11 font-ui text-sm border-0 bg-white h-12 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-3xl">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[#1A1A1A]/40 font-ui">
            No questions found for "{query}"
          </div>
        ) : (
          categories.map((cat) => {
            const catFaqs = filtered.filter((f) => f.category === cat);
            if (catFaqs.length === 0) return null;
            return (
              <div key={cat} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-6 bg-[#B5622A]" />
                  <h2 className="font-ui text-xs uppercase tracking-[0.2em] text-[#B5622A]">{cat}</h2>
                </div>
                <div className="space-y-3">
                  {catFaqs.map((faq, i) => {
                    const id = `${cat}-${i}`;
                    const isOpen = openId === id;
                    return (
                      <div
                        key={id}
                        className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : id)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <span className="font-ui text-sm font-semibold text-[#1A1A1A] pr-4">{faq.question}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="shrink-0"
                          >
                            <ChevronDown size={18} className="text-[#1A1A1A]/40" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="px-6 pb-6 pt-0 border-t border-[#F0EBE3]">
                                <p className="font-body text-sm text-[#1A1A1A]/70 leading-relaxed pt-4">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}

        {/* CTA */}
        <div className="mt-12 bg-[#1C4A2A] rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-white mb-3">Still have questions?</h3>
          <p className="font-body text-white/70 mb-6">Our expert team is available 7 days a week to help plan your perfect African adventure.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button className="bg-[#B5622A] hover:bg-[#9a5224] text-white border-0 font-ui">
                Contact Our Team
              </Button>
            </Link>
            <Button variant="outline" className="font-ui border-white/30 text-white hover:bg-white/10">
              +254 700 SAFARI
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
