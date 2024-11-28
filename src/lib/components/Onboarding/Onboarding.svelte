<script lang="ts">
	import * as Card from '$lib/components/ui/card';
  import * as Collapsible from '$lib/components/ui/collapsible';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import { auth } from '$lib/supabase';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import {
		getUserOnboarding,
		type OnboardingStep,
		type OnboardingResponse
	} from '$lib/services/onboarding.service';
	import { UserRoundPen, Building2, Gift, ChevronDown } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
	import { slide } from 'svelte/transition';

	const stepInfo = [
		{ id: 'profile', icon: UserRoundPen, title: 'Profile', description: 'Complete your profile', href: '/settings' },
		{ id: 'business', icon: Building2, title: 'Business', description: 'Set up your business', href: '/settings/business' },
		{
			id: 'first_promotion',
			icon: Gift,
			title: 'First Promotion',
			description: 'Create your first promotion!',
      href: '/promotions/new'
		}
	];

	const ICON_STATES = {
		completed: 'w-4 h-4 text-green-500',
		current: 'w-6 h-6 text-primary animate-pulse',
		incomplete: 'w-4 h-4 text-gray-400'
	} as const;

	// State management using runes
	let loading = $state<boolean>(false);
	let error = $state<string | null>(null);
	let onboardingData = $state<OnboardingResponse | null>(null);

	// Fetch data when auth changes
	$effect(() => {
		if (!$auth?.id) return;
		getUserOnboarding()
			.then((result) => (onboardingData = result))
			.catch((error) => console.error(error))
			.finally(() => (loading = false));
		$inspect(onboardingData);
	});

	let value = $derived.by(() => {
		if (loading || !onboardingData) return null; // Return null or a default value while loading

		const totalSteps = onboardingData.steps.length;
		const completedSteps = onboardingData.steps.filter(
			(step: OnboardingStep) => step.completed
		).length;
		return (completedSteps / totalSteps) * 100;
	});

	let onboardingSteps = $derived.by(() => {
		if (loading || !onboardingData) return [];

		const processedSteps = onboardingData.steps.map((step: OnboardingStep, index: number) => {
			const info = stepInfo.find((info) => info.id === step.id);
			const isCurrentStep = onboardingData?.current_step === index + 1;
			return {
				...step,
				...info,
				isCurrentStep
			};
		});

		return processedSteps;
	});

  let isOpen = $state<boolean>(true);
</script>

<Card.Root class="w-full">
	<Card.Header class="cursor-pointer" onclick={() => isOpen = !isOpen}>
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-2 mb-2">
        <Card.Title>Getting Started</Card.Title>
        <Card.Description>Just a few steps to get your promotions up and running</Card.Description>
      </div>
      <ChevronDown 
        class={`h-4 w-4 transition-transform duration-200 ${isOpen && 'rotate-180'}`} 
      />
    </div>
		<Progress {value} />
	</Card.Header>
  <Collapsible.Root open={isOpen} class={`${!isOpen && 'mb-4'}`}>
    {#if isOpen}
      <div transition:slide={{ duration: 200 }}>
        <Card.Content>
          {#if loading}
            <div class="flex justify-center px-4">
              Loading...
              <!-- Or use a spinner component -->
            </div>
          {:else if error}
            <Alert variant="destructive">
              <CircleAlert class="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          {:else if onboardingData}
            <div class="flex flex-col gap-4">
              {#each onboardingSteps as step}
                <div class="flex items-center gap-2">
                  <div class="w-8">
                    <step.icon
                      class={`${
                        step.completed
                        ? ICON_STATES.completed
                        : step.isCurrentStep
                        ? ICON_STATES.current
                        : ICON_STATES.incomplete
                        }`}
                    />
                  </div>
                  <div class="flex flex-col">
                    <p class="text-lg font-semibold">
                      {step.title}
                    </p>
                    <span class="text-sm text-muted-foreground">{step.description}</span>
                  </div>
                  {#if !step.completed}
                    {#if step.isCurrentStep}
                      <Button 
                        href={step.href} 
                        class="ml-auto"
                      >
                        Start
                      </Button>
                    {:else}
                      <Button class="ml-auto" disabled>Start</Button>
                    {/if}
                  {/if}
                </div>
              {/each}
            </div>
          {:else}
            <div class="p-4">No onboarding data available</div>
          {/if}
        </Card.Content>
      </div>
    {/if}
  </Collapsible.Root>
</Card.Root>
