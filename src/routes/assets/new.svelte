<script lang="ts">
    import { AssetType, AssetCondition } from '$models/Assets/_enums';
    import {enhance} from '$lib/form';
    const assetTypes = Object.values(AssetType);
    const assetConditions = Object.values(AssetCondition);
</script>

<div class="flex justify-center">
    <div class="block rounded-lg shadow-lg bg-white w-10/12 text-left">
        <div class="py-3 px-6 border-b border-gray-300 font-bold text-xl">
            <i class="fa-solid fa-rectangle-history-circle-plus" />
            New Asset
        </div>
        <div class="p-6">
            <form use:enhance action="" method="post">
                <div class="grid gap-6 items-end mb-6 lg:grid-cols-3">
                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Asset Type</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected>Choose an option</option>
                            {#each assetTypes as option}
                                <option value="{option}">{option}</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Manufacturerr</label>
                            <input type="text" id="manufacturer" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Make/Brand" required>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Model Number</label>
                            <input type="text" id="model_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="M/N or P/N" required>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Serial Number</label>
                            <input type="text" id="serial_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="S/N or ID" required>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Acquisition Date</label>
                            <input type="text" id="acquision_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="YYYY-MM-DD" required>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Asset Tag</label>
                            <input type="text" id="asset_tag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Tag Value">
                        </div>
                    </div>
                    <div>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Condition</label>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected>Choose an option</option>
                            {#each assetConditions as option}
                                <option value="{option}">{option}</option>
                            {/each}
                        </select>
                    </div>
                </div>
                <div>
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                        <i class="fa-solid fa-file" />
                        Submit (WIP)
                    </button>
                </div>
                <div>
                    <button type="button" class="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                        <i class="fa-solid fa-copy" />
                        Submit & Add An Identical Asset (WIP)
                    </button>
                </div>
            </form>
        </div>
        <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
        </div>
    </div>
</div>