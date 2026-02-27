// SafariNova Travels — User Dashboard
// Design: Horizon Ivory — sidebar layout with booking history, saved trips, profile
// Dynamic: Fetches real bookings from database via tRPC

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  User, MapPin, Calendar, Download, Heart, Settings,
  LogOut, Bell, ChevronRight, Star, Clock, Check,
  FileText, Globe, Phone, Mail, Edit3, Shield, Loader2, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations } from "@/lib/data";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

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
  const { user, isAuthenticated, logout } = useAuth({ redirectOnUnauthenticated: true });
  const [activeTab, setActiveTab] = useState("bookings");
  const [profile, setProfile] = useState({
    firstName: user?.name?.split(" ")[0] || "User",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    nationality: "",
    bio: "",
  });

  // Fetch user's bookings from database
  const { data: bookings, isLoading: bookingsLoading } = trpc.bookings.myBookings.useQuery();
  const savedTrips = destinations.slice(0, 3);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h2 className="font-display text-3xl text-[#1A1A1A]/40 mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <div className="container mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#E8DFD0] p-6 sticky top-28">
              {/* Profile Preview */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#E8DFD0]">
                <div className="w-12 h-12 rounded-full bg-[#1C4A2A]/10 flex items-center justify-center">
                  <User size={20} className="text-[#1C4A2A]" />
                </div>
                <div>
                  <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{user?.name}</div>
                  <div className="font-ui text-xs text-[#1A1A1A]/50">{user?.email}</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-2 mb-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-ui text-sm ${
                        activeTab === item.id
                          ? "bg-[#1C4A2A] text-white"
                          : "text-[#1A1A1A]/60 hover:bg-[#1C4A2A]/5"
                      }`}
                    >
                      <Icon size={16} />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full font-ui border-[#E8DFD0] text-[#1A1A1A]/60 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOut size={14} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* My Bookings */}
            {activeTab === "bookings" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-2">My Bookings</h2>
                  <p className="font-body text-[#1A1A1A]/60">Manage your safari adventures and travel plans</p>
                </div>

                {bookingsLoading ? (
                  <div className="bg-white rounded-2xl border border-[#E8DFD0] p-12 text-center">
                    <Loader2 size={32} className="animate-spin text-[#1C4A2A] mx-auto mb-4" />
                    <p className="font-ui text-sm text-[#1A1A1A]/60">Loading your bookings...</p>
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl border border-[#E8DFD0] p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-display text-lg font-semibold text-[#1A1A1A]">
                                {booking.destinationName}
                              </h3>
                              <Badge className={`${statusColors[booking.status] || "bg-gray-100"}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="flex items-center gap-2 font-ui text-sm text-[#1A1A1A]/60">
                                <Users size={14} />
                                {booking.numberOfTravellers} {booking.numberOfTravellers === 1 ? "Guest" : "Guests"}
                              </div>
                              <div className="flex items-center gap-2 font-ui text-sm text-[#1A1A1A]/60">
                                <Calendar size={14} />
                                {booking.tripStartDate ? new Date(booking.tripStartDate).toLocaleDateString() : "TBC"}
                              </div>
                              <div className="flex items-center gap-2 font-ui text-sm text-[#1A1A1A]/60">
                                <Star size={14} />
                                {booking.pricingTier}
                              </div>
                              <div className="flex items-center gap-2 font-ui text-sm font-semibold text-[#1C4A2A]">
                                ${booking.totalPrice ? (booking.totalPrice / 100).toLocaleString() : "0"}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="font-ui border-[#1C4A2A] text-[#1C4A2A] hover:bg-[#1C4A2A] hover:text-white"
                          >
                            View Details <ChevronRight size={14} className="ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-[#E8DFD0] p-12 text-center">
                    <MapPin size={32} className="text-[#1A1A1A]/20 mx-auto mb-4" />
                    <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-2">No bookings yet</h3>
                    <p className="font-body text-[#1A1A1A]/60 mb-6">
                      Start your African adventure by booking a destination today!
                    </p>
                    <Link href="/destinations">
                      <Button className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui">
                        Explore Destinations
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

            {/* Saved Trips */}
            {activeTab === "saved" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-2">Saved Trips</h2>
                  <p className="font-body text-[#1A1A1A]/60">Your favorite destinations and itineraries</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedTrips.map((dest) => (
                    <Link key={dest.slug} href={`/destinations/${dest.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl border border-[#E8DFD0] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-1">
                            {dest.name}
                          </h3>
                          <p className="font-ui text-sm text-[#1A1A1A]/60 mb-3">{dest.country}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={i < 4 ? "fill-[#B5622A] text-[#B5622A]" : "text-[#E8DFD0]"}
                                />
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#B5622A]"
                            >
                              <Heart size={14} className="fill-current" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* My Profile */}
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-2">My Profile</h2>
                  <p className="font-body text-[#1A1A1A]/60">Manage your personal information</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                        First Name
                      </Label>
                      <Input
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="font-ui text-sm border-[#E8DFD0]"
                      />
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                        Last Name
                      </Label>
                      <Input
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="font-ui text-sm border-[#E8DFD0]"
                      />
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={profile.email}
                        disabled
                        className="font-ui text-sm border-[#E8DFD0] bg-[#F5F5F5]"
                      />
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                        Phone
                      </Label>
                      <Input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="font-ui text-sm border-[#E8DFD0]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#E8DFD0]">
                    <Button className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui">
                      <Edit3 size={14} className="mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Invoices */}
            {activeTab === "invoices" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-2">Invoices</h2>
                  <p className="font-body text-[#1A1A1A]/60">Download your booking invoices and receipts</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8DFD0] p-12 text-center">
                  <FileText size={32} className="text-[#1A1A1A]/20 mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-[#1A1A1A] mb-2">No invoices yet</h3>
                  <p className="font-body text-[#1A1A1A]/60">
                    Your invoices will appear here once you complete a booking.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-2">Settings</h2>
                  <p className="font-body text-[#1A1A1A]/60">Manage your account preferences</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
                    <div>
                      <h3 className="font-ui font-semibold text-[#1A1A1A]">Email Notifications</h3>
                      <p className="font-ui text-xs text-[#1A1A1A]/60">Receive updates about your bookings</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
                    <div>
                      <h3 className="font-ui font-semibold text-[#1A1A1A]">Marketing Emails</h3>
                      <p className="font-ui text-xs text-[#1A1A1A]/60">Special offers and new destinations</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-ui font-semibold text-[#1A1A1A]">Two-Factor Authentication</h3>
                      <p className="font-ui text-xs text-[#1A1A1A]/60">Enhanced security for your account</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
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
