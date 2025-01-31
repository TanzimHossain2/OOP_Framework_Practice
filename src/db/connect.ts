import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import config from 'config';
import * as schema from './schemas';
import { DrizzleDatabaseClientPool } from '@/lib/db/DrizzleDatabaseClientPool';

const db = drizzle(config.get('database_url') as string, { schema });

export const dbClient = new DrizzleDatabaseClientPool({
  url: process.env.DATABASE_URL!,
});


export default db;