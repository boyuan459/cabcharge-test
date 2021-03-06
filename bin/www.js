#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('http');
var http = require('http');
var cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // let numReqs = 0;

  // setInterval(() => {
  //   console.log(`numReqs = ${numReqs}`);
  // }, 1000)

  // Count requests
  // function messageHandler(msg) {
  //   if (msg.cmd && msg.cmd === 'notifyRequest') {
  //     numReqs += 1;
  //   }
  // }
  //Fork workers
  for(let i=0;i<numCPUs;i++) {
    cluster.fork();
  }

  // for(const id in cluster.workers) {
  //   cluster.workers[id].on('message', messageHandler);
  // }

  cluster.on('exit', (worker, code, signal) => {
    //Restart the worker
    var newWorker = cluster.fork();
    console.log(`worker ${worker.process.pid} died`);
    console.log(`worker ${newWorker.process.pid} born`);
  });
} else {
  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(process.env.PORT || '8081');
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  console.log(`Worker ${process.pid} started`);
}


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = {
  server
}