// eslint-disable-next-line import/order
import { env } from '../src/utils/env';

env.NODE_ENV = 'test';
env.PORT = 3001;

import { expect } from 'chai';
import fetch from 'node-fetch';

import { startServer } from '../src/app';

const baseUrl = `http://localhost:${env.PORT}`;

let interests = [];

describe('API Tests', function () {
    before(function (done) {
        startServer(done);
    });

    describe('GET /interests', function () {
        it('return the list of interests', async function () {
            const response = await fetch(`${baseUrl}/interests`);
            interests = await response.json();
            expect(interests.length).to.greaterThan(0);
            expect(interests[0]).to.haveOwnProperty('id');
            return expect(interests[0]).to.haveOwnProperty('name');
        });
    });

    describe('GET /interests/audience-size', function () {
        it('return the audience size for a list of given interests', async function () {
            const response = await fetch(
                `${baseUrl}/interests/audience-size?ids=${interests.map((interest) => interest.id).join(',')}`
            );
            const audience = await response.json();
            return expect(audience).to.haveOwnProperty('totalAudienceSize');
        });

        it('return bad request if ids is not provided', async function () {
            const response = await fetch(
                `${baseUrl}/interests/audience-size?ids=`
            );
            expect(response.status).to.equal(400);
        });
    });
});
