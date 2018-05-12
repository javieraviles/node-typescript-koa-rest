import * as Koa from 'koa';

import { config } from './config';
import { routes } from './routes';

const app = new Koa();

app.use(routes);

app.listen(config.port);

console.log(`Server running on port ${config.port}`);