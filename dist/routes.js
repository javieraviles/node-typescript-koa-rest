"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const controller = require("./controller");
const router = new Router();
exports.router = router;
// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);
// USER ROUTES
router.get('/users', controller.user.getUsers);
router.get('/user/:id', controller.user.getUser);
router.post('/user', controller.user.createUser);
router.put('/user/:id', controller.user.updateUser);
router.delete('/user/:id', controller.user.deleteUser);
//# sourceMappingURL=routes.js.map