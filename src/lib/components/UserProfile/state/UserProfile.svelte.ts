import { fetchWithAuth } from '$lib/services/base-api.service';
import type { Database } from '../../../../shared/types/database.types';

export type Profile = Database['public']['Tables']['user_profiles']['Row'];

export function createUserProfile() {
  // State declarations
  let _profile = $state<Profile | null>(null);
  let _isLoading = $state(false);
  let _error = $state<string | null>(null);
  let _formData = $state<Partial<Profile>>({});
  let _isSubmitting = $state(false);
  let _formErrors = $state<Partial<Record<keyof Profile, string>>>({});

  function validateChanges() {
    if (!_profile || !_formData) return false;
    return Object.keys(_formData).some(
      key => _formData[key as keyof Profile] !== _profile?.[key as keyof Profile]
    );
  }

  const store = {
    // Expose the state directly
    profile: _profile,
    formData: _formData,
    isLoading: _isLoading,
    error: _error,
    isSubmitting: _isSubmitting,
    formErrors: _formErrors,
    get hasChanges() { return validateChanges(); },
    get isValid() { return Object.keys(_formErrors).length === 0; },

    async fetchProfile() {
      store.isLoading = true;
      store.error = null;

      try {
        const data = await fetchWithAuth('/api/user/profile');
        console.log('Setting profile data:', data);
        store.profile = data;
        store.formData = { ...data };
      } catch (e) {
        console.error('Error fetching profile:', e);
        store.error = e.message;
      } finally {
        store.isLoading = false;
      }
    },

    updateField(field: keyof Profile, value: string) {
      store.formData = { ...store.formData, [field]: value };
      validateField(field, value);
    },

    async saveProfile() {
      if (!store.hasChanges || !store.isValid) return;
      
      store.isSubmitting = true;
      store.error = null;

      try {
        const data = await fetchWithAuth('/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(store.formData)
        });
        
        store.profile = data;
        store.formData = { ...data };
      } catch (e) {
        store.error = e.message;
      } finally {
        store.isSubmitting = false;
      }
    },

    reset() {
      if (store.profile) {
        store.formData = { ...store.profile };
        store.formErrors = {};
      }
    }
  };

  function validateField(field: keyof Profile, value: string) {
    const errors = { ...store.formErrors };

    switch (field) {
      case 'email':
        if (!value.includes('@')) {
          errors[field] = 'Invalid email address';
        } else {
          delete errors[field];
        }
        break;
      case 'city':
        if (value.length < 3) {
          errors[field] = 'City must be at least 3 characters';
        } else {
          delete errors[field];
        }
        break;
    }

    store.formErrors = errors;
  }

  return store;
}

export const userProfile = createUserProfile();
