'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, X, Mail, Target, Eye, Heart, Shield, TrendingUp, Handshake, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SectionReveal from '@/components/SectionReveal';
import StatsCounter from '@/components/StatsCounter';
import { cn } from '@/lib/utils';

const coreValues = [
  { icon: Shield, title: 'Integrity', description: 'Uncompromising honesty in every transaction and relationship.' },
  { icon: Sparkles, title: 'Excellence', description: 'Delivering the highest standard of service and quality.' },
  { icon: Heart, title: 'Empathy', description: 'Understanding our clients dreams and aspirations deeply.' },
  { icon: TrendingUp, title: 'Innovation', description: 'Embracing modern solutions for timeless real estate.' },
  { icon: Handshake, title: 'Partnership', description: 'Building lasting relationships beyond transactions.' },
  { icon: Target, title: 'Precision', description: 'Meticulous attention to detail in every aspect.' },
];

const timeline = [
  { year: '2014', title: 'Foundation', description: 'Estate was founded with a vision to transform the real estate experience.' },
  { year: '2016', title: 'First 100 Properties', description: 'Reached a milestone of 100 successful property transactions.' },
  { year: '2018', title: 'Team Expansion', description: 'Grew to 15+ expert agents and opened our flagship office.' },
  { year: '2020', title: 'Digital Innovation', description: 'Launched our digital platform for seamless property discovery.' },
  { year: '2022', title: 'Premium Division', description: 'Established our luxury collections and concierge service.' },
  { year: '2024', title: 'Industry Leader', description: 'Recognized as a top real estate agency with 500+ properties sold.' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const AboutUsPage = () => {
  const [team, setTeam] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '' });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTeamAndStatus = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: adminData } = await supabase.from('admins').select('id').eq('id', session.user.id).single();
        if (adminData) setIsAdmin(true);
      }
      const { data: teamData } = await supabase.from('team').select('*').order('created_at', { ascending: true });
      setTeam(teamData || []);
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Error:', err.message);
      setTeam([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamAndStatus();
  }, [fetchTeamAndStatus]);

  const handleDelete = async (memberId) => {
    if (!window.confirm('Remove this team member?')) return;
    const { error } = await supabase.from('team').delete().eq('id', memberId);
    if (!error) setTeam(prev => prev.filter(m => m.id !== memberId));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let image_url = '';
      if (imageFile) {
        const fileName = `${Math.random()}.${imageFile.name.split('.').pop()}`;
        const filePath = `team/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('properties').upload(filePath, imageFile);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('properties').getPublicUrl(filePath);
        image_url = publicUrl;
      }
      const { data } = await supabase.from('team').insert([{ ...newMember, image_url }]).select();
      if (data?.length > 0) {
        setTeam(prev => [...prev, data[0]]);
        setShowAddForm(false);
        setNewMember({ name: '', role: '' });
        setImageFile(null);
      }
    } catch (error) {
      if (error.name !== 'AbortError') console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar lightHeader />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="About Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary/95" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white tracking-tight mb-6">
              Crafting Premium
              <br />
              Real Estate Experiences
            </h1>
            <p className="max-w-2xl mx-auto text-white/50 text-sm leading-relaxed">
              Since 2014, we have been redefining the standard of excellence in real estate,
              connecting visionary clients with extraordinary properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story + Mission/Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <SectionReveal>
              <div className="space-y-6">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary tracking-tight">
                  A Legacy of Trust & Excellence
                </h2>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    Estate was born from a simple belief: finding the perfect property should be
                    an extraordinary experience. What started as a boutique agency has grown into
                    a trusted name in premium real estate.
                  </p>
                  <p>
                    Over the years, we have helped hundreds of families find their dream homes,
                    guided investors to profitable opportunities, and set new standards for
                    professionalism in the industry.
                  </p>
                  <p>
                    Every property we represent is carefully vetted, every client relationship
                    is built on trust, and every transaction is handled with the utmost care
                    and transparency.
                  </p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Team meeting"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                  <p className="text-3xl font-bold">12+</p>
                  <p className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">
                    Years of Excellence
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionReveal delay={0.1}>
              <Card className="h-full border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
                      <Target size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Our Mission</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    To provide an unparalleled real estate experience through integrity, expertise,
                    and innovative solutions. We are committed to helping our clients find
                    properties that enrich their lives and exceed their expectations.
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <Card className="h-full border-primary/10 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
                      <Eye size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-secondary">Our Vision</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    To be the most trusted and admired real estate brand, known for transforming
                    the way people discover, buy, and sell premium properties. We envision a world
                    where every property transaction is seamless, transparent, and delightful.
                  </p>
                </CardContent>
              </Card>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16 space-y-3">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Core Values
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
                What We Stand For
              </h2>
            </div>
          </SectionReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div key={value.title} variants={staggerItem}>
                  <Card className="h-full group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-8 space-y-4">
                      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-secondary">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <SectionReveal>
              <StatsCounter value="12" label="Years Experience" suffix="+" />
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <StatsCounter value="500" label="Properties Sold" suffix="+" />
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <StatsCounter value="300" label="Happy Clients" suffix="+" />
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <StatsCounter value="15" label="Awards Won" suffix="" />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-16 space-y-3">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
                Company Timeline
              </h2>
            </div>
          </SectionReveal>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <SectionReveal key={item.year} delay={i * 0.1}>
                  <div className="relative pl-20">
                    <div className="absolute left-6 top-1 w-5 h-5 rounded-full bg-primary border-4 border-white shadow-sm" />
                    <div>
                      <span className="inline-block text-xs font-bold text-primary mb-1">{item.year}</span>
                      <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="flex items-end justify-between mb-14">
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                  Team
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
                  Meet Our Experts
                </h2>
              </div>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-2"
                >
                  {showAddForm ? <X size={14} /> : <Plus size={14} />}
                  {showAddForm ? 'Cancel' : 'Add Member'}
                </Button>
              )}
            </div>
          </SectionReveal>

          {showAddForm && (
            <SectionReveal>
              <Card className="mb-16 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-8">
                  <form onSubmit={handleAdd} className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-semibold file:uppercase file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Name
                        </label>
                        <input
                          type="text"
                          value={newMember.name}
                          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                          required
                          className="w-full rounded-xl border-2 border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground focus:border-primary focus:outline-none transition-colors"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Role
                        </label>
                        <input
                          type="text"
                          value={newMember.role}
                          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                          required
                          className="w-full rounded-xl border-2 border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground focus:border-primary focus:outline-none transition-colors"
                          placeholder="Professional Role"
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting ? 'Adding...' : 'Add Team Member'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </SectionReveal>
          )}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.length > 0 ? team.map((member, i) => (
              <motion.div key={member.id || i} variants={staggerItem} className="group relative">
                <div className="relative overflow-hidden rounded-2xl bg-muted border border-border aspect-[3/4] shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-border">
                      <span className="text-4xl font-serif font-bold text-muted-foreground/30">
                        {member.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}

                  {isAdmin && member.id && (
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all duration-300 shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-xs font-medium text-white/60 uppercase tracking-widest mt-1">
                      {member.role}
                    </p>
                    <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a href="#" className="text-white/50 hover:text-white transition-colors">
                        <Globe size={16} />
                      </a>
                      <a href="#" className="text-white/50 hover:text-white transition-colors">
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                <p className="text-sm font-medium">No team members yet.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutUsPage;
