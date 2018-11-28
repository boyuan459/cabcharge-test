var express = require('express');
var router = express.Router();
var asyncMiddleware = require('../middleware/async').asyncMiddleware;
var emailService = require('../lib/email');

/* GET users listing. */
router.post('/', asyncMiddleware(async (req, res, next) => {
  const to = req.body.to;
  const cc = req.body.cc || [];
  const bcc = req.body.bcc || [];
  const subject = req.body.subject;
  const text = req.body.text;

  // const result = await emailService.send({
  //   to,subject,text
  // });
  // res.send(result)
  emailService.sendCb({ to, cc, bcc, subject, text }, (error, result) => {
    if (error) {
      res.status(500).send("Server error");
      return;
    }
    res.send(result);
  });
}));

module.exports = router;
