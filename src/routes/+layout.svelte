<script lang="ts">
	import '../app.css';
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from '$lib/components/Sidebar/AppSidebar.svelte';
	let { children } = $props();

</script>

<Sidebar.Provider>
  <AppSidebar />
  <main class="w-full py-2 px-4">
     <Sidebar.Trigger class="mb-2" /> 
    {@render children()}
  </main>
 </Sidebar.Provider> 
