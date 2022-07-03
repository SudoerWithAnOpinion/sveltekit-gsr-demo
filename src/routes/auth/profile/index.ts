import type { RequestHandler } from './__types/';

import { Employee } from '$models';
import fido2 from '$lib/auth/fido2';


export const get: RequestHandler = async ({ request, locals }) => {
    if (locals.employee === null) return { status: 401, body: 'Unauthorized' };
    const employee = await Employee.findOne({
        where: {
            id: locals.employee.id,
        },
    }).then(emp => {
        if (emp === null) throw new Error('Invalid Employee Logged In');
        return emp?.toJSON();
    });
    return {
        status: 200,
        body: {
            employee,
        }
    };
}

export const post: RequestHandler = async ({ request, locals }) => {
    if (request.action.startsWith('FIDO2:')) {
        return { status: 500, body: 'FIDO2 Not Implemented' };
    } else {
        return {
            status: 400,
            body: 'Invalid Request'
        }
    }
}