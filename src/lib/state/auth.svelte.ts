import { goto } from '$app/navigation';
import { browser } from '$app/environment';
import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabase';

class Auth {
  private user = $state<User | null>(null);

  constructor() {
    if (browser) {
      // Initialize store with session if available (client-side only)
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          this.user = session.user;
        }
      });

      // Listen for auth changes (client-side only)
      supabase.auth.onAuthStateChange((_event, session) => {
        console.log('Auth state changed:', session); // Debug log
        this.user = session?.user ?? null;
      });
    }
  }

  getUser() {
    return this.user;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    this.user = data.user;
    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    if (data.session?.user) {
      this.user = data.session.user;
    }
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    this.user = null;
    await goto('/');
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  async refreshSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      this.user = session.user;
    }
    return session;
  }
}

// Export a singleton instance
export const auth = new Auth();
