<script context="module">
	import { browser, dev } from '$app/env';
	export const router = browser;
	export const prerender = false; // since there is dynamic data here, we can't prerender
</script>

<script lang="ts">
    import AssetItemTableRow from '$components/Asset/AssetItemTableRow.svelte';
	import type { AssetItemAttributes } from '$models/Assets/AssetItem';
	export let assets: AssetItemAttributes[];
    $: assets;
</script>

<svelte:head>
	<title>Assets - Global Service Delivery</title>
	<meta name="description" content="Assets List" />
</svelte:head>

<div class="content">
	<table class="table-auto">
		<thead>
			<tr>
				<th>ID #</th>
				<th>Type</th>
                <th>Manufacturer</th>
                <th>Acq. Date</th>
			</tr>
		</thead>
		<tbody>
			{#each assets as asset}
				<AssetItemTableRow asset={asset}/>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.content {
		width: 100%;
		margin: var(--column-margin-top) auto 0 auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		border: 1px solid var(--atento-secondary-grey-1);
	}
	table thead {
		background-color: var(--atento-secondary-blue-4);
		color: var(--pure-white);
		font-weight: bold;
	}
	table tbody {
		font-family: 'Calibri', sans-serif;
		font-weight: normal;
	}
	table th {
		border: 1px solid var(--atento-secondary-grey-1);
	}
	table tbody tr:nth-child(odd){
		background-color: var(--atento-secondary-grey-2);
	}
	table tbody tr:nth-child(even){
		background-color: var(--atento-secondary-grey-3);
	}
</style>
