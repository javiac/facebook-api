import { IHandler } from "../interfaces/IHandler";
import container from "../dependencyInjection/container";

export interface Request<T> {
    data: T
}

export default class Mediator {
    private handlersRegistry: Map<any, any>;

    constructor() {
        this.handlersRegistry = new Map<any, any>();
    }

    public async send(request: any): Promise<any> {

        const requestType = request.constructor;
        const handlerType = this.handlersRegistry.get(requestType);

        if (!handlerType) {
            throw new Error(`Cannot handle request '${requestType.name}', no handler registered`);
        }

        try {
            const singleUseContainer = container.createChild();
            const handler = singleUseContainer.get(handlerType) as IHandler;
            return await handler.handle(request);
        } catch (e) {
            throw (e);
        }
    }

    public registerHandler(requestType: any, handler: any) {
        this.handlersRegistry.set(requestType, handler);
    }
}
