<script lang="ts">
    import type { ShipmentAttributes } from '$models/Assets/Shipping/Shipment';

    import ShipmentTableRow from './ShipmentTableRow.svelte';
    export let shipments: ShipmentAttributes[] = [];
    $: shipments;
</script>


<button type="button" class="my-1 text-atento-secondary-grey-2 bg-atento-secondary-blue-4 hover:bg-atento-secondary-blue-3 focus:ring-4 focus:outline-none focus:ring-atento-secondary-blue-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
   <i class="fa-duotone fa-fw fa-filters"></i> Filter (WIP)
</button>

<div class="rounded border">
    <table class="w-full text-left text-gray-500">
        <thead class="bg-atento-secondary-blue-4 text-atento-secondary-grey-2">
            <tr>
                <th scope="col" class="px-6 py-3">ID #</th>
                <th scope="col" class="px-6 py-3">Reason</th>
                <th scope="col" class="px-6 py-3">Via</th>
                <th scope="col" class="px-6 py-3">Tracking</th>
                <th scope="col" class="px-6 py-3">Destination</th>
                <th scope="col" class="px-6 py-3">Contents</th>
            </tr>
        </thead>
        <tbody>
            {#each shipments as shipment}
                <ShipmentTableRow shipment={shipment}/>
            {:else}
                <tr><td colspan="4">No Shipments</td></tr>
            {/each}
        </tbody>
    </table>
</div>
