<script lang="ts">
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/Sidebar/AppSidebar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="w-full px-4 py-2">
		<Sidebar.Trigger class="mb-2" />
		<ModeWatcher />
		{@render children()}
	</main>
</Sidebar.Provider>
