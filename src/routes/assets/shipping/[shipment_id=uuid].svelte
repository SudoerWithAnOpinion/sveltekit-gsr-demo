<script lang="ts">
    import {DateTime} from 'luxon';
    import type { ShipmentAttributes } from '$models/Assets/Shipping/Shipment';
    import CourierIcon from '$components/Asset/Shipping/CourierIcon.svelte';

    export let shipment: ShipmentAttributes;
    $: shipment;
    function isoDateString(inputDate: Date | string){
        if (typeof inputDate === 'string') {
        return inputDate;
        }else{
        return inputDate.toISOString();
        }
    }
    function ymdDate(inputDate: Date | string){
        return DateTime.fromISO(isoDateString(inputDate)).toFormat('yyyy-MM-dd');
    }

    /**
     * @remarks Determines if there is an exception for this shipment
     *          - Courier Issue (TODO!)
     *          - Delivery Not Confirmed
     *          - etc...
     */
    function isException(shipment: ShipmentAttributes){
        return (
            shipment.arrivalAt === null
        );
    }
</script>


<div class="flex justify-center">
  <div class="block rounded-lg shadow-lg bg-white w-10/12 text-left">
    <div class="py-3 px-6 border-b border-gray-300 font-bold text-xl">
        <CourierIcon courier={shipment.via} /> #{shipment.shipmentId} / {shipment.via}: {shipment.trackingNumber}
        {#if isException(shipment)}
            <span class="float-right text-red-500">
                <i class="fa-duotone fa-lg fa-diamond-exclamation"></i>
            </span>
        {/if}
    </div>
    <div class="p-6">
        Shipped By: {shipment.shippedByEmployee.givenName} {shipment.shippedByEmployee.familyName} <br>
        Reason: {shipment.reason} <br>
        Destination: {shipment.destination} <br>

        <span class="inline-block align-top">Delivery Details: </span>
        {#if shipment.arrivalAt !== null}
            <span class="inline-block">
                Date: {ymdDate(shipment.arrivalAt)} <br>
                arrivalType: {shipment.arrivalType} <br>
                arrivalAcknowledgedBy: {shipment.arrivalAcknowledgedByEmployee.givenName} {shipment.arrivalAcknowledgedByEmployee.familyName} <br>
            </span>
            
        {:else}
            <span class="text-red-500">
                <i class="fa-duotone fa-diamond-exclamation"></i>
                Not Confirmed
            </span>
        {/if}

        <hr class="my-1"> 
        <table class="w-full">
            <thead>
              <th colspan="4" class="text-xl">Box Contents</th>
              <tr>
                <th><i class="fa-solid fa-fw fa-rectangle-barcode"></i> ID</th>
                <th><i class="fa-duotone fa-fw fa-industry"></i> Manufacturer</th>
                <th><i class="fa-solid fa-fw fa-memo-circle-info"></i> Model</th>
                <th><i class="fa-solid fa-fw fa-qrcode"></i> Serial Number</th>
              </tr>
            </thead>
            <tbody>
              {#each shipment.contents as asset}
                <td>
                    <a href="/assets/{asset.assetId}">{asset.assetId.substring(24)}</a>
                </td>
                <td>{asset.manufacturer}</td>
                <td>{asset.modelNumber}</td>
                <td>{asset.serialNumber}</td>
              {:else}
                <tr class="bg-atento-secondary-grey-3 text-center">
                  <td colspan="4">No Contens</td>
                </tr>
              {/each}
            </tbody>
        </table>
    </div>
    <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
        <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            <i class="fa-duotone fa-fw fa-box-circle-check"></i> Confirm Delivery
        </button>
        <button type="button" class=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
            <i class="fa-duotone fa-location-question"></i> Mark Lost
        </button>
    </div>
  </div>
</div>