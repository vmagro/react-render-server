import winston from 'winston';

import app from './app';
import config from './config';

const port = config.port;

app.listen(port, () => {
  winston.info('[worker] Listening on port ' + port);
});
