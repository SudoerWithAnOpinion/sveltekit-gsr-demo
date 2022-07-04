<script context="module">
	import { browser } from '$app/env';
	export const router = browser;
</script>
<script lang="ts">
    import type Shipment from '$models/Assets/Shipping/Shipment';
    import ShipmentListTable from '$components/Asset/Shipping/ShipmentListTable.svelte';
    export let shipments: Shipment[] = [];
    $: shipments;
</script>

<svelte:head>
	<title>Assets - Global Service Delivery</title>
	<meta name="description" content="Assets List" />
</svelte:head>

<div class="content">
	<ShipmentListTable shipments={shipments} />
</div>
