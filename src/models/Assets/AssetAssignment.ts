import type {
    Attributes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    NonAttribute,
    // HasManyGetAssociationsMixin,
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

import type { AssetCondition } from './_enums';

import AssetItem from '$models/Assets/AssetItem';
import Employee from '$models/Employee/Employee';


export default class AssetAssignment extends Model<
    InferAttributes<AssetAssignment>,
    InferCreationAttributes<AssetAssignment>
> {
    declare assignmentId: CreationOptional<string>;
    declare assetUUID: ForeignKey<AssetItem['assetId']>;

    // Assignment Details
    declare assignedToEmployeeUUID: ForeignKey<Employee['id']>;
    declare assignedOn: Date;
    declare assignedCondition: AssetCondition | null;
    declare returnedOn: Date | null;
    declare returnCondition: AssetCondition | null;

    // Authorizations
    declare assignedEntryBy: ForeignKey<Employee['id']>;
    declare returnEntryBy: ForeignKey<Employee['id']> | null;

    // Timestamps
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Associations
    declare AssetItem?: NonAttribute<AssetItem>;
    declare AssignedToEmployee?: NonAttribute<Employee>;
    declare AssignmentEntryByEmployee?: NonAttribute<Employee>;
    declare ReturnEntryByEmployee?: NonAttribute<Employee>;
    declare static associations: {
        AssetItem: Association<AssetAssignment, AssetItem>;
        AssignedToEmployee: Association<AssetAssignment, Employee>;
        AssignmentEntryByEmployee: Association<AssetAssignment, Employee>;
        ReturnEntryByEmployee: Association<AssetAssignment, Employee>;
    };

    // Associations AssetItem
    declare getAssetItem: BelongsToGetAssociationMixin<AssetItem>;
    declare setAssetItem: BelongsToSetAssociationMixin<
        AssetItem,
        AssetItem['assetId']
    >;

    // Associations AssignedToEmployee
    declare getAssignedToEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setAssignedToEmployee: BelongsToSetAssociationMixin<Employee, Employee['id']>;

    // Associations AssignmentEntryByEmployee
    declare getAssignmentEntryByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setAssignmentEntryByEmployee: BelongsToSetAssociationMixin<
        Employee,
        Employee['id']
    >;

    // Associations ReturnEntryByEmployee
    declare getReturnEntryByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setReturnEntryByEmployee: BelongsToSetAssociationMixin<
        Employee,
        Employee['id']
    >;
}
export type AssetAssignmentAttributes = Attributes<AssetAssignment> & {
    AssetItem: AssetItem;
    AssignedToEmployee: Employee;
    AssignmentEntryByEmployee: Employee;
    ReturnEntryByEmployee: Employee;
};

export function init(sequelize: Sequelize) {
    AssetAssignment.init(
        {
            assignmentId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            assetUUID: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'AssetItem',
                    key: 'assetId',
                },
            },
            assignedToEmployeeUUID: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'Employee',
                    key: 'id',
                },
            },
            assignedOn: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            assignedCondition: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            returnedOn: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            returnCondition: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            assignedEntryBy: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: Employee,
                    key: 'id',
                },
            },
            returnEntryBy: {
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
            tableName: 'asset_assignments',
            modelName: 'AssetAssignment',
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            validate: {
                returnEntryData() {
                    const returnFields = [
                        this.returnEntryBy,
                        this.returnedOn,
                        this.retunCondition,
                    ];
                    const allNull = returnFields.every(
                        (field) => (field ?? null) === null
                    );
                    const noneNull = returnFields.every(
                        (field) => (field ?? null) !== null
                    );
                    if (!(allNull || noneNull)) {
                        throw new Error(
                            'returnedOn, returnedEntryBy, & returnCondition must be null or have valid values'
                        );
                    }
                },
                returnAfterAssigned() {
                    const assignedOn = this.assignedOn as Date | null;
                    const returnedOn = (this.returnedOn as Date | null) ?? null;
                    if (returnedOn !== null && assignedOn !== null && assignedOn > returnedOn) {
                        throw new Error('returnedOn cannot be before assignedOn');
                    }
                },
            },
        }
    );
}
export function associate() {
    // AssetAssignment M=>1 AssetItem
    AssetAssignment.belongsTo(AssetItem, {
        foreignKey: 'assetUUID',
        targetKey: 'assetId',
        as: 'AssetItem',
    });
    // AssetAssignment M->1 Employee (Assigned To Employee)
    AssetAssignment.belongsTo(Employee, {
        foreignKey: 'assignedToEmployeeUUID',
        targetKey: 'id',
        as: 'AssignedToEmployee',
    });
    // AssetAssignment M->1 Employee (Assigment Entry By Employee)
    AssetAssignment.belongsTo(Employee, {
        foreignKey: 'assignedEntryBy',
        targetKey: 'id',
        as: 'AssignmentEntryByEmployee',
    });
    // AssetAssignment M->1 Employee (Return Entry By Employee)
    AssetAssignment.belongsTo(Employee, {
        foreignKey: 'returnEntryBy',
        targetKey: 'id',
        as: 'ReturnEntryByEmployee',
    });
}
