import { AssetItem } from '$models';
import type { RequestHandler } from './__types';

export const get: RequestHandler = async (event) => {
    const assetList = await AssetItem.findAll({
        // where: {
        //     assetType: event.params.filter_assetType,
        //     modelNumber: event.params.filter_assetModel,
        //     serialNumber: event.params.filter_assetType,
        // }
    });
    Date.prototype.toJSON = function () { return this.toISOString(); }
    return {
        body: {
            assets: assetList
        }
    }
}