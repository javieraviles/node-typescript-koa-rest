"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const winston = require("winston");
function logger(winstonInstance) {
    return async (ctx, next) => {
        const start = new Date().getMilliseconds();
        await next();
        const ms = new Date().getMilliseconds() - start;
        let logLevel;
        if (ctx.status >= 500) {
            logLevel = 'error';
        }
        if (ctx.status >= 400) {
            logLevel = 'warn';
        }
        if (ctx.status >= 100) {
            logLevel = 'info';
        }
        const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;
        winstonInstance.configure({
            level: config_1.config.debugLogging ? 'debug' : 'info',
            transports: [
                //
                // - Write to all logs with level `debug` and below to console.
                new winston.transports.Console({ colorize: true }),
                //
                // - Write all logs error (and below) to `error.log`.
                new winston.transports.File({ filename: 'error.log', level: 'error' })
            ]
        });
        winstonInstance.log(logLevel, msg);
    };
}
exports.logger = logger;
//# sourceMappingURL=logging.js.map