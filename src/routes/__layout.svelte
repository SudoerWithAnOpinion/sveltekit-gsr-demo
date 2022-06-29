<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load:Load = async ({session}) => {
		return {
			props: {
				user_id: session.user_id
			}
		}
	};
</script>
<script lang="ts">
	import '@fortawesome/fontawesome-pro/js/all.js';
	import 'flag-icons/css/flag-icons.css';
	import Header from '$components/Header.svelte';
	import '../app.css';
	export let user_id:string;
</script>

<Header user_id={user_id}/>

<main>
	<slot />
</main>

<footer>

</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		/* max-width: 1024px; */
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
