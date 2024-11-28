const API_URL = import.meta.env.VITE_API_URL;

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
	const supabaseSession = JSON.parse(localStorage.getItem('supabase.auth') || '{}');
	const accessToken = supabaseSession?.access_token;

	const headers = new Headers(options.headers);
	headers.set('Authorization', `Bearer ${accessToken}`);

	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.statusText}`);
	}

	return response.json();
}
