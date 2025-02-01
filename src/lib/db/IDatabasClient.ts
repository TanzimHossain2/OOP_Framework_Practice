import * as schema from '@/db/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';

export type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>;

export const DatabaseClientToken = Symbol('DatabaseClient');

export interface IDatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): DrizzleClient;
  isConnected(): boolean;
  executeQuery<T>(
    label: string,
    queryFn: (db: DrizzleClient) => Promise<T>
  ): Promise<T>;
}

export type DatabaseConfig = {
  url: string;
  maxConnection?: number;
  idleTimeout?: number;
  connectionTimeout?: number;
  maxUses?: number;
  ssl?: boolean;
};
