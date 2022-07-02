import 'dotenv/config';
import type { Handle, GetSession } from '@sveltejs/kit';
import * as cookie from 'cookie';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { EmployeeAttributes } from '$models/Employee/Employee';

const jwtSigningOptions: jwt.SignOptions = {
	algorithm: 'HS256',
}
const jwtDecodeOptions: jwt.VerifyOptions = {
	issuer: 'global-service-delivery',
	algorithms: ['HS256'],
	maxAge: '2h',
}

export const handle: Handle = async ({ event, resolve }) => {
	// Sanity Checks
	if (process.env.JWT_SECRET === undefined) {
		throw new Error('JWT_SECRET is not defined');
	}
	const cookies = cookie.parse(event.request.headers.get('cookie') ?? '');
	event.locals.jwt = cookies['jwt'] ?? null;
	try {
		event.locals.jwtPayload = jwt.verify(event.locals.jwt, process.env.JWT_SECRET, jwtDecodeOptions);
		// TODO! : Fix this hack to replenish the JWT and/or implement a new process
		event.locals.employee = event.locals.jwtPayload.employee;
		event.locals.user_id = event.locals.jwtPayload.user_id;
	} catch (err) {
		event.locals.jwtPayload = null;
	}

	const response = await resolve(event);
	let newJwt = '';
	if (cookies['jwt'] === undefined || event.locals.jwtPayload === null) {
		// No JWT cookie was preset (or was invalid), initialize an empty one
		newJwt = jwt.sign({
			iss: 'global-service-delivery',
			user_id: null,
			employee: null,
		}, process.env.JWT_SECRET, { ...jwtSigningOptions, expiresIn: '2h', });
	} else {
		// JWT cookie was preset, update it
		if (typeof event.locals.jwtPayload !== 'string') {
			event.locals.jwtPayload.user_id = event.locals.user_id;
			event.locals.jwtPayload.employee = event.locals.employee;
			const dateNow = new Date();
			if (event.locals.jwtPayload.exp !== undefined) {
				const timeExp = Math.floor(dateNow.getTime() / 1000) + (2 * 60 * 60);
				event.locals.jwtPayload.exp = timeExp;
			}
			if (event.locals.jwtPayload.iat !== undefined) {
				event.locals.jwtPayload.iat = Math.floor(dateNow.getTime() / 1000);
			}
		}
		newJwt = jwt.sign(event.locals.jwtPayload, process.env.JWT_SECRET, jwtSigningOptions);
	}


	// Update JWT
	response.headers.set(
		'set-cookie',
		cookie.serialize('jwt', newJwt, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 2,
		})
	);
	return response;
};
export const getSession: GetSession = (event) => {
	const jwtPayloadData = event.locals.jwtPayload as JwtPayload ?? {};
	const session: App.Session = {
		user_id: jwtPayloadData.user_id ?? null,
		jwtExp: jwtPayloadData.exp ?? null,
		employee: jwtPayloadData.employee ?? null,
	};
	return session;
};