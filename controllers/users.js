"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const decorators_1 = require("../decorators");
let UserController = class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_1.default(req.body);
            yield user.setPassword(req.body.password);
            user.save((err, user) => {
                if (err)
                    return res.status(400).json({ err });
                return res.json(user);
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { user } = yield user_1.default.authenticate()(email, password);
            if (!user)
                return res.status(400).json({ error: 'Email and password don\'t match' });
            const { _id, username } = user;
            const token = jsonwebtoken_1.default.sign({ _id, username, email }, process.env.SECRETKEY);
            return res.json({ token, user });
        });
    }
    getHierarchy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield user_1.default.aggregate([{
                    $graphLookup: {
                        from: 'users',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'employerId',
                        as: 'hierarchy'
                    }
                }]);
            return res.json(employees);
        });
    }
    artists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const artists = yield user_1.default.aggregate([{
                    $bucket: {
                        groupBy: '$year_born',
                        boundaries: [1840, 1850, 1860, 1870, 1880],
                        default: 'Other',
                        output: {
                            'count': { $sum: 1 },
                            'artists': {
                                $push: {
                                    'name': { $concat: ['$first_name', '$last_name'] },
                                    'year_born': '$year_born'
                                }
                            }
                        }
                    }
                }]);
        });
    }
};
__decorate([
    (0, decorators_1.Post)('hello')
], UserController.prototype, "login", null);
UserController = __decorate([
    (0, decorators_1.SimpleDecorator)('Ahmed Elselly')
], UserController);
exports.default = UserController;
