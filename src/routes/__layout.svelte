<script context="module" lang="ts">
</script>
<script lang="ts">
	import '@fortawesome/fontawesome-pro/js/all.js';
	import 'flag-icons/css/flag-icons.css';
	import Header from '$components/Header.svelte';
	import '../app.css';
</script>

<Header/>

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
		padding: .25rem 1rem;
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
