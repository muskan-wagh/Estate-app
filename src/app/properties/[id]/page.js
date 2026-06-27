import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import InquiryForm from './InquiryForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function PropertyDetail({ params }) {
  const { id } = await params;

  const { data: property } = await supabase
    .from('properties')
    .select('*, property_images(*), property_videos(*)')
    .eq('id', id)
    .single();

  if (!property) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
        <Navbar lightHeader />
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-serif font-bold text-secondary">Not Found</h1>
          <p className="text-sm text-muted-foreground">
            The property you are looking for might have been sold or removed.
          </p>
          <Link href="/">
            <Button variant="primary" size="md" className="gap-2">
              <ArrowLeft size={16} />
              Back to Listings
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const { title, description, price, location, type, area, bedrooms, bathrooms, status, property_images, property_videos } = property;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar lightHeader />

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 pb-10 border-b border-border mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant={status === 'sold' ? 'secondary' : 'success'}>
                  {status || 'available'}
                </Badge>
                <Badge variant="outline">{type}</Badge>
                <Badge variant="muted" className="gap-1">
                  <MapPin size={10} />
                  {location}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
                {title}
              </h1>
            </div>
            <div className="text-left md:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Price
              </p>
              <p className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                ${price?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Gallery */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[500px]">
              <div className="md:col-span-8 aspect-video md:aspect-auto relative overflow-hidden rounded-2xl bg-muted border border-border shadow-sm group">
                <img
                  src={property_images?.[0]?.image_url || 'https://via.placeholder.com/1200x800'}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-4">
                <div className="relative overflow-hidden rounded-2xl bg-muted border border-border shadow-sm group">
                  <img
                    src={property_images?.[1]?.image_url || property_images?.[0]?.image_url || 'https://via.placeholder.com/600x400'}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="relative overflow-hidden rounded-2xl bg-muted border border-border shadow-sm group">
                  <img
                    src={property_images?.[2]?.image_url || property_images?.[0]?.image_url || 'https://via.placeholder.com/600x400'}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Info + Inquiry */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 space-y-12">
              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-muted border border-border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Maximize2 size={14} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Area</span>
                  </div>
                  <p className="text-xl font-bold text-secondary">{area} <span className="text-xs font-medium text-muted-foreground">sqft</span></p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bed size={14} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Bedrooms</span>
                  </div>
                  <p className="text-xl font-bold text-secondary">{bedrooms}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bath size={14} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Bathrooms</span>
                  </div>
                  <p className="text-xl font-bold text-secondary">{bathrooms}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-[10px] font-semibold uppercase tracking-widest">Status</span>
                  </div>
                  <p className="text-xl font-bold text-success capitalize">{status || 'Available'}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-secondary tracking-tight">Overview</h2>
                <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {description}
                </div>
              </div>

              {/* Video */}
              {property_videos && property_videos.length > 0 && (
                <div className="space-y-6 pt-8 border-t border-border">
                  <h2 className="text-2xl font-serif font-bold text-secondary tracking-tight">Virtual Walkthrough</h2>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-muted border border-border shadow-sm">
                    {property_videos[0].video_url.includes('youtube.com') || property_videos[0].video_url.includes('youtu.be') ? (
                      <iframe
                        className="w-full h-full"
                        src={property_videos[0].video_url.replace('watch?v=', 'embed/')}
                        title="Property Video"
                        allowFullScreen
                      />
                    ) : (
                      <video controls className="w-full h-full object-cover">
                        <source src={property_videos[0].video_url} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Inquiry Form */}
            <aside className="lg:col-span-5">
              <div className="sticky top-32 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-secondary">Interested in this property?</h3>
                    <p className="text-xs text-muted-foreground">
                      Fill in your details and our agent will contact you shortly.
                    </p>
                  </div>
                  <InquiryForm propertyId={id} propertyTitle={title} />
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
