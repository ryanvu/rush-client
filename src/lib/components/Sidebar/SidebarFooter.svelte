<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import Login from 'lucide-svelte/icons/log-in';
	import Logout from 'lucide-svelte/icons/log-out';
	import Play from 'lucide-svelte/icons/play';
	import Settings from 'lucide-svelte/icons/settings';
	import { auth } from '$lib/supabase';

	const getStartedItems = [
		{ name: 'Sign Up', href: '/register', icon: Play },
		{ name: 'Log In', href: '/login', icon: Login }
	];

	const authItems = [
		{ name: 'Sign Out', href: '/logout', icon: Logout },
		{ name: 'Settings', href: '/settings', icon: Settings }
	];

	let footerTitle = $derived($auth ? $auth.email : 'Get Started');
	const items = $derived($auth ? authItems : getStartedItems);
</script>

<Sidebar.Footer>
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center"
						>
              <Avatar.Root class="h-5 w-5 rounded-full">
                <Avatar.Image src={$auth?.user_metadata?.avatar_url || ''} />
                <Avatar.Fallback class="bg-sidebar-foreground text-sidebar-accent text-sm">{ $auth?.email?.charAt(0).toUpperCase() }</Avatar.Fallback>
              </Avatar.Root>
							<div
								class="flex w-full items-center justify-between group-data-[collapsible=icon]:hidden"
							>
								<span>
									{footerTitle}
								</span>
								<ChevronUp class="ml-auto" />
							</div>
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content side="top" class="w-[--bits-dropdown-menu-anchor-width]">
					{#each items as item}
						<DropdownMenu.Item>
							{#snippet child({ props })}
								{#if item.name === 'Sign Out'}
									<div role="menuitem" tabindex={1} {...props} onclick={() => auth.signOut()}>
										<item.icon />
										<span>{item.name}</span>
									</div>
								{:else}
									<a {...props} href={item.href}>
										<item.icon />
										<span>{item.name}</span>
									</a>
								{/if}
							{/snippet}
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
</Sidebar.Footer>
