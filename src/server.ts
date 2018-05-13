import * as Koa from 'koa';
import * as winston from 'winston';
import * as dotenv from 'dotenv';

import { logger } from './logging';
import { config } from './config';
import { routes } from './routes';

const app = new Koa();

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

app.use(logger(winston));

app.use(routes);

app.listen(config.port);

console.log(`Server running on port ${config.port}`);