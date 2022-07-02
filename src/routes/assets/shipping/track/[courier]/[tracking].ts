/**
 * Tracking Endpoint
 * @remarks Accepts a tracking number and courier name and returns the tracking status.
 */

import { Courier } from '$models/Assets/Shipping/_enums';


async function doTrack(courier: string, tracking: string) {
    return {
        status: 'fail',
        message: 'Tracking not implemented',
    }
}


import type { RequestHandler } from './__types/[tracking]';
export const get: RequestHandler = async ({ params }) => {
    const { courier, tracking } = params;
    if (courier == null) throw new Error('Courier is required');
    if (tracking == null) throw new Error('Tracking is required');
    const trackingResult = await doTrack(courier, tracking);
    return {
        status: 200,
        body: trackingResult
    }
}
