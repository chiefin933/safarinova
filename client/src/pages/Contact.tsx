// SafariNova Travels — Contact Page
// Design: Horizon Ivory — split layout with contact form and office details

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Message sent! We'll respond within 24 hours.");
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#1C4A2A] pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#B5622A]" />
            <span className="font-ui text-xs uppercase tracking-[0.25em] text-[#B5622A]">Get In Touch</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white mb-4">Contact Us</h1>
          <p className="font-body text-white/70 max-w-xl leading-relaxed">
            Whether you're ready to book, have a question, or simply want to dream about your next adventure — our team in Nairobi is here for you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[#1A1A1A] mb-6">Our Offices</h2>
              <div className="space-y-5">
                {[
                  {
                    city: "Nairobi (HQ)",
                    address: "Westlands Business Park, Waiyaki Way, Nairobi, Kenya",
                    phone: "+254 700 SAFARI",
                    email: "info@safarinova.com",
                  },
                  {
                    city: "Arusha",
                    address: "Corridor Area, Arusha, Tanzania",
                    phone: "+255 27 254 8000",
                    email: "arusha@safarinova.com",
                  },
                ].map((office) => (
                  <div key={office.city} className="bg-white rounded-2xl border border-[#E8DFD0] p-6">
                    <h3 className="font-ui text-sm font-semibold text-[#1A1A1A] mb-3">{office.city}</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <MapPin size={14} className="text-[#B5622A] mt-0.5 shrink-0" />
                        <span className="font-ui text-xs text-[#1A1A1A]/60">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={14} className="text-[#B5622A] shrink-0" />
                        <span className="font-ui text-xs text-[#1A1A1A]/60">{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={14} className="text-[#B5622A] shrink-0" />
                        <span className="font-ui text-xs text-[#1A1A1A]/60">{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFD0] p-6">
              <h3 className="font-ui text-sm font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Clock size={14} className="text-[#B5622A]" /> Office Hours
              </h3>
              <div className="space-y-2">
                {[
                  { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM EAT" },
                  { day: "Saturday", hours: "9:00 AM – 4:00 PM EAT" },
                  { day: "Sunday", hours: "Emergency enquiries only" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-ui text-xs text-[#1A1A1A]/60">{day}</span>
                    <span className="font-ui text-xs font-medium text-[#1A1A1A]">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1C4A2A] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle size={18} className="text-[#B5622A]" />
                <h3 className="font-ui text-sm font-semibold text-white">WhatsApp Us</h3>
              </div>
              <p className="font-body text-xs text-white/70 mb-4">For quick questions and real-time support, reach us on WhatsApp.</p>
              <Button
                onClick={() => toast.info("Opening WhatsApp...")}
                className="w-full bg-[#25D366] hover:bg-[#1fb355] text-white border-0 font-ui text-sm"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-[#E8DFD0] p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#1C4A2A] flex items-center justify-center mx-auto mb-6">
                  <Send size={24} className="text-white" />
                </div>
                <h2 className="font-display text-3xl font-semibold text-[#1A1A1A] mb-3">Message Sent!</h2>
                <p className="font-body text-[#1A1A1A]/60 mb-6">
                  Thank you, <strong>{form.name}</strong>! We've received your message and will respond to <strong>{form.email}</strong> within 24 hours.
                </p>
                <Button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E8DFD0] p-8">
                <h2 className="font-display text-2xl font-semibold text-[#1A1A1A] mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Full Name *</Label>
                      <Input
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="John Doe"
                        className="font-ui text-sm border-[#E8DFD0] h-11"
                      />
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Email *</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="john@example.com"
                        className="font-ui text-sm border-[#E8DFD0] h-11"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Phone</Label>
                      <Input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+254 700 000 000"
                        className="font-ui text-sm border-[#E8DFD0] h-11"
                      />
                    </div>
                    <div>
                      <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Subject</Label>
                      <Select value={form.subject} onValueChange={(v) => setForm((p) => ({ ...p, subject: v }))}>
                        <SelectTrigger className="font-ui text-sm border-[#E8DFD0] h-11">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">New Booking Enquiry</SelectItem>
                          <SelectItem value="existing">Existing Booking</SelectItem>
                          <SelectItem value="custom">Custom Safari Request</SelectItem>
                          <SelectItem value="group">Group Travel</SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="font-ui text-xs uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block">Message *</Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us about your dream safari, travel dates, group size, and any special requirements..."
                      className="font-ui text-sm border-[#E8DFD0] resize-none h-36"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#1C4A2A] hover:bg-[#153820] text-white border-0 font-ui h-12"
                  >
                    <Send size={15} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
