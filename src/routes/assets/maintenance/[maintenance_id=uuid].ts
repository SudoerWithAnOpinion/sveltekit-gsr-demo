import { Maintenance } from '$models';
import type { RequestHandler } from './__types/[maintenance_id=uuid]';
Date.prototype.toJSON = function () { return this.toISOString(); }
export const get: RequestHandler = async (event) => {
    const maintenance_id = event.params.maintenance_id;
    const maintenance = await Maintenance.findByPk(maintenance_id, {
        include: ['CheckedInByEmployee', 'PerformedByEmployee', 'Asset'],
    }).then(maintenanceResult => {
        if (maintenanceResult === null) return null;
        return maintenanceResult.toJSON();
    });
    return {
        statusCode: (maintenance === null) ? 404 : 200,
        body: {
            maintenance: maintenance
        }
    }
}