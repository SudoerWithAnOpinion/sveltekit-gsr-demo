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
import Shipment from '$models/Assets/Shipping/Shipment';

export default class ShipmentContents extends Model<
    InferAttributes<ShipmentContents>,
    InferCreationAttributes<ShipmentContents>
> {
    declare id: CreationOptional<string>;

    declare shipmentId: ForeignKey<Shipment['shipmentId']>;
    declare assetId: ForeignKey<AssetItem['assetId']>;

    declare Shipment?: NonAttribute<Shipment>;
    declare Asset?: NonAttribute<AssetItem>;

    declare static associations: {
        Shipment: Association<ShipmentContents, Shipment>;
        Asset: Association<ShipmentContents, AssetItem>;
    };

    declare getShipment: BelongsToGetAssociationMixin<Shipment>;
    declare getAsset: BelongsToGetAssociationMixin<AssetItem>;
}

export type ShipmentContentsAttributes = Attributes<ShipmentContents> & {
    Shipment: Shipment['shipmentId'];
    Asset: AssetItem['assetId'];
};

export function init(sequelize: Sequelize): void {
    ShipmentContents.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        shipmentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Shipment,
                key: 'shipmentId',
            },
        },
        assetId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: AssetItem,
                key: 'assetId',
            },
        }
    }, {
        sequelize,
        modelName: 'ShipmentContents',
        tableName: 'asset_shipment_contents',
        timestamps: false
    });
}

export function associate() {
    // ShipmentContents.shipmentId M=>1 Shipment.id
    ShipmentContents.belongsTo(Shipment, {
        foreignKey: 'shipmentId',
        as: 'shipment',
    });
    // ShipmentContents.assetId M=>1 AssetItem.id
    ShipmentContents.belongsTo(AssetItem, {
        foreignKey: 'assetId',
        as: 'asset',
    });
}