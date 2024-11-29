<script lang="ts">
  import '../app.css';
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import AppSidebar from '$lib/components/Sidebar/AppSidebar.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  
  let { children, data } = $props();
  let { session, supabase } = data;

  $effect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<ModeWatcher />
<Sidebar.Provider>
  <AppSidebar {data} />
  <main class="w-full px-4 py-2">
    <Sidebar.Trigger class="mb-2" />
    {@render children()}
  </main>
</Sidebar.Provider>
