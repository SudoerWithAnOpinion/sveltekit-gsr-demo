<script context="module">
	export const prerender = false;
</script>
<script lang="ts">
  import AssetConditionIcon from '$components/Asset/AssetConditionIcon.svelte';
  import AssetTypeIcon from '$components/Asset/AssetTypeIcon.svelte';
  import type {AssetItemAttributes} from '$models/Assets/AssetItem';
  import type {AssetAssignmentAttributes} from '$models/Assets/AssetAssignment';
  import {DateTime} from 'luxon';
  export let asset: AssetItemAttributes;
  export let assignments: AssetAssignmentAttributes[];
  export let assignments_AssignedToEmployee: string[]|null[];
  $: asset;
  $: assignments;
  $: assignments_AssignedToEmployee;
</script>
<div class="flex justify-center">
  <div class="block rounded-lg shadow-lg bg-white w-10/12 text-left">
    <div class="py-3 px-6 border-b border-gray-300 font-bold text-xl">
      <AssetTypeIcon assetType={asset.assetType}/> Asset #{asset.assetId} / {asset.assetType}: {asset.manufacturer}
      <span class="float-right font-normal">
        <span class="tag bg-atento-secondary-blue-1">Tag: {asset.assetTag}</span>
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
                <td>Type: </td>
                <td>{asset.assetType}</td>
              </tr>
              <tr>
                <td><i class="fa-duotone fa-fw fa-industry"></i></td>
                <td>Manufacturer: </td>
                <td>{asset.manufacturer}<br></td>
              </tr>
              <tr>
                <td><i class="fa-duotone fa-fw fa-memo-circle-info"></i></td>
                <td>Model Number: </td>
                <td>{asset.modelNumber}</td>
              </tr>
              <tr>
                <td><i class="fa-duotone fa-fw fa-qrcode"></i></td>
                <td>Serial Number: </td>
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
                <td>Acquisition Date</td>
                <td>{DateTime.fromISO(asset.acquisitionDate.toISOString()).toFormat('yyyy-MM-dd')}</td>
              </tr>
              <tr>
                <td colspan="3" class="font-bold">Audit Data</td>
              </tr>
              <tr>
                <td><i class="fa-solid fa-right-to-bracket mr-1"></i></td>
                <td>Entered On</td>
                <td>{DateTime.fromISO(asset.createdAt.toISOString()).toFormat('yyyy-MM-dd')} (by {asset.enteredByEmployee.fullName})</td>
              </tr>
              {#if asset.retirementDate !== null}
                <tr>
                  <td><i class="fa-solid fa-right-from-bracket mr-1"></i>Retirement</td>
                  <td>{DateTime.fromISO(asset.retirementDate.toISOString()).toISODate()} (by asset.retiredByEmployee.fullName)</td>
                </tr>
              {:else}
                <tr>
                  <td><i class="fa-solid fa-right-from-bracket mr-1"></i></td>
                  <td>Retirement On</td>
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
              {#each assignments as assignment, i}
                <tr>
                  <td>{assignment.assignmentId.substring(24)}</td>
                  <td>{assignments_AssignedToEmployee[i]}</td>
                  <td>
                    {DateTime.fromISO(assignment.assignedOn.toISOString()).toFormat('yyyy-MM-dd')}
                    / <AssetConditionIcon condition={assignment.assignedCondition} /> {assignment.assignedCondition}
                  </td>
                  <td>
                    {#if assignment.returnedOn}
                      {DateTime.fromISO(assignment.returnedOn.toISOString()).toFormat('yyyy-MM-dd')}
                      / <AssetConditionIcon condition={assignment.returnCondition} /> {assignment.returnCondition} 
                    {:else}
                      <span class="text-gray-500">Not Returned</span>
                    {/if}
                  </td>
                </tr>
              {:else}
                <tr class="bg-atento-secondary-grey-3 text-center">
                  <td colspan="4">No assignments</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <!-- Maintenance -->
        <div>
          <table class="w-full">
            <thead>
              <th colspan="4">Maintenance</th>
              <tr>
                <th><i class="fa-solid fa-fw fa-rectangle-barcode"></i> Repair ID</th>
                <th><i class="fa-duotone fa-fw fa-user-doctor"></i> Repaired By</th>
                <th><i class="fa-solid fa-fw fa-inbox-in"></i> Checked In</th>
                <th><i class="fa-solid fa-fw fa-inbox-out"></i> Completed</th>
              </tr>
            </thead>
            <tbody>
              <!-- TODO: Asset Maintenance -->
            </tbody>
          </table>
        </div>
      </div>
      <hr class="my-1">
      <!-- Shipping -->
      <table class="shipping-table w-full">
        <thead>
          <tr>
            <th colspan="5">Shipping History</th>
          </tr>
          <tr>
            <th><i class="fa-solid fa-fw fa-rectangle-barcode"></i> ID</th>
            <th><i class="fa-duotone fa-fw fa-truck-arrow-right"></i> Shippped On</th>
            <th><i class="fa-duotone fa-fw fa-mailbox"></i> Arrived On</th>
            <th><i class="fa-duotone fa-shoe-prints"></i> Tracking</th>
          </tr>
        </thead>
        <tbody>
          <!-- TODO: Asset Shipments -->
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