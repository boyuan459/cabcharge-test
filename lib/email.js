var mailgun = require('./mailgun');

async function send(data) {
    data.from = 'Bo Yuan <byuan459@gmail.com>';
    const result = await mailgun.send(data);
    //if cannot send, failover to sendgrid
    console.log(result);
    return result;
}

function sendCb(data, cb) {
    console.log("Send data", data);
    data.from = 'Bo Yuan <byuan459@gmail.com>';
    mailgun.mailgun.messages().send(data, (error, result) => {
        //todo if error, switch over to sendgrid
        cb(error, result);
    });
}

module.exports = {
    send,
    sendCb
};
