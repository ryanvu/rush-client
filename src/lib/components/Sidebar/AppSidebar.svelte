<script lang="ts">
  import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import SidebarFooter from '$lib/components/Sidebar/SidebarFooter.svelte';
  import House from 'lucide-svelte/icons/house';
  import BookUser from 'lucide-svelte/icons/book-user';
  import Zap from 'lucide-svelte/icons/zap';
  import { page } from '$app/stores';

  // Get the session from the parent layout data
  const { data } = $props();
  
  const items = [
    { name: 'Home', href: '/', icon: House },
  ];

  const authItems = [
    { name: 'Dashboard', href: '/dashboard', icon: House },
    { name: 'Promotions', href: '/promotions', icon: Zap },
    { name: 'Customers', href: '/customers', icon: BookUser },
  ];

  let itemsToShow = $derived(data.session ? authItems : items);
  let currentPath = $derived($page.url.pathname);
</script>

<Sidebar.Root collapsible="icon">
  <Sidebar.Header>
    Rush
  </Sidebar.Header>
  <Sidebar.Separator />
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each itemsToShow as item}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={currentPath === item.href}>
								{#snippet child({ props })}
									<a href={item.href} {...props}>
										<item.icon />
										<span>{item.name}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
  <SidebarFooter />
</Sidebar.Root>
