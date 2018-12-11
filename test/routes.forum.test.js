process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('config');

const server = config.get('base_url');

chai.use(chaiHttp);

describe('Routes: forum', () => {
    beforeEach(() => {
        console.log("Forum testing start....");
    });

    afterEach(() => {
        console.log("Forum testing end....");
    });

    describe('GET /forum/search', () => {
        test('Should return result object', async () => {
            const res = await chai.request(server).get('/api/forum/user/1/articles');
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
        })
    });

    describe('POST /users', () => {
        test("Should created user", async () => {
            // const res = await chai.request(server).post('/api/users')
            //             .send({
            //                 name: 'test',
            //                 address: 'test',
            //                 age: 10,
            //                 dob: '1984-01-01',
            //                 interests: 'unit test,feature test'
            //             });
            // expect(res.status).toEqual(200);
        });
    });
});