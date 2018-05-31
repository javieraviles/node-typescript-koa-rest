import * as Router from 'koa-router';
import { getManager } from 'typeorm';
import controller = require('./controller');

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// USER ROUTES
router.get('/users', controller.user.getUsers);
router.get('/user/:id', controller.user.getUser);
router.post('/user', controller.user.createUser);
router.put('/user/:id', controller.user.updateUser);
router.delete('/user/:id', controller.user.deleteUser);

export { router };