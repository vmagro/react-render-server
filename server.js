// this is probably really bad for production, look into later
require('babel-register')({presets: ['env', 'react']});
require('babel-polyfill');

const winston = require('winston');

const app = require('./lib/app').default;
const port = app.get('port') || 3000;

const cluster = require('cluster');
const cpus = require('os').cpus().length;

if (cluster.isMaster) {
  winston.info('[master] Spawning ' + cpus + ' workers');
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  app.listen(port, () => {
    winston.info('[worker] Listening on port ' + port);
  });
}
