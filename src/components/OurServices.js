'use client';

import { motion } from 'framer-motion';
import { Building2, Home, Handshake } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SectionReveal from '@/components/SectionReveal';

const services = [
  {
    icon: Building2,
    title: 'Buy Properties',
    description:
      'Explore our curated collection of premium properties for sale. From modern apartments to sprawling estates, find your dream home.',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
    link: '/properties',
  },
  {
    icon: Home,
    title: 'Rent Properties',
    description:
      'Discover flexible rental options in prime locations. Short-term and long-term leases available for homes and commercial spaces.',
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
    link: '/properties',
  },
  {
    icon: Handshake,
    title: 'Sell & Consult',
    description:
      'Get expert guidance on selling your property. Our agents provide market analysis, staging advice, and maximum value negotiation.',
    image:
      'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=2073&auto=format&fit=crop',
    link: '/contact',
  },
];

export default function OurServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="text-center mb-16 space-y-3">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Our Services
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
              Everything You Need
            </h2>
            <p className="max-w-lg mx-auto text-muted-foreground text-sm leading-relaxed">
              Comprehensive real estate services tailored to your unique journey.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <SectionReveal key={service.title} delay={i * 0.15}>
                <div className="group relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-lg font-bold">{service.title}</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-2 mb-4">
                      {service.description}
                    </p>
                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white hover:text-white/80 transition-colors"
                    >
                      Learn More
                      <span className="text-lg leading-none">→</span>
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
