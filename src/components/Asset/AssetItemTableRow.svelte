<script lang="ts">
    import AssetTypeIcon from './AssetTypeIcon.svelte';
    import type { AssetItemAttributes } from '$models/Assets/AssetItem';
    export let asset: AssetItemAttributes;
</script>

<tr class="odd:bg-white even:bg-atento-secondary-blue-1">
    <td class="px-2 font-medium text-gray-900 whitespace-nowrap">
        <a href='./assets/{asset.assetId}'>...{asset.assetId.substring(24)}</a>
    </td>
    <td>
        <AssetTypeIcon assetType={asset.assetType}></AssetTypeIcon>
        {asset.assetType
    }</td>
    <td>{asset.manufacturer}</td>
    <td>{asset.acquisitionDate}</td>
</tr>