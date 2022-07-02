<script lang="ts">
    import MultiSelect from 'svelte-multiselect'
    import type {Option} from 'svelte-multiselect'


    const options:Option[] = [
        {value: 'br', label: 'Brazil'},
        {value: 'co', label: 'Colombia'},
        {value: 'gt', label: 'Guatemala'},
        {value: 'mx', label: 'Mexico'},
        {value: 'pe', label: 'Peru'},
        {value: 'us', label: 'USA'},
    ];

    export let selected:string[] = [];
</script>

<div>
    <label for="filter-Country">Country</label>
    <MultiSelect 
        bind:selected 
        options={options}  
        id="filter-Country"
        placeholder="All Countries"
    >
        <span let:idx let:option slot="option">
            <span class="fi fi-{option.value}"></span>
            {option.label}
        </span>

        <span let:idx let:option slot="selected">
            <span class="fi fi-{option.value}"></span>
            {option.label}
        </span>

    </MultiSelect>
</div>

<style>
    .multiselect {
        display: inline-block;
        width: 90%;
    }
</style>