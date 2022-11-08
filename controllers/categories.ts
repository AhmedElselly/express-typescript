import {Request, Response} from 'express';
import Category from "../models/category";

export default class CategoryController {
    async create(req: Request, res: Response): Promise<any> {
        const category = new Category(req.body);
        category.save((err, category) => {
            if(err) return res.status(400).json({err});
            return res.json(category);
        })        
    }

    async getCategories(req: Request, res: Response): Promise<any> {
        const categories = await Category.aggregate([{
            $graphLookup: {
                from: 'categories',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'parentId',
                as: 'hierarchy',
            }
        }]);

        return res.json(categories);
    }
}