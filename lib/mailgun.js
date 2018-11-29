var util = require('util');
var config = require('config');
// var api_key = 'key-664362f071eaa03030fd09e4d686c7f8'
// var domain = 'progetdata.com';
var mailgunConfig = config.get("mailgun");
var mailgun = require('mailgun-js')({apiKey: mailgunConfig.api_key, domain: mailgunConfig.domain});

// var data = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'serobnic@mail.ru',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomeness!'
// };

// mailgun.messages().send(data, function (error, body) {
//   console.log(body);
// });

const send = util.promisify(mailgun.messages().send);

module.exports = {
    send,
    mailgun
}