<script lang="ts">
    import type { ShipmentAttributes } from '$models/Assets/Shipping/Shipment';
    import type { AssetItemAttributes } from '$models/Assets/AssetItem';
    import CourierIcon from './CourierIcon.svelte';
    export let shipment: ShipmentAttributes;
    $: shipment;

    const includeCourierText:string[] = [
        'HAND_DELIVERY',
        'PICKUP',
    ]

    $: shipmentContents = shipment.contents.map(item => {
        return `${item.assetType}, ${item.manufacturer}: ${item.modelNumber}`;
    });

</script>

<tr class="odd:bg-white even:bg-atento-secondary-blue-1">
    <td class="px-2 font-medium text-gray-900 whitespace-nowrap">
        <a href='./shipping/{shipment.shipmentId}'>...{shipment.shipmentId.substring(24)}</a>
    </td>
    <td>{shipment.reason}</td>
    <td>
        <CourierIcon courier={shipment.via} />
        {#if includeCourierText.includes(shipment.via)}
            {#if shipment.via == 'PICKUP'}
                <span class="ml-1">Pickup</span>
            {:else if shipment.via == 'HAND_DELIVERY'}
                <span class="ml-1">Hand Delivery</span>
            {/if}
        {/if}
    </td>
    <td>
        {#if shipment.trackingNumber.startsWith('HANDLER')}
            {#if shipment.via == 'PICKUP'}
                ISSUER: {shipment.shippedByEmployee.givenName} {shipment.shippedByEmployee.familyName}
            {:else if shipment.via == 'HAND_DELIVERY'}
                COURIER: {shipment.shippedByEmployee.givenName} {shipment.shippedByEmployee.familyName}
            {/if}
        {:else}
            {shipment.trackingNumber}
        {/if}
    </td>
    <td class="truncate">
        {shipment.destination}
    </td>
    <td>
        {#each shipmentContents as lineItem}
            {lineItem}
            <br> 
        {/each}
    </td>
</tr>