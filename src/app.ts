import express from 'express';
import 'reflect-metadata';

import { getAll, getAudienceSize } from './contexts/interest/interestController';
import { env } from './utils/env';
import { configureContainer } from './utils/inversify';

configureContainer();

console.log(`NODE_ENV ${env.NODE_ENV}`);
console.log(`Using Facebook url ${env.FACEBOOK_GRAPH_URL}`);
console.log(`Using Facebook API version ${env.FACEBOOK_GRAPH_API_VERION}`);

export function startServer(callback?: () => void) {
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => res.json({ message: 'Hello world' }));
  app.get('/interests', getAll);
  app.get('/interests/audience-size', getAudienceSize);

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    callback();
  });
}

if (env.NODE_ENV !== 'test') {
  startServer();
}
