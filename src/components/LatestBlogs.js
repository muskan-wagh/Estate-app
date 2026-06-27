import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal';
import { Badge } from '@/components/ui/badge';

export default function LatestBlogs({ blogs = [] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <div className="flex items-end justify-between mb-14">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Journal
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
                Latest Insights
              </h2>
            </div>
            <Link
              href="/blogs"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
            >
              View All
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, i) => (
            <SectionReveal key={blog.id} delay={i * 0.15}>
              <Link href={`/blogs/${blog.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-muted border border-border aspect-[16/10] mb-5 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-0.5">
                  {blog.image_url ? (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                        No Image
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 px-1">
                  <div className="flex items-center gap-3">
                    <Badge variant="muted">
                      {blog.property_type || 'General'}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Calendar size={10} />
                      {new Date(blog.created_at).toLocaleDateString('en-GB')}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Clock size={10} />
                      5 min
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-secondary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {blog.content || 'Discover insights about premium real estate, market trends, and architectural excellence.'}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Read More
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All Articles
              <ArrowRight size={16} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
