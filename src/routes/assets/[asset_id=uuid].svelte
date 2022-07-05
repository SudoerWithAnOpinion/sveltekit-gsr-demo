<script context="module">
	export const prerender = false;
</script>
<script lang="ts">
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
  import AssetConditionIcon from '$components/Asset/AssetConditionIcon.svelte';
  import { ArrivalType } from '$models/Assets/Shipping/_enums';
  import AssetTypeIcon from '$components/Asset/AssetTypeIcon.svelte';
  import type AssetItem from '$models/Assets/AssetItem';
  import type AssetAssignment from '$models/Assets/AssetAssignment';
  import {DateTime} from 'luxon';
  export let asset: AssetItem;
  export let latestShipment: any;
  $: asset;
  $: latestShipment;

</script>
<div class="flex justify-center">
  <div class="block rounded-lg shadow-lg bg-white w-10/12 text-left">
    <div class="py-3 px-6 border-b border-gray-300 font-bold text-xl">
      <span class="text-atento-primary-orange"><AssetTypeIcon assetType={asset.assetType} /></span> Asset  #{asset.assetId} / {asset.assetType}: {asset.manufacturer}
      <span class="float-right font-normal">
        <span class="tag bg-atento-secondary-blue-1">Tag: {asset.assetTag}</span>
        <span class="tag bg-atento-secondary-grey-2">
            {latestShipment.destination}
            {
                #if latestShipment.delivery != ArrivalType.DELIVERY_CONFIRMED 
                && latestShipment.delivery != ArrivalType.DAMAGED_DELIVERY
            }
              | DELIVERY NOT CONFIRMED
            {/if}
        </span>
      </span>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-2 gap-4">
        <!-- Left Column -->
        <div>
          <table>
            <tbody>
              <tr>
                <td><i class="fa-duotone fa-fw fa-circle-info"></i></td>
                <td class="text-atento-secondary-grey-4">Type: </td>
                <td>{asset.assetType}</td>
              </tr>
              <tr>
                <td><i class="fa-duotone fa-fw fa-industry"></i></td>
                <td class="text-atento-secondary-grey-4">Manufacturer: </td>
                <td>{asset.manufacturer}<br></td>
              </tr>
              <tr>
                <td><i class="fa-duotone fa-fw fa-memo-circle-info"></i></td>
                <td class="text-atento-secondary-grey-4">Model Number: </td>
                <td>{asset.modelNumber}</td>
              </tr>
              <tr>
                <td><i class="fa-duotone fa-fw fa-qrcode"></i></td>
                <td class="text-atento-secondary-grey-4">Serial Number: </td>
                <td>{asset.serialNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Right Column -->
        <div>
          <table>
            <tbody>
              <tr>
                <td><i class="fa-duotone fa-box-check"></i></td>
                <td class="text-atento-secondary-grey-4">Acquisition Date</td>
                <td>{ymdDate(asset.acquisitionDate)}</td>
                <!-- <td>{asset.acquisitionDate}</td> -->
              </tr>
              <tr>
                <td colspan="3" class="font-bold">Audit Data</td>
              </tr>
              <tr>
                <td><i class="fa-duotone fa-right-to-bracket mr-1"></i></td>
                <td  class="text-atento-secondary-grey-4">Entered On</td>
                <td>
                    {ymdDate(asset.createdAt)} 
                    {#if asset.enteredByEmployee !== undefined}
                        (by {asset.enteredByEmployee.givenName} {asset.enteredByEmployee.familyName})
                    {/if}
                </td>
              </tr>
              {#if asset.retirementDate !== null}
                <tr>
                  <td><i class="fa-duotone fa-right-from-bracket mr-1"></i>Retirement</td>
                  <td>{ymdDate(asset.retirementDate)} (by asset.retiredByEmployee.fullName)</td>
                </tr>
              {:else}
                <tr>
                  <td><i class="fa-duotone fa-right-from-bracket mr-1"></i></td>
                  <td  class="text-atento-secondary-grey-4">Retirement On</td>
                  <td><span class="tag bg-green-500">In Service</span></td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>
      <hr class="my-1">
      <div class="grid grid-cols-2 gap-4 table-containers">
        <!-- Assignments -->
        <div>
          <table class="w-full">
            <thead>
              <th colspan="4">Assignments</th>
              <tr>
                <th><i class="fa-solid fa-fw fa-rectangle-barcode"></i> ID</th>
                <th><i class="fa-duotone fa-fw fa-user"></i> Assigned To</th>
                <th><i class="fa-solid fa-fw fa-inbox-out"></i> Assigned</th>
                <th><i class="fa-solid fa-fw fa-inbox-in"></i> Returned</th>
              </tr>
            </thead>
            <tbody>
                {#if asset.Assignments !== undefined}
                    {#each asset.Assignments as assignment}
                        <tr>
                            <td>{assignment.assignmentId.substring(24)}</td>
                            <td>
                                {#if assignment.AssignedToEmployee !== undefined}
                                    {assignment.AssignedToEmployee.givenName} {assignment.AssignedToEmployee.familyName}
                                {/if}
                            </td>
                            <td>
                                {ymdDate(assignment.assignedOn)}
                                / <AssetConditionIcon condition={assignment.assignedCondition} /> {assignment.assignedCondition}
                            </td>
                            <td>
                                {#if assignment.returnedOn}
                                {ymdDate(assignment.returnedOn)}
                                / <AssetConditionIcon condition={assignment.returnCondition} /> {assignment.returnCondition} 
                                {:else}
                                <span class="text-gray-500">Not Returned</span>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                {:else}
                    <tr class="bg-atento-secondary-grey-3 text-center">
                        <td colspan="4">No assignments</td>
                    </tr>
                {/if}
            </tbody>
          </table>
        </div>
        <!-- Maintenance -->
        <div>
          <table class="w-full">
            <thead>
              <th colspan="4">Maintenance</th>
              <tr>
                <th><i class="fa-solid fa-fw fa-rectangle-barcode"></i> ID</th>
                <th><i class="fa-solid fa-fw fa-inbox-in"></i> Checked In</th>
                <th><i class="fa-duotone fa-fw fa-user-doctor"></i> Performed By</th>
                <th><i class="fa-solid fa-fw fa-inbox-out"></i> Completed</th>
              </tr>
            </thead>
            <tbody>
                {#if asset.Maintenances !== undefined}
                    {#each asset.Maintenances as maintenance}
                        <tr>
                            <td>
                                <a href="/assets/maintenance/{maintenance.maintenanceId}">
                                    {maintenance.maintenanceId.substring(24)}
                                </a>
                            </td>
                            <td>
                                {ymdDate(maintenance.checkInAt)}
                            </td>
                            <td>
                                {#if maintenance.performedBy !== null && maintenance.PerformedByEmployee !== undefined}
                                    {maintenance.PerformedByEmployee.givenName} {maintenance.PerformedByEmployee.familyName}
                                {:else}
                                    <span class="text-gray-500">[Awaiting Maint.]</span>
                                {/if}
                            </td>
                            <td>
                                {maintenance.finishedAt === null ? '' : ymdDate(maintenance.finishedAt)}
                            </td>
                        </tr>
                    {/each}
                {:else}
                    <tr class="bg-atento-secondary-grey-3 text-center">
                        <td colspan="4">No maintenance</td>
                    </tr>
                {/if}
            </tbody>
          </table>
        </div>
      </div>
      <hr class="my-1">
      <!-- Shipping -->
      <table class="shipping-table w-full">
        <thead>
          <tr>
            <th colspan="6">Shipping History</th>
          </tr>
          <tr>
            <th><i class="fa-solid fa-fw fa-rectangle-barcode" /> ID</th>
            <th><i class="fa-duotone fa-xmarks-lines" /> Reason</th>
            <th><i class="fa-duotone fa-fw fa-truck-arrow-right" /> Shippped On</th>
            <th><i class="fa-duotone fa-fw fa-map-location" /> Destination</th>
            <th><i class="fa-duotone fa-fw fa-mailbox" /> Arrived On</th>
            <th><i class="fa-duotone fa-shoe-prints" /> Tracking</th>
          </tr>
        </thead>
        <tbody>
            {#if asset.Shipments !== undefined}
                {#each asset.Shipments as shipment}
                    <tr>
                        <td>
                            <a href="/assets/shipping/{shipment.shipmentId}">
                                {shipment.shipmentId.substring(24)}
                            </a>
                        </td>
                        <td>{shipment.reason}</td>
                        <td>{ymdDate(shipment.shippedAt)}</td>
                        <td>{shipment.destination}</td>
                        {#if shipment.arrivalAt !== null}
                            <td>{ymdDate(shipment.arrivalAt)}</td>
                        {:else}
                            <td class="text-gray-500">Not Arrived</td>
                        {/if}
                        <td>{shipment.trackingNumber}</td>
                    </tr>
                {/each}
            {:else}
                <tr class="bg-atento-secondary-grey-3 text-center">
                <td colspan="6">No shipping history</td>
                </tr>
            {/if}
        </tbody>
      </table>
    </div>
    <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
      <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        <i class="fa-duotone fa-inbox-out"></i> Assign
      </button>
      <button type="button" class=" inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out">
        <i class="fa-duotone fa-inbox-in"></i> Return
      </button>
      <button type="button" class=" inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
        <i class="fa-duotone fa-screwdriver-wrench"></i> New Maintenance
      </button>
      <button type="button" class=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
        <i class="fa-duotone fa-box-archive"></i> Retire
      </button>
    </div>
  </div>
</div>
<style>
  .tag {
    padding: 0.2rem 0.5rem;
    border-radius: 1rem;
    font-size: small;
  }
  .table-containers table, table.shipping-table {
    border-collapse: collapse;
    border: 1px solid var(--atento-secondary-blue-1);
  }
  .table-containers table thead th, table.shipping-table thead th {
    border: 1px solid var(--atento-secondary-blue-1);
  }
  .table-containers table tbody td, table.shipping-table tbody td {
    border: 1px solid var(--atento-secondary-blue-1);
  }
</style>