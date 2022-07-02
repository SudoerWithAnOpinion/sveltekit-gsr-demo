<script context="module" lang="ts">
    import type {Load} from '@sveltejs/kit';
    export const load:Load = async({ session,props }) => {
        if (session.user_id === null) {
            return {
                status: 301,
                redirect: '/auth/login'
            }
        }
        return { props }
    }
</script>
<script type="ts">
    import HeaderSubBar from '$components/Asset/Header-SubBar.svelte';
</script>

<HeaderSubBar />
<slot />