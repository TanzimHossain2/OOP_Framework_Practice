import { defineConfig } from 'drizzle-kit';
import config from 'config';

const dbURl = config.get<string>('database_url');

export default defineConfig({
	dialect: 'postgresql',
	out: './src/db/migrations',
	schema: './src/db/schemas',

	dbCredentials: {
		url: dbURl,
		ssl: false,
	},
	verbose: true,
	strict: true,
});