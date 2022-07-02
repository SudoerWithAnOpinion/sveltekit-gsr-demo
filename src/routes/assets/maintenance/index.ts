import { Maintenance } from '$models';
import type { RequestHandler } from './__types';
export const get: RequestHandler = async (event) => {
    const maintenanceList = await Maintenance.findAll({
        include: ['Asset', 'CheckedInByEmployee', 'PerformedByEmployee'],
    }).then(maintenances => {
        return maintenances.map(maintenance => {
            return maintenance.toJSON();
        });
    });
    Date.prototype.toJSON = function () { return this.toISOString(); }
    return {
        body: {
            maintenances: maintenanceList,
        }
    }
}