export enum AssetType {
    /** Destop Type Computer (Tower) */
    DESKTOP_COMPUTER = 'DESKTOP_COMPUTER',
    /** Portable Laptop Type Computer */
    LAPTOP_COMPUTER = 'LAPTOP_COMPUTER',
    /** Computer Display */
    COMPUTER_DISPLAY = 'COMPUTER_DISPLAY',
    /** Projector Display */
    PROJECTOR = 'PROJECTOR',
    /** Television (TV) */
    TELEVISION = 'TELEVISION',
    DISPLAY_ADAPTER = 'DISPLAY_ADAPTER',

    KEYBOARD = 'KEYBOARD',
    NUMBER_PAD = 'NUMBER_PAD',
    MOUSE = 'MOUSE',
    TRACKPAD = 'TRACKPAD',

    HEADPHONES = 'HEADPHONES',
    HEADPHONE_ADAPTER = 'HEADPHONE_ADAPTER',
    MICROPHONE = 'MICROPHONE',
    SPEAKERS = 'SPEAKERS',
    MOUSE_PAD = 'MOUSE_PAD',

    DESKTOP_PRINTER = 'PRINTER',
    COPIER = 'COPIER',
    SCANNER = 'SCANNER',
    /** Direct-attach, single purpose network connection peripheral */
    NETWORK_ADAPTER = 'NETWORK_ADAPTER',
    /** USB Hub (May include additional ports for diplays, network, etc) */
    USB_HUB = 'USB_HUB',
    MASS_STORAGE_DEVICE = 'MASS_STORAGE_DEVICE',

    /** AC Power Adapter */
    AC_DC_POWER_ADAPTER = 'AC_DC_POWER_ADAPTER',

    /** Software License (Tranferrable) */
    SOFTWARE_LICENSE = 'SOFTWARE_LICENSE',
    // Phones & Communication
    /** iPhone, Android, etc mobile phone */
    SMART_PHONE = 'SMART_PHONE',
    /** Tablet */
    TABLET = 'TABLET',
    /** Desk Phone (IP-Phone, Standard Landline Phone, etc) */
    DESK_PHONE = 'DESK_PHONE',
    /** 2-Way Radio (Walkie-Talkie) */
    TWOWAY_RADIO = 'TWOWAY_RADIO',
    OTHER = 'OTHER',
}

export enum AssetCondition {
    /** New in Box / Just Opened */
    NEW = 'NEW',
    /** Used but easy to mistake for new */
    USED_LIKE_NEW = 'USED_LIKE_NEW',
    /** Minor scratches or scuffs, easy to miss or forget */
    USED_COSMETIC_DAMAGE = 'USED_COSMETIC_DAMAGE',
    /** Major scratches or scuffs that may affect operation negatively. */
    USED_WORN = 'USED_WORN',
    /** Destroyed or Destroyed/Damaged */
    NON_FUNCTIONAL = 'NON_FUNCTIONAL',
}

export enum AssetConsumableType {
    BATTERY = 'BATTERY',
    PRINTER_INK = 'PRINTER_INK', // (Includes Toner and other)
    LABEL_PAPER = 'LABEL_PAPER',
    OTHER = 'OTHER',
}