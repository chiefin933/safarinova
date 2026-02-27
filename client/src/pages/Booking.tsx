// SafariNova Travels — Booking Page
// Design: Horizon Ivory — multi-step booking form with progress indicator
// Dynamic: Uses tRPC to create real bookings in the database

import { useState } from "react";
import { useParams, useSearch, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronRight, User, Mail, Phone, Calendar,
  Users, CreditCard, Shield, ArrowLeft, MapPin, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations } from "@/lib/data";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const steps = [
  { id: 1, label: "Trip Details" },
  { id: 2, label: "Your Info" },
  { id: 3, label: "Confirmation" },
];

export default function Booking() {
  const { slug } = useParams<{ slug: string }>();
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const tierIndex = parseInt(params.get("tier") || "0");
  const initialGuests = parseInt(params.get("guests") || "2");

  const { user, isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const dest = destinations.find((d) => d.slug === slug);
  const [step, setStep] = useState(1);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    tier: tierIndex,
    guests: initialGuests,
    departureDate: "",
    specialRequests: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    passportNumber: "",
    emergencyName: "",
    emergencyPhone: "",
    agreeTerms: false,
    agreeInsurance: false,
  });

  const createBookingMutation = trpc.bookings.create.useMutation({
    onSuccess: (booking) => {
      setBookingId(booking?.id || null);
      toast.success("Booking confirmed! Check your email for details.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create booking. Please try again.");
      setIsSubmitting(false);
    },
  });

  const update = (field: string, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

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

  const selectedTier = dest.pricingTiers[form.tier];
  const totalPrice = selectedTier.price * form.guests;

  const handleSubmit = async () => {
    if (!form.agreeTerms) {
      toast.error("Please agree to the Terms & Conditions to proceed.");
      return;
    }

    if (!form.departureDate) {
      toast.error("Please select a departure date.");
      return;
    }

    if (!form.firstName || !form.lastName || !form.email) {
      toast.error("Please fill in all required personal information.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createBookingMutation.mutateAsync({
        destinationSlug: dest.slug,
        destinationName: dest.name,
        tripStartDate: new Date(form.departureDate),
        numberOfTravellers: form.guests,
        totalPrice: Math.round(totalPrice * 100), // Convert to cents
        pricingTier: selectedTier.name,
        specialRequests: form.specialRequests,
      });
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  if (bookingId) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <Navbar />
        <div className="container mx-auto px-6 py-32 max-w-2xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-[#1C4A2A] flex items-center justify-center mx-auto mb-8"
          >
            <Check size={36} className="text-white" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="font-display text-5xl font-semibold text-[#1A1A1A] mb-4">Booking Confirmed!</h1>
            <p className="font-body text-[#1A1A1A]/60 leading-relaxed mb-2">
              Thank you, <strong>{form.firstName}</strong>! Your {dest.name} adventure is confirmed.
            </p>
            <p className="font-body text-[#1A1A1A]/60 mb-8">
              A confirmation email has been sent to <strong>{form.email}</strong>. Our team will be in touch within 24 hours with your full travel documents.
            </p>
            <div className="bg-white rounded-2xl border border-[#E8DFD0] p-6 mb-8 text-left">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Booking ID", value: `SN-${bookingId}` },
                  { label: "Destination", value: dest.name },
                  { label: "Package", value: selectedTier.name },
                  { label: "Guests", value: `${form.guests} person${form.guests > 1 ? "s" : ""}` },
                  { label: "Departure", value: new Date(form.departureDate).toLocaleDateString() },
                  { label: "Total Paid", value: `$${totalPrice.toLocaleString()}` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="font-ui text-xs text-[#1A1A1A]/50 uppercase tracking-wider mb-1">{label}</div>
                    <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard">
                <Button className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui">
                  View My Trips
                </Button>
              </Link>
              <Link href="/destinations">
                <Button variant="outline" className="font-ui border-[#1C4A2A] text-[#1C4A2A]">
                  Explore More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <div className="container mx-auto px-6 py-28 max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <Link href={`/destinations/${dest.slug}`}>
            <button className="flex items-center gap-2 font-ui text-sm text-[#1A1A1A]/50 hover:text-[#1C4A2A] transition-colors mb-4">
              <ArrowLeft size={14} /> Back to {dest.name}
            </button>
          </Link>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-[#1A1A1A]">
            Book Your Adventure
          </h1>
          <p className="font-body text-[#1A1A1A]/60 mt-2">{dest.name}, {dest.country}</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-ui text-sm font-semibold transition-all ${
                  step > s.id
                    ? "bg-[#1C4A2A] text-white"
                    : step === s.id
                    ? "bg-[#B5622A] text-white"
                    : "bg-[#E8DFD0] text-[#1A1A1A]/40"
                }`}>
                  {step > s.id ? <Check size={14} /> : s.id}
                </div>
                <span className={`font-ui text-sm hidden sm:block ${
                  step === s.id ? "text-[#1A1A1A] font-medium" : "text-[#1A1A1A]/40"
                }`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-4 transition-all ${step > s.id ? "bg-[#1C4A2A]" : "bg-[#E8DFD0]"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-[#E8DFD0] p-8 space-y-6"
                >
                  <h2 className="font-display text-2xl font-semibold text-[#1A1A1A]">Trip Details</h2>

                  <div>
                    <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-3 block">
                      Select Package
                    </Label>
                    <div className="space-y-3">
                      {dest.pricingTiers.map((tier, i) => (
                        <button
                          key={tier.name}
                          onClick={() => update("tier", i)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            form.tier === i
                              ? "border-[#1C4A2A] bg-[#1C4A2A]/5"
                              : "border-[#E8DFD0] hover:border-[#1C4A2A]/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{tier.name}</div>
                              <div className="font-ui text-xs text-[#1A1A1A]/50">{tier.description}</div>
                            </div>
                            <div className="font-display text-xl font-semibold text-[#1C4A2A]">
                              ${tier.price.toLocaleString()}<span className="font-ui text-xs text-[#1A1A1A]/40">/pp</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                        Number of Guests
                      </Label>
                      <Select value={String(form.guests)} onValueChange={(v) => update("guests", parseInt(v))}>
                        <SelectTrigger className="font-ui text-sm border-[#E8DFD0] h-11">
                          <Users size={14} className="mr-2 text-[#1A1A1A]/40" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                            <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "Person" : "People"}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                        Departure Date
                      </Label>
                      <Input
                        type="date"
                        value={form.departureDate}
                        onChange={(e) => update("departureDate", e.target.value)}
                        className="font-ui text-sm border-[#E8DFD0] h-11"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                      Special Requests (Optional)
                    </Label>
                    <Textarea
                      value={form.specialRequests}
                      onChange={(e) => update("specialRequests", e.target.value)}
                      placeholder="Dietary requirements, accessibility needs, etc."
                      className="font-ui text-sm border-[#E8DFD0] min-h-24 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      onClick={() => setStep(2)}
                      className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui"
                    >
                      Continue <ChevronRight size={14} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-[#E8DFD0] p-8 space-y-6"
                >
                  <h2 className="font-display text-2xl font-semibold text-[#1A1A1A]">Your Information</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                        First Name *
                      </Label>
                      <Input
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        className="font-ui text-sm border-[#E8DFD0] h-11"
                      />
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                        Last Name *
                      </Label>
                      <Input
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        className="font-ui text-sm border-[#E8DFD0] h-11"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="font-ui text-sm border-[#E8DFD0] h-11"
                    />
                  </div>

                  <div>
                    <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">
                      Phone
                    </Label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="font-ui text-sm border-[#E8DFD0] h-11"
                    />
                  </div>

                  <div className="flex justify-between gap-3 pt-4">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="font-ui border-[#1C4A2A] text-[#1C4A2A]"
                    >
                      <ArrowLeft size={14} className="mr-2" /> Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui"
                    >
                      Review <ChevronRight size={14} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-[#E8DFD0] p-8 space-y-6"
                >
                  <h2 className="font-display text-2xl font-semibold text-[#1A1A1A]">Confirm & Pay</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
                      <span className="font-ui text-sm text-[#1A1A1A]/60">Package</span>
                      <span className="font-ui font-semibold text-[#1A1A1A]">{selectedTier.name}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
                      <span className="font-ui text-sm text-[#1A1A1A]/60">Guests</span>
                      <span className="font-ui font-semibold text-[#1A1A1A]">{form.guests}</span>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
                      <span className="font-ui text-sm text-[#1A1A1A]/60">Price per person</span>
                      <span className="font-ui font-semibold text-[#1A1A1A]">${selectedTier.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-display text-lg font-semibold text-[#1A1A1A]">Total</span>
                      <span className="font-display text-2xl font-semibold text-[#1C4A2A]">${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreeTerms}
                        onChange={(e) => update("agreeTerms", e.target.checked)}
                        className="mt-1"
                      />
                      <span className="font-ui text-xs text-[#1A1A1A]/60">
                        I agree to the <strong>Terms & Conditions</strong> and <strong>Privacy Policy</strong>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreeInsurance}
                        onChange={(e) => update("agreeInsurance", e.target.checked)}
                        className="mt-1"
                      />
                      <span className="font-ui text-xs text-[#1A1A1A]/60">
                        I would like to add travel insurance (+$199)
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between gap-3 pt-4">
                    <Button
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="font-ui border-[#1C4A2A] text-[#1C4A2A]"
                    >
                      <ArrowLeft size={14} className="mr-2" /> Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || createBookingMutation.isPending}
                      className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui disabled:opacity-50"
                    >
                      {isSubmitting || createBookingMutation.isPending ? (
                        <>
                          <Loader2 size={14} className="mr-2 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard size={14} className="mr-2" /> Confirm Booking
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#E8DFD0] p-6 sticky top-28 space-y-6">
              <h3 className="font-display text-lg font-semibold text-[#1A1A1A]">Booking Summary</h3>

              <div className="space-y-4">
                <div>
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <div className="font-ui text-sm font-semibold text-[#1A1A1A]">{dest.name}</div>
                  <div className="font-ui text-xs text-[#1A1A1A]/50">{dest.country}</div>
                </div>

                <div className="space-y-2 border-t border-[#E8DFD0] pt-4">
                  <div className="flex justify-between font-ui text-sm">
                    <span className="text-[#1A1A1A]/60">Package:</span>
                    <span className="font-semibold text-[#1A1A1A]">{selectedTier.name}</span>
                  </div>
                  <div className="flex justify-between font-ui text-sm">
                    <span className="text-[#1A1A1A]/60">Guests:</span>
                    <span className="font-semibold text-[#1A1A1A]">{form.guests}</span>
                  </div>
                  <div className="flex justify-between font-ui text-sm">
                    <span className="text-[#1A1A1A]/60">Price/pp:</span>
                    <span className="font-semibold text-[#1A1A1A]">${selectedTier.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-[#E8DFD0] pt-4">
                  <div className="flex justify-between font-display text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-[#1C4A2A]">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-[#1C4A2A]/5 rounded-lg p-3 border border-[#1C4A2A]/20">
                  <div className="flex gap-2 items-start">
                    <Shield size={14} className="text-[#1C4A2A] mt-0.5 flex-shrink-0" />
                    <div className="font-ui text-xs text-[#1A1A1A]/60">
                      Secure booking. Your payment is protected by industry-leading encryption.
                    </div>
                  </div>
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
