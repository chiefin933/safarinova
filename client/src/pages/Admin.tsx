// SafariNova Travels — Admin Dashboard
// Design: Horizon Ivory — dark sidebar, analytics overview, CRUD management

import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Globe, Package, Calendar, Users, TrendingUp, Settings,
  Plus, Edit, Trash2, Eye, Search, Filter, BarChart2,
  DollarSign, Star, CheckCircle, Clock, XCircle, LogOut,
  Upload, Bell, ChevronDown, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { destinations } from "@/lib/data";
import { toast } from "sonner";

const navItems = [
  { id: "overview", label: "Overview", icon: BarChart2 },
  { id: "destinations", label: "Destinations", icon: Globe },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "customers", label: "Customers", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

const mockBookings = [
  { id: "SN-847291", customer: "Sarah Omondi", destination: "Maasai Mara", package: "Premium", guests: 2, departure: "Mar 15, 2026", total: 9600, status: "confirmed" },
  { id: "SN-623841", customer: "Michael Chen", destination: "Zanzibar", package: "Classic", guests: 2, departure: "Jun 8, 2026", total: 4200, status: "pending" },
  { id: "SN-512930", customer: "Amara Diallo", destination: "Kilimanjaro", package: "Premium", guests: 1, departure: "Sep 3, 2026", total: 3600, status: "confirmed" },
  { id: "SN-401827", customer: "Robert Müller", destination: "Victoria Falls", package: "Classic", guests: 4, departure: "Jul 20, 2026", total: 7600, status: "pending" },
  { id: "SN-389012", customer: "Priya Nair", destination: "Uganda Gorillas", package: "Premium", guests: 2, departure: "Nov 1, 2026", total: 10400, status: "cancelled" },
];

const statusIcons: Record<string, React.ReactNode> = {
  confirmed: <CheckCircle size={13} className="text-[#1C4A2A]" />,
  pending: <Clock size={13} className="text-[#B5622A]" />,
  cancelled: <XCircle size={13} className="text-red-500" />,
};

const statusColors: Record<string, string> = {
  confirmed: "bg-[#1C4A2A]/10 text-[#1C4A2A]",
  pending: "bg-[#B5622A]/10 text-[#B5622A]",
  cancelled: "bg-red-100 text-red-600",
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingFilter, setBookingFilter] = useState("all");

  const filteredBookings = bookingFilter === "all"
    ? mockBookings
    : mockBookings.filter((b) => b.status === bookingFilter);

  return (
    <div className="min-h-screen flex bg-[#0F1F14]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#0F1F14] border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#B5622A] flex items-center justify-center">
              <Globe size={18} className="text-white" />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-white leading-none">SafariNova</div>
              <div className="font-ui text-[9px] uppercase tracking-[0.2em] text-[#B5622A] mt-0.5">Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-ui text-sm transition-all ${
                  activeTab === item.id
                    ? "bg-[#B5622A] text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#1C4A2A] flex items-center justify-center text-white font-ui text-xs font-semibold">
              AD
            </div>
            <div>
              <div className="font-ui text-xs font-semibold text-white">Admin</div>
              <div className="font-ui text-[10px] text-white/40">admin@safarinova.com</div>
            </div>
          </div>
          <Link href="/">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-ui text-xs text-white/40 hover:text-white hover:bg-white/5 transition-all">
              <LogOut size={14} />
              Back to Website
            </button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-[#FAF7F2]">
        {/* Top bar */}
        <div className="bg-white border-b border-[#E8DFD0] px-8 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold text-[#1A1A1A] capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-[#FAF7F2] transition-colors">
              <Bell size={18} className="text-[#1A1A1A]/60" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#B5622A]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#1C4A2A] flex items-center justify-center text-white font-ui text-xs font-semibold">
              AD
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Overview */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* KPI cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: "Total Revenue", value: "$284,500", change: "+18.2%", up: true, icon: DollarSign, color: "bg-[#1C4A2A]/10 text-[#1C4A2A]" },
                  { label: "Total Bookings", value: "247", change: "+12.4%", up: true, icon: Calendar, color: "bg-[#B5622A]/10 text-[#B5622A]" },
                  { label: "Active Customers", value: "1,840", change: "+8.7%", up: true, icon: Users, color: "bg-blue-100 text-blue-600" },
                  { label: "Avg Rating", value: "4.9 ★", change: "+0.1", up: true, icon: Star, color: "bg-yellow-100 text-yellow-600" },
                ].map(({ label, value, change, up, icon: Icon, color }) => (
                  <div key={label} className="bg-white rounded-2xl border border-[#E8DFD0] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                        <Icon size={18} />
                      </div>
                      <span className={`font-ui text-xs flex items-center gap-1 ${up ? "text-[#1C4A2A]" : "text-red-500"}`}>
                        {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {change}
                      </span>
                    </div>
                    <div className="font-display text-3xl font-semibold text-[#1A1A1A]">{value}</div>
                    <div className="font-ui text-xs text-[#1A1A1A]/50 mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Recent bookings */}
              <div className="bg-white rounded-2xl border border-[#E8DFD0]">
                <div className="flex items-center justify-between p-6 border-b border-[#E8DFD0]">
                  <h3 className="font-display text-xl font-semibold text-[#1A1A1A]">Recent Bookings</h3>
                  <button onClick={() => setActiveTab("bookings")} className="font-ui text-xs text-[#B5622A] hover:text-[#9a5224]">
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E8DFD0]">
                        {["Booking ID", "Customer", "Destination", "Total", "Status"].map((h) => (
                          <th key={h} className="px-6 py-3 text-left font-ui text-[10px] uppercase tracking-wider text-[#1A1A1A]/40">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.slice(0, 4).map((b) => (
                        <tr key={b.id} className="border-b border-[#F0EBE3] last:border-0 hover:bg-[#FAF7F2] transition-colors">
                          <td className="px-6 py-4 font-ui text-xs text-[#1A1A1A]/60">{b.id}</td>
                          <td className="px-6 py-4 font-ui text-sm font-medium text-[#1A1A1A]">{b.customer}</td>
                          <td className="px-6 py-4 font-ui text-sm text-[#1A1A1A]/70">{b.destination}</td>
                          <td className="px-6 py-4 font-display text-sm font-semibold text-[#1C4A2A]">${b.total.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`flex items-center gap-1.5 font-ui text-xs px-2.5 py-1 rounded-full w-fit capitalize ${statusColors[b.status]}`}>
                              {statusIcons[b.status]} {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top destinations */}
              <div className="bg-white rounded-2xl border border-[#E8DFD0] p-6">
                <h3 className="font-display text-xl font-semibold text-[#1A1A1A] mb-5">Top Destinations</h3>
                <div className="space-y-4">
                  {[
                    { name: "Maasai Mara, Kenya", bookings: 89, revenue: 284800, pct: 85 },
                    { name: "Zanzibar, Tanzania", bookings: 67, revenue: 140700, pct: 64 },
                    { name: "Kilimanjaro, Tanzania", bookings: 45, revenue: 126000, pct: 43 },
                    { name: "Victoria Falls", bookings: 38, revenue: 72200, pct: 36 },
                  ].map(({ name, bookings, revenue, pct }) => (
                    <div key={name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-ui text-sm text-[#1A1A1A]">{name}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-ui text-xs text-[#1A1A1A]/50">{bookings} bookings</span>
                          <span className="font-display text-sm font-semibold text-[#1C4A2A]">${revenue.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-[#E8DFD0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#1C4A2A] rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Destinations management */}
          {activeTab === "destinations" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                  <Input placeholder="Search destinations..." className="pl-9 font-ui text-sm border-[#E8DFD0] h-10 w-64" />
                </div>
                <Button
                  onClick={() => toast.info("Add destination form coming soon!")}
                  className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui text-sm"
                >
                  <Plus size={14} className="mr-2" /> Add Destination
                </Button>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E8DFD0] bg-[#FAF7F2]">
                      {["Destination", "Country", "Category", "Price From", "Rating", "Actions"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left font-ui text-[10px] uppercase tracking-wider text-[#1A1A1A]/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {destinations.map((dest) => (
                      <tr key={dest.id} className="border-b border-[#F0EBE3] last:border-0 hover:bg-[#FAF7F2] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={dest.image} alt={dest.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{dest.name}</div>
                              <div className="font-ui text-xs text-[#1A1A1A]/40">{dest.duration}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-ui text-sm text-[#1A1A1A]/70">{dest.country}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {dest.category.slice(0, 2).map((c) => (
                              <span key={c} className="font-ui text-[10px] bg-[#E8DFD0] text-[#1A1A1A]/60 px-2 py-0.5 rounded-full">{c}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-display text-sm font-semibold text-[#1C4A2A]">${dest.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="fill-[#D4A853] text-[#D4A853]" />
                            <span className="font-ui text-sm">{dest.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => toast.info("View destination")} className="p-1.5 rounded-lg hover:bg-[#E8DFD0] text-[#1A1A1A]/40 hover:text-[#1C4A2A] transition-colors">
                              <Eye size={14} />
                            </button>
                            <button onClick={() => toast.info("Edit destination")} className="p-1.5 rounded-lg hover:bg-[#E8DFD0] text-[#1A1A1A]/40 hover:text-[#B5622A] transition-colors">
                              <Edit size={14} />
                            </button>
                            <button onClick={() => toast.error("Destination deleted!")} className="p-1.5 rounded-lg hover:bg-red-50 text-[#1A1A1A]/40 hover:text-red-500 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Bookings management */}
          {activeTab === "bookings" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                  <Input placeholder="Search bookings..." className="pl-9 font-ui text-sm border-[#E8DFD0] h-10" />
                </div>
                <Select value={bookingFilter} onValueChange={setBookingFilter}>
                  <SelectTrigger className="font-ui text-sm border-[#E8DFD0] h-10 w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E8DFD0] bg-[#FAF7F2]">
                      {["ID", "Customer", "Destination", "Package", "Guests", "Departure", "Total", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-5 py-3 text-left font-ui text-[10px] uppercase tracking-wider text-[#1A1A1A]/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="border-b border-[#F0EBE3] last:border-0 hover:bg-[#FAF7F2] transition-colors">
                        <td className="px-5 py-4 font-ui text-xs text-[#1A1A1A]/50">{b.id}</td>
                        <td className="px-5 py-4 font-ui text-sm font-medium text-[#1A1A1A]">{b.customer}</td>
                        <td className="px-5 py-4 font-ui text-sm text-[#1A1A1A]/70">{b.destination}</td>
                        <td className="px-5 py-4 font-ui text-xs text-[#1A1A1A]/60">{b.package}</td>
                        <td className="px-5 py-4 font-ui text-sm text-center">{b.guests}</td>
                        <td className="px-5 py-4 font-ui text-xs text-[#1A1A1A]/60">{b.departure}</td>
                        <td className="px-5 py-4 font-display text-sm font-semibold text-[#1C4A2A]">${b.total.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <span className={`flex items-center gap-1.5 font-ui text-xs px-2.5 py-1 rounded-full w-fit capitalize ${statusColors[b.status]}`}>
                            {statusIcons[b.status]} {b.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => toast.info("View booking details")} className="p-1.5 rounded-lg hover:bg-[#E8DFD0] text-[#1A1A1A]/40 hover:text-[#1C4A2A] transition-colors">
                              <Eye size={13} />
                            </button>
                            <button onClick={() => toast.info("Edit booking")} className="p-1.5 rounded-lg hover:bg-[#E8DFD0] text-[#1A1A1A]/40 hover:text-[#B5622A] transition-colors">
                              <Edit size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Customers */}
          {activeTab === "customers" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8 text-center">
                <Users size={48} className="text-[#E8DFD0] mx-auto mb-4" />
                <h3 className="font-display text-2xl text-[#1A1A1A]/40 mb-2">Customer Management</h3>
                <p className="font-ui text-sm text-[#1A1A1A]/30">Full customer CRM coming in the next release.</p>
              </div>
            </motion.div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8 text-center">
                <Settings size={48} className="text-[#E8DFD0] mx-auto mb-4" />
                <h3 className="font-display text-2xl text-[#1A1A1A]/40 mb-2">System Settings</h3>
                <p className="font-ui text-sm text-[#1A1A1A]/30">Admin configuration panel coming soon.</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
