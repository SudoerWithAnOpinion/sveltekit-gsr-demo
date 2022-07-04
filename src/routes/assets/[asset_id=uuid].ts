import type { RequestHandler } from './__types/[asset_id=uuid]';
import { AssetItem, Shipment, ShipmentContents } from '$models';
Date.prototype.toJSON = function () { return this.toISOString(); }

export const get: RequestHandler = async (event) => {
    const asset_id = event.params.asset_id;
    const assetItem = await AssetItem.findByPk(asset_id, {
        include: [
            AssetItem.associations.enteredByEmployee,
            AssetItem.associations.retiredByEmployee,
            AssetItem.associations.Shipments,
            {
                model: AssetItem.sequelize?.models.Maintenance,
                as: 'Maintenances',
                include: ['PerformedByEmployee']
            },
            {
                model: AssetItem.sequelize?.models.AssetAssignment,
                as: 'Assignments',
                include: ['AssignedToEmployee']
            }
        ],
        rejectOnEmpty: true
    }).then(asset => {
        return asset.toJSON();
    });
    const latestShipment = await ShipmentContents.findOne({
        where: {
            assetId: asset_id
        },
        include: [
            {
                model: Shipment,
                as: 'Shipment',
            }
        ],
        order: [
            ['Shipment', 'createdAt', 'DESC']
        ]
    }).then(result => {
        if (result === null) return null;
        if (result.Shipment === undefined) return null;
        return {
            destination: result.Shipment.destination,
            delivery: result.Shipment.arrivalType,
            shippedDate: result.Shipment.createdAt,
            arrivalAt: result.Shipment.arrivalAt,
            shipmentId: result.Shipment.shipmentId
        }
    });
    return {
        statusCode: (assetItem === null) ? 404 : 200,
        body: {
            asset: assetItem,
            latestShipment: latestShipment
        }
    }
}