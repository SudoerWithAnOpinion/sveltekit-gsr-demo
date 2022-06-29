<script lang="ts"> // Component Instance
	import { page } from '$app/stores';
	import logo from '$lib/img/Atento_Logo_RGB_White.png'
	export let user_id:string;
</script>
<header>
	<nav class="font-[Omnes]">
		<ul>
			<li class="brand">
				<img src={logo} alt="Atento" />	
				Global Service Delivery
			</li>
			<li class:active={$page.url.pathname === '/'}>
				<a sveltekit:prefetch href="/">
					<i class="fa fa-solid fa-house mr-1"></i>
					Home
				</a>
			</li>
			{#if user_id ?? null !== null }
				<li class:active={$page.url.pathname === '/employees'}>
					<a sveltekit:prefetch href="/employees">
						<i class="fa fa-solid fa-users mr-1"></i>
						Employees
					</a>
				</li>
				<li class:active={$page.url.pathname === '/assets'}>
					<a sveltekit:prefetch href="/assets">
						<i class="fa fa-solid fa-warehouse-full mr-1"></i>
						Assets
					</a>
				</li>
				<li class:active={$page.url.pathname === '/tickets'}>
					<a sveltekit:prefetch href="/tickets">
						<i class="fa fa-solid fa-ticket mr-1"></i> 
						Help & Request Tickets
					</a>
				</li>
			{:else}
				<li class:active={$page.url.pathname === '/login'}>
					<a sveltekit:prefetch href="/login">
						<i class="fa fa-solid fa-sign-in-alt ml-auto"></i>
						Login
					</a>
				</li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex-block;
		justify-content: space-between;
	}

	nav {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		background: var(--atento-primary-blue);
		color: var(--atento-primary-white);
	}
	nav .brand {
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 .5em;
		font-weight: bold;
		text-transform: uppercase;
		color: var(--atento-secondary-blue-2);
	}
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
		height: 1.5em;
		margin-right: 1em;
		object-fit: contain;
	}
	
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--atento-secondary-blue-2);
	}
	a:hover {
		color: var(--atento-secondary-blue-2);
	}
</style>
