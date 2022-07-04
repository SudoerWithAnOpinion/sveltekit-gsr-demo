<script lang="ts">
    import type {CostCenterLocationInterface} from '$lib/../routes/assets/';
    import type AssetItem from '$models/Assets/AssetItem';
    import AssetItemTableRow from './AssetItemTableRow.svelte';
    export let assets: AssetItem[] = [];
    export let costCenterLocations: CostCenterLocationInterface;
    $: assets;
    $: costCenterLocations;
</script>


<button type="button" class="my-1 text-atento-secondary-grey-2 bg-atento-secondary-blue-4 hover:bg-atento-secondary-blue-3 focus:ring-4 focus:outline-none focus:ring-atento-secondary-blue-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
   <i class="fa-duotone fa-fw fa-filters"></i> Filter (WIP)
</button>

<div class="rounded border">
    <table class="w-full text-left text-gray-500">
        <thead class="bg-atento-secondary-blue-4 text-atento-secondary-grey-2">
            <tr>
                <th scope="col" class="px-6 py-3">ID #</th>
                <th scope="col" class="px-6 py-3">Type</th>
                <th scope="col" class="px-6 py-3">Manufacturer</th>
                <th scope="col" class="px-6 py-3">Model</th>
                <th scope="col" class="px-6 py-3">Location</th>
                <th scope="col" class="px-6 py-3">Acq. Date</th>
            </tr>
        </thead>
        <tbody>
            {#each assets as asset}
                <AssetItemTableRow asset={asset} assetLocation={costCenterLocations[asset.assetId]} />
            {:else}
                <tr><td colspan="4">No Assets</td></tr>
            {/each}
        </tbody>
    </table>
</div>
