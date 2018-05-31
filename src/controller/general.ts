import { BaseContext } from 'koa';

export default class GeneralController {

    public static async helloWorld (ctx: BaseContext) {
        ctx.body = 'Hello World!';
    }

    // silly endpoint to show where the payload data from the token gets stored
    public static async getJwtPayload (ctx: BaseContext) {
        // example just to set a different status
        ctx.status = 201;
        // the body of the response will contain the information contained as payload in the JWT
        ctx.body = ctx.state.user;
    }

}