'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Shield,
  Users,
  Banknote,
  Headphones,
  FileCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionReveal from '@/components/SectionReveal';

const features = [
  {
    icon: MapPin,
    title: 'Premium Locations',
    description: 'Hand-picked properties in the most desirable neighborhoods and prime locations.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Shield,
    title: 'Verified Properties',
    description: 'Every listing is thoroughly verified for authenticity, quality, and legal compliance.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Users,
    title: 'Professional Agents',
    description: 'Experienced agents dedicated to finding your perfect property with expert guidance.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Banknote,
    title: 'Transparent Pricing',
    description: 'Clear, upfront pricing with no hidden fees. What you see is what you pay.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Headphones,
    title: 'Personal Consultation',
    description: 'Tailored advice and one-on-one consultation to match your unique requirements.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: FileCheck,
    title: 'Secure Transactions',
    description: 'End-to-end secure transaction processing with full legal documentation support.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16 space-y-3">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
              The Estate Advantage
            </h2>
            <p className="max-w-lg mx-auto text-muted-foreground text-sm leading-relaxed">
              We deliver exceptional real estate experiences through integrity, expertise, and innovation.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={item}>
                <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default h-full">
                  <CardContent className="p-8 space-y-5">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
