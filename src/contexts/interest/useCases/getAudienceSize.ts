import { FacebookClient } from '../../../services/FacebookClient';

export class InterestGetAudienceSizeHandler {
  public async handle(ids: string[]) {
    const facebookClient = new FacebookClient();

    const interests = await facebookClient.searchInterests();

    const filterMap = {};
    for (const id of ids) {
      filterMap[id] = true;
    }

    const audience = await facebookClient.searchInterestsWithAudienceByName(
      interests.filter((interest) => filterMap[interest.id]).map((interest) => interest.name)
    );

    return {
      totalAudienceSize: audience.map((item) => item.audience_size).reduce((a, b) => a + b)
    };
  }
}
