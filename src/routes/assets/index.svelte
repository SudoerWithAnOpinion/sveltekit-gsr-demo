<script context="module">
	import { browser, dev } from '$app/env';
	export const router = browser;
	export const prerender = false; // since there is dynamic data here, we can't prerender
</script>

<script lang="ts">
    import type {CostCenterLocationInterface} from './';
	import type AssetItem from '$models/Assets/AssetItem';
	import AssetListTable from '$components/Asset/AssetListTable.svelte';
	export let assets: AssetItem[];
    export let assetLocations: CostCenterLocationInterface;
    $: assets;
    $: assetLocations;
</script>

<svelte:head>
	<title>Assets - Global Service Delivery</title>
	<meta name="description" content="Assets List" />
</svelte:head>

<div class="content">
	<AssetListTable assets={assets} costCenterLocations={assetLocations} />
</div>

<style>
	.content {
		width: 100%;
	}
</style>
