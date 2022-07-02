import { Shipment } from '$models';
import type { RequestHandler } from './__types/[shipment_id=uuid]';
Date.prototype.toJSON = function () { return this.toISOString(); }
export const get: RequestHandler = async (event) => {
    const shipment_id = event.params.shipment_id;
    const shipment = await Shipment.findByPk(shipment_id, {
        include: ['shippedByEmployee', 'arrivalAcknowledgedByEmployee', 'contents'],
    }).then(shipmentResult => {
        if (shipmentResult === null) return null;
        return shipmentResult.toJSON();
    });
    return {
        statusCode: (shipment === null) ? 404 : 200,
        body: {
            shipment: shipment
        }
    }
}