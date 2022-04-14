import { injectable } from 'inversify';

import { IHandler } from '../../../interfaces/IHandler';
import { FacebookClient } from '../../../services/FacebookClient';

@injectable()
export class InterestGetAudienceSizeHandler implements IHandler {
  public constructor(private facebookClient: FacebookClient) {}

  public async handle(ids: string[]) {
    const interests = await this.facebookClient.searchInterests();

    const filterMap = {};
    for (const id of ids) {
      filterMap[id] = true;
    }

    const audience = await this.facebookClient.searchInterestsWithAudienceByName(
      interests.filter((interest) => filterMap[interest.id]).map((interest) => interest.name)
    );

    return {
      totalAudienceSize: audience.map((item) => item.audience_size).reduce((a, b) => a + b)
    };
  }
}
