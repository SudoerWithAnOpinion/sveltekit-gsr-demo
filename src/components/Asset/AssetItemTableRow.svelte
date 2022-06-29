<script lang="ts">
    import type { AssetItemAttributes } from '$models/Assets/AssetItem';
    export let asset: AssetItemAttributes;
</script>

<tr>
    <td><a href='./assets/{asset.assetId}'>...{asset.assetId.substring(24)}</a></td>
    <td>{asset.assetType}</td>
    <td>{asset.manufacturer}</td>
    <td>{asset.acquisitionDate}</td>
</tr>