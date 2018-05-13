import * as Koa from 'koa';
import { config } from './config';


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

        winstonInstance.log(logLevel, msg);
    };
}