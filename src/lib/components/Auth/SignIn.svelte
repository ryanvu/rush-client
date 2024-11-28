<script lang="ts">
  import { goto } from '$app/navigation';
  import { auth } from '$lib/state/auth.svelte'

  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  
  let email = $state('');
  let password = $state('');
  let loading = $state(false)
  let error: string | null = $state(null)
  
  $effect(() => {
    if (auth.getUser()) {
      goto('/dashboard');
    }
  });
  
  async function handleSubmit() {
    loading = true
    error = null
    
    try {
      await auth.signIn(email, password)
      // The navigation will be handled by the effect above
    } catch (e) {
      error = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading = false
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Log in</CardTitle>
      <CardDescription>
        Enter your email and password below to log in
      </CardDescription>
    </CardHeader>

    <CardContent>
      <form onsubmit={handleSubmit} class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            bind:value={email}
            required
            disabled={loading}
          />
        </div>

        <div class="space-y-2">
          <label for="password">Password</label>
          <Input
            id="password"
            type="password"
            bind:value={password}
            required
            disabled={loading}
          />
        </div>

        {#if error}
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        {/if}

        <Button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </Button>
      </form>
    </CardContent>

    <CardFooter class="flex flex-col space-y-4">
      <div class="text-sm text-center text-muted-foreground">
        Don't have an account?
        <a href="/register" class="text-primary hover:underline">Sign Up</a>
      </div>
    </CardFooter>
  </Card>
</div>
