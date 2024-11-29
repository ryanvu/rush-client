<script lang="ts">
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/Sidebar/AppSidebar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { browser } from '$app/environment';
	let { children, data } = $props();
</script>

{#if browser}
  <ModeWatcher />
{/if}
<Sidebar.Provider>
	<AppSidebar {data} />
	<main class="w-full px-4 py-2">
		<Sidebar.Trigger class="mb-2" />
		{@render children()}
	</main>
</Sidebar.Provider>
