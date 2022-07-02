/**
 * Local Login Endpoint
 * 
 * @remarks: This endpoint is used to login a LOCAL user using a username and password, checked in the database.
 *           This endpoint should update the user's JWT with a "user_id" claim in the format of "local/<user_id>"
 */
import type { RequestHandler } from '@sveltejs/kit';
import { UserPass } from '$models';

import * as Password from '$lib/auth/password';

export const post: RequestHandler = async ({ request, locals }) => {
    return request.formData().then((data) => {
        const dataUser = data.get('username');
        const dataPass = data.get('password');
        if (dataUser === null || dataPass === null) throw new Error('Missing username or password');
        let username = dataUser.toString().toLowerCase();
        let password = dataPass.toString();
        return UserPass.findByPk(username, { include: ['Employee'] }).then(userRow => {
            if (userRow === null) throw new Error('Invalid username or password');
            if (userRow.loginAttempts >= 3) throw new Error('Account locked');
            return Password.verifyPassword(password, userRow.passwordSalt, userRow.passwordHash).then((verifyResult) => {
                if (verifyResult) {
                    userRow.loginAttempts = 0; // Reset login attempts
                    userRow.save();
                    // Update the user's JWT with a "user_id" claim in the format of "local/<user_id>"
                    locals.user_id = `local/${username}`;
                    locals.employee = userRow.Employee;
                    return {
                        status: 200,
                        body: {
                            status: 'success',
                            message: 'Login successful'
                        }
                    }
                } else {
                    throw new Error('Invalid username or password');
                }
            })
        });
    }).catch((err) => {
        let statusCode;
        switch (err.message) {
            case 'Missing username or password':
                statusCode = 400;
                break;
            case 'Invalid username or password':
                statusCode = 401;
                break;
            case 'Account locked':
                statusCode = 423;
                break;
            default:
                statusCode = 500;
        }
        return { status: statusCode, body: { error: err.message } };
    });
}