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
    Op,
    Model,
    Sequelize,
} from 'sequelize';

import type { AssetType } from './_enums';
import { ArrivalType } from './Shipping/_enums';

import AssetAssignment from '$models/Assets/AssetAssignment';
import Maintenance from '$models/Assets/Maintenance/Maintenance';
import Employee from '$models/Employee/Employee';
import Shipment from '$models/Assets/Shipping/Shipment';
import ShipmentContents from '$models/Assets/Shipping/ShipmentContents';


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
    declare Assignments?: NonAttribute<AssetAssignment[]>;
    /** Shipments of this asset */
    declare Shipments?: NonAttribute<Shipment[]>;
    /** Maintenance records of this asset */
    declare Maintenances?: NonAttribute<Maintenance[]>;
    declare static associations: {
        enteredByEmployee: Association<AssetItem, Employee>;
        retiredByEmployee: Association<AssetItem, Employee>;
        Assignments: Association<AssetItem, AssetAssignment>;
        Shipments: Association<AssetItem, Shipment>;
        Maintenances: Association<AssetItem, Maintenance>;
    };
    declare getEnteredByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setEnteredByEmployee: BelongsToSetAssociationMixin<Employee, Employee['id']>;

    declare getRetiredByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setRetiredByEmployee: BelongsToSetAssociationMixin<Employee, Employee['id']>;

    declare getAssignments: HasManyGetAssociationsMixin<AssetAssignment>;
    declare getShipments: HasManyGetAssociationsMixin<Shipment>;
    declare getMaintenances: HasManyGetAssociationsMixin<Maintenance>;

    // Virtual Fields
    get isRetired(): NonAttribute<boolean> {
        return this.retirementDate === null;
    }
}

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
            }
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
            /**
             *  TODO: Evalute if this is a good idea
             * This should (read: untested) return an AssetItem and it's latest shipment only, no other models are included.
             * Call AssetItem.scope('currentCostCenter').findAll() to get the current cost center.
             * */
            // scopes: { 
            //     /** Return to most recent shipping record of an asset bound for a COST_CENTER that has completed */
            //     currentCostCenter: {
            //         include: [
            //             {
            //                 model: Shipment,
            //                 where: {
            //                     destination: { [Op.startsWith]: 'COST_CENTER/' },
            //                     arrivalType: [
            //                         ArrivalType.DELIVERY_CONFIRMED,
            //                         ArrivalType.DAMAGED_DELIVERY,
            //                     ]
            //                 }
            //             }
            //         ],
            //         order: [
            //             [Shipment, 'createdAt', 'DESC'],
            //         ],
            //         limit: 1,
            //     }
            // }
        }
    );

}
export function associate() {
    // Association enteredBy -> Employee
    AssetItem.belongsTo(Employee, {
        foreignKey: 'enteredBy',
        targetKey: 'id',
        as: 'enteredByEmployee',
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });

    AssetItem.belongsTo(Employee, {
        foreignKey: 'retiredBy',
        targetKey: 'id',
        as: 'retiredByEmployee',
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });

    // AssetItem 1->M AssetAssignment
    AssetItem.hasMany(AssetAssignment, {
        foreignKey: 'assetUUID',
        sourceKey: 'assetId',
        as: 'Assignments',
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });

    // AssetItem M->M Employee
    AssetItem.belongsToMany(Employee, {
        through: AssetAssignment,
        sourceKey: 'assetId',
        foreignKey: 'assetUUID',
        targetKey: 'id',
        otherKey: 'assignedToEmployeeUUID',
        as: 'AssignmentsToEmployees',
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });

    // AssetItem M->M Shipment
    AssetItem.belongsToMany(Shipment, {
        through: ShipmentContents,
        sourceKey: 'assetId',
        foreignKey: 'assetId',
        targetKey: 'shipmentId',
        otherKey: 'shipmentId',
        as: 'Shipments',
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });

    // AssetItem 1->M Maintenance
    AssetItem.hasMany(Maintenance, {
        foreignKey: 'assetId',
        sourceKey: 'assetId',
        as: 'Maintenances',
        onDelete: 'cascade',
        onUpdate: 'cascade',
    });
}
