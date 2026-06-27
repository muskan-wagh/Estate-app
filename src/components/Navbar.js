'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Menu, X, LogOut, Home, FileText, Users, Phone, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Blogs', href: '/blogs', icon: FileText },
  { name: 'About Us', href: '/about-us', icon: Users },
  { name: 'Contact', href: '/contact', icon: Phone },
];

const Navbar = ({ lightHeader = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUserAndName = async (sessionUser) => {
      if (!sessionUser) {
        setUser(null);
        setUserName('');
        return;
      }
      setUser(sessionUser);
      const { data: adminData } = await supabase
        .from('admins')
        .select('name')
        .eq('id', sessionUser.id)
        .single();
      if (adminData) {
        setUserName(adminData.name);
      } else {
        const { data: userData } = await supabase
          .from('users')
          .select('name')
          .eq('id', sessionUser.id)
          .single();
        if (userData) setUserName(userData.name);
      }
    };

    const initialize = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        fetchUserAndName(session?.user || null);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Navbar Initialization Error:', error);
        }
      }
    };
    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchUserAndName(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
    setMobileMenuOpen(false);
  };

  const isScrolledOrLight = scrolled || lightHeader;

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.3 },
    }),
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-[100] px-6 transition-all duration-500',
          isScrolledOrLight
            ? 'bg-white/80 backdrop-blur-xl border-b border-border/50 py-3 shadow-sm'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={cn(
                'text-2xl font-serif font-bold tracking-tight transition-colors duration-500',
                isScrolledOrLight ? 'text-secondary' : 'text-white'
              )}
            >
              Estate
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 rounded-lg',
                    isActive
                      ? isScrolledOrLight
                        ? 'text-primary'
                        : 'text-white'
                      : isScrolledOrLight
                        ? 'text-muted-foreground hover:text-secondary hover:bg-muted/50'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className={cn(
                        'absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full',
                        isScrolledOrLight ? 'bg-primary' : 'bg-white'
                      )}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            {user && (
              <Link
                href="/admin"
                className={cn(
                  'relative px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 rounded-lg',
                  pathname.startsWith('/admin')
                    ? isScrolledOrLight
                      ? 'text-primary'
                      : 'text-white'
                    : isScrolledOrLight
                      ? 'text-muted-foreground hover:text-secondary hover:bg-muted/50'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                )}
              >
                <Shield size={14} className="inline mr-1" />
                Admin
                {pathname.startsWith('/admin') && (
                  <motion.div
                    layoutId="nav-underline"
                    className={cn(
                      'absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full',
                      isScrolledOrLight ? 'bg-primary' : 'bg-white'
                    )}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={cn('text-xs font-semibold', isScrolledOrLight ? 'text-secondary' : 'text-white')}>
                    {userName || 'Member'}
                  </p>
                  <p className={cn('text-[10px] text-muted-foreground', isScrolledOrLight ? '' : 'text-white/50')}>
                    {user.email}
                  </p>
                </div>
                <Button
                  variant={isScrolledOrLight ? 'ghost' : 'secondary'}
                  size="sm"
                  onClick={handleLogout}
                  className={cn(!isScrolledOrLight && 'border-white/20 text-white hover:bg-white/10')}
                >
                  <LogOut size={14} />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant={isScrolledOrLight ? 'primary' : 'secondary'} size="md">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              'lg:hidden p-2 rounded-xl transition-colors',
              isScrolledOrLight ? 'text-secondary hover:bg-muted' : 'text-white hover:bg-white/10'
            )}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col h-full pt-28 pb-10 px-8 overflow-y-auto">
              <div className="space-y-1 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-6 pl-4">
                  Navigation
                </p>
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      variants={mobileLinkVariants}
                      custom={i}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-semibold transition-all',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-secondary hover:bg-muted'
                        )}
                      >
                        <Icon size={20} />
                        {link.name}
                        {isActive && <ChevronRight size={16} className="ml-auto text-primary" />}
                      </Link>
                    </motion.div>
                  );
                })}
                {user && (
                  <motion.div
                    variants={mobileLinkVariants}
                    custom={navLinks.length}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-semibold transition-all',
                        pathname.startsWith('/admin')
                          ? 'bg-primary/10 text-primary'
                          : 'text-secondary hover:bg-muted'
                      )}
                    >
                      <Shield size={20} />
                      Admin
                      {pathname.startsWith('/admin') && <ChevronRight size={16} className="ml-auto text-primary" />}
                    </Link>
                  </motion.div>
                )}
              </div>

              <motion.div
                variants={mobileLinkVariants}
                custom={navLinks.length + 2}
                initial="closed"
                animate="open"
                className="border-t border-border pt-6 space-y-6"
              >
                {user ? (
                  <>
                    <div className="px-4">
                      <p className="text-sm font-semibold text-secondary">{userName || 'Member'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-4 text-red-600 hover:bg-red-50 rounded-2xl transition-colors font-medium"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button variant="primary" size="xl" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
