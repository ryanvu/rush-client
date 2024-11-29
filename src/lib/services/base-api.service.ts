const API_URL = import.meta.env.VITE_API_URL;
import { browser } from '$app/environment';
import { supabase } from '$lib/supabase';

export async function fetchWithAuth(endpoint: string, serverToken?: string, options: RequestInit = {}) {
  let accessToken;
  
  if (browser) {
    const session = await supabase.auth.getSession();
    accessToken = session.data?.session?.access_token;
  } else {
    // Use supabaseServer for server-side requests
    accessToken = serverToken;
  }

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}
