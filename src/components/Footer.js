"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  Users,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Building2,
  CheckCircle,
  Shield,
  Headphones,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const quickLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Blogs", href: "/blogs", icon: FileText },
  { name: "About Us", href: "/about-us", icon: Users },
  { name: "Contact", href: "/contact", icon: Phone },
];

const services = [
  { name: "Property Sales", icon: Building2 },
  { name: "Property Rentals", icon: Home },
  { name: "Consultation", icon: Headphones },
  { name: "Verified Listings", icon: CheckCircle },
  { name: "Secure Transactions", icon: Shield },
];

const contactInfo = [
  { icon: MapPin, label: "Office", value: "Indore" },
  { icon: Mail, label: "Email", value: "hello@estate.com" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9AM – 7PM" },
];

const SocialIcon = ({ type }) => {
  if (type === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  if (type === "Twitter") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    );
  }
  if (type === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path
          d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="17.5"
          y1="6.5"
          x2="17.51"
          y2="6.5"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }
  if (type === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  return null;
};

const socialLinks = [
  { type: "Facebook", href: "#", label: "Facebook" },
  { type: "Twitter", href: "#", label: "Twitter" },
  { type: "Instagram", href: "#", label: "Instagram" },
  { type: "LinkedIn", href: "#", label: "LinkedIn" },
];

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* Top: Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 p-8 md:p-12 mb-16"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif font-bold">
                Stay Informed
              </h3>
              <p className="text-sm text-white/60 max-w-md">
                Subscribe to receive exclusive property listings and market
                insights.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-3 w-full md:w-auto"
            >
              <div className="flex-1 md:w-64">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                {subscribed ? "Subscribed!" : "Subscribe"}
                <ArrowRight size={16} />
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Middle: 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Brand */}
          <motion.div
            variants={staggerItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <Link
              href="/"
              className="text-2xl font-serif font-bold tracking-tight"
            >
              Estate
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              Curating premium properties and architectural gems for the modern
              visionary. Discover homes designed for comfort, architecture, and
              lifestyle.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 text-white/50 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <SocialIcon type={social.type} />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={staggerItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors group"
                    >
                      <Icon
                        size={14}
                        className="text-white/30 group-hover:text-primary transition-colors"
                      />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={staggerItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-5"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <span className="flex items-center gap-3 text-sm text-white/60">
                      <Icon size={14} className="text-white/30" />
                      {service.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={staggerItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-5"
          >
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Contact
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-3">
                    <Icon size={16} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/40">{item.label}</p>
                      <p className="text-sm text-white/80">{item.value}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
