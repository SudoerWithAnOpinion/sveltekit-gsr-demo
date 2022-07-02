<script lang="ts">
    import type {MaintenanceAttributes} from '$models/Assets/Maintenance/Maintenance';
    import MaintenanceListTable from '$components/Asset/Maintenance/MaintenanceListTable.svelte';
    export let maintenances: MaintenanceAttributes[] = [];
    $: maintenances;
</script>

<svelte:head>
	<title>Asset Maintenance - Global Service Delivery</title>
	<meta name="description" content="Asset Maintenance" />
</svelte:head>

<div class="content">
	<MaintenanceListTable maintenances={maintenances} />
</div>
