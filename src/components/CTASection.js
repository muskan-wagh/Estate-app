'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
          alt="Luxury living room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/80">
            Get Started
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
            Ready to Find Your
            <br />
            Dream Property?
          </h2>
          <p className="max-w-lg mx-auto text-white/50 text-sm leading-relaxed">
            Let our expert team guide you to the perfect home. Schedule a consultation today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button variant="primary" size="xl" className="text-base gap-2">
                Schedule a Visit
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/properties">
              <Button
                variant="secondary"
                size="xl"
                className="text-base border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40"
              >
                Browse Listings
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
