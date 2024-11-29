<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/state/auth.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/components/Auth/schemas/auth.schema';
	import { Loader2 } from 'lucide-svelte';

	const { form: formInit } = $props();

	const form = superForm(formInit, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance, submitting } = form;

	$effect(() => {
		if (auth.getUser()) {
			goto('/dashboard');
		}
	});
</script>

<div class="flex w-1/2 min-h-screen items-center justify-center">
	<Card class="w-full">
		<CardHeader>
			<CardTitle>Log in</CardTitle>
			<CardDescription>Enter your email and password below to log in</CardDescription>
		</CardHeader>

		<CardContent>
			<form method="POST" use:enhance>
				<Form.Field {form} name="email" class="mb-4 space-y-4">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password" class="mb-4 space-y-4">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input type="password" {...props} bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button size="sm" class="w-full" disabled={$submitting}>
					{#if $submitting}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Logging in...
					{:else}
						Login
					{/if}
				</Form.Button>
			</form>
		</CardContent>

		<CardFooter class="flex flex-col space-y-4">
			<div class="text-center text-sm text-muted-foreground">
				Don't have an account?
				<a href="/register" class="text-primary hover:underline">Sign Up</a>
			</div>
		</CardFooter>
	</Card>
</div>
