import chalk from 'chalk';
import http from 'http';
import appV1 from './v1/app';
import appV2 from './v2/app';

import express from 'express';
import { registerDependencies } from './registry';
import { createApp } from './v3/app';

const port = process.env.PORT || 3000;
let server: http.Server;

async function main() {
  try {
    await registerDependencies();
    const app = express();

    const appV3 = createApp();
    app.use(appV1);
    app.use(appV2);
    app.use(appV3);

    server = http.createServer(app);

    server.listen(port, () => {
      console.log(chalk.bgGreen(`Server is running on port ${port}`));
    });
  } catch (error) {
    console.error(chalk.red('Error starting server: ', error));
  }
}

main();
