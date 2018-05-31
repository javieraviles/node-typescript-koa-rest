import { BaseContext } from 'koa';
import { getManager, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/user';

export default class UserController {

    public static async getUsers (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);

        // load all users
        const users: User[] = await userRepository.find();

        // return loaded users
        ctx.body = users;
    }

    public static async getUser (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);

        // load user by id
        const user: User = await userRepository.findOne(ctx.params.id);

        if (user) {
            // return loaded user
            ctx.body = user;
        } else {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
        }

    }

    public static async createUser (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);

        // build up entity user to be saved
        const userToBeSaved: User = new User();
        userToBeSaved.name = ctx.request.body.name;
        userToBeSaved.email = ctx.request.body.email;

        // validate user entity
        await validate(userToBeSaved).then(async errors => { // errors is an array of validation errors
            if (errors.length > 0) {
                // return bad request status code and errors array
                ctx.status = 400;
                ctx.body = errors;
            } else {
                // save the user contained in the POST body
                const user = await userRepository.save(userToBeSaved);
                // return created status code and updated user
                ctx.status = 201;
                ctx.body = user;
            }
        });
    }

    public static async updateUser (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);

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
                    // return bad request status code and errors array
                    ctx.status = 400;
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

    }

    public static async deleteUser (ctx: BaseContext) {

        // get a user repository to perform operations with user
        const userRepository = getManager().getRepository(User);

        // find the user by specified id
        const userToRemove: User = await userRepository.findOne(ctx.params.id);
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

    }

  }
