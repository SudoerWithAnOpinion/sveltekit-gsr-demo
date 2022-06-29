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

import AssetAssignment from '$models/Assets/AssetAssignment';
// import AssetRepair from './AssetRepair';
import Employee from '../Employee/Employee';
// import AssetShipment from './Shipping/AssetShipment';
// import ShippingContents from './Shipping/ShippingContents';

export enum AssetType {
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

export default class AssetItem extends Model<
    InferAttributes<AssetItem>,
    InferCreationAttributes<AssetItem>
> {
    declare assetId: CreationOptional<string>;
    declare assetTag: string | null;

    declare assetType: AssetType;
    declare manufacturer: string;
    declare modelNumber: string;
    declare serialNumber: string;

    declare acquisitionDate: Date;
    declare enteredBy: ForeignKey<Employee['id']>;
    declare retirementDate: Date | null;
    declare retiredBy: ForeignKey<Employee['id']> | null;

    // Timestamps
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Associations
    declare enteredByEmployee?: NonAttribute<Employee>;
    declare retiredByEmployee?: NonAttribute<Employee>;
    declare Assignments?: NonAttribute<AssetAssignment>;
    declare static associations: {
        enteredByEmployee: Association<AssetItem, Employee>;
        retiredByEmployee: Association<AssetItem, Employee>;
        Assignments: Association<AssetItem, AssetAssignment>;
    };
    declare getEnteredByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setEnteredByEmployee: BelongsToSetAssociationMixin<Employee, Employee['id']>;

    declare getRetiredByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setRetiredByEmployee: BelongsToSetAssociationMixin<Employee, Employee['id']>;

    declare getAssignments: HasManyGetAssociationsMixin<AssetAssignment>;

    // Virtual Fields
    get isRetired(): NonAttribute<boolean> {
        return this.retirementDate === null;
    }
}
export type AssetItemAttributes = Attributes<AssetItem> & {
    enteredByEmployee: Employee;
    retiredByEmployee: Employee;
    Assignments: AssetAssignment[];
};

export function init(sequelize: Sequelize) {
    AssetItem.init(
        {
            assetId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            assetTag: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            assetType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            manufacturer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            modelNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            serialNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            acquisitionDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            enteredBy: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: Employee,
                    key: 'id',
                },
            },
            retirementDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            retiredBy: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: Employee,
                    key: 'id',
                },
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
        },
        {
            sequelize,
            tableName: 'asset_items',
            modelName: 'AssetItem',
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            validate: {
                retireEntry() {
                    const validationFields = [this.retirementDate, this.retiredBy];
                    const noNull = validationFields.every(
                        (field) => (field ?? null) === null
                    );
                    const allNull = validationFields.every(
                        (field) => (field ?? null) !== null
                    );
                    if (!(noNull || allNull)) {
                        throw new Error(
                            'retirementDate & retiredBy must both be null or contain valid values'
                        );
                    }
                },
            },
        }
    );
}
export function associate() {
    // Association enteredBy -> Employee
    AssetItem.belongsTo(Employee, {
        foreignKey: 'enteredBy',
        targetKey: 'id',
        as: 'enteredByEmployee',
    });
    AssetItem.belongsTo(Employee, {
        foreignKey: 'retiredBy',
        targetKey: 'id',
        as: 'retiredByEmployee',
    });
    // AssetItem 1->M AssetAssignment
    AssetItem.hasMany(AssetAssignment, {
        foreignKey: 'assetUUID',
        sourceKey: 'assetId',
        as: 'Assignments',
    });

    // AssetItem M->M Employee
    AssetItem.belongsToMany(Employee, {
        through: AssetAssignment,
        sourceKey: 'assetId',
        foreignKey: 'assetUUID',
        targetKey: 'id',
        otherKey: 'assignedToEmployeeUUID',
        as: 'AssignmentsToEmployees',
    });

}
