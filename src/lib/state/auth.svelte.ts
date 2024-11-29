// lib/auth.ts
import { browser } from '$app/environment';
import type { User } from '@supabase/supabase-js';
import { invalidate } from '$app/navigation';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createBrowserClient } from '@supabase/ssr';

class Auth {
  private user = $state<User | null>(null);
  private supabase = browser 
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
    : null;

  constructor() {
    if (browser) {
      // Subscribe to auth state changes
      this.supabase?.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user ?? null;
        // Invalidate all Supabase dependencies to trigger reloads
        invalidate('supabase:auth');
      });
    }
  }

  getUser() {
    return this.user;
  }

  async signIn(email: string, password: string) {
    if (!this.supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  }

  async signUp(email: string, password: string) {
    if (!this.supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });
    if (error) throw error;
    return data;
  }

  async signOut() {
    if (!this.supabase) throw new Error('Supabase client not initialized');
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string) {
    if (!this.supabase) throw new Error('Supabase client not initialized');
    const { error } = await this.supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
}

export const auth = new Auth();
