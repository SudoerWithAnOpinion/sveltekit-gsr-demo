import models from '$models';
import type { RequestHandler } from './__types';

export const get: RequestHandler = async (event) => {
    const shipmentList = await models.Shipment.findAll({
        include: ['shippedByEmployee', 'arrivalAcknowledgedByEmployee', 'contents'],
    }).then(shipments => {
        return shipments.map(shipment => {
            return shipment.toJSON();
        });
    });
    Date.prototype.toJSON = function () { return this.toISOString(); }
    return {
        body: {
            shipments: shipmentList
        }
    }
}