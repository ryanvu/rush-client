import { getServerSession } from '$lib/server/auth';
import { fetchWithAuth } from '$lib/services/base-api.service';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { profileUpdateSchema } from '$lib/components/UserProfile/state/UserProfile.schema';

export const load: PageServerLoad = async ({ parent, event }) => {
  const { session } = await parent();

	try {
		const profile = await fetchWithAuth('/api/user/profile', session?.access_token);
		return {
			profile,
			form: await superValidate(profile, zod(profileUpdateSchema))
		};
	} catch (error) {
		console.error('Error loading profile:', error);
		return {
			profile: null,
			error: 'Failed to load profile'
		};
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
    const { supabase } = locals;
		const formData = await request.formData();

		const form = await superValidate(formData, zod(profileUpdateSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
			const response = await fetchWithAuth(
				`/api/user/profile/${userId}`,
				session?.access_token,
				{
					method: 'PUT',
					body: JSON.stringify(form.data)
				}
			);

			const newForm = await superValidate(response.updatedProfile, zod(profileUpdateSchema));
			return { form: newForm };
		} catch (error) {
			console.error('Update failed:', error);
			return fail(500, { form, error });
		}
	}
};
