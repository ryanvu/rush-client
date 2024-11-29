import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const { supabase } = locals;
	await supabase.auth.signOut();
	redirect(303, '/login');
};
