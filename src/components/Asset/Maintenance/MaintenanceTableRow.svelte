<script lang="ts">
    import type { MaintenanceAttributes } from '$models/Assets/Maintenance/Maintenance';
    export let maintenance: MaintenanceAttributes;
</script>

<tr class="odd:bg-white even:bg-atento-secondary-blue-1">
    <td class="px-2 font-medium text-gray-900 whitespace-nowrap">
        <a href='./maintenance{maintenance.maintenanceId}'>...{maintenance.maintenanceId.substring(24)}</a>
    </td>
</tr>