// this is probably really bad for production, look into later
require('babel-register')({presets: ['env', 'react']});
require('babel-polyfill');

const winston = require('winston');

const app = require('./lib/app').default;

const port = app.get('port') || 3000;

app.listen(port, () => {
  winston.info('Listening on port ' + port);
});
