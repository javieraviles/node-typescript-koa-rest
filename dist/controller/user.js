"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_1 = require("../entity/user");
class UserController {
    static async getUsers(ctx) {
        // get a user repository to perform operations with user
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        // load all users
        const users = await userRepository.find();
        // return loaded users
        ctx.body = users;
    }
    static async getUser(ctx) {
        // get a user repository to perform operations with user
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        // load user by id
        const user = await userRepository.findOne(ctx.params.id);
        if (user) {
            // return loaded user
            ctx.body = user;
        }
        else {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The user you are trying to retrieve doesn\'t exist in the db';
        }
    }
    static async createUser(ctx) {
        // get a user repository to perform operations with user
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        // build up entity user to be saved
        const userToBeSaved = new user_1.User();
        userToBeSaved.name = ctx.request.body.name;
        userToBeSaved.email = ctx.request.body.email;
        // validate user entity
        const errors = await class_validator_1.validate(userToBeSaved); // errors is an array of validation errors
        if (errors.length > 0) {
            // return bad request status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        }
        else {
            // save the user contained in the POST body
            const user = await userRepository.save(userToBeSaved);
            // return created status code and updated user
            ctx.status = 201;
            ctx.body = user;
        }
    }
    static async updateUser(ctx) {
        // get a user repository to perform operations with user
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        // check if a user with the specified id exists
        if (await userRepository.findOne(ctx.params.id)) {
            // update the user by specified id
            // build up entity user to be updated
            const userToBeUpdated = new user_1.User();
            userToBeUpdated.id = +ctx.params.id;
            userToBeUpdated.name = ctx.request.body.name;
            userToBeUpdated.email = ctx.request.body.email;
            // validate user entity
            const errors = await class_validator_1.validate(userToBeUpdated); // errors is an array of validation errors
            if (errors.length > 0) {
                // return bad request status code and errors array
                ctx.status = 400;
                ctx.body = errors;
            }
            else {
                // save the user contained in the PUT body
                const user = await userRepository.save(userToBeUpdated);
                // return created status code and updated user
                ctx.status = 201;
                ctx.body = user;
            }
        }
        else {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The user you are trying to update doesn\'t exist in the db';
        }
    }
    static async deleteUser(ctx) {
        // get a user repository to perform operations with user
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        // find the user by specified id
        const userToRemove = await userRepository.findOne(ctx.params.id);
        if (userToRemove) {
            // the user is there so can be removed
            await userRepository.remove(userToRemove);
            // return a NO CONTENT status code
            ctx.status = 204;
        }
        else {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The user you are trying to delete doesn\'t exist in the db';
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user.js.map