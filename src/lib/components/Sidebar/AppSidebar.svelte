<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
  import SidebarFooter from '$lib/components/Sidebar/SidebarFooter.svelte';
	import House from 'lucide-svelte/icons/house';
  import BookUser from 'lucide-svelte/icons/book-user';
  import Zap from 'lucide-svelte/icons/zap';
  import { auth } from '$lib/state/auth.svelte';
  import { page } from '$app/stores';

	let items = [
		{ name: 'Home', href: '/', icon: House },
	];

  let authItems = [
    { name: 'Dashboard', href: '/dashboard', icon: House },
    { name: 'Promotions', href: '/promotions', icon: Zap },
    { name: 'Customers', href: '/customers', icon: BookUser },
  ]


  const isAuthenticated = $derived(!!auth.getUser());
  let itemsToShow = $derived(isAuthenticated ? authItems : items);
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
