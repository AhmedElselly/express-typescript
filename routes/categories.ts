import express, {Router} from 'express';
const router = Router();

import CategoryController from '../controllers/categories';

const categoryController = new CategoryController();

router.post('/create', categoryController.create);
router.get('/', categoryController.getCategories);

export default router;