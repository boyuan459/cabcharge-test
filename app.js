var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');

var emailRouter = require('./routes/emails');
var userRouter = require('./routes/user');

var app = express();

//for testing, pls remove following lines in react
// app.use(express.static(path.join(__dirname, 'public')));
//remove above code in react

app.use(cors());
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/emails', emailRouter);
app.use('/api/users', userRouter)

console.log("NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


//error handling
app.use(function(err, req, res, next) {
    // console.log(req);
    console.log('Log error', err);
    res.status(500).send({error: 'Unknown server error!'});
    return;
});

module.exports = app;