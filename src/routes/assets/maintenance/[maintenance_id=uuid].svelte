<script lang="ts">
    import {DateTime} from 'luxon';
    import type { MaintenanceAttributes } from '$models/Assets/Maintenance/Maintenance';
    import MaintenanceStatusIcon from '$components/Asset/Maintenance/MaintenanceStatusIcon.svelte';
    import MaintenanceResultIcon from '$components/Asset/Maintenance/MaintenanceResultIcon.svelte';
import AssetTypeIcon from '$components/Asset/AssetTypeIcon.svelte';
    export let maintenance: MaintenanceAttributes;
    $: maintenance;

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
</script>

<div class="flex justify-center">
  <div class="block rounded-lg shadow-lg bg-white w-10/12 text-left">
    <div class="py-3 px-6 border-b border-gray-300 font-bold text-xl">
        <i class="fa-duotone fa-screwdriver-wrench"></i>
        Maintenance Record #{maintenance.maintenanceId}
    </div>
    <div class="p-6">
        <!-- Asset Summary -->
        <div class="text-xl mb-4">
            <a href="/assets/{maintenance.Asset.assetId}">
                <AssetTypeIcon assetType={maintenance.Asset.assetType} />
                {maintenance.Asset.assetType} {maintenance.Asset.manufacturer} | {maintenance.Asset.modelNumber} | {maintenance.Asset.serialNumber}
            </a>
        </div>

        <div class="my-2">
            <ol class="relative border-l border-gray-200">                  
                <li class="mb-10 ml-6">            
                    <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white">
                        <i class="pl-1 fa-duotone fa-circle-exclamation-check"></i>
                    </span>
                    <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900">Triage <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">{maintenance.checkedInReason}</span></h3>
                    <span class="block mb-2 text-sm font-normal leading-none text-gray-400">
                        <i class="fa-duotone fa-calendar fa-fw"></i>
                        {ymdDate(maintenance.checkInAt)} 
                        by <a href="/employees/{maintenance.checkedInBy}">{maintenance.CheckedInByEmployee.givenName} {maintenance.CheckedInByEmployee.familyName}</a>
                    </span>
                    <p class="mb-4 text-base font-normal">
                        <span class="block">
                            <span class="text-gray-500">Comment:</span> {maintenance.checkInComment}</span>
                        {#if maintenance.relatedTicketId !== null}
                            <span class="block">
                                <span class="text-gray-500">Related Ticket:</span> <a href="/tickets/{maintenance.relatedTicketId}">{maintenance.relatedTicketId}</a>
                            </span>
                        {/if}
                    </p>
                </li>
                {#if maintenance.startedAt !== null}
                    <li class="mb-10 ml-6">
                        <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white">
                            <i class="fa-duotone fa-screwdriver-wrench"></i>
                        </span>
                        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900">Maintenance</h3>
                        <span class="block mb-2 text-sm font-normal leading-none text-gray-400">
                            <i class="fa-duotone fa-calendar fa-fw"></i>
                            {ymdDate(maintenance.startedAt)}
                            by <a href="/employees/{maintenance.performedBy}">{maintenance.PerformedByEmployee.givenName} {maintenance.PerformedByEmployee.familyName}</a>
                        </span>
                        <p class="mb-4 text-base font-normal">
                            <span class="block">
                                <span class="text-gray-500">Type:</span> {maintenance.maintenanceType}
                            </span>
                        </p>
                    </li>
                {/if}
                {#if maintenance.finishedAt !== null}
                    <li class="mb-10 ml-6">
                        <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white">
                            <i class="fa-duotone fa-flag-checkered"></i>
                        </span>
                        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900">Finish</h3>
                        <span class="block mb-2 text-sm font-normal leading-none text-gray-400">
                            <i class="fa-duotone fa-calendar fa-fw"></i>
                            {ymdDate(maintenance.finishedAt)}
                        </span>
                        <p class="mb-4 text-base font-normal">
                            <span class="block">
                                <span class="inline-block align-top text-gray-500">Notes:</span> 
                                <span class="inline-block">{maintenance.repairNotes}</span>
                            </span>
                            <span class="block">
                                <span class="text-gray-500">Result:</span> 
                                {maintenance.result} <MaintenanceResultIcon result={maintenance.result} />
                            </span>
                        </p>
                    </li>
                {/if}
            </ol>
        </div>
        
    </div>
    <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
        <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Start Maintenance
        </button>
        <button type="button" class=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
            Finish Maintenance
        </button>
    </div>
  </div>
</div>