<script lang="ts">
    import type { EmployeeAttributes } from "$models/Employee/Employee";
    export let employee:EmployeeAttributes;
    $: employee;
</script>

<tr>
    <td><a href="./employees/{employee.id}">{employee.id.substring(24)}</a></td>
    <td>{employee.givenName}</td>
    <td>{employee.familyName}</td>
    <td>NOT IMPLEMENTED[HR.Lifecycle]</td>
    <td>NOT IMPLEMENTED[HR.Lifecycle]</td>
    <td>NOT IMPLEMENTED[HR.Lifecycle]</td>
    <td>NOT IMPLEMENTED[HR.Lifecycle]}</td>
</tr>
<style>
    td{
        border: 1px solid var(--atento-secondary-grey-1);
    }
    tr:nth-child(odd){
        background-color: var(--atento-secondary-blue-1);
    }
    tr:nth-child(even){
        background-color: var(--atento-secondary-blue-2);
    }
</style>