import type {
    Attributes,
    BelongsToGetAssociationMixin,
    CreationOptional,
    ForeignKey,
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

import Employee from '$models/Employee/Employee';

export default class FIDO2 extends Model<
    InferCreationAttributes<FIDO2>,
    InferAttributes<FIDO2>
>{
    /** UUID of the authenticator */
    declare authenticatorId: CreationOptional<string>;
    /** UUID of the employee */
    declare employeeId: ForeignKey<Employee['id']>;
    /** Public Key of the Authenticator */
    declare credentialPublicKey: string;
    /** Counter from registration of an Authenticator */
    declare counter: string;

    // Timestamps
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Associations
    declare Employee: NonAttribute<Employee>;
    declare static associations: {
        Employee: Association<FIDO2, Employee>;
    };

    declare getEmployee: BelongsToGetAssociationMixin<Employee>;
}
export function init(sequelize: Sequelize) {
    FIDO2.init({
        authenticatorId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        employeeId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: Employee,
                key: 'id',
            },
        },
        credentialPublicKey: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        counter: {
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
        modelName: 'FIDO2',
        tableName: 'auth_fido2_passwordless',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });
}

export function associate() {

}