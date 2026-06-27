'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollIndicator from '@/components/ScrollIndicator';

const stats = [
  { value: '150+', label: 'Properties' },
  { value: '25+', label: 'Agents' },
  { value: '12', label: 'Years Experience' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Home"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto text-center px-6"
      >
        <motion.span
          variants={item}
          className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 mb-6"
        >
          Premium Real Estate
        </motion.span>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white leading-[0.9] tracking-tight mb-6"
        >
          Luxury Homes
          <br />
          <span className="text-white/80">for Modern Living</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl mx-auto text-base sm:text-lg text-white/60 font-medium leading-relaxed mb-10"
        >
          Discover carefully curated homes designed for comfort, architecture, and lifestyle.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/properties">
            <Button variant="primary" size="xl" className="text-base gap-2">
              Browse Properties
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="secondary" size="xl" className="text-base border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40">
              Contact Us
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-white/50 font-medium">
            Trusted by hundreds of homeowners
          </p>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center gap-8 md:gap-16"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/40 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
