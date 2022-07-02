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

import AssetItem from '$models/Assets/AssetItem';
import Employee from '$models/Employee/Employee';
import ShipmentContents from '$models/Assets/Shipping/ShipmentContents';

import type { ShippingReason, ArrivalType, Courier } from './_enums';

export default class Shipment extends Model<
    InferAttributes<Shipment>,
    InferCreationAttributes<Shipment>
> {
    declare shipmentId: CreationOptional<string>;

    declare shippedAt: Date;
    declare shippedBy: ForeignKey<Employee['id']>;
    declare reason: ShippingReason;
    /** Carrier | 'HAND_DELIVERY' | 'PICKUP' */
    declare via: Courier;
    /** Courier Package Tracking Number or format of "HANDLER:<employeeId>" where employeeId = employee who is hadning out or delivering asset */
    declare trackingNumber: string;
    declare destination: string; // Must be a valid cost-center code if reason=SITE_TRANSFER

    declare arrivalAt: CreationOptional<Date>; // NULL until arrival or expection of arrival is entered
    declare arrivalType: CreationOptional<ArrivalType>; // NULL until arrival or expection of arrival is entered
    declare arrivalAcknowledgedBy: CreationOptional<ForeignKey<Employee['id']>>; //Package is considered arrived when an employee acknowledges it.

    // Timestamps
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    // Associations
    declare shippedByEmployee: NonAttribute<Employee>;
    declare arrivalAcknowledgedByEmployee: NonAttribute<Employee>;
    declare contents: NonAttribute<ShipmentContents[]>;
    declare public static associations: {
        shippedByEmployee: Association<Shipment, Employee>;
        arrivalAcknowledgedByEmployee: Association<Shipment, Employee>;
        contents: Association<Shipment, AssetItem>;
    };
    declare getShippedByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare getArrivalAcknowledgedByEmployee: BelongsToGetAssociationMixin<Employee>;
    declare getContents: HasManyGetAssociationsMixin<AssetItem>;
}
export type ShipmentAttributes = Attributes<Shipment> & {
    shippedByEmployee: Attributes<Employee>;
    arrivalAcknowledgedByEmployee: Attributes<Employee>;
    contents: Attributes<AssetItem>[];
};
export function init(sequelize: Sequelize): void {
    Shipment.init({
        shipmentId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        shippedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        shippedBy: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        via: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trackingNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        arrivalAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        arrivalType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        arrivalAcknowledgedBy: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Employee,
                key: 'id',
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Shipments',
        tableName: 'asset_shipments',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        validate: {
            allOrNoArrivalData() {
                const fields = [
                    this.arrivalAt,
                    this.arrivalType,
                    this.arrivalAcknowledgedBy,
                ];
                const allNull = fields.every(
                    (field) => (field ?? null) === null
                );
                if (allNull) return true; // Short-circuit if all null
                const noneNull = fields.every(
                    (field) => (field ?? null) !== null
                );
                if (noneNull) return true; // Short-circuit if none null
                // If we get here, there is a mix of null and non-null; those are bad
                throw new Error(
                    'arrivalAt, arrivalType, & arrivalAcknowledgedBy must be null or have valid values'
                );
            },
            arrivalAtAfterShippedAt() {
                if (this.arrivalAt === null) return true; // Short-circuit if arrival date is not set
                const shippedAt = this.shippedAt as Date;
                const arrivalAt = this.arrivalAt as Date;
                if (arrivalAt < shippedAt) throw new Error('Item cannot arrive before it is shipped');
                return true;
            },
        }
    });
}
export function associate() {
    // Shipment.shippedBy M-1 Employee.id
    Shipment.belongsTo(Employee, {
        foreignKey: 'shippedBy',
        targetKey: 'id',
        as: 'shippedByEmployee',
    });

    // Shipment.arrivalAcknowledgedBy M-1 Employee.id
    Shipment.belongsTo(Employee, {
        foreignKey: 'arrivalAcknowledgedBy',
        targetKey: 'id',
        as: 'arrivalAcknowledgedByEmployee',
    });

    // Shipment.assetItems M=N AssetItem.id
    Shipment.belongsToMany(AssetItem, {
        through: ShipmentContents,
        foreignKey: 'shipmentId',
        sourceKey: 'shipmentId',
        otherKey: 'assetId',
        targetKey: 'assetId',
        as: 'contents',

    });
    // Shipment.shipmentId 1-M ShipmentContents.shipmentId
    Shipment.hasMany(ShipmentContents, {
        foreignKey: 'shipmentId',
        sourceKey: 'shipmentId',
    })
}