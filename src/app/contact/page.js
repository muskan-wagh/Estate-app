"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import SectionReveal from "@/components/SectionReveal";
import posthog from "posthog-js";

const contactDetails = [
  { icon: MapPin, label: "Office Address", value: "Indore" },
  { icon: Mail, label: "Email", value: "hello@estate.com" },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat, 9:00 AM – 7:00 PM",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    posthog.capture("contact_form_submitted");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar lightHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/85 to-secondary/95" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight mb-6">
              Let&apos;s Start a Conversation
            </h1>
            <p className="max-w-xl mx-auto text-white/50 text-sm leading-relaxed">
              Whether you are looking to buy, sell, or just explore, our team is
              here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Image */}
            <SectionReveal>
              <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                  alt="Modern architectural building"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 space-y-4 shadow-xl">
                    {contactDetails.map((detail) => {
                      const Icon = detail.icon;
                      return (
                        <div
                          key={detail.label}
                          className="flex items-start gap-4"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                              {detail.label}
                            </p>
                            <p className="text-sm font-medium text-secondary">
                              {detail.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Right: Form */}
            <SectionReveal delay={0.2}>
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                    Send a Message
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-secondary tracking-tight">
                    We&apos;d Love to Hear from You
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Fill out the form below and our team will get back to you
                    within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Full Name" type="text" required />
                    <Input label="Email Address" type="email" required />
                  </div>
                  <Input label="Phone Number" type="tel" />
                  <Input label="Subject" type="text" />
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Your Message"
                      className="peer w-full rounded-xl border-2 border-border bg-card px-4 pt-6 pb-3 text-sm font-medium text-card-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-0 placeholder-transparent resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-5 text-sm font-medium text-muted-foreground transition-all duration-200 pointer-events-none peer-focus:top-3 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-primary"
                    >
                      Your Message
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="xl"
                    className="w-full gap-2 text-base"
                    disabled={submitted}
                  >
                    {submitted ? (
                      <>
                        <CheckCircle size={18} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="rounded-3xl overflow-hidden shadow-xl border border-border grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src="/map-placeholder.png"
                alt="Location Map"
                className="w-full aspect-video object-cover"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
