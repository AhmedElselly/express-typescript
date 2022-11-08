export function SimpleDecorator(name: string): any {
    return (constructor: Function) => {
        console.log(constructor, name);
    }
}

export const Post = (name: string): any => {
    return (target: any, methodName: string, descriptors?: PropertyDescriptor) => {
        console.log(`Post method name ${methodName}`);
        console.log(`Post method descriptors ${JSON.stringify(descriptors)}`);
        console.log(`Post method target ${JSON.stringify(target)}`);
        console.log(`Post decorator ${target[methodName]}`);
    }
}