import { injectable as inversifyInjectable, interfaces } from 'inversify';
import container from './container';

export function injectable() {
    return <T>(target: interfaces.Newable<T>) => {
        container.bind(target).toSelf().inSingletonScope();
        inversifyInjectable()(target);
    };
}
