<script lang="ts">
    import type { MaintenanceAttributes } from '$models/Assets/Maintenance/Maintenance';
    import MaintenanceTableRow from './MaintenanceTableRow.svelte';
    export let maintenances: MaintenanceAttributes[] = [];
    $: maintenances;
</script>

<div class="rounded border">
    <table class="w-full text-left text-gray-500">
        <thead class="bg-atento-secondary-blue-4 text-atento-secondary-grey-2">
            <tr>
                <th scope="col" class="px-6 py-3">ID #</th>
            </tr>
        </thead>
        <tbody>
            {#each maintenances as maintenance}
                <MaintenanceTableRow maintenance={maintenance}/>
            {:else}
                <tr><td colspan="4">No Maintenance Records</td></tr>
            {/each}
        </tbody>
    </table>
</div>
