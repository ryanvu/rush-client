<script lang="ts">
  import SignUp from '$lib/components/Auth/SignUp.svelte'
  let { data } = $props();
  let { form } = data;

</script>

<main class="flex flex-col items-center justify-center">
  <SignUp {form} />
</main>
