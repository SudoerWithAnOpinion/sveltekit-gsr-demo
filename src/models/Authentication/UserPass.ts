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

export default class UserPass extends Model<
    InferCreationAttributes<UserPass>,
    InferAttributes<UserPass>
>{
    declare username: Lowercase<string>;
    declare employeeId: ForeignKey<Employee['id']>;

    declare passwordSalt: string;
    declare passwordHash: string;

    declare loginAttempts: number;

    // Timestamps
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Associations
    declare Employee: NonAttribute<Employee>;
    declare static associations: {
        Employee: Association<UserPass, Employee>;
    };

    declare getEmployee: BelongsToGetAssociationMixin<Employee>;
}
export type UserPassAttributes = Attributes<UserPass> & {
    Employee: Attributes<Employee>
};

export function init(sequelize: Sequelize) {
    UserPass.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            set(val: string) {
                this.setDataValue('username', val.toLowerCase());
            }
        },
        employeeId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Employee,
                key: 'id'
            }
        },
        passwordSalt: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loginAttempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        modelName: 'UserPass',
        tableName: 'auth_userpass',
        timestamps: true,
    });
}

export function associate() {
    UserPass.belongsTo(Employee, {
        foreignKey: 'employeeId',
        targetKey: 'id',
        as: 'Employee',
        onDelete: 'DELETE',
        onUpdate: 'CASCADE',
    });
}