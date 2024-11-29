import { z } from 'zod';

export const profileSchema = z.object({
	user_id: z.string().uuid(),
	first_name: z.string().min(2).max(50).nullable(),
	last_name: z.string().min(2).max(50).nullable(),
	email: z.string().email(),
	city: z.string().min(2).max(100).optional().nullable(),
	country: z.string().min(2).max(100).optional().nullable(),
	avatar_url: z.string().url().optional()
});

export type ProfileSchema = typeof profileSchema;

// For updates
export const profileUpdateSchema = profileSchema.omit({ user_id: true });
export type ProfileUpdateSchema = typeof profileUpdateSchema;
