"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralController {
    static async helloWorld(ctx) {
        ctx.body = 'Hello World!';
    }
    // silly endpoint to show where the payload data from the token gets stored
    static async getJwtPayload(ctx) {
        // example just to set a different status
        ctx.status = 201;
        // the body of the response will contain the information contained as payload in the JWT
        ctx.body = ctx.state.user;
    }
}
exports.default = GeneralController;
//# sourceMappingURL=general.js.map