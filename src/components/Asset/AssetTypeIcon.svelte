<script lang="ts">
    import {AssetType} from '$models/Assets/_enums';
    export let assetType: AssetType;
    $: assetType;
</script>

{#if assetType == AssetType.DESKTOP_COMPUTER}
    <i class="fa-solid fa-fw fa-computer"></i>
{:else if assetType == AssetType.LAPTOP_COMPUTER}
    <i class="fa-solid fa-fw  fa-laptop"></i>
{:else if assetType == AssetType.COMPUTER_DISPLAY}
    <i class="fa-solid fa-fw  fa-display"></i>
{:else if assetType == AssetType.PROJECTOR}
    <i class="fa-solid fa-fw  fa-projector"></i>
{:else if assetType == AssetType.TELEVISION}
    <i class="fa-solid fa-fw  fa-tv"></i>
{:else if assetType == AssetType.DISPLAY_ADAPTER}
    <i class="fa-solid fa-fw  fa-projector"></i>

{:else if assetType == AssetType.KEYBOARD}
    <i class="fa-solid fa-fw  fa-keyboard"></i>
{:else if assetType == AssetType.MOUSE}
    <i class="fa-solid fa-fw  fa-mouse"></i>
{:else if assetType == AssetType.TRACKPAD}
    <i class="fa-solid fa-fw  fa-square"></i>

{:else if assetType == AssetType.HEADPHONES}
    <i class="fa-solid fa-headphones"></i>
{:else if assetType == AssetType.HEADPHONE_ADAPTER}
    <i class="fa-solid fa-headphones"></i>
{:else if assetType == AssetType.MICROPHONE}
    <i class="fa-solid fa-microphone"></i>
{:else if assetType == AssetType.SPEAKERS}
    <i class="fa-solid fa-speaker"></i>
{:else if assetType == AssetType.MOUSE_PAD}
    <i class="fa-solid fa-mouse"></i>

{:else if assetType == AssetType.DESKTOP_PRINTER}
    <i class="fa-solid fa-print"></i>
{:else if assetType == AssetType.COPIER}
    <i class="fa-solid fa-copy"></i>
{:else if assetType == AssetType.SCANNER}
    <i class="fa-solid fa-scanner"></i>

{:else if assetType == AssetType.NETWORK_ADAPTER}
    <i class="fa-solid fa-ethernet"></i>

{:else if assetType == AssetType.USB_HUB}
    <i class="fa-solid fa-usb"></i>
{:else if assetType == AssetType.MASS_STORAGE_DEVICE}
    <i class="fa-solid fa-usb-drive"></i>
{:else if assetType == AssetType.AC_DC_POWER_ADAPTER}
    <i class="fa-solid fa-plug-circle-bolt"></i>
{:else if assetType == AssetType.SOFTWARE_LICENSE}
    <i class="fa-solid fa-file-certificate"></i>
{:else if assetType == AssetType.SMART_PHONE}
    <i class="fa-solid fa-mobile-screen-button"></i>
{:else if assetType == AssetType.TABLET}
    <i class="fa-solid fa-tablet"></i>
{:else if assetType == AssetType.DESK_PHONE}
    <i class="fa-solid fa-phone-office"></i>
{:else if assetType == AssetType.TWOWAY_RADIO}
    <i class="fa-solid fa-walkie-talkie"></i>
{:else}
    <i class="fa-solid fa-question"></i>
{/if}