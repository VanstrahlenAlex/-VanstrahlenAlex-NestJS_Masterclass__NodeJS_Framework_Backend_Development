/* eslint-disable prettier/prettier */

export const appConfig = () => ({
	enviorement: process.env.NODE_ENV || 'production',
	database: {
		host: process.env.DATABASE_HOST || 'localhost',
		port: parseInt(process.env.DATABASE_HOST) || 5432,
		user: parseInt(process.env.DATABASE_USER),
		password: parseInt(process.env.DATABASE_PASSWORD),
		name: parseInt(process.env.DATABASE_NAME),
		synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
		autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
	}
})