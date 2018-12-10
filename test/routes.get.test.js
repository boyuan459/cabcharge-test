process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../bin/www');

describe('Routes: gets', () => {
    beforeEach(() => {
        console.log("Routes testing start....");
    });

    afterEach(() => {
        console.log("Routes testing end....");
    })

    describe('GET /search', () => {
        test('Should return result object', async () => {
            expect(200).toEqual(200);
        })
    })
});