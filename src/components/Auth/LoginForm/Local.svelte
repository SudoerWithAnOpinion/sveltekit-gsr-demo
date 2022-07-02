<script lang="ts">
    import { browser } from '$app/env';
    $: webAuthnSupported_Platform = false;
        if (browser) {
            const checkWebAuthn = async () => {
                console.debug('Checking webAuthn support...');
                if(window.PublicKeyCredential){
                    let pkc = window.PublicKeyCredential
                    // WebAuthn is supported
                    if(await pkc.isUserVerifyingPlatformAuthenticatorAvailable()) {
                        webAuthnSupported_Platform = true;
                    }
                }else{
                    webAuthnSupported_Platform = false;
                }
            }
            checkWebAuthn();
        }

    async function onSubmit(event:SubmitEvent){
        event.preventDefault();
        if(event.target === null) return;
        let formData = new FormData(event.target as HTMLFormElement);

        const response = await fetch('/auth/login/Local_UserPass', {
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
            body: formData,
            credentials: 'include'
        });

        if (response.status === 200) {
            const data = await response.json();
            if (data.status == 'success') {
                window.location.href = '/';
            } else {
                alert(data.message);
            }
        } else {
            alert('Error: ' + response.status);
        }
    }
</script>

<div class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8">
    <form on:submit|preventDefault={onSubmit} class="space-y-6" action="#">
        <h5 class="text-xl font-medium text-gray-900 align-baseline">
            <i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In
            <span class="text-sm text-gray-400 float-right">
                Local Account
        </h5>
        <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">
                <i class="fa-solid fa-user"></i> Username
            </label>
            <input type="text" name="username" autocomplete="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="username" required />
        </div>
        <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">
                <i class="fa-solid fa-key-skeleton"></i> Password
            </label>
            <input type="password" name="password" autocomplete="current-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <button type="submit" class="w-full text-white bg-atento-primary-orange hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
        
        <!-- WebAuthn -->
        {#if webAuthnSupported_Platform}
            <button type="button" class="w-full text-atento-secondary-grey-2 bg-atento-secondary-blue-4 hover:bg-atento-secondary-blue-3 focus:ring-4 focus:outline-none focus:ring-atento-secondary-blue-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <i class="fa-solid fa-fw fa-fingerprint"></i> Sign In using a Security Key
            </button>
        {/if}
        
        <div class="text-sm font-medium text-gray-500">
            Not registered? Contact IT to create an account.
        </div>
    </form>
</div>