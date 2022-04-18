import express from 'express';
import { ValidationError } from './ValidationError';

export function handlePromisedRoute(handler: (req: express.Request, res: express.Response) => Promise<any>) {
    return async (req: express.Request, res: express.Response) => {
        try {
            await handler(req, res);
        } catch (e) {
            if (e instanceof ValidationError) {
                console.error(e.message)
                res.sendStatus(400);
            } else {
                res.sendStatus(500);
            }
        }
    }
}