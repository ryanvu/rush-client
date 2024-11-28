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

