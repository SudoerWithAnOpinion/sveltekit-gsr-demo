import models from '$models';
import type { RequestHandler } from './__types';
Date.prototype.toJSON = function () { return this.toISOString(); }

export const get: RequestHandler = async (event) => {
    const maintenanceList = await models.Maintenance.findAll({
        include: [
            'Asset', 'CheckedInByEmployee', 'PerformedByEmployee',
        ],
    }).then(maintenances => {
        return maintenances.map(maintenance => {
            return maintenance.toJSON();
        });
    });
    return {
        body: {
            maintenances: maintenanceList,
        }
    }
}