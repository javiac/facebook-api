import { Status } from '../../../enums/Status';
import { FacebookClient } from '../../../services/FacebookClient';

export class InterestGetAllHandler {
  public async handle() {
    const facebookClient = new FacebookClient();

    const interests = await facebookClient.searchInterests();
    const targetStatus = await facebookClient.searchStatuses(interests.map((interest) => interest.id));

    const statusMap = {};
    for (const status of targetStatus) {
      statusMap[status.id] = status.current_status;
    }

    return interests
      .filter((interest) => statusMap[interest.id] === Status.NORMAL)
      .map((interest) => {
        return {
          name: interest.name,
          id: interest.id
        };
      });
  }
}
