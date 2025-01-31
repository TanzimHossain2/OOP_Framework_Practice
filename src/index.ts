import chalk from 'chalk';
import http from 'http';
import appV1 from './v1/app';
import appV2 from './v2/app';

import express from 'express';

const app = express();

app.use(appV1);
app.use(appV2);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(chalk.bgGreen(`Server is running on port ${port}`));
});

server.on('error', (error: Error) => {
  console.error(chalk.bgRed('Server error: '), error);
});

