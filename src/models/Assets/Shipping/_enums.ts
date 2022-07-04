export enum Courier {
    /** DHL Express */
    DHL = 'DHL',
    /** Uniter Parcel Service */
    UPS = 'UPS',
    /** United States Postal Service */
    USPS = 'USPS',
    /** FederalExpress */
    FEDEX = 'FedEx',
    /** Asset picked up on-site by recipient */
    PICKUP = 'PICKUP',
    /** Asset hand-delivered to recipient */
    HAND_DELIVERY = 'HAND_DELIVERY',

    OTHER = 'OTHER',
}

export enum ShippingReason {
    /** Acquisition of asset: Purchase, Dift, Donation, etc. */
    ACQUISITION = 'ACQUISITION',
    /** Transfer from one Atento building to another */
    SITE_TRANSFER = 'SITE_TRANSFER',
    /** Send to a specific employee */
    ASSIGNMENT_SEND = 'ASSIGNMENT_SEND',
    /** Return from a specific employee */
    ASSIGNMENT_RETURN = 'ASSIGNMENT_RETURN',
    /** Repairs, Legal Seizure, etc. */
    THIRD_PARTY_HANDOFF = 'THIRD_PARTY_HANDOFF',
    /** Throw-away, return to merchant, etc. */
    DISPOSAL = 'DISPOSAL',
    /** Other */
    OTEHR = 'OTHER'
}
export enum ArrivalType {
    /** Arrival at addressed destination */
    DELIVERY_CONFIRMED = 'DELIVERY_CONFIRMED',
    /** Delivered (according to tracking), but package is damaged */
    DAMAGED_DELIVERY = 'DAMAGED_DELIVERY',
    /** Returned to sender */
    RETURNED_TO_SENDER = 'RETURNED_TO_SENDER',
    /** Delivered (according to tracking), but package is missing */
    MISSING_DELIVERY = 'MISSING_DELIVERY',
    /** OTHER EXCEPTION: Delivery Not Complete, see notes */
    OTHER_EXCEPTION = 'OTHER_EXCEPTION',
}