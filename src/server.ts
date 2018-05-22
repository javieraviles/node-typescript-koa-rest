import * as Koa from 'koa';
import * as jwt from 'koa-jwt';
import * as winston from 'winston';
import * as dotenv from 'dotenv';

import { logger } from './logging';
import { config } from './config';
import { routes } from './routes';

const app = new Koa();

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston));

// JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
app.use(jwt({ secret: process.env.JWT_SECRET }));

app.use(routes);

app.listen(config.port);

console.log(`Server running on port ${config.port}`);