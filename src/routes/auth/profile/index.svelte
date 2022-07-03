<script lang="ts">
    import type { EmployeeAttributes } from '$models/Employee/Employee';
    export let employee: EmployeeAttributes;
    $: employee;
</script>

<div class="flex justify-center">
  <div class="block rounded-lg shadow-lg bg-white w-10/12 text-left">
    <div class="py-3 px-6 border-b border-gray-300 font-bold text-xl">
        <i class="fa-duotone fa-fw fa-user" /> User Profile | {employee.givenName} {employee.familyName}
    </div>
    <div class="p-6">
      
    </div>
    <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
      <!-- <button type="button" class=" inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
        <i class="fa-duotone fa-box-archive"></i> Retire
      </button> -->
    </div>
  </div>
</div>