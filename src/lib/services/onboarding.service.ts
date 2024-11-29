// lib/services/onboarding.service.ts
import type { Session } from '@supabase/supabase-js';

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

// Accept session as a parameter instead of using auth store
export async function getUserOnboarding(fetch: typeof window.fetch, session?: Session | null): Promise<OnboardingResponse> {
  if (!session?.access_token) {
    throw new Error('No valid session');
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/onboarding/progress`, {
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
