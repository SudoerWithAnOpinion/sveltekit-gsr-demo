
import type { JwtPayload } from 'jsonwebtoken';
import type { Options } from 'sequelize';
import type { EmployeeAttributes } from '$models/Employee/Employee';
declare global {
	/// <reference types="@sveltejs/kit" />

	// See https://kit.svelte.dev/docs/types#app
	// for information about these interfaces
	declare namespace App {
		interface Locals {
			jwt: string | null;
			jwtPayload: string | JwtPayload | null;
			user_id: string | null;
			employee: EmployeeAttributes | null;
		}

		// interface Platform {}

		interface Session {
			jwtExp: number | null;
			user_id: string | null;
			employee: EmployeeAttributes | null;
		}

		// interface Stuff {}
	}
	declare namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production' | 'test' | undefined;
			JWT_SERET: string;
			SEQUELIZE_PROD_CONFIG: Options
		}
	}
}