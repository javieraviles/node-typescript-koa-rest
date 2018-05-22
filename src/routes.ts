import * as Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get('/jwt', async (ctx) => {
    // example just to set a different status
    ctx.status = 201;
    // the body of the response will contain the information contained as payload in the JWT
    ctx.body = ctx.state.user;
});

export const routes = router.routes();