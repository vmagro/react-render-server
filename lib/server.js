import winston from 'winston';

import app from './app';
const port = app.get('port') || 3000;

import cluster from 'cluster';
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
