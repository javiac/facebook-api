import express from 'express';

import { IHandler } from '../../interfaces/IHandler';
import { TYPES, myContainer } from '../../utils/inversify';

export async function getAll(req: express.Request, res: express.Response) {
  const handler = myContainer.get<IHandler>(TYPES.InterestGetAllHandler);
  res.json(await handler.handle());
}

export async function getAudienceSize(req: express.Request, res: express.Response) {
  const handler = myContainer.get<IHandler>(TYPES.InterestGetAudienceSizeHandler);
  res.json(await handler.handle((req.query.ids as string).split(',')));
}
