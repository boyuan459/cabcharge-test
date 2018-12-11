var express = require('express');
var router = express.Router();
var asyncMiddleware = require('../middleware/async').asyncMiddleware;
var forum = require('../lib/models/forum');

/* GET users listing. */
router.get('/user/:id/articles', asyncMiddleware(async (req, res, next) => {
  const userID = req.params.id;
  const result = await forum.getArticlesByUserID(userID);
  res.send(result);
}));

router.post('/', asyncMiddleware(async (req,res, next) => {
    const params = req.body;
    console.log(params);
    const result = await user.create(params);
    console.log(result);
    res.send(result);
}));

module.exports = router;
