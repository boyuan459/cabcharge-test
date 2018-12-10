process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('config');
chai.use(chaiHttp);

describe('Routes: gets', () => {
    beforeEach(() => {
        console.log("Routes testing start....");
    });

    afterEach(() => {
        console.log("Routes testing end....");
    })

    describe('GET /search', () => {
        test('Should return result object', async () => {
            const res = await chai.request(config.get('base_url')).get('/api/users/search?q=yuan');
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
        })
    })
});