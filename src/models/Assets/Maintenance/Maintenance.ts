import type {
    Attributes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
    HasManyGetAssociationsMixin,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    ForeignKey,
} from 'sequelize';
import {
    Association,
    DataTypes,
    Model,
    Sequelize,
} from 'sequelize';

import type {
    MaintenanceType,
    MaintenanceCheckInReason,
    MaintenanceResult
} from './_enums';
import AssetItem from '$models/Assets/AssetItem';
import Employee from '$models/Employee/Employee';


export default class Maintenance extends Model<
    InferAttributes<Maintenance>,
    InferCreationAttributes<Maintenance>
>{
    declare maintenanceId: CreationOptional<string>;
    /** ID of AssetItem being repaired */
    declare assetId: ForeignKey<AssetItem['assetId']>;

    /** DateTime check-in to IT for repair or maintenance */
    declare checkInAt: Date;
    /** IT representative who checked in the device */
    declare checkedInBy: ForeignKey<Employee['id']>;
    /** Why Asset was checked in */
    declare checkedInReason: MaintenanceCheckInReason;
    /** Check-In comment */
    declare checkInComment: string | null;
    /** Ticket number in form of TICKET_SYSTEM/TICKET_ID */
    declare relatedTicketId: string | null;

    /** Type of maintenance */
    declare maintenanceType: MaintenanceType;
    /** DateTime of repair start */
    declare startedAt: Date;
    /** DateTime of repair completion */
    declare finishedAt: Date | null;
    /** Repair/Maint. Notes */
    declare repairNotes: string | null;
    /** ID of employee performing repair */
    declare performedBy: ForeignKey<Employee['id']>;
    /** Result of the maintenance record */
    declare result: MaintenanceResult;

    // Timestamps
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Associations
    declare Asset: BelongsToGetAssociationMixin<AssetItem>;
    declare CheckedInByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare PerformedByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare static associations: {
        Asset: Association<Maintenance, AssetItem>;
        CheckedInByEmployee: Association<Maintenance, Employee>;
        PerformedByEmployee: Association<Maintenance, Employee>;
    };
    declare getAsset: BelongsToGetAssociationMixin<AssetItem>;
    declare getCheckedInByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare getPerformedByEmployee: BelongsToGetAssociationMixin<Employee>;
}
export type MaintenanceAttributes = Attributes<Maintenance>;

export function init(sequelize: Sequelize) {
    Maintenance.init({
        maintenanceId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        assetId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: AssetItem,
                key: 'assetId',
            },
        },
        checkInAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checkedInBy: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: Employee,
                key: 'id',
            },
        },
        checkedInReason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        checkInComment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        relatedTicketId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        maintenanceType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        finishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        repairNotes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        performedBy: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: Employee,
                key: 'id',
            },
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'Maintenance',
        tableName: 'asset_maintenances',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });
}
export function associate() {
    Maintenance.belongsTo(AssetItem, {
        foreignKey: 'assetId',
        targetKey: 'assetId',
        as: 'Asset'
    });
    Maintenance.belongsTo(Employee, {
        foreignKey: 'checkedInBy',
        targetKey: 'id',
        as: 'CheckedInByEmployee'
    });
    Maintenance.belongsTo(Employee, {
        foreignKey: 'performedBy',
        targetKey: 'id',
        as: 'PerformedByEmployee'
    });
}