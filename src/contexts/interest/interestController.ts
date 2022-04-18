import express from 'express';

import mediator from '../../mediator/globalMediator';
import { InterestGetAllMessage } from './useCases/getAll';
import { InterestGestAudienceSizeMessage } from './useCases/getAudienceSize';

export async function getAll(req: express.Request, res: express.Response) {
    const response = await mediator.send(new InterestGetAllMessage())
    res.json(response);
}

export async function getAudienceSize(req: express.Request, res: express.Response) {
    const message = new InterestGestAudienceSizeMessage((req.query.ids as string).split(','))
    const response = await mediator.send(message)
    res.json(response);
}
