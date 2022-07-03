import type {
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

import type { AssetConsumableType, AssetType } from './_enums';
import { Employee } from '../Employee/Employee';

export class AssetConsumable extends Model<
    InferAttributes<AssetConsumable>,
    InferCreationAttributes<AssetConsumable>
> {
    declare consumableId: string // (UUID)
    declare consumableType: AssetConsumableType

    // Compatible with AssetItem
    declare compatAssets: string[]; // "Manufacturer/ModelNumber"

    declare enteredBy: ForeignKey<Employee['id']>;

    declare consumedOn: Date;
    declare consumeEntryBy: ForeignKey<Employee['id']>;

    declare createdAt: Date;
    declare updatedAt: Date;

    // Associations
    declare enteredByEmployee?: NonAttribute<Employee>;
    declare consumeEntryByEmployee?: NonAttribute<Employee>;
    declare static associations: {
        enteredByEmployee: Association<AssetConsumable, Employee>;
        consumeEntryByEmployee: Association<AssetConsumable, Employee>;
    };
    declare getEnteredByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setEnteredByEmployee: BelongsToSetAssociationMixin<Employee, Employee['id']>;

    declare getConsumeEntryByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare setConsumeEntryByEmployee: BelongsToSetAssociationMixin<Employee, Employee['id']>;
}