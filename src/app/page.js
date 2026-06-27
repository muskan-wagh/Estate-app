import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import WhyChooseUs from '@/components/WhyChooseUs';
import OurServices from '@/components/OurServices';
import LuxuryCollections from '@/components/LuxuryCollections';
import Testimonials from '@/components/Testimonials';
import LatestBlogs from '@/components/LatestBlogs';
import CTASection from '@/components/CTASection';

export const revalidate = 600;

export default async function Home({ searchParams }) {
  const { location, type } = await searchParams;

  let propertyQuery = supabase
    .from('properties')
    .select('*, property_images(image_url)')
    .order('created_at', { ascending: false });

  if (location) propertyQuery = propertyQuery.ilike('location', `%${location}%`);
  if (type) propertyQuery = propertyQuery.eq('type', type);

  const { data: properties } = await propertyQuery;

  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <HeroSection />

      <FeaturedProperties properties={properties || []} />

      <WhyChooseUs />

      <OurServices />

      <LuxuryCollections />

      <Testimonials />

      <LatestBlogs blogs={blogs || []} />

      <CTASection />

      <Footer />
    </main>
  );
}
