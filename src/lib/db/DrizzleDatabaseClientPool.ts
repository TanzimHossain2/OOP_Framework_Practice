import * as schema from "@/db/schemas";
import chalk from "chalk";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import {
  DatabaseConfig,
  DrizzleClient,
  IDatabaseClient,
} from "./IDatabasClient";

export class DrizzleDatabaseClientPool implements IDatabaseClient {
  private readonly pool: Pool;
  private readonly client: DrizzleClient;
  private connected = false;

  constructor(config: DatabaseConfig) {
    this.pool = new Pool({
      connectionString: config.url,
      max: config.maxConnection ?? 10,
      idleTimeoutMillis: config.idleTimeout ?? 10000,
      connectionTimeoutMillis: config.connectionTimeout ?? 10000,
      maxUses: config.maxUses ?? 10,
      ssl: config.ssl ?? false,
    });

    this.client = drizzle({
      client: this.pool,
      schema,
    });
  }

  async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    await this.pool.connect();
    this.connected = true;

    console.log(chalk.green("🟢 Database Connected"));
  }

  async disconnect(): Promise<void> {
    this.connected = false;
    await this.pool.end();

    console.log(chalk.red("🔴 Database Disconnected"));
  }

  getClient(): DrizzleClient {
    return this.client;
  }

  isConnected(): boolean {
    return this.connected;
  }

  async executeQuery<T>(
    label: string,
    queryFn: (db: DrizzleClient) => Promise<T>
  ): Promise<T> {
    const start = performance.now();

    try {
      const result = await queryFn(this.client);
      const duration = performance.now() - start;

      console.log(
        chalk.blue(`🔹[${label}] executed in ${duration.toFixed(2)}ms`)
      );
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(
        chalk.yellow(`🔸[${label}] failed in ${duration.toFixed(2)}ms`)
      );
      console.log(error);
      throw new Error(
        chalk.yellow(`🔸[${label}] failed in ${duration.toFixed(2)}ms`)
      );
    }
  }
}

