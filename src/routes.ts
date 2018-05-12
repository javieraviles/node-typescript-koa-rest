import * as Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get('/test', async (ctx) => {
    ctx.status = 201;
    ctx.body = 'test';
});

export const routes = router.routes();