import { fail, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/components/Auth/schemas/login.schema';

export const load: PageServerLoad = async ({ locals: { session } }) => {
  if (session) {
    throw redirect(302, '/dashboard');
  }

  return {
    form: await superValidate(zod(loginSchema))
  };
};

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const form = await superValidate(request, zod(loginSchema));
    
    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password
    });

    if (error) {
      return message(form, error.message, { status: 400 });
    }

    throw redirect(302, '/dashboard');
  }
};
