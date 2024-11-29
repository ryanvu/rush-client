<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import { superForm } from 'sveltekit-superforms';
	import { userProfile } from './state/UserProfile.svelte';
	import { profileUpdateSchema } from './state/UserProfile.schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { profile, form: formInit } = $props();

	let isEditing = $state(true);

	$effect(() => {
		if (profile) {
			userProfile.initializeProfile(profile);
		}
	});

	const form = superForm(formInit, {
		validators: zodClient(profileUpdateSchema),
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="w-full">
	<Card.Content>
		{#if isEditing}
			<form method="POST" use:enhance>
				<Form.Field {form} name="first_name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>First Name</Form.Label>
							<Input {...props} bind:value={$formData.first_name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="last_name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Last Name</Form.Label>
							<Input {...props} bind:value={$formData.last_name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} bind:value={$formData.email} readonly/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="city">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>City</Form.Label>
							<Input {...props} bind:value={$formData.city} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="country">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Country</Form.Label>
							<Input {...props} bind:value={$formData.country} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Button size="sm">Update</Form.Button>
			</form>
		{:else if profile}
			<div>Profile</div>
		{/if}
	</Card.Content>
</Card.Root>
