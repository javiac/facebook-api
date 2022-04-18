import { Status } from '../../../enums/Status';
import { IHandler } from '../../../interfaces/IHandler';
import registerHandler from '../../../mediator/registerHandler';
import { FacebookClient } from '../../../services/FacebookClient';
import { injectable } from '../../../dependencyInjection/injectable';

export class InterestGetAllMessage {
    constructor() { }
}

@injectable()
export class InterestGetAllHandler implements IHandler {
    public constructor(private facebookClient: FacebookClient) { }

    @registerHandler
    public async handle(message: InterestGetAllMessage) {
        const interests = await this.facebookClient.searchInterests();
        const targetStatus = await this.facebookClient.searchStatuses(interests.map((interest) => interest.id));

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
