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

import type { AssetItem } from '$models/Assets/AssetItem';
import type { Shipment } from '$models/Assets/Shipping/Shipment';

export class ShipmentContents extends Model<
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

export default function init(sequelize: Sequelize) {
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
                model: 'asset_shipments',
                key: 'shipmentId',
            },
        },
        assetId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'asset_items',
                key: 'assetId',
            },
        }
    }, {
        sequelize,
        modelName: 'ShipmentContents',
        tableName: 'asset_shipment_contents',
        timestamps: false
    });
    return ShipmentContents;
}

export function associate(models: any) {
    // ShipmentContents.shipmentId M=>1 Shipment.id
    ShipmentContents.belongsTo(models.Shipment, {
        foreignKey: 'shipmentId',
        as: 'shipment',
    });
    // ShipmentContents.assetId M=>1 AssetItem.id
    ShipmentContents.belongsTo(models.AssetItem, {
        foreignKey: 'assetId',
        as: 'asset',
    });
}