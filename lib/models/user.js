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

module.exports = {
    query
};
