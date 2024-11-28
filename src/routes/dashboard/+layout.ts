import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { supabase } from '$lib/supabase';

export const load: LayoutLoad = async () => {
  if (browser) {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw redirect(303, '/login');
    }

    // Return the user data for any child routes that need it
    return {
      user: session.user
    };
  }

  // Return nothing on server side render
  return {};
};
