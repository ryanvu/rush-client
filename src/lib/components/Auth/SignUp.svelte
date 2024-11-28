<script lang="ts">
  import { auth } from '$lib/supabase';
  import { goto } from '$app/navigation';
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Alert, AlertDescription } from "$lib/components/ui/alert";
  
  let email = '';
  let password = '';
  let confirmPassword = '';
  let loading = false;
  let error: string | null = null;
  
  async function handleSubmit() {
    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }
    
    loading = true;
    error = null;
    
    try {
      const { user } = await auth.signUp(email, password);
      
      if (user) {
        // Successful registration, redirect to dashboard
        await goto('/dashboard');
      } else {
        // Some providers might require email verification
        error = 'Please check your email for verification link';
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'An error occurred';
    } finally {
      loading = false;
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Create an account</CardTitle>
      <CardDescription>
        Enter your email below to create your account
      </CardDescription>
    </CardHeader>
    
    <CardContent>
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name$libexample.com"
            bind:value={email}
            required
            disabled={loading}
          />
        </div>
        
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            bind:value={password}
            required
            disabled={loading}
          />
        </div>
        
        <div class="space-y-2">
          <Label for="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            bind:value={confirmPassword}
            required
            disabled={loading}
          />
        </div>
        
        {#if error}
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        {/if}
        
        <Button type="submit" class="w-full" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>
      </form>
    </CardContent>
    
    <CardFooter class="flex flex-col space-y-4">
      <div class="text-sm text-center text-muted-foreground">
        Already have an account?
        <a href="/login" class="text-primary hover:underline">Sign in</a>
      </div>
    </CardFooter>
  </Card>
</div>
