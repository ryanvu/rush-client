<script lang="ts">
	import UserProfile from "$lib/components/UserProfile/UserProfile.svelte";
  import type { PageData } from "./$types.js";

  let { data } = $props();
  const { profile }: PageData = data;
</script>

<UserProfile {profile} form={data.form} />
