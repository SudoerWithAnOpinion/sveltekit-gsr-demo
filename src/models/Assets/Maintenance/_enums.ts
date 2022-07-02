export enum MaintenanceCheckInReason {
    /** IT incident/request ticket*/
    TICKET = 'TICKET',
    /** User requested maintenance/repair */
    USER_REQUEST = 'USER_REQUEST',
    /** Returned damaged from assignee */
    ASSIGNEE_RETURNED_DAMAGED = 'ASSIGNMENT_RETURNED_DAMAGED',
    /** IT requested maintenance/repair */
    TECHNICIAN_REQUEST = 'TECHNICIAN_REQUEST',
    /** Security Incident */
    SECURITY_INCIDENT = 'SECURITY_INCIDENT',
    /** Removal from active assignment */
    UNASSIGNED_FROM_ASSIGNMENT = 'UNASSIGNED_FROM_ASSIGNMENT',
    /** Send to storage */
    SEND_TO_STORAGE = 'SEND_TO_STORAGE',
}

export enum MaintenanceType {
    /** Secure system wipe */
    SECURE_WIPE = 'SECURE_WIPE',
    /** Operating System installation */
    OS_INSTALL = 'OS_INSTALL',
    /** Installation & Configuration to a campaign specific loadout */
    CAMPAIGN_PROVISIONING = 'CAMPAIGN_PROVISIONING',
    /** Hardware Repair: Replace or repair malfunctioning part */
    HARDWARE_REPAIR = 'HARDWARE_REPAIR',
    /** Hardware Upgrade: Upgrade existing (functioning) part */
    HARDWARE_UPGRADE = 'HARDWARE_UPGRADE',
    /** Hardware upgrade of malfunctioning part */
    HARDWARE_UPGRADE_REPAIR = 'HARDWARE_UPGRADE_REPAIR',

    /** Software Repair: Repair of malfunctioning application */
    SOFTWARE_REPAIR = 'SOFTWARE_REPAIR',
}

export enum MaintenanceResult {
    /** Maintenance was completed successfully */
    COMPELTE = 'COMPLETE',
    /** Unable to repair damage */
    UNABLE_TO_REPAIR = 'UNABLE_TO_REPAIR',
    /** Maintenance was not completed: No available parts */
    INCOMLETE_NO_PARTS = 'INCOMLETE_NO_PARTS',

}