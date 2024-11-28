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

export async function getUserOnboarding(): Promise<OnboardingResponse> {

  try {
    const supabaseSession = JSON.parse(localStorage.getItem('supabase.auth') || '{}');
    const accessToken = supabaseSession?.access_token;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/onboarding/progress`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`, 
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) { // Check if
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting user onboarding data:', error);
    throw error; // Re-throw the error so the component can handle it
  }
}


