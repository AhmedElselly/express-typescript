import express, {Router} from 'express';
const router = Router();

import UserController from '../controllers/users';

const userController = new UserController();

// console.log(userController)

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/hierarchy', userController.getHierarchy);

export default router;