// lib/server/auth.ts
import { supabaseServer } from './supabase';
import type { RequestEvent } from '@sveltejs/kit';

export async function getServerSession(event: RequestEvent) {
  const token = event.cookies.get('sb-access-token'); // Changed from 'sb-token'
  const refresh = event.cookies.get('sb-refresh-token'); // Add refresh token

  if (!token) {
    console.log('No token found in cookies');
    return null;
  }

  // Set the session manually using the tokens
  try {
    const { data: { session }, error } = await supabaseServer.auth.setSession({
      access_token: token,
      refresh_token: refresh || ''
    });

    if (error) {
      console.error('Error setting session:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error in getServerSession:', error);
    return null;
  }
}
