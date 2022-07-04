import { Op } from 'sequelize';
import { AssetItem, Shipment, ShipmentContents } from '$models';
import { ArrivalType } from '$models/Assets/Shipping/_enums';
import type { RequestHandler } from './__types';

export type CostCenterLocationInterface = {
    [assetId: string]: {
        destination: string;
        arrivalType: ArrivalType;
        country: string;
        subdivision: string;
        city: string;
    }
}

Date.prototype.toJSON = function () { return this.toISOString(); }
export const get: RequestHandler = async (event) => {
    // TODO: Implement Filters

    /**
     * TODO: Implement a query for getting AssetItem[] most recent costCenterShipment
     * Theory: Gather All Shipment (include AssetItem) WHERE shipment.destination Op.StartsWith 'COST_CENTER/'
     *         Use a K,V map of AssetItem.id -> Shipment.destination to prevent re-querying the shipping data over and over
     *         Ensure the same WHERE clause is applied to BOTH queries.
     */

    const assetList = await AssetItem.findAll({
        // where: {
        //     assetType: event.params.filter_assetType,
        //     modelNumber: event.params.filter_assetModel,
        //     serialNumber: event.params.filter_assetType,
        // }
    });
    /**
     * TODO: Needs Testing to ensure that the correct data is returned and is consistent.
     * Notes:
     *          + This query is not returning the entire table from test data, the destination filter is working.
     */
    const costCenterShipments = await ShipmentContents.findAll({
        attributes: ['assetId'],
        group: [
            'assetId'
        ],
        include: [
            {
                model: Shipment,
                as: 'Shipment',
                attributes: ['createdAt', 'destination', 'arrivalType'],
                where: {
                    destination: { [Op.startsWith]: 'COST_CENTER/' },
                    arrivalType: [
                        ArrivalType.DELIVERY_CONFIRMED,
                        ArrivalType.DAMAGED_DELIVERY,
                    ]
                },
            },
        ],
        // where: { // Sync this WHERE clause with the above query to ensure the same assetIds are returned
        //     assetId
        // }
    });
    const assetCostCenterLocations: CostCenterLocationInterface = {};
    costCenterShipments.forEach((s) => {
        const costCenter = s.Shipment!.destination.split('/')[1];
        assetCostCenterLocations[s.assetId as string] = {
            destination: s.Shipment!.destination,
            arrivalType: s.Shipment!.arrivalType,
            country: costCenter.split('.')[0],
            subdivision: costCenter.split('.')[1],
            city: costCenter.split('.')[2],
        };
    });
    return {
        body: {
            assets: assetList,
            assetLocations: assetCostCenterLocations,
        }
    }
}