import * as Router from 'koa-router';
import { getManager } from 'typeorm';
import { validate } from 'class-validator';
import { User } from './entity/user';

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

    // build up entity user to be saved
    const userToBeSaved: User = new User();
    userToBeSaved.name = ctx.request.body.name;
    userToBeSaved.email = ctx.request.body.email;

    // validate user entity
    await validate(userToBeSaved).then(async errors => { // errors is an array of validation errors
        if (errors.length > 0) {
            // created status code
            ctx.status = 400;
            // return the created user
            ctx.body = errors;
        } else {
            // save the user contained in the POST body
            const user = await userRepository.save(userToBeSaved);
            // return created status code and updated user
            ctx.status = 201;
            ctx.body = user;
        }
    });

});

router.put('/user/:id', async (ctx) => {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // check if a user with the specified id exists
    if (await userRepository.findOne(ctx.params.id)) {
        // update the user by specified id

        // build up entity user to be updated
        const userToBeUpdated: User = new User();
        userToBeUpdated.id = +ctx.params.id;
        userToBeUpdated.name = ctx.request.body.name;
        userToBeUpdated.email = ctx.request.body.email;

        // validate user entity
        await validate(userToBeUpdated).then(async errors => { // errors is an array of validation errors
            if (errors.length > 0) {
                // created status code
                ctx.status = 400;
                // return the created user
                ctx.body = errors;
            } else {
                // save the user contained in the PUT body
                const user = await userRepository.save(userToBeUpdated);
                // return created status code and updated user
                ctx.status = 201;
                ctx.body = user;
            }
        });
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

export const routes = router.routes();