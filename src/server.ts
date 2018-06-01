import * as Koa from 'koa';
import * as jwt from 'koa-jwt';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

import { User } from './entity/user';
import { logger } from './logging';
import { config } from './config';
import { router } from './routes';

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'pass',
    database: 'apidb',
    synchronize: true,
    logging: false,
    entities: [
       'src/entity/**/*.ts'
    ]
 }).then(async connection => {

    const app = new Koa();

    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config({ path: '.env' });

    // Provides important security headers to make your app more secure
    app.use(helmet());

    // Logger middleware -> use winston as logger (logging.ts with config)
    app.use(logger(winston));

    app.use(bodyParser());

    // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
    app.use(jwt({ secret: process.env.JWT_SECRET }));

    // this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    app.use(router.routes()).use(router.allowedMethods());

    app.listen(config.port);

    console.log(`Server running on port ${config.port}`);

}).catch(error => console.log('TypeORM connection error: ', error));