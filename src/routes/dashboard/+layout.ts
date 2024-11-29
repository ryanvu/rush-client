// routes/dashboard/+layout.ts
import type { LayoutLoad } from './$types';
import { getUserOnboarding } from '$lib/services/onboarding.service';

export const load: LayoutLoad = async ({ parent, fetch }) => {
  const { session } = await parent();
  
  let onboardingData = null;
  if (session) {
    try {
      onboardingData = await getUserOnboarding(fetch, session);
    } catch (error) {
      console.error('Failed to load onboarding data:', error);
    }
  }

  return {
    user: session?.user ?? null,
    onboardingData
  };
};
