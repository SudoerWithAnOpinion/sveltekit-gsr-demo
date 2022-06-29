<script lang="ts">
    export let employee:Record<string, any>;
</script>

<tr>
    <td>{employee.id}</td>
    <td>{employee.givenName}</td>
    <td>{employee.surname}</td>
    <td>{employee.campaign}</td>
    <td>{employee.costCenter}</td>
    <td>{employee.type}</td>
    <td>{employee.status}</td>
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