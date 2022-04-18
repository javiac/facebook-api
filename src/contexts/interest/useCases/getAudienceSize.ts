import { IHandler } from '../../../interfaces/IHandler';
import registerHandler from '../../../mediator/registerHandler';
import { FacebookClient } from '../../../services/FacebookClient';
import { injectable } from '../../../dependencyInjection/injectable';

export class InterestGestAudienceSizeMessage {
    constructor(public ids: string[]) { }
}

@injectable()
export class InterestGetAudienceSizeHandler implements IHandler {
    public constructor(private facebookClient: FacebookClient) { }

    @registerHandler
    public async handle(message: InterestGestAudienceSizeMessage) {
        const interests = await this.facebookClient.searchInterests();

        const filterMap = {};
        for (const id of message.ids) {
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
