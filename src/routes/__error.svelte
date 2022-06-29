<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    export const load: Load = ({error, status})=>{
        return {
            props: {
                error,
                status
            }
        }
    }
</script>

<script lang="ts">
    export let status: string;
</script>

<div>
    <div><i class="fad fa-brake-warning text-red-500 fa-3x" /></div>
    <div>Error {status}</div>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 2rem;
        font-size: 5rem;
    }
</style>