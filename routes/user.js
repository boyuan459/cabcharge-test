var express = require('express');
var router = express.Router();
var asyncMiddleware = require('../middleware/async').asyncMiddleware;
var user = require('../lib/models/user');

/* GET users listing. */
router.get('/search', asyncMiddleware(async (req, res, next) => {
  const q = req.query.q;
  const result = await user.query(q);
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
