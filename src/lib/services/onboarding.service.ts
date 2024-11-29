import { createBrowserClient } from '@supabase/ssr';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export type OnboardingStep = {
  id: string;
  completed: boolean;
}

export type OnboardingResponse = {
  user_id: string;
  steps: OnboardingStep[];
  current_step: number;
  is_complete: boolean;
};

// Create a function to get an authenticated fetch wrapper
async function getAuthenticatedFetch() {
  const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('No valid session');
  }

  return async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };
}

export async function getUserOnboarding(): Promise<OnboardingResponse> {
  try {
    const fetchWithAuth = await getAuthenticatedFetch();
    return await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/onboarding/progress`);
  } catch (error) {
    console.error('Error getting user onboarding data:', error);
    throw error;
  }
}
