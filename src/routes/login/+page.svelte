<script lang="ts">
  import SignIn from "$lib/components/Auth/SignIn.svelte";
  const  { data }  = $props();
  const  { form } = data;
</script>

<main class="flex flex-col items-center justify-center">
  <SignIn {form}/>
</main>
