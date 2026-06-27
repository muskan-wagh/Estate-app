import { createClient, isAdmin as checkAdmin } from '@/lib/supabase-server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plus, Search, ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import BlogSearch from '@/components/BlogSearch';
import { Badge } from '@/components/ui/badge';

export const revalidate = 600;

const categories = [
  'All Categories',
  'Commercial',
  'Agriculture',
  'Government',
  'Plot',
];

export default async function BlogsPage({ searchParams }) {
  const { location, category } = await searchParams;
  const supabase = await createClient();
  const isAdmin = await checkAdmin();

  let query = supabase.from('blogs').select('*').order('created_at', { ascending: false });

  if (!isAdmin) {
    query = query.eq('status', 'published');
  }

  if (location) {
    query = query.ilike('location', `%${location}%`);
  }
  if (category && category !== 'All Categories') {
    query = query.eq('property_type', category);
  }

  const { data: blogs } = await query;
  const blogList = blogs || [];
  const featured = blogList[0];
  const remaining = blogList.slice(1);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar lightHeader />

      <div className="flex-grow pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Journal
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary tracking-tight">
                Insights & Stories
              </h1>
              <p className="text-sm text-muted-foreground max-w-md">
                Discover market trends, architectural inspiration, and expert perspectives on premium real estate.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest hidden md:block">
                {blogList.length} {blogList.length === 1 ? 'Article' : 'Articles'}
              </p>
              {isAdmin && (
                <Link href="/admin/blogs/add">
                  <Badge variant="secondary" className="gap-1.5 px-4 py-2 cursor-pointer hover:opacity-80 transition-opacity">
                    <Plus size={12} />
                    New Article
                  </Badge>
                </Link>
              )}
            </div>
          </div>

          {/* Search + Filters */}
          <BlogSearch />

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {categories.map((cat) => {
              const isActive = cat === 'All Categories'
                ? !category || category === 'All Categories'
                : category === cat;
              return (
                <Link
                  key={cat}
                  href={isActive ? '/blogs' : `/blogs?category=${encodeURIComponent(cat)}${location ? `&location=${encodeURIComponent(location)}` : ''}`}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-border hover:text-secondary'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {blogList.length > 0 ? (
            <>
              {/* Featured Article */}
              {featured && (
                <div className="mb-16 group">
                  <Link href={`/blogs/${featured.id}`} className="block relative overflow-hidden rounded-3xl bg-muted border border-border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
                      <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                        {featured.image_url ? (
                          <img
                            src={featured.image_url}
                            alt={featured.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted">
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="default">
                            {featured.property_type || 'General'}
                          </Badge>
                          <Badge variant="muted" className="gap-1.5">
                            <Calendar size={10} />
                            {new Date(featured.created_at).toLocaleDateString('en-GB')}
                          </Badge>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4 leading-tight group-hover:text-primary transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                          {featured.content || 'Discover insights about premium real estate, market trends, and architectural excellence.'}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock size={12} />
                            5 min read
                          </div>
                          <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary group-hover:gap-3 transition-all">
                            Read Article
                            <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remaining.map((blog) => (
                  <Link key={blog.id} href={`/blogs/${blog.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl bg-muted border border-border aspect-[16/10] mb-5 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-0.5">
                      {blog.status === 'draft' && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge variant="secondary">Draft</Badge>
                        </div>
                      )}
                      {blog.image_url ? (
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 px-1">
                      <div className="flex items-center gap-3">
                        <Badge variant="muted">
                          {blog.property_type || 'General'}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar size={10} />
                          {new Date(blog.created_at).toLocaleDateString('en-GB')}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-secondary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {blog.content || 'Discover insights about premium real estate, market trends, and architectural excellence.'}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                        <Clock size={12} />
                        5 min read
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="py-32 flex flex-col items-center justify-center gap-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-secondary">No articles found</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Try adjusting your search or filters to discover more content.
                </p>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg"
              >
                Reset Filters
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
