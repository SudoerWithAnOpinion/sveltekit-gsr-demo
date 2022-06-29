<script lang="ts">
    enum AssetType {
        DESKTOP_COMPUTER = 'DESKTOP_COMPUTER',
        LAPTOP_COMPUTER = 'LAPTOP_COMPUTER',
        MONITOR = 'MONITOR',
        KEYBOARD = 'KEYBOARD',
        MOUSE = 'MOUSE',
        HEADPHONES = 'HEADPHONES',
        HEADPHONE_ADAPTER = 'HEADPHONE_ADAPTER',
        MICROPHONE = 'MICROPHONE',
        SPEAKERS = 'SPEAKERS',
        DISPLAY_ADAPTER = 'DISPLAY_ADAPTER',
        MOUSE_PAD = 'MOUSE_PAD',
        PRINTER = 'PRINTER',
        NETWORK_ADAPTER = 'NETWORK_ADAPTER',
        USB_HUB = 'USB_HUB',
        MASS_STORAGE_DEVICE = 'MASS_STORAGE_DEVICE',
        LICENSE = 'LICENSE',
        OTHER = 'OTHER',
    }
    export let assetType: AssetType;
    $: assetType;
</script>

{#if assetType == AssetType.DESKTOP_COMPUTER}
    <i class="fa-duotone fa-computer"></i>
{:else if assetType == AssetType.LAPTOP_COMPUTER}
    <i class="fa-duotone fa-laptop"></i>
{:else if assetType == AssetType.MONITOR}
    <i class="fa-duotone fa-display"></i>
{:else if assetType == AssetType.KEYBOARD}
    <i class="fa-duotone fa-keyboard"></i>
{:else if assetType == AssetType.MOUSE}
    <i class="fa-duotone fa-mouse"></i>
{:else if assetType == AssetType.HEADPHONES}
    <i class="fa-duotone fa-headphones"></i>
{:else if assetType == AssetType.HEADPHONE_ADAPTER}
    <i class="fa-duotone fa-headphones"></i>
{:else if assetType == AssetType.MICROPHONE}
    <i class="fa-duotone fa-microphone"></i>
{:else if assetType == AssetType.SPEAKERS}
    <i class="fa-duotone fa-volume-up"></i>
{:else if assetType == AssetType.DISPLAY_ADAPTER}
    <i class="fa-duotone fa-desktop"></i>
{:else if assetType == AssetType.MOUSE_PAD}
    <i class="fa-duotone fa-mouse"></i>
{:else if assetType == AssetType.PRINTER}
    <i class="fa-duotone fa-print"></i>
{:else if assetType == AssetType.NETWORK_ADAPTER}
    <i class="fa-duotone fa-wifi"></i>
{:else}
    <i class="fa-duotone fa-question"></i>
{/if}