var express = require('express');
var router = express.Router();
var asyncMiddleware = require('../middleware/async').asyncMiddleware;

/* GET users listing. */
router.post('/', asyncMiddleware(async (req, res, next) => {
  
}));

module.exports = router;
