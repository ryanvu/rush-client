import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  if (!locals.safeGetSession) {
    // Provide a fallback or throw an error
    return {
      session: null,
      user: null,
      cookies: cookies.getAll()
    }
  }

  try {
    const { session, user } = await locals.safeGetSession();
    return {
      session,
      user,
      cookies: cookies.getAll(),
    }
  } catch (error) {
    console.error('Error in layout load:', error);
    return {
      session: null,
      user: null,
      cookies: cookies.getAll()
    }
  }
}
