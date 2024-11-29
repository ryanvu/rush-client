import { browser } from '$app/environment';
import type { User, AuthError, Session } from '@supabase/supabase-js';
import { goto, invalidate } from '$app/navigation';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createBrowserClient } from '@supabase/ssr';
import { page } from '$app/stores';

class Auth {
	// Track both user and session state for more complete auth info
	private user = $state<User | null>(null);
	private session = $state<Session | null>(null);

	// Supabase client is only created on the browser
	private supabase = browser
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
		: null;

	constructor() {
		if (browser) {
			// Initialize with the session from SSR
			page.subscribe(({ data }) => {
				if (data?.session) {
					this.session = data.session;
					this.user = data.session.user;
				}
			});

			// Keep in sync with Supabase auth changes
			this.supabase?.auth.onAuthStateChange(async (event, session) => {
				console.log('Auth state changed:', event);
				this.session = session;
				this.user = session?.user ?? null;

				// Handle specific auth events
				switch (event) {
					case 'SIGNED_OUT':
						await this.handleSignOut();
						break;
					case 'USER_UPDATED':
					case 'SIGNED_IN':
						await invalidate('supabase:auth');
						break;
				}
			});
		}
	}

	// Enhanced getters for auth state
	getUser() {
		return this.user;
	}

	getSession() {
		return this.session;
	}

	isAuthenticated() {
		return !!this.session && !!this.user;
	}

	private throwIfNoClient() {
		if (!this.supabase) {
			throw new Error('Auth operations are only available in the browser');
		}
	}

  private async handleSignOut() {
    try {
      // First invalidate and clear state
      await invalidate('supabase:auth');
      this.user = null;
      this.session = null;
      
      // Force redirect with a small delay to ensure state is cleared
      setTimeout(() => {
        goto('/login', { replaceState: true });
      }, 0);
    } catch (error) {
      console.error('Error in handleSignOut:', error);
    }
  }

	async signUp(email: string, password: string) {
		this.throwIfNoClient();

		try {
			const { data, error } = await this.supabase?.auth.signUp({
				email,
				password
			});

			if (error) throw error;
			await invalidate('supabase:auth');

			return data;
		} catch (error) {
			const authError = error as AuthError;
			throw new Error(authError.message);
		}
	}

	async signOut() {
		this.throwIfNoClient();

		try {
			const { error } = await this.supabase?.auth.signOut();
			if (error) throw error;
			await this.handleSignOut();
		} catch (error) {
			console.error('Error signing out:', error);
			throw error;
		}
	}

	async resetPassword(email: string) {
		this.throwIfNoClient();

		try {
			const { error } = await this.supabase?.auth.resetPasswordForEmail(email);
			if (error) throw error;
		} catch (error) {
			const authError = error as AuthError;
			throw new Error(authError.message);
		}
	}
}

export const auth = new Auth();
