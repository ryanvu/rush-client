import { fetchWithAuth } from '$lib/services/base-api.service';
import type { Database } from '../../../../shared/types/database.types';

export type Profile = Database['public']['Tables']['user_profiles']['Row'];

export function createUserProfile() {
  let _profile = $state<Profile | null>(null);

  const store = {
    profile: _profile,

    // Initialize store with server-loaded data
    initializeProfile(serverProfile: Profile) {
      store.profile = serverProfile;
    },

    // For client-side profile updates
    async updateProfile(updates: Partial<Profile>) {
      try {
        const updatedProfile = await fetchWithAuth('/api/user/profile', '', {
          method: 'PUT',
          body: JSON.stringify(updates)
        });
        store.profile = updatedProfile;
        return { success: true };
      } catch (error) {
        console.error('Failed to update profile:', error);
        return { success: false, error };
      }
    }
  };

  return store;
}

export const userProfile = createUserProfile();
