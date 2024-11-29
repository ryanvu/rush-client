<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerSchema } from '$lib/components/Auth/schemas/auth.schema';
	import { Loader2 } from 'lucide-svelte';

	const { form: formInit } = $props();

	const form = superForm(formInit, {
		validators: zodClient(registerSchema)
	});

	const { form: formData, enhance, submitting } = form;
</script>

<div class="flex w-1/2 min-h-screen items-center justify-center">
	<Card class="w-full">
		<CardHeader>
			<CardTitle>Create an account</CardTitle>
			<CardDescription>Enter your email below to create your account</CardDescription>
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

				<Form.Field {form} name="confirmPassword" class="mb-4 space-y-4">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input type="password" {...props} bind:value={$formData.confirmPassword} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button size="sm" class="w-full" disabled={$submitting}>
					{#if $submitting}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Signing up...
					{:else}
						Sign up
					{/if}
				</Form.Button>
			</form>
		</CardContent>

		<CardFooter class="flex flex-col space-y-4">
			<div class="text-center text-sm text-muted-foreground">
				Already have an account?
				<a href="/login" class="text-primary hover:underline">Sign in</a>
			</div>
		</CardFooter>
	</Card>
</div>
