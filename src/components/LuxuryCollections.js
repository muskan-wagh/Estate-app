'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import SectionReveal from '@/components/SectionReveal';

const collections = [
  {
    title: 'Luxury Villas',
    subtitle: 'Exclusive estates with breathtaking views',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
    color: 'from-amber-900/40 via-black/30 to-transparent',
    link: '/properties',
  },
  {
    title: 'Modern Penthouses',
    subtitle: 'Skyline living at its finest',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    color: 'from-emerald-900/40 via-black/30 to-transparent',
    link: '/properties',
  },
  {
    title: 'Heritage Estates',
    subtitle: 'Timeless architecture, modern luxury',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
    color: 'from-emerald-900/40 via-black/30 to-transparent',
    link: '/properties',
  },
];

export default function LuxuryCollections() {
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16 space-y-3">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Collections
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
              Curated Collections
            </h2>
            <p className="max-w-lg mx-auto text-muted-foreground text-sm leading-relaxed">
              Explore our hand-picked selection of extraordinary properties.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection, i) => (
            <SectionReveal key={collection.title} delay={i * 0.15}>
              <Link href={collection.link} className="group block relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${collection.color}`} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-white/60" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
                      Featured Collection
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-white/60 mb-5">{collection.subtitle}</p>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white group-hover:gap-3 transition-all">
                    Explore Collection
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
