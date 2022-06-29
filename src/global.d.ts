import type { Options } from 'sequelize';
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production' | 'test' | undefined;
			JWT_SERET: string;

			SEQUELIZE_PROD_CONFIG: Options
		}
	}
}