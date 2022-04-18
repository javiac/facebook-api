import mediator from './globalMediator';

export default function registerHandler(target: any, key: string) {
    const types = Reflect.getMetadata('design:paramtypes', target, key);
    mediator.registerHandler(types[0], target.constructor);
}
