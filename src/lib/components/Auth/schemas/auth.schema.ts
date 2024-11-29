import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6)
}).refine((data) => {
  return data.password === data.confirmPassword,
  { message: 'Passwords do not match', path: ['confirmPassword'] }
});

export type LoginSchema = typeof loginSchema;
export type RegisterSchema = typeof registerSchema;

