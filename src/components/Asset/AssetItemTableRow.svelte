<script lang="ts">
    import type AssetItem from '$models/Assets/AssetItem';
    import AssetTypeIcon from './AssetTypeIcon.svelte';
    export let asset: AssetItem;
    export let assetLocation: {
        country: string;
        subdivision: string;
        city: string;
    };
</script>

<tr class="odd:bg-white even:bg-atento-secondary-blue-1">
    <td class="px-2 font-medium text-gray-900 whitespace-nowrap">
        <a href='./assets/{asset.assetId}'>...{asset.assetId.substring(24)}</a>
    </td>
    <td>
        <AssetTypeIcon assetType={asset.assetType}></AssetTypeIcon>
        {asset.assetType}
    </td>
    <td>{asset.manufacturer}</td>
    <td>{asset.modelNumber}</td>
    <td>
        {#if assetLocation !== undefined}
            {assetLocation.country}.{assetLocation.subdivision}.{assetLocation.city}
        {/if}
    </td>
    <td>{asset.acquisitionDate}</td>
</tr>