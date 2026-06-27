'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    rating: 5,
    text: 'Estate made our dream home a reality. Their team guided us through every step with professionalism and care. The property exceeded our expectations.',
  },
  {
    name: 'Michael Chen',
    role: 'Investor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
    rating: 5,
    text: 'As a real estate investor, I appreciate the transparency and market expertise Estate provides. They helped me build a portfolio of premium properties.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'First-time Buyer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
    rating: 5,
    text: 'Buying my first home was daunting, but Estate made it effortless. Their team was patient, knowledgeable, and genuinely cared about finding the right fit.',
  },
  {
    name: 'James Wilson',
    role: 'Property Seller',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    rating: 4,
    text: 'Estate sold my property in record time at a great price. Their marketing approach and network of buyers is truly impressive in the luxury segment.',
  },
  {
    name: 'Priya Patel',
    role: 'Luxury Buyer',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1887&auto=format&fit=crop',
    rating: 5,
    text: 'The level of service and attention to detail was extraordinary. Estate connected us with a stunning penthouse that perfectly matches our lifestyle.',
  },
  {
    name: 'David Thompson',
    role: 'Real Estate Agent',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
    rating: 5,
    text: 'Partnering with Estate has been a game-changer. Their platform and network provide unmatched exposure for my luxury property listings.',
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  const containerRef = useRef(null);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <SectionReveal>
          <div className="text-center space-y-3">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
              What Our Clients Say
            </h2>
            <p className="max-w-lg mx-auto text-muted-foreground text-sm leading-relaxed">
              Real stories from real clients who trusted us with their property journey.
            </p>
          </div>
        </SectionReveal>
      </div>

      <div
        ref={containerRef}
        className="relative"
      >
        <motion.div
          className="flex gap-6 px-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.1}
          whileTap={{ cursor: 'grabbing' }}
          animate={{
            x: [0, -((testimonials.length * 380) + testimonials.length * 24)],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            },
          }}
          onHoverStart={() => {
            const el = document.querySelector('.testimonial-track');
            if (el) el.style.animationPlayState = 'paused';
          }}
          onHoverEnd={() => {
            const el = document.querySelector('.testimonial-track');
            if (el) el.style.animationPlayState = 'running';
          }}
        >
          {duplicatedTestimonials.map((testimonial, i) => (
            <div
              key={`${testimonial.name}-${i}`}
              className="testimonial-card flex-shrink-0 w-[350px]"
            >
              <div className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Quote size={24} className="text-primary/20 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={j < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-secondary">{testimonial.name}</p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
