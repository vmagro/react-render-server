import winston from 'winston';

import app from './app';
const port = app.get('port') || 3000;

import cluster from 'cluster';

if (cluster.isMaster) {
  const cpus = require('os').cpus().length;
  winston.info('[master] Spawning ' + cpus + ' workers');
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    winston.error('Worker %d died', worker.id);
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    winston.info('[worker] Listening on port ' + port);
  });
}
