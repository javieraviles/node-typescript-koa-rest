import * as Koa from 'koa';
import * as winston from 'winston';
import { logger } from './logging';

winston.configure({
    level: 'debug',
    transports: [
        new winston.transports.Console({
            colorize: true
        })
    ]
});

import { config } from './config';
import { routes } from './routes';

const app = new Koa();

app.use(routes);

app.use(logger(winston));

app.listen(config.port);

console.log(`Server running on port ${config.port}`);