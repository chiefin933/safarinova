// SafariNova Travels — About Page
// Design: Horizon Ivory — editorial layout with story, team, and values

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Award, Heart, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const team = [
  {
    name: "Amara Wanjiku",
    role: "Founder & Head Safari Guide",
    bio: "Born in Nairobi and raised on the edge of the Aberdare forest, Amara has been guiding safaris for 18 years. She founded SafariNova in 2012 with a vision of responsible, deeply personal African travel.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  },
  {
    name: "David Kipchoge",
    role: "Mountain Expeditions Director",
    bio: "A certified UIAA mountain guide and Kilimanjaro veteran with 200+ summit ascents. David leads all our high-altitude expeditions with an obsessive focus on safety and acclimatisation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Fatuma Hassan",
    role: "East Africa Destination Specialist",
    bio: "Raised in Stone Town, Zanzibar, Fatuma brings an insider's knowledge of Tanzania's coast, islands, and cultural heritage. She curates every beach and island itinerary personally.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "James Odhiambo",
    role: "Head of Operations",
    bio: "With a background in logistics and 15 years in the East African travel industry, James ensures every transfer, accommodation, and activity runs with clockwork precision.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

const values = [
  {
    icon: Heart,
    title: "Authentic Experiences",
    desc: "We reject the cookie-cutter. Every itinerary is crafted around your interests, pace, and vision of the perfect African journey.",
  },
  {
    icon: Shield,
    title: "Responsible Tourism",
    desc: "We are committed to conservation, community benefit, and minimising our environmental footprint. A portion of every booking funds local conservation projects.",
  },
  {
    icon: Globe,
    title: "Deep Local Knowledge",
    desc: "Our guides are not just employees — they are born storytellers with generational knowledge of the land, wildlife, and cultures we visit.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "From the moment you enquire to the day you return home, we hold ourselves to the highest standards of service, safety, and attention to detail.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/hero-bg-Jn57dbNzddqP9HcKteEpRA.webp"
          alt="African savanna"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#B5622A]" />
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Our Story</span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-semibold text-white">About SafariNova</h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#B5622A]" />
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Founded 2012</span>
            </div>
            <h2 className="font-display text-4xl font-semibold text-[#1A1A1A] mb-6 leading-snug">
              Born from a love of Africa's wild places
            </h2>
            <p className="font-body text-[#1A1A1A]/70 leading-relaxed mb-5">
              SafariNova was founded in Nairobi in 2012 by Amara Wanjiku, a third-generation safari guide who grew up listening to her grandmother's stories of the Maasai Mara before it was famous. Frustrated by the impersonal, conveyor-belt approach of large tour operators, she set out to build something different.
            </p>
            <p className="font-body text-[#1A1A1A]/70 leading-relaxed mb-8">
              Today, SafariNova is a team of 24 passionate specialists — guides, naturalists, logistics experts, and storytellers — united by a single belief: that Africa's greatest gift is not just its wildlife, but the way it makes you feel. We exist to create those moments.
            </p>
            <Link href="/contact">
              <Button className="bg-[#B5622A] hover:bg-[#9a5224] text-white border-0 font-ui">
                Talk to Our Team <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-serengeti-Px6NaQbRFaYQMBpe5be5Yq.webp"
                alt="Safari guide"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#1C4A2A] rounded-2xl p-6 shadow-xl">
                <div className="font-display text-4xl font-semibold text-white">13+</div>
                <div className="font-ui text-xs text-white/70 uppercase tracking-wider mt-1">Years of Excellence</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { value: "4,800+", label: "Happy Travellers" },
            { value: "28", label: "Destinations" },
            { value: "4.9★", label: "Average Rating" },
            { value: "100%", label: "Tailor-Made" },
          ].map(({ value, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-[#E8DFD0] p-6 text-center"
            >
              <div className="font-display text-4xl font-semibold text-[#1C4A2A] mb-2">{value}</div>
              <div className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/50">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#B5622A]" />
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">What We Stand For</span>
              <div className="h-px w-8 bg-[#B5622A]" />
            </div>
            <h2 className="font-display text-4xl font-semibold text-[#1A1A1A]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-[#E8DFD0] p-7"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1C4A2A]/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#1C4A2A]" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#1A1A1A] mb-3">{title}</h3>
                <p className="font-body text-sm text-[#1A1A1A]/60 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#B5622A]" />
              <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">The People Behind SafariNova</span>
              <div className="h-px w-8 bg-[#B5622A]" />
            </div>
            <h2 className="font-display text-4xl font-semibold text-[#1A1A1A]">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {team.map(({ name, role, bio, image }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden flex gap-0"
              >
                <div className="w-32 shrink-0">
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-[#1A1A1A]">{name}</h3>
                  <div className="font-ui text-xs text-[#B5622A] uppercase tracking-wider mb-3">{role}</div>
                  <p className="font-body text-xs text-[#1A1A1A]/60 leading-relaxed">{bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
