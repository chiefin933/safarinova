// SafariNova Travels — User Dashboard
// Design: Horizon Ivory — sidebar layout with booking history, saved trips, profile

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  User, MapPin, Calendar, Download, Heart, Settings,
  LogOut, Bell, ChevronRight, Star, Clock, Check,
  FileText, Globe, Phone, Mail, Edit3, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations } from "@/lib/data";
import { toast } from "sonner";

const mockBookings = [
  {
    id: "SN-847291",
    destination: "Maasai Mara",
    country: "Kenya",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-serengeti-Px6NaQbRFaYQMBpe5be5Yq.webp",
    package: "Premium",
    guests: 2,
    departure: "March 15, 2026",
    total: 9600,
    status: "confirmed",
  },
  {
    id: "SN-623841",
    destination: "Zanzibar",
    country: "Tanzania",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663388029761/fXPw9ypKyH7gGtGTRSWFf4/dest-zanzibar-YoXTEDujQn4vSpzjht6bTT.webp",
    package: "Classic",
    guests: 2,
    departure: "June 8, 2026",
    total: 4200,
    status: "pending",
  },
];

const savedTrips = destinations.slice(0, 3);

const navItems = [
  { id: "bookings", label: "My Bookings", icon: Calendar },
  { id: "saved", label: "Saved Trips", icon: Heart },
  { id: "profile", label: "My Profile", icon: User },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-[#1C4A2A]/10 text-[#1C4A2A]",
  pending: "bg-[#B5622A]/10 text-[#B5622A]",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-gray-100 text-gray-600",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Omondi",
    email: "sarah.omondi@example.com",
    phone: "+254 700 123 456",
    nationality: "Kenyan",
    bio: "Passionate traveller and wildlife photographer based in Nairobi.",
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <div className="container mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-[#E8DFD0] p-6 mb-4 text-center">
              <div className="w-20 h-20 rounded-full bg-[#1C4A2A] flex items-center justify-center mx-auto mb-4 text-white font-display text-2xl">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <h3 className="font-display text-xl font-semibold text-[#1A1A1A]">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="font-ui text-xs text-[#1A1A1A]/50 mt-1">{profile.email}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star size={12} className="fill-[#D4A853] text-[#D4A853]" />
                <span className="font-ui text-xs text-[#1A1A1A]/60">Premium Member</span>
              </div>
            </div>

            {/* Nav */}
            <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-5 py-4 font-ui text-sm transition-colors border-b border-[#F0EBE3] last:border-0 ${
                      activeTab === item.id
                        ? "bg-[#1C4A2A]/5 text-[#1C4A2A] font-medium"
                        : "text-[#1A1A1A]/60 hover:bg-[#FAF7F2] hover:text-[#1A1A1A]"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                    {activeTab === item.id && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                );
              })}
              <button
                onClick={() => toast.info("You have been signed out.")}
                className="w-full flex items-center gap-3 px-5 py-4 font-ui text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Bookings */}
            {activeTab === "bookings" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-3xl font-semibold text-[#1A1A1A]">My Bookings</h2>
                  <Link href="/destinations">
                    <Button className="bg-[#B5622A] hover:bg-[#9a5224] text-white border-0 font-ui text-sm">
                      Book New Trip
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 h-36 md:h-auto shrink-0">
                          <img src={booking.image} alt={booking.destination} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display text-xl font-semibold text-[#1A1A1A]">{booking.destination}</h3>
                                <span className={`font-ui text-xs px-2.5 py-0.5 rounded-full capitalize ${statusColors[booking.status]}`}>
                                  {booking.status}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin size={12} className="text-[#B5622A]" />
                                <span className="font-ui text-xs text-[#1A1A1A]/50">{booking.country}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-display text-2xl font-semibold text-[#1C4A2A]">${booking.total.toLocaleString()}</div>
                              <div className="font-ui text-xs text-[#1A1A1A]/40">total paid</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            {[
                              { icon: Calendar, label: "Departure", value: booking.departure },
                              { icon: User, label: "Package", value: booking.package },
                              { icon: Globe, label: "Guests", value: `${booking.guests} people` },
                            ].map(({ icon: Icon, label, value }) => (
                              <div key={label}>
                                <div className="flex items-center gap-1 mb-0.5">
                                  <Icon size={11} className="text-[#B5622A]" />
                                  <span className="font-ui text-[10px] text-[#1A1A1A]/50 uppercase tracking-wider">{label}</span>
                                </div>
                                <span className="font-ui text-xs font-medium text-[#1A1A1A]">{value}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-ui text-xs text-[#1A1A1A]/40">Ref: {booking.id}</span>
                            <button
                              onClick={() => toast.success("Invoice downloaded!")}
                              className="flex items-center gap-1.5 font-ui text-xs text-[#1C4A2A] hover:text-[#153820] transition-colors"
                            >
                              <Download size={12} /> Download Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Saved Trips */}
            {activeTab === "saved" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-6">Saved Trips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {savedTrips.map((dest) => (
                    <Link key={dest.id} href={`/destinations/${dest.slug}`}>
                      <div className="group bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden card-lift cursor-pointer">
                        <div className="relative h-40">
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <button
                            onClick={(e) => { e.preventDefault(); toast.success("Removed from saved trips."); }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
                          >
                            <Heart size={14} className="fill-[#B5622A] text-[#B5622A]" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-display text-lg font-semibold text-[#1A1A1A]">{dest.name}</h3>
                          <div className="flex items-center gap-1 mt-0.5 mb-3">
                            <MapPin size={11} className="text-[#B5622A]" />
                            <span className="font-ui text-xs text-[#1A1A1A]/50">{dest.country}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-ui text-xs text-[#1A1A1A]/50">{dest.duration}</span>
                            <span className="font-display text-lg font-semibold text-[#1C4A2A]">From ${dest.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Profile */}
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-6">My Profile</h2>
                <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">First Name</Label>
                      <Input value={profile.firstName} onChange={(e) => setProfile(p => ({...p, firstName: e.target.value}))} className="font-ui text-sm border-[#E8DFD0] h-11" />
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Last Name</Label>
                      <Input value={profile.lastName} onChange={(e) => setProfile(p => ({...p, lastName: e.target.value}))} className="font-ui text-sm border-[#E8DFD0] h-11" />
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Email</Label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                        <Input value={profile.email} onChange={(e) => setProfile(p => ({...p, email: e.target.value}))} className="pl-9 font-ui text-sm border-[#E8DFD0] h-11" />
                      </div>
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Phone</Label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                        <Input value={profile.phone} onChange={(e) => setProfile(p => ({...p, phone: e.target.value}))} className="pl-9 font-ui text-sm border-[#E8DFD0] h-11" />
                      </div>
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Nationality</Label>
                      <Input value={profile.nationality} onChange={(e) => setProfile(p => ({...p, nationality: e.target.value}))} className="font-ui text-sm border-[#E8DFD0] h-11" />
                    </div>
                  </div>
                  <Button
                    onClick={() => toast.success("Profile updated successfully!")}
                    className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui"
                  >
                    Save Changes
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Invoices */}
            {activeTab === "invoices" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-6">Invoices</h2>
                <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
                  {mockBookings.map((booking, i) => (
                    <div key={booking.id} className={`flex items-center justify-between p-5 ${i < mockBookings.length - 1 ? "border-b border-[#F0EBE3]" : ""}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#1C4A2A]/10 flex items-center justify-center">
                          <FileText size={18} className="text-[#1C4A2A]" />
                        </div>
                        <div>
                          <div className="font-ui text-sm font-semibold text-[#1A1A1A]">Invoice #{booking.id}</div>
                          <div className="font-ui text-xs text-[#1A1A1A]/50">{booking.destination} · {booking.departure}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-lg font-semibold text-[#1C4A2A]">${booking.total.toLocaleString()}</span>
                        <button
                          onClick={() => toast.success(`Invoice ${booking.id} downloaded!`)}
                          className="flex items-center gap-1.5 font-ui text-xs text-[#B5622A] hover:text-[#9a5224] transition-colors"
                        >
                          <Download size={14} /> Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-6">Account Settings</h2>
                <div className="space-y-4">
                  {[
                    { icon: Bell, title: "Email Notifications", desc: "Receive booking updates and travel tips", enabled: true },
                    { icon: Globe, title: "Newsletter", desc: "Monthly deals and destination guides", enabled: true },
                    { icon: Shield, title: "Two-Factor Authentication", desc: "Add an extra layer of security", enabled: false },
                  ].map(({ icon: Icon, title, desc, enabled }) => (
                    <div key={title} className="bg-white rounded-xl border border-[#E8DFD0] p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center">
                          <Icon size={18} className="text-[#1C4A2A]" />
                        </div>
                        <div>
                          <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{title}</div>
                          <div className="font-ui text-xs text-[#1A1A1A]/50">{desc}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => toast.success(`${title} ${enabled ? "disabled" : "enabled"}.`)}
                        className={`w-11 h-6 rounded-full transition-colors ${enabled ? "bg-[#1C4A2A]" : "bg-[#E8DFD0]"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm mx-1 transition-transform ${enabled ? "translate-x-5" : "translate-x-0"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
