"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const jwt = require("koa-jwt");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const winston = require("winston");
const dotenv = require("dotenv");
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const logging_1 = require("./logging");
const config_1 = require("./config");
const routes_1 = require("./routes");
// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
typeorm_1.createConnection().then(async (connection) => {
    const app = new Koa();
    // Load environment variables from .env file, where API keys and passwords are configured
    dotenv.config({ path: '.env' });
    // Provides important security headers to make your app more secure
    app.use(helmet());
    // Logger middleware -> use winston as logger (logging.ts with config)
    app.use(logging_1.logger(winston));
    app.use(bodyParser());
    // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
    app.use(jwt({ secret: process.env.JWT_SECRET }));
    // this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    app.use(routes_1.router.routes()).use(routes_1.router.allowedMethods());
    app.listen(config_1.config.port);
    console.log(`Server running on port ${config_1.config.port}`);
}).catch(error => console.log('TypeORM connection error: ', error));
//# sourceMappingURL=server.js.map