<script lang="ts">
    import type { MaintenanceAttributes} from '$models/Assets/Maintenance/Maintenance';
    export let maintenance: MaintenanceAttributes;
    $: maintenance;
</script>

{#if maintenance.checkInAt !== null && maintenance.startedAt === null}
    <!-- Checked In -->
    <i class="fa-solid fa-fw fa-circle-exclamation-check text-grey-500"></i>
{:else if maintenance.startedAt !== null && maintenance.finishedAt === null}
    <!-- Started -->
    <i class="fa-solid fa-fw fa-screwdriver-wrench text-grey-600"></i>
{:else if maintenance.finishedAt !== null}
    <!-- Completed -->
    <i class="fa-solid fa-fw fa-hexagon-check text-green-700"></i>
{/if}