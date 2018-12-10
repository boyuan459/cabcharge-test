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

module.exports = router;
