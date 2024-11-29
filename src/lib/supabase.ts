// lib/supabase.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { browser } from '$app/environment';
import type { Database } from '../shared/types/database.types';

export const supabase = browser 
  ? createBrowserClient<Database>(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  : createServerClient<Database>(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_ANON_KEY,
      {
        cookies: {
          get: () => '',
          set: () => {},
          remove: () => {}
        }
      }
    );
