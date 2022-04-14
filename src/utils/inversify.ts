import { Container } from 'inversify';

import { InterestGetAllHandler } from '../contexts/interest/useCases/getAll';
import { InterestGetAudienceSizeHandler } from '../contexts/interest/useCases/getAudienceSize';
import { IHandler } from '../interfaces/IHandler';
import { FacebookClient } from '../services/FacebookClient';

const TYPES = {
  InterestGetAudienceSizeHandler: Symbol.for('InterestGetAudienceSizeHandler'),
  InterestGetAllHandler: Symbol.for('InterestGetAllHandler')
};

const myContainer = new Container();

function configureContainer() {
  myContainer.bind<IHandler>(TYPES.InterestGetAllHandler).to(InterestGetAllHandler);
  myContainer.bind<IHandler>(TYPES.InterestGetAudienceSizeHandler).to(InterestGetAudienceSizeHandler);
  myContainer.bind<FacebookClient>(FacebookClient).toSelf();
}

export { TYPES, myContainer, configureContainer };
