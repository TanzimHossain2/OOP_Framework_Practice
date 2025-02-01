import chalk from 'chalk';
import 'reflect-metadata';
import { DrizzleDatabaseClientPool } from './lib/db/DrizzleDatabaseClientPool';
import { container } from 'tsyringe';
import { DatabaseClientToken } from './lib/db/IDatabasClient';

export async function registerDependencies() {
  try {
    const databaseClient = new DrizzleDatabaseClientPool({
      url: process.env.DATABASE_URL!,
      maxConnection: 10,
      maxUses: 100,
      idleTimeout: 30000,
      connectionTimeout: 30000,
      ssl: process.env.NODE_ENV === 'production' ? true : false,
    });

    container.register(DatabaseClientToken, {
      useValue: databaseClient,
    })


    console.log(chalk.green('Dependencies registered successfully'));

    await databaseClient.connect();




  } catch (error) {
    console.log(chalk.red('Error registering dependencies: ', error));

    throw error;
  }
}

