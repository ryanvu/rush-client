// lib/auth.ts
import { browser } from '$app/environment';
import { page } from '$app/stores';
import type { User, Session } from '@supabase/supabase-js';

class Auth {
	private user = $state<User | null>(null);
	private session = $state<Session | null>(null);

	constructor() {
		if (browser) {
			page.subscribe(({ data }) => {
				if (data?.session) {
					this.session = data.session;
					this.user = data.session.user;
				}
			});
		}
	}

	getUser() {
		return this.user;
	}

	getSession() {
		return this.session;
	}

	isAuthenticated() {
		return !!this.session && !!this.user;
	}

}

export const auth = new Auth();
