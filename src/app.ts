import express from 'express';

import { getAll, getAudienceSize } from './contexts/interest/interestController';
import { env } from './utils/env';

const app = express();
const port = 3000;

app.get('/', (req, res) => res.json({ message: 'Hello world' }));
app.get('/interests', getAll);
app.get('/interests/audience-size', getAudienceSize);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

console.log(`Using Facebook url ${env.FACEBOOK_GRAPH_URL}`);
console.log(`Using Facebook API version ${env.FACEBOOK_GRAPH_API_VERION}`);
