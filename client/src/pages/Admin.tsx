// SafariNova Travels — Admin Dashboard
// Design: Horizon Ivory — dark sidebar, analytics overview, CRUD management
// Dynamic: Fetches real bookings and manages them via tRPC

import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Globe, Package, Calendar, Users, TrendingUp, Settings,
  Plus, Edit, Trash2, Eye, Search, Filter, BarChart2,
  DollarSign, Star, CheckCircle, Clock, XCircle, LogOut,
  Upload, Bell, ChevronDown, ArrowUpRight, ArrowDownRight, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { destinations } from "@/lib/data";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const navItems = [
  { id: "overview", label: "Overview", icon: BarChart2 },
  { id: "destinations", label: "Destinations", icon: Globe },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "customers", label: "Customers", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

const statusIcons: Record<string, React.ReactNode> = {
  confirmed: <CheckCircle size={13} className="text-[#1C4A2A]" />,
  pending: <Clock size={13} className="text-[#B5622A]" />,
  cancelled: <XCircle size={13} className="text-red-500" />,
  completed: <CheckCircle size={13} className="text-gray-500" />,
};

const statusColors: Record<string, string> = {
  confirmed: "bg-[#1C4A2A]/10 text-[#1C4A2A]",
  pending: "bg-[#B5622A]/10 text-[#B5622A]",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-gray-100 text-gray-600",
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  // Fetch all bookings
  const { data: bookings, isLoading: bookingsLoading, refetch } = trpc.bookings.all.useQuery();

  // Update booking status mutation
  const updateStatusMutation = trpc.bookings.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Booking status updated");
      refetch();
      setSelectedBooking(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update booking");
    },
  });

  const handleUpdateStatus = (bookingId: number, status: string) => {
    updateStatusMutation.mutate({
      bookingId,
      status: status as "pending" | "confirmed" | "cancelled" | "completed",
    });
  };

  const filteredBookings = bookingFilter === "all"
    ? bookings
    : bookings?.filter((b) => b.status === bookingFilter);

  // Calculate analytics
  const totalBookings = bookings?.length || 0;
  const confirmedBookings = bookings?.filter((b) => b.status === "confirmed").length || 0;
  const totalRevenue = bookings?.reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0;
  const avgBookingValue = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

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
            <div className="flex-1 min-w-0">
              <div className="font-ui text-xs font-semibold text-white truncate">Admin User</div>
              <div className="font-ui text-[10px] text-white/40 truncate">admin@safarinova.com</div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full font-ui text-xs border-white/10 text-white/50 hover:text-white"
          >
            <LogOut size={12} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div>
                <h1 className="font-display text-4xl font-semibold text-white mb-2">Dashboard</h1>
                <p className="font-body text-white/60">Welcome back! Here's your business overview.</p>
              </div>

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Bookings", value: totalBookings, icon: Calendar, trend: "+12%" },
                  { label: "Confirmed", value: confirmedBookings, icon: CheckCircle, trend: "+8%" },
                  { label: "Total Revenue", value: `$${(totalRevenue / 100).toLocaleString()}`, icon: DollarSign, trend: "+23%" },
                  { label: "Avg Booking", value: `$${(avgBookingValue / 100).toLocaleString()}`, icon: TrendingUp, trend: "+5%" },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon size={20} className="text-[#B5622A]" />
                        <div className="flex items-center gap-1 text-xs font-ui text-[#1C4A2A]">
                          <ArrowUpRight size={12} />
                          {card.trend}
                        </div>
                      </div>
                      <div className="font-display text-2xl font-semibold text-white mb-1">{card.value}</div>
                      <div className="font-ui text-xs text-white/40">{card.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Recent Bookings */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="font-display text-xl font-semibold text-white mb-6">Recent Bookings</h2>
                {bookingsLoading ? (
                  <div className="text-center py-8">
                    <Loader2 size={24} className="animate-spin text-[#B5622A] mx-auto mb-2" />
                    <p className="font-ui text-sm text-white/60">Loading bookings...</p>
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 font-ui text-xs uppercase text-white/40">ID</th>
                          <th className="text-left py-3 px-4 font-ui text-xs uppercase text-white/40">Destination</th>
                          <th className="text-left py-3 px-4 font-ui text-xs uppercase text-white/40">Guests</th>
                          <th className="text-left py-3 px-4 font-ui text-xs uppercase text-white/40">Total</th>
                          <th className="text-left py-3 px-4 font-ui text-xs uppercase text-white/40">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 5).map((booking) => (
                          <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-3 px-4 font-ui text-sm text-white">SN-{booking.id}</td>
                            <td className="py-3 px-4 font-ui text-sm text-white">{booking.destinationName}</td>
                            <td className="py-3 px-4 font-ui text-sm text-white">{booking.numberOfTravellers}</td>
                            <td className="py-3 px-4 font-ui text-sm text-white">${booking.totalPrice ? (booking.totalPrice / 100).toLocaleString() : "0"}</td>
                            <td className="py-3 px-4">
                              <Badge className={statusColors[booking.status] || "bg-gray-100"}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="font-ui text-sm text-white/60 text-center py-8">No bookings yet</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-display text-3xl font-semibold text-white mb-2">Bookings Management</h1>
                  <p className="font-body text-white/60">Manage all customer bookings and reservations</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <Select value={bookingFilter} onValueChange={setBookingFilter}>
                  <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white font-ui">
                    <Filter size={14} className="mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bookings</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bookings Table */}
              {bookingsLoading ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                  <Loader2 size={32} className="animate-spin text-[#B5622A] mx-auto mb-4" />
                  <p className="font-ui text-sm text-white/60">Loading bookings...</p>
                </div>
              ) : filteredBookings && filteredBookings.length > 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-white/10">
                        <tr>
                          <th className="text-left py-4 px-6 font-ui text-xs uppercase text-white/40">ID</th>
                          <th className="text-left py-4 px-6 font-ui text-xs uppercase text-white/40">Destination</th>
                          <th className="text-left py-4 px-6 font-ui text-xs uppercase text-white/40">Package</th>
                          <th className="text-left py-4 px-6 font-ui text-xs uppercase text-white/40">Guests</th>
                          <th className="text-left py-4 px-6 font-ui text-xs uppercase text-white/40">Departure</th>
                          <th className="text-left py-4 px-6 font-ui text-xs uppercase text-white/40">Total</th>
                          <th className="text-left py-4 px-6 font-ui text-xs uppercase text-white/40">Status</th>
                          <th className="text-left py-4 px-6 font-ui text-xs uppercase text-white/40">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((booking) => (
                          <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 font-ui text-sm text-white">SN-{booking.id}</td>
                            <td className="py-4 px-6 font-ui text-sm text-white">{booking.destinationName}</td>
                            <td className="py-4 px-6 font-ui text-sm text-white">{booking.pricingTier}</td>
                            <td className="py-4 px-6 font-ui text-sm text-white">{booking.numberOfTravellers}</td>
                            <td className="py-4 px-6 font-ui text-sm text-white">
                              {booking.tripStartDate ? new Date(booking.tripStartDate).toLocaleDateString() : "TBC"}
                            </td>
                            <td className="py-4 px-6 font-ui text-sm text-white font-semibold">
                              ${booking.totalPrice ? (booking.totalPrice / 100).toLocaleString() : "0"}
                            </td>
                            <td className="py-4 px-6">
                              <Badge className={statusColors[booking.status] || "bg-gray-100"}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <Select
                                value={selectedBooking === booking.id ? newStatus : booking.status}
                                onValueChange={(value) => {
                                  setSelectedBooking(booking.id);
                                  setNewStatus(value);
                                  handleUpdateStatus(booking.id, value);
                                }}
                              >
                                <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white font-ui text-xs h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                  <Calendar size={32} className="text-white/20 mx-auto mb-4" />
                  <p className="font-ui text-sm text-white/60">No bookings found</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Placeholder for other tabs */}
          {["destinations", "customers", "settings"].includes(activeTab) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <div className="font-display text-2xl font-semibold text-white mb-2">
                  {navItems.find((n) => n.id === activeTab)?.label}
                </div>
                <p className="font-body text-white/60">This section is coming soon</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
