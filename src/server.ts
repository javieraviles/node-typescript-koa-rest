import * as Koa from 'koa';
import * as winston from 'winston';
import { logger } from './logging';

import { config } from './config';
import { routes } from './routes';

const app = new Koa();

app.use(logger(winston));

app.use(routes);

app.listen(config.port);

console.log(`Server running on port ${config.port}`);