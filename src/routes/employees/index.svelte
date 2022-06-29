<script context="module">
	import { browser, dev } from '$app/env';
	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;
	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;
	// since there is dynamic data here, we can't prerender
	export const prerender = false;
</script>

<script lang="ts">
	import CountryFilter from '$lib/filter/CountryFilter.svelte';
	let filterCountry: string[];
	$: filters = {
		country: filterCountry
	}

	import EmployeeTableRow from '$components/employee/EmployeeTableRow.svelte';
	$: employees = [
		{givenName:'Tess', surname:'Testerson'},
		{id:123456, givenName:'John', surname:'Doe'},
	]; // TODO: Use real data, not this placeholder
</script>

<svelte:head>
	<title>Employees - Global Service Delivery</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="content">
	<CountryFilter bind:selected={filterCountry}/>
	<table class="table-auto">
		<thead>
			<tr>
				<th>ID #</th>
				<th>Given Name</th>
				<th>Surname</th>
				<th>Campaign</th>
				<th>Cost Center</th>
				<th>Type</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each employees as employee}
				<EmployeeTableRow employee={employee}/>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.content {
		width: 100%;
		margin: var(--column-margin-top) auto 0 auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
		border: 1px solid var(--atento-secondary-grey-1);
	}
	table thead {
		background-color: var(--atento-secondary-blue-4);
		color: var(--pure-white);
		font-weight: bold;
	}
	table tbody {
		font-family: 'Calibri', sans-serif;
		font-weight: normal;
	}
	table th {
		border: 1px solid var(--atento-secondary-grey-1);
	}
	table tbody tr:nth-child(odd){
		background-color: var(--atento-secondary-grey-2);
	}
	table tbody tr:nth-child(even){
		background-color: var(--atento-secondary-grey-3);
	}
</style>
