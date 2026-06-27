'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import posthog from 'posthog-js';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      posthog.capture('user_sign_in_failed', { error: error.message });
    } else {
      posthog.identify(data.user.id, { email: data.user.email });
      posthog.capture('user_signed_in', { email: data.user.email });
      router.push('/');
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar lightHeader />
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 space-y-3">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access exclusive listings and insights.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-xs font-medium text-red-600">{error}</p>
                </div>
              )}

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button type="submit" size="xl" className="w-full gap-2" disabled={loading}>
                <LogIn size={16} />
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground mb-3">Don&apos;t have an account?</p>
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => router.push('/signup')}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
