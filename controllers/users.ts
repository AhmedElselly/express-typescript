import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import {Post, SimpleDecorator} from '../decorators';

@SimpleDecorator('Ahmed Elselly')
class UserController {
    async signup(req: Request, res: Response): Promise<any> {
        const user = new User(req.body);
        await user.setPassword(req.body.password);
        user.save((err, user) => {
            if(err) return res.status(400).json({err});
            return res.json(user);
        })
    }

    @Post('hello')
    async login(req: Request, res: Response): Promise<any> {
        const {email, password} = req.body;
        const {user} = await User.authenticate()(email, password);
        if(!user) return res.status(400).json({error: 'Email and password don\'t match'});
        const {_id, username} = user;
        const token = jwt.sign({_id, username, email}, process.env.SECRETKEY);

        return res.json({token, user});
    }

    async getHierarchy(req: Request, res: Response): Promise<any>{
        const employees = await User.aggregate([{
            $graphLookup: {
                from: 'users',
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'employerId',
                as: 'hierarchy'
            }
        }]);
        return res.json(employees);
    }

    async artists(req: Request, res: Response): Promise<any> {
        // const artists = await User.aggregate([{
        //     $bucket: {
        //         groupBy: '$year_born',
        //         boundaries: [1840, 1850, 1860, 1870, 1880],
        //         default: 'Other',
        //         output: {
        //             'count': {$sum: 1},
        //             'artists': {
        //                 $push: {
        //                     'name': {$concat: ['$first_name', '$last_name']},
        //                     'year_born': '$year_born'
        //                 }
        //             }
        //         }
        //     }
        // },{
        //     $match: {count: {$gt: 3}}
        // }])
        
        const artists = await User.aggregate([{
            $bucket: {
                groupBy: '$year_born',
                boundaries: [1840, 1850, 1860, 1870, 1880],
                default: 'Other',
                output: {
                    'count': {$sum: 1},
                    'artists': {
                        $push: {
                            'name': {$concat: ['$first_name', '$last_name']},
                            'year_born': '$year_born'
                        }
                    }
                }
            }
        }])


    }

}

export default UserController;