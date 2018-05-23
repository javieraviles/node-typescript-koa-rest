import * as Router from 'koa-router';
import { getManager } from 'typeorm';
import { User } from './entity/user';

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

router.get('/users', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // load all users
    const users = await userRepository.find();

    // return loaded users
    ctx.body = users;
});

router.post('/user', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // save the user contained in the POST body
    const user = await userRepository.save(ctx.request.body);

    // return the created user
    ctx.body = user;
});

router.delete('/user/:id', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // find and remove the user by specified id
    const userToRemove = await userRepository.findOne(ctx.params.id);
    await userRepository.delete(userToRemove);

    // return a NO CONTENT status code
    ctx.status = 204;
});

export const routes = router.routes();