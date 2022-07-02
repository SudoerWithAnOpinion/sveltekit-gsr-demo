<script lang="ts">
    import type { MaintenanceAttributes } from '$models/Assets/Maintenance/Maintenance';
import AssetTypeIcon from '../AssetTypeIcon.svelte';
    import MaintenanceStatusIcon from './MaintenanceStatusIcon.svelte';
    export let maintenance: MaintenanceAttributes;
    $: maintenance;
</script>

<tr class="odd:bg-white even:bg-atento-secondary-blue-1">
    <td class="px-2 font-medium text-gray-900 whitespace-nowrap">
        <a href='./maintenance/{maintenance.maintenanceId}'>
            <MaintenanceStatusIcon maintenance={maintenance} />
            ...{maintenance.maintenanceId.substring(24)}
        </a>
    </td>
    <td>
        {maintenance.maintenanceType}
    </td>
    <td>
        <AssetTypeIcon assetType={maintenance.Asset.assetType} />
        {maintenance.Asset.assetType} / {maintenance.Asset.manufacturer}: {maintenance.Asset.modelNumber}
    </td>
</tr>