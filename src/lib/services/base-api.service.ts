import { browser } from '$app/environment';
import { auth } from '$lib/state/auth.svelte';

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchWithAuth(endpoint: string, serverToken?: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  
  // In the browser, use the auth store's session
  if (browser) {
    const session = auth.getSession();
    if (session?.access_token) {
      headers.set('Authorization', `Bearer ${session.access_token}`);
    }
  } 
  // On server, use the token passed from hooks/server actions
  else if (serverToken) {
    headers.set('Authorization', `Bearer ${serverToken}`);
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
