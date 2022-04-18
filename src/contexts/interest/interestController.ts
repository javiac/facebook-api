import express from 'express';
import Joi from 'joi';

import mediator from '../../mediator/globalMediator';
import { ValidationError } from '../../utils/ValidationError';
import { InterestGetAllMessage } from './useCases/getAll';
import { InterestGestAudienceSizeMessage } from './useCases/getAudienceSize';

export async function getAll(req: express.Request, res: express.Response) {
    const response = await mediator.send(new InterestGetAllMessage())
    res.json(response);
}

export async function getAudienceSize(req: express.Request, res: express.Response) {
    const schema = Joi.array().min(1).items(Joi.string())
    const result = schema.validate(((req.query.ids ?? '') as string).split(','));

    if (result.error) {
        throw new ValidationError(result.error.message)
    }

    const message = new InterestGestAudienceSizeMessage(result.value)
    const response = await mediator.send(message)
    res.json(response);
}
