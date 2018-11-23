var express = require('express');
var router = express.Router();
var asyncMiddleware = require('../middleware/async').asyncMiddleware;

/* GET users listing. */
router.post('/', asyncMiddleware(async (req, res, next) => {
  const to = req.body.to;
  const cc = req.body.cc;
  const bcc = req.body.bcc;
  const subject = req.body.subject;
  const text = req.body.text;
  res.send({
      to,cc,bcc,subject,text
  })
}));

module.exports = router;
