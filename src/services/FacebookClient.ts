import fetch from 'node-fetch';

import { IInterest } from '../interfaces/IInterest';
import { IStatusItem } from '../interfaces/IStatusItem';
import { ISuggestedInterest } from '../interfaces/ISuggestedInterest';
import { env } from '../utils/env';
import { injectable } from '../dependencyInjection/injectable';

@injectable()
export class FacebookClient {
    private searchUrl = `${env.FACEBOOK_GRAPH_URL}/${env.FACEBOOK_GRAPH_API_VERION}/search`;
    private accessToken: string = env.FACEBOOK_GRAPH_ACCESS_TOKEN;

    private async apiFetch(query: string) {
        let data = [];

        try {
            const response = await fetch(`${this.searchUrl}?${query}&access_token=${this.accessToken}`);
            data = (await response.json()).data;
        } catch (e) {
            console.error('Request error', e);
            data = [];
        }
        return data;
    }

    public async searchInterests(): Promise<IInterest[]> {
        return await this.apiFetch('type=adTargetingCategory&class=interests');
    }

    public async searchStatuses(interestIds: string[]): Promise<IStatusItem[]> {
        const search = `type=targetingoptionstatus&targeting_option_list=[${interestIds.map((id) => `"${id}"`).join(',')}]`;
        return await this.apiFetch(search);
    }

    public async searchInterestsWithAudienceByName(names: string[]): Promise<ISuggestedInterest[]> {
        const search = `type=adinterestvalid&interest_list=[${names.map((name) => `"${name}"`).join(',')}]`;
        return await this.apiFetch(search);
    }
}
