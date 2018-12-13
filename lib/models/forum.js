var uuid = require('uuid').v4;
var elasticsearch = require('../elasticsearch');
var client = elasticsearch.client;

async function getArticlesByUserID(userID) {
    const result = client.search({
        index: 'forum',
        type: 'article',
        body: {
            query: {
                constant_score: {
                    filter: {
                        term: {
                            userID
                        }
                    }
                }
            }
        }
    });
    return result;
}

module.exports = {
    getArticlesByUserID
};
