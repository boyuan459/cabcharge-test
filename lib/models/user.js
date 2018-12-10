var uuid = require('uuid').v4;
var elasticsearch = require('../elasticsearch');
var client = elasticsearch.client;

async function query(query_string) {
    const result = client.search({
        index: 'userlib',
        type: 'user',
        q: query_string
    });
    return result;
}

async function create(params) {
    const result = client.create({
        index: 'userlib',
        type: 'user',
        id: uuid(),
        body: params
    });
    return result;
}

module.exports = {
    query,
    create
};
