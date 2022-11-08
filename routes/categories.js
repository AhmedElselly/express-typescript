"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const categories_1 = __importDefault(require("../controllers/categories"));
const categoryController = new categories_1.default();
router.post('/create', categoryController.create);
router.get('/', categoryController.getCategories);
exports.default = router;
