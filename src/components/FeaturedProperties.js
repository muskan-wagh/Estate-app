import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import SectionReveal from '@/components/SectionReveal';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProperties({ properties = [] }) {
  if (!properties || properties.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="flex items-end justify-between mb-14">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Featured
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
                Premium Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              View All
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property, i) => (
            <SectionReveal key={property.id} delay={i * 0.1}>
              <PropertyCard property={property} />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All Properties
              <ArrowRight size={16} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
