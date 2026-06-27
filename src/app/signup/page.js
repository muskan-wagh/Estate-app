'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import posthog from 'posthog-js';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (role === 'admin') {
        const { data: existingAdmin } = await supabase.from('admins').select('id').limit(1);
        if (existingAdmin && existingAdmin.length > 0) {
          throw new Error('An administrator already exists. You can only register as a User.');
        }
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) throw authError;

      if (authData.user) {
        const table = role === 'admin' ? 'admins' : 'users';
        const { error: insertError } = await supabase.from(table).insert([{
          id: authData.user.id,
          email: email,
          name: name,
        }]);

        if (insertError) {
          if (insertError.message?.includes('bigint')) {
            console.warn('Type mismatch detected');
          } else {
            throw insertError;
          }
        }

        posthog.identify(authData.user.id, { email, name });
        posthog.capture('user_signed_up', { email, name, role });

        alert('Successfully signed up! Please check your email for confirmation.');
        router.push('/login');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar lightHeader />
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-10 space-y-3">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-secondary tracking-tight">
              Join Estate
            </h1>
            <p className="text-sm text-muted-foreground">
              Create your account and explore premium properties.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <form onSubmit={handleSignup} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-xs font-medium text-red-600">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-widest border-2 transition-all ${
                    role === 'user'
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-card text-muted-foreground border-border hover:border-muted-foreground'
                  }`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-widest border-2 transition-all ${
                    role === 'admin'
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-card text-muted-foreground border-border hover:border-muted-foreground'
                  }`}
                >
                  Admin
                </button>
              </div>

              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

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
                <UserPlus size={16} />
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground mb-3">Already have an account?</p>
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
