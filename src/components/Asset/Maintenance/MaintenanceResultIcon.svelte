<script lang="ts">
    import { MaintenanceResult } from '$models/Assets/Maintenance/_enums';
    export let result: MaintenanceResult;
    $: result;
</script>

{#if result === MaintenanceResult.COMPLETE}
    <i class="fa-duotone fa-hexagon-check"></i> 
{:else if result === MaintenanceResult.INCOMLETE_NO_PARTS}
    <i class="fa-duotone fa-diamond-exclamation"></i>
{:else if result === MaintenanceResult.UNABLE_TO_REPAIR}
    <i class="fa-duotone fa-octagon-xmark"></i>
{:else}
    <i class="fa fa-fw fa-icon-not-found"></i>
{/if}