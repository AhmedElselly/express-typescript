"use strict";
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
const category_1 = __importDefault(require("../models/category"));
class CategoryController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = new category_1.default(req.body);
            category.save((err, category) => {
                if (err)
                    return res.status(400).json({ err });
                return res.json(category);
            });
        });
    }
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield category_1.default.aggregate([{
                    $graphLookup: {
                        from: 'categories',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'parentId',
                        as: 'hierarchy',
                    }
                }]);
            return res.json(categories);
        });
    }
}
exports.default = CategoryController;
