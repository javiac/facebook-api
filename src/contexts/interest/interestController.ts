import express from 'express';

import { InterestGetAllHandler } from './useCases/getAll';
import { InterestGetAudienceSizeHandler } from './useCases/getAudienceSize';

export async function getAll(req: express.Request, res: express.Response) {
  const handler = new InterestGetAllHandler();
  res.json(await handler.handle());
}

export async function getAudienceSize(req: express.Request, res: express.Response) {
  const handler = new InterestGetAudienceSizeHandler();
  res.json(await handler.handle((req.query.ids as string).split(',')));
}
