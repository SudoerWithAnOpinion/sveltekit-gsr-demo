import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie'
export const get: RequestHandler = async ({ request, locals }) => {
    locals.employee = null;
    locals.user_id = null;

    // TODO!: Does not work
    return {
        status: 303,
        headers: {
            'Set-Cookie': cookie.serialize('jwt', '', {
                path: '/',
                // the cookie should expire immediately
                expires: new Date(0),
            }),
            location: '/',
        },
    }
}