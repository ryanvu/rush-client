import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'supabase.auth',
    storage: browser ? window.localStorage : undefined,
    detectSessionInUrl: true,
  }
});

function createAuthStore() {
  const { subscribe, set } = writable<User | null>(null);

  if (browser) {
    // Initialize store with session if available (client-side only)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        set(session.user);
      }
    });

    // Listen for auth changes (client-side only)
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session); // Debug log
      set(session?.user ?? null);
    });
  }

  return {
    subscribe,
    set,
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      set(data.user)
      return data
    },
    signUp: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      if (data.session?.user) {
        set(data.session.user)
      }
      return data
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set(null)
      await goto('/')
    },
    resetPassword: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
    },
    // Add method to refresh session
    refreshSession: async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        set(session.user)
      }
      return session
    }
  }
}

export const auth = createAuthStore();
