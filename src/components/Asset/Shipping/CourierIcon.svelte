<script lang="ts">
    import { Courier } from '$models/Assets/Shipping/_enums';
    export let courier: Courier;
    $: courier;
</script>

{#if courier == Courier.HAND_DELIVERY}
    <i class="fa-solid fa-fw fa-hand-holding-box"></i>
{:else if courier==Courier.PICKUP}
    <i class="fa-solid fa-fw fa-person-carry-box"></i>
{:else if courier==Courier.FEDEX}
    <i class="fa-brands fa-fw fa-xl fa-fedex text-[#4D148C]"></i>
{:else if courier==Courier.UPS}
    <i class="fa-brands fa-fw fa-ups text-[#351C15]"></i>
{:else if courier==Courier.USPS}
    <i class="fa-brands fa-fw fa-usps text-[#004B87]"></i>
{:else if courier==Courier.DHL}
    <i class="fa-brands fa-fw fa-dhl text-[#D40511]"></i>
{/if}