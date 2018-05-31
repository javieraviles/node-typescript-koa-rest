import * as Router from 'koa-router';
import { getManager } from 'typeorm';

const router = new Router();

// basic GET request
router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

// silly endpoint to show where the payload data from the token gets stored
router.get('/jwt', async (ctx) => {
    // example just to set a different status
    ctx.status = 201;
    // the body of the response will contain the information contained as payload in the JWT
    ctx.body = ctx.state.user;
});

export const routes = router.routes();