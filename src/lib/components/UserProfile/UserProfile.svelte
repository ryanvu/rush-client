<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { userProfile, type Profile } from './state/UserProfile.svelte';

	// Now we can use the reactive properties directly
	const { profile, formData, isLoading, isSubmitting, error, formErrors, hasChanges, isValid } = userProfile;

	$effect(() => {
    if (!profile) {
      userProfile.fetchProfile();
    }

    console.log('profile', profile);
	});

</script>

<Card.Root class="w-full">
  {#if profile}
    <Card.Header>
      <h2>{profile.user_id}</h2>
    </Card.Header>
  {/if}
</Card.Root>
