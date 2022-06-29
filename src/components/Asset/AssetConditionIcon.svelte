<script lang="ts">
    // import {AssetCondition} from '$models/Assets/AssetAssignment'
    enum AssetCondition {
        NEW = 'NEW',
        USED_LIKE_NEW = 'USED_LIKE_NEW',
        USED_COSMETIC_DAMAGE = 'USED_COSMETIC_DAMAGE',
        USED_WORN = 'USED_WORN',
        NON_FUNCTIONAL = 'NON_FUNCTIONAL',
    }
    export let condition: AssetCondition | null;
    $: condition;
</script>

{#key condition}
    {#if condition == AssetCondition.NEW}
        <i class="fa-duotone fa-signal-bars"></i>
    {:else if condition == AssetCondition.USED_LIKE_NEW}
        <i class="fa-duotone fa-signal-bars-good"></i>
    {:else if condition == AssetCondition.USED_COSMETIC_DAMAGE}
        <i class="fa-duotone fa-signal-bars-fair"></i>
    {:else if condition == AssetCondition.USED_WORN}
        <i class="fa-duotone fa-signal-bars-weak"></i>
    {:else if condition == AssetCondition.NON_FUNCTIONAL}
        <i class="fa-duotone fa-signal-bars-slash"></i>
    {/if}

{/key}