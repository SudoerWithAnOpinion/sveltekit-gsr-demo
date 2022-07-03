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
    Op,
    Sequelize,
} from 'sequelize';

import type {
    MaintenanceType,
    MaintenanceCheckInReason,
    MaintenanceResult
} from './_enums';
import type { AssetItem } from '$models/Assets/AssetItem';
import type { Employee } from '$models/Employee/Employee';


export class Maintenance extends Model<
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
    declare startedAt: Date | null;
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
    declare Asset?: NonAttribute<AssetItem>;
    declare CheckedInByEmployee?: NonAttribute<Employee>;
    declare PerformedByEmployee?: NonAttribute<Employee>;
    declare static associations: {
        Asset: Association<Maintenance, AssetItem>;
        CheckedInByEmployee: Association<Maintenance, Employee>;
        PerformedByEmployee: Association<Maintenance, Employee>;
    };
    declare getAsset: BelongsToGetAssociationMixin<AssetItem>;
    declare getCheckedInByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare getPerformedByEmployee: BelongsToGetAssociationMixin<Employee>;

}
export type MaintenanceAttributes = Attributes<Maintenance> & {
    Asset: Attributes<AssetItem>;
    CheckedInByEmployee: Attributes<Employee>;
    PerformedByEmployee: Attributes<Employee>;
};

export default function init(sequelize: Sequelize) {
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
                model: 'asset_items',
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
                model: 'employees',
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
            allowNull: true,
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
                model: 'employees',
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
    return Maintenance;
}
export function associate(models: any) {
    Maintenance.belongsTo(models.AssetItem, {
        foreignKey: 'assetId',
        targetKey: 'assetId',
        as: 'Asset'
    });
    Maintenance.belongsTo(models.Employee, {
        foreignKey: 'checkedInBy',
        targetKey: 'id',
        as: 'CheckedInByEmployee'
    });
    Maintenance.belongsTo(models.Employee, {
        foreignKey: 'performedBy',
        targetKey: 'id',
        as: 'PerformedByEmployee'
    });

}