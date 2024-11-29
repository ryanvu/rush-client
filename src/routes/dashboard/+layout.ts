import type { LayoutLoad } from './$types';
import { getUserOnboarding } from '$lib/services/onboarding.service';

export const load: LayoutLoad = async ({ parent }) => {
  const { session } = await parent();
  
  // Only fetch onboarding data if we have a session
  let onboardingData = null;
  if (session) {
    try {
      onboardingData = await getUserOnboarding();
    } catch (error) {
      console.error('Failed to load onboarding data:', error);
    }
  }

  return {
    user: session?.user ?? null,
    onboardingData
  };
};
