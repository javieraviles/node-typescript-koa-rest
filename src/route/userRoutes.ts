import * as Router from 'koa-router';
import { getManager } from 'typeorm';
import { User } from '../entity/user';

const router = new Router();

router.get('/users', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // load all users
    const users = await userRepository.find();

    // return loaded users
    ctx.body = users;
});

router.get('/user/:id', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // load user by id
    const user = await userRepository.findOne(ctx.params.id);

    if (user) {
        // return loaded user
        ctx.body = user;
    } else {
        // return a BAD REQUEST status code and error message
        ctx.status = 400;
        ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
    }

});

router.post('/user', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // OBVIOUSLY HERE WE WOULD VALIDATE THAT THE CTX.REQUEST.BODY IS A VALID USER OBJECT
    // Maybe with class-validator?

    // save the user contained in the POST body
    const user = await userRepository.save(ctx.request.body);

    // created status code
    ctx.status = 201;

    // return the created user
    ctx.body = user;
});

router.put('/user/:id', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // find the user by specified id
    let userToUpdate = await userRepository.findOne(ctx.params.id);
    if (userToUpdate) {

        // OBVIOUSLY HERE WE WOULD VALIDATE THAT THE CTX.REQUEST.BODY IS A VALID USER OBJECT
        // Maybe with class-validator?

        // update the user by specified id
        userToUpdate = ctx.request.body;
        userToUpdate.id = +ctx.params.id;
        const user = await userRepository.save(userToUpdate);

        // return created status code and updated user
        ctx.status = 201;
        ctx.body = user;
    } else {
        // return a BAD REQUEST status code and error message
        ctx.status = 400;
        ctx.body = 'The user you are trying to update doesn\'t exist in the db';
    }

});

router.delete('/user/:id', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // find the user by specified id
    const userToRemove = await userRepository.findOne(ctx.params.id);
    if (userToRemove) {
        // the user is there so can be removed
        await userRepository.remove(userToRemove);
        // return a NO CONTENT status code
        ctx.status = 204;
    } else {
        // return a BAD REQUEST status code and error message
        ctx.status = 400;
        ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
    }

});

export const userRoutes = router.routes();