<script lang="ts">
    import {AssetType} from '$models/Assets/_enums';
    export let assetType: AssetType;
    $: assetType;
</script>

{#if assetType == AssetType.DESKTOP_COMPUTER}
    <i class="fa-duotone fa-fw fa-computer"></i>
{:else if assetType == AssetType.LAPTOP_COMPUTER}
    <i class="fa-duotone fa-fw  fa-laptop"></i>
{:else if assetType == AssetType.COMPUTER_DISPLAY}
    <i class="fa-duotone fa-fw  fa-display"></i>
{:else if assetType == AssetType.PROJECTOR}
    <i class="fa-duotone fa-fw  fa-projector"></i>
{:else if assetType == AssetType.TELEVISION}
    <i class="fa-duotone fa-fw  fa-tv"></i>
{:else if assetType == AssetType.DISPLAY_ADAPTER}
    <i class="fa-duotone fa-fw  fa-projector"></i>

{:else if assetType == AssetType.KEYBOARD}
    <i class="fa-duotone fa-fw  fa-keyboard"></i>
{:else if assetType == AssetType.MOUSE}
    <i class="fa-duotone fa-fw  fa-mouse"></i>
{:else if assetType == AssetType.TRACKPAD}
    <i class="fa-duotone fa-fw  fa-square"></i>

{:else if assetType == AssetType.HEADPHONES}
    <i class="fa-duotone fa-headphones"></i>
{:else if assetType == AssetType.HEADPHONE_ADAPTER}
    <i class="fa-duotone fa-headphones"></i>
{:else if assetType == AssetType.MICROPHONE}
    <i class="fa-duotone fa-microphone"></i>
{:else if assetType == AssetType.SPEAKERS}
    <i class="fa-duotone fa-speaker"></i>
{:else if assetType == AssetType.MOUSE_PAD}
    <i class="fa-duotone fa-mouse"></i>

{:else if assetType == AssetType.DESKTOP_PRINTER}
    <i class="fa-duotone fa-print"></i>
{:else if assetType == AssetType.COPIER}
    <i class="fa-duotone fa-copy"></i>
{:else if assetType == AssetType.SCANNER}
    <i class="fa-duotone fa-scanner"></i>

{:else if assetType == AssetType.NETWORK_ADAPTER}
    <i class="fa-duotone fa-ethernet"></i>

{:else if assetType == AssetType.USB_HUB}
    <i class="fa-duotone fa-usb"></i>
{:else if assetType == AssetType.MASS_STORAGE_DEVICE}
    <i class="fa-duotone fa-usb-drive"></i>
{:else if assetType == AssetType.AC_DC_POWER_ADAPTER}
    <i class="fa-duotone fa-plug-circle-bolt"></i>
{:else if assetType == AssetType.SOFTWARE_LICENSE}
    <i class="fa-duotone fa-file-certificate"></i>
{:else if assetType == AssetType.SMART_PHONE}
    <i class="fa-duotone fa-mobile-screen-button"></i>
{:else if assetType == AssetType.TABLET}
    <i class="fa-duotone fa-tablet"></i>
{:else if assetType == AssetType.DESK_PHONE}
    <i class="fa-duotone fa-phone-office"></i>
{:else if assetType == AssetType.TWOWAY_RADIO}
    <i class="fa-duotone fa-walkie-talkie"></i>
{:else}
    <i class="fa-duotone fa-question"></i>
{/if}