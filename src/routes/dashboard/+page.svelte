<script lang="ts">
  import Onboarding from '$lib/components/Onboarding/Onboarding.svelte';
  const { data } = $props();
  let user = $state(data.user);
</script>

{#if user}
  <Onboarding initialData={data.onboardingData} />
{/if}
