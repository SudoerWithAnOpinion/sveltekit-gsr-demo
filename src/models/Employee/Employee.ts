import type {
    CreationOptional,
    HasManyGetAssociationsMixin,
    InferAttributes,
    InferCreationAttributes,
    NonAttribute,
} from 'sequelize';
import {
    Association,
    DataTypes,
    Model,
    Sequelize,
} from 'sequelize';

import type { AssetItem } from '$models/Assets/AssetItem';
import type { AssetAssignment } from '$models/Assets/AssetAssignment';

export class Employee extends Model<
    InferAttributes<Employee>,
    InferCreationAttributes<Employee>
> {
    /** Internal Database ID */
    declare id: CreationOptional<string>;
    /** First Name */
    declare givenName: string;
    /** Last Name */
    declare familyName: string;
    /** (Personal) Email Address */
    declare email: string;
    /** (Personal) Phone Number */
    declare phone: string;

    declare homeAddress: string;
    /** (Personal) Mailing Address, null if same as homeAddress */
    declare mailingAddress: CreationOptional<string | null>;

    // Timestamps
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    /* Associations */
    declare AssetItemsEntered: NonAttribute<AssetItem>;
    declare AssetItemsRetired: NonAttribute<AssetItem>;
    declare AssetAssignments: NonAttribute<AssetAssignment>;
    declare AssetReturnsEntered: NonAttribute<AssetAssignment>;
    declare AssetAssignmentsEntered: NonAttribute<AssetAssignment>;
    declare static associations: {
        AssetItemsEntered: Association<Employee, AssetItem>;
        AssetItemsRetired: Association<Employee, AssetItem>;
        AssetAssignments: Association<Employee, AssetAssignment>;
        AssetAssignmentsEntered: Association<Employee, AssetAssignment>;
        AssetReturnsEntered: Association<Employee, AssetAssignment>;
    };
    // AssetItem.enteredByEmployee
    declare getAssetItemsEntered: HasManyGetAssociationsMixin<AssetItem>;
    declare getAssetItemsRetired: HasManyGetAssociationsMixin<AssetItem>;

    // 

    // Virtual Fields
    get fullName(): NonAttribute<string> {
        return `${this.givenName} ${this.familyName}`;
    }
}
export type EmployeeAttributes = InferAttributes<Employee>;

export default function init(sequelize: Sequelize) {
    Employee.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            givenName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            familyName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            homeAddress: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mailingAddress: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Employee',
            tableName: 'employees',
            timestamps: true,
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        }
    );
    return Employee;
}
export function associate(models: any) {
    // Employee 1->M AssetItems.enteredBy
    Employee.hasMany(models.AssetItem, {
        as: 'AssetItemsEntered',
        foreignKey: 'enteredBy',
        sourceKey: 'id',
        onDelete: 'cascade',
        onUpdate: 'restrict',
    });
    // Employee 1->M AssetItems.retiredBy
    Employee.hasMany(models.AssetItem, {
        as: 'AssetItemsRetired',
        foreignKey: 'retiredBy',
        sourceKey: 'id',
        onDelete: 'cascade',
        onUpdate: 'restrict',
    });

    // Employee 1->M AssetAssignments.assignedToEmployeeUUID
    Employee.hasMany(models.AssetAssignment, {
        as: 'AssetAssignmentsAssignedTo',
        foreignKey: 'assignedToEmployeeUUID',
        sourceKey: 'id',
        onDelete: 'cascade',
        onUpdate: 'restrict',
    });
}
