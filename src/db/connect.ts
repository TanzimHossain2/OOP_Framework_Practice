import { DrizzleDatabaseClientPool } from '@/lib/db/DrizzleDatabaseClientPool';
import config from 'config';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schemas';

const db = drizzle(config.get('database_url') as string, { schema });

export const dbClient = new DrizzleDatabaseClientPool({
  url: process.env.DATABASE_URL!,
  maxConnection: 10,
  maxUses: 100,
  idleTimeout: 30000,
  connectionTimeout: 30000,
  ssl: process.env.NODE_ENV === 'production' ? true : false,
});

export default db;
