import * as Koa from 'koa';
import { config } from './config';
import * as winston from 'winston';

export function logger(winstonInstance) {
    return async(ctx: Koa.Context, next: () => Promise<any>) => {

        const start = new Date().getMilliseconds();

        await next();

        const ms = new Date().getMilliseconds() - start;

        let logLevel: string;
        if (ctx.status >= 500) {
            logLevel = 'error';
        }
        if (ctx.status >= 400) {
            logLevel = 'warn';
        }
        if (ctx.status >= 100) {
            logLevel = 'info';
        }

        const msg: string = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

        winstonInstance.configure({
            level: config.debugLogging ? 'debug' : 'info',
            transports: [
                //
                // - Write all logs error (and below) to `error.log`.
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                //
                // - Write to all logs with specified level to console.
                new winston.transports.Console({ format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                  ) })
            ]
        });

        winstonInstance.log(logLevel, msg);
    };
}