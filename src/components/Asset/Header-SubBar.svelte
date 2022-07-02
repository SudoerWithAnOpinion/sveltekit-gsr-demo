<script lang="ts">
    import { page, session } from '$app/stores';
</script>

<div>
    <nav class="font-[Omnes] bg-atento-primary-blue border-gray-200 px-1 py-1 my-1 rounded">
        <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"></div>
        <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-2">
				<ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
					{#if $session.user_id ?? null !== null }
						<li class:active={$page.url.pathname.startsWith('/assets') }>
							<a sveltekit:prefetch href="/assets" class="block text-atento-secondary-grey-2 py-2 pr-4 pl-3">
								<i class="fa-duotone fa-fw fa-list mx-1"></i> Assets
							</a>
						</li>
						<li class:active={$page.url.pathname.startsWith('/assets/shipping')}>
							<a sveltekit:prefetch href="/assets/shipping" class="block text-atento-secondary-grey-2 py-2 pr-4 pl-3">
								<i class="fa-duotone fa-fw fa-box-taped mx-1"></i> Shipping
							</a>
						</li>
						<li class:active={$page.url.pathname.startsWith('/assets/maintenance')}>
							<a sveltekit:prefetch href="/employees" class="block text-atento-secondary-grey-2 py-2 pr-4 pl-3">
								<i class="fa-duotone fa-fw fa-screwdriver-wrench mx-1"></i> Maintenance & Repairs
							</a>
						</li>
					{/if}
				</ul>
			</div>
    </nav>
</div>

<style>
    li.active a {
		color: var(--atento-secondary-blue-2);
	}
	a:hover {
		color: var(--atento-primary-orange);
	}
</style>