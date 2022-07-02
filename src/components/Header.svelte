<script lang="ts"> // Component Instance
	import { page, session } from '$app/stores';
	import logo from '$lib/img/Atento_Logo_RGB_White.png'
	$: userFullName = $session.employee?.givenName + ' ' + $session.employee?.familyName;
	$: $session.user_id;
</script>
<header>
	<nav class="font-[Omnes] bg-atento-primary-blue border-gray-200 px-2 sm:px-4 py-2.5 rounded-b">
		<div class="container flex flex-wrap justify-between items-center">
			<a href="/" class="flex items-center">
				<img src={logo} alt="Atento" />	
				<span class="self-center text-lg font-semibold whitespace-nowrap">Global Service Delivery</span>
			</a>
			<div class="flex items-center md:order-2 text-white">
				{#if $session.user_id ?? null !== null }
					<i class="fa-duotone fa-fw fa-user-circle text-white"></i> {userFullName}
				{:else}
					<span class:active={$page.url.pathname === '/auth/login'}>
						<a sveltekit:prefetch href="/auth/login" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:p-0">
							<i class="fa-fw fa-solid fa-sign-in-alt mx-1"></i>
							Login
						</a>
					</span>
				{/if}
			</div>
			<div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu">
				<ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
					{#if $session.user_id ?? null !== null }
						<li class:active={$page.url.pathname === '/'}>
							<a sveltekit:prefetch href="/" class="block py-2 pr-4 pl-3 rounded bg-transparent md:p-0">
								<i class="fa fa-solid fa-house mx-1"></i> Home
							</a>
						</li>
						<li class:active={$page.url.pathname.startsWith('/assets')}>
							<a sveltekit:prefetch href="/assets" class="block py-2 pr-4 pl-3 rounded bg-transparent md:p-0">
								<i class="fa fa-solid fa-warehouse-full mr-1"></i> Assets
							</a>
						</li>
						<li class:active={$page.url.pathname.startsWith('/employees')}>
							<a sveltekit:prefetch href="/employees" class="block py-2 pr-4 pl-3 rounded bg-transparent md:p-0">
								<i class="fa fa-solid fa-users mr-1"></i> Employees
							</a>
						</li>
					{/if}
				</ul>
			</div>
		</div>
	</nav>
</header>

<style>
	nav a {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0 1em;
		color: var(--atento-secondary-grey-2);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	nav img {
		height: 1.2em;
		margin-right: 1em;
		object-fit: contain;
	}

	li.active a, span.active a {
		color: var(--atento-secondary-blue-2);
	}

	a:hover {
		color: var(--atento-primary-orange);
	}
</style>
