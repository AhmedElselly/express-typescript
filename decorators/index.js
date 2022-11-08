"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.SimpleDecorator = void 0;
function SimpleDecorator(name) {
    return (constructor) => {
        console.log(constructor, name);
    };
}
exports.SimpleDecorator = SimpleDecorator;
const Post = (name) => {
    return (target, methodName, descriptors) => {
        console.log(`Post method name ${methodName}`);
        console.log(`Post method descriptors ${JSON.stringify(descriptors)}`);
        console.log(`Post method target ${JSON.stringify(target)}`);
        console.log(`Post decorator ${target[methodName]}`);
    };
};
exports.Post = Post;
