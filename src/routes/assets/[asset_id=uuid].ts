import type { AssetAssignmentAttributes } from '$models/Assets/AssetAssignment';
import type { RequestHandler } from './__types/[asset_id=uuid]';
import { AssetItem } from '$models';
Date.prototype.toJSON = function () { return this.toISOString(); }

export const get: RequestHandler = async (event) => {
    const asset_id = event.params.asset_id;
    const assetItem = await AssetItem.findByPk(asset_id, {
        include: [
            'enteredByEmployee',
            'retiredByEmployee',
            'Shipments',
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
        ]
    }).then(asset => {
        if (!asset) return null;
        return asset.toJSON();
    });
    return {
        statusCode: (assetItem === null) ? 404 : 200,
        body: {
            asset: assetItem
        }
    }
}