'use client';

import { useState } from 'react';
import { login } from './actions';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card border border-charcoal/5 p-8 md:p-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-coral/5 rounded-bl-full -z-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal/5 rounded-tr-full -z-10" />

        <div className="flex justify-center mb-8">
          <Link href="/" className="w-16 h-16 rounded-2xl bg-charcoal flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
            <span className="text-white font-black text-3xl">V</span>
          </Link>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-heading font-bold text-charcoal mb-2 tracking-tight">Admin Dashboard</h1>
          <p className="text-charcoal/60 text-sm font-medium">Please sign in to manage the platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal/70 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-charcoal/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-sand/30 border border-charcoal/10 rounded-xl text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300 font-medium"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal/70 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-charcoal/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-4 py-3.5 bg-sand/30 border border-charcoal/10 rounded-xl text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl border border-red-100 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal hover:bg-charcoal/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-xs font-bold text-charcoal/40 hover:text-charcoal transition-colors uppercase tracking-widest">
            &larr; Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
